import { BaseThunkType, InferActionsTypes } from './redux-store';
import { UserType } from './../types/types';
import { Dispatch } from 'redux';
import { usersAPI } from '../api/users-api';
import { APIResponseType } from '../api/api';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users ids,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

const usersReducer = (state = initialState, action: ActionsTypes): UsersInitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW_UNFOLLOW':
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: action.followedStatus };
                    }
                    return user;
                })
            };
        case 'SN/USERS/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            };
        case 'SN/USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page
            };
        case 'SN/USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count
            };
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'SN/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter((id) => id !== action.userId)
            };
        default:
            return state;
    }
};

export const actions = {
    setFollowUnfollow: (userId: number, followedStatus: boolean) =>
        ({ type: 'SN/USERS/FOLLOW_UNFOLLOW', userId, followedStatus } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SN/USERS/SET_USERS', users } as const),
    setFilter: (filter: FilterType) => ({ type: 'SN/USERS/SET_FILTER', payload: filter } as const),
    setCurrentPage: (page: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', page } as const),
    setTotalUsersCount: (count: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({ type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
};

export const getUsers =
    (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter));

        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleIsFetching(false));
    };

export const followThunk =
    (userId: number): ThunkType =>
    async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), true);
    };

export const unFollowThunk =
    (userId: number): ThunkType =>
    async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI), false);
    };

const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsTypes>,
    userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    followStatus: boolean
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actions.setFollowUnfollow(userId, followStatus));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export type UsersInitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>;
// type GetStateType = () => AppStateType;
type ThunkType = BaseThunkType<ActionsTypes>;

export default usersReducer;
