import { usersAPI } from "../api/api";

const FOLLOW_UNFOLLOW = 'FOLLOW_UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PR'

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
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


export const setFollowUnfollow = (userId, followedStatus) => ({ type: FOLLOW_UNFOLLOW, userId, followedStatus })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page })
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(currentPage));

  let data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
  dispatch(toggleIsFetching(false));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, followStatus) => {
  dispatch(toggleFollowingProgress(true, userId));
  let data = await apiMethod(userId)
  if (data.resultCode === 0) {
    dispatch(setFollowUnfollow(userId, followStatus));
  }
  dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), true)
}

export const unFollow = (userId) => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), false)
}


export default usersReducer;
