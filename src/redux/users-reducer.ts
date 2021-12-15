import { UserType } from './../types/types';
import { usersAPI } from "../api/api";

const FOLLOW_UNFOLLOW = 'network/users/FOLLOW_UNFOLLOW';
const SET_USERS = 'network/users/SET_USERS';
const SET_CURRENT_PAGE = 'network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'network/users/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'network/users/TOGGLE_IS_FOLLOWING_PR'

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> //array of users ids
};
type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action:any):InitialStateType => {
  switch (action.type) {
    case FOLLOW_UNFOLLOW: return {
      ...state,
      users: state.users.map(user => {
        if (user.id === action.userId) {
          return { ...user, followed: action.followedStatus }
        }
        return user
      })
    }
    case SET_USERS: return {
      ...state,
      users: [...action.users]
    }
    case SET_CURRENT_PAGE: return {
      ...state,
      currentPage: action.page
    }
    case SET_TOTAL_USERS_COUNT: return {
      ...state,
      totalUsersCount: action.count
    }
    case TOGGLE_IS_FETCHING: return {
      ...state,
      isFetching: action.isFetching
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: return {
      ...state,
      followingInProgress: action.isFetching
        ? [...state.followingInProgress, action.userId]
        : state.followingInProgress.filter(id => id !== action.userId)
    }
    default: return state;
  }
}

type SetFollowUnfollowActionCreatorType = {
  type: typeof FOLLOW_UNFOLLOW,
  userId: number,
  followedStatus: boolean
}
export const setFollowUnfollow = (userId:number, followedStatus:boolean):SetFollowUnfollowActionCreatorType => ({ type: FOLLOW_UNFOLLOW, userId, followedStatus })

type SetUsersActionCreatorType = {
  type: typeof SET_USERS,
  users: Array<UserType>
}
export const setUsers = (users:Array<UserType>):SetUsersActionCreatorType => ({ type: SET_USERS, users })

type SetCurrentPageActionCreatorType = {
  type: typeof SET_CURRENT_PAGE,
  page: number
}
export const setCurrentPage = (page:number):SetCurrentPageActionCreatorType => ({ type: SET_CURRENT_PAGE, page })

type SetTotalUsersCountActionCreatorType = {
  type: typeof SET_TOTAL_USERS_COUNT,
  count: number
}
export const setTotalUsersCount = (count:number):SetTotalUsersCountActionCreatorType => ({ type: SET_TOTAL_USERS_COUNT, count })

type ToggleIsFetchingActionCreatorType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionCreatorType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleFollowingProgressActionCreatorType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching: boolean,
  userId: number
}
export const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressActionCreatorType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsers = (currentPage:number, pageSize:number) => async (dispatch:any) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));

  let data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
  dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch:any, userId:number, apiMethod:any, followStatus:boolean) => {
  dispatch(toggleFollowingProgress(true, userId));
  let data = await apiMethod(userId)
  if (data.resultCode === 0) {
    dispatch(setFollowUnfollow(userId, followStatus));
  }
  dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId:number) => async (dispatch:any) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), true)
}

export const unFollow = (userId:number) => async (dispatch:any) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), false)
}


export default usersReducer;
