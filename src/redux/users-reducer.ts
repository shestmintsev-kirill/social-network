import { AppStateType, InferActionsTypes } from './redux-store';
import { UserType } from './../types/types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/users-api';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> //array of users ids
};
type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
  switch (action.type) {
    case 'FOLLOW_UNFOLLOW': return {
      ...state,
      users: state.users.map(user => {
        if (user.id === action.userId) {
          return { ...user, followed: action.followedStatus }
        }
        return user
      })
    }
    case 'SET_USERS': return {
      ...state,
      users: [...action.users]
    }
    case 'SET_CURRENT_PAGE': return {
      ...state,
      currentPage: action.page
    }
    case 'SET_TOTAL_USERS_COUNT': return {
      ...state,
      totalUsersCount: action.count
    }
    case 'TOGGLE_IS_FETCHING': return {
      ...state,
      isFetching: action.isFetching
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': return {
      ...state,
      followingInProgress: action.isFetching
        ? [...state.followingInProgress, action.userId]
        : state.followingInProgress.filter(id => id !== action.userId)
    }
    default: return state;
  }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  setFollowUnfollow: (userId:number, followedStatus:boolean) => ({ type: 'FOLLOW_UNFOLLOW', userId, followedStatus } as const),
  setUsers: (users:Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (page:number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
  setTotalUsersCount: (count:number) => ({ type: 'SET_TOTAL_USERS_COUNT', count } as const),
  toggleIsFetching: (isFetching:boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingProgress: (isFetching:boolean, userId:number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage:number, pageSize:number) => async (dispatch:DispatchType, getState:GetStateType) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(currentPage));

  let data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
  dispatch(actions.toggleIsFetching(false));
}

const _followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, followStatus:boolean) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let data = await apiMethod(userId)
  if (data.resultCode === 0) {
    dispatch(actions.setFollowUnfollow(userId, followStatus));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId:number):ThunkType => async (dispatch) => {
  _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), true)
}

export const unFollow = (userId:number):ThunkType => async (dispatch) => {
  _followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), false)
}


export default usersReducer;
