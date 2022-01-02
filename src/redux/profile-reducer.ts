import { BaseThunkType, InferActionsTypes } from './redux-store';
import { profileAPI } from '../api/profile-api';
import { PostType, ProfileType, PhotosType } from './../types/types';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ] as Array<PostType>,
    newPostText: 'it-kamasutra.com' as string,
    profile: null as ProfileType | null,
    status: '' as string,
    errors: [] as Array<string>
};

const profileReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST':
            let newPost = {
                id: 5,
                message: action.post,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SN/PROFILE/SEVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        case 'SN/PROFILE/SET_ERROR':
            return {
                ...state,
                errors: action.err
            }
        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        default:
            return state;
    }
}

export const actions = {
    addPost: (post:string) => ({ type: 'SN/PROFILE/ADD_POST', post } as const),
    setUserProfile: (profile:ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status:string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
    deletePost: (postId:number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
    savePhotoSuccess: (photos:PhotosType) => ({ type: 'SN/PROFILE/SEVE_PHOTO_SUCCESS', photos } as const),
    setError: (err:Array<string>) => ({ type: 'SN/PROFILE/SET_ERROR', err } as const)
}

export const getUserProfile = (userId:number):ThunkType=> async (dispatch) => {
    const data = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId)
    dispatch(actions.setStatus(data));
}

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}

export const savePhoto = (file:File):ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const updateProfile = (profileData: ProfileType):ThunkType => async (dispatch) => {
    const data = await profileAPI.updateProfile(profileData);
    if (data.resultCode === 0) {
        dispatch(getUserProfile(profileData.userId));
        dispatch(actions.setError([]))
    } else {
        dispatch(actions.setError(data.messages))
    }
}


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default profileReducer;