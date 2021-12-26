import { profileAPI } from '../api/profile-api';
import { PostType, ProfileType, PhotosType } from './../types/types';

const ADD_POST = 'network/profile/ADD_POST';
const SET_USER_PROFILE = 'network/profile/SET_USER_PROFILE';
const SET_STATUS = 'network/profile/SET_STATUS';
const DELETE_POST = 'network/profile/DELETE_POST';
const SEVE_PHOTO_SUCCESS = 'network/profile/SEVE_PHOTO_SUCCESS';
const SET_ERROR = 'network/profile/SET_ERROR';

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
    errors: []
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case ADD_POST:
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
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SEVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }
        case SET_ERROR:
            return {
                ...state,
                errors: action.err
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        default:
            return state;
    }
}

type AddPostActionType = {
    type: typeof ADD_POST,
    post: string
}
export const addPost = (post:string):AddPostActionType => ({ type: ADD_POST, post })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status:string):SetStatusActionType => ({ type: SET_STATUS, status })

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId:number):DeletePostActionType => ({ type: DELETE_POST, postId })

type SavePhotoSuccessActionType = {
    type: typeof SEVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos:PhotosType):SavePhotoSuccessActionType => ({ type: SEVE_PHOTO_SUCCESS, photos })

type SetErroActionType = {
    type: typeof SET_ERROR,
    err: Array<string>
}
export const setError = (err:Array<string>):SetErroActionType => ({ type: SET_ERROR, err })

export const getUserProfile = (userId:number) => async (dispatch:any) => {
    const data = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(data));
}

export const getStatus = (userId:number) => async (dispatch:any) => {
    const data = await profileAPI.getUserStatus(userId)
    dispatch(setStatus(data));
}

export const updateStatus = (status:string) => async (dispatch:any) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file:any) => async (dispatch:any) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const updateProfile = (profileData: ProfileType) => async (dispatch:any) => {
    const data = await profileAPI.updateProfile(profileData);
    if (data.resultCode === 0) {
        dispatch(getUserProfile(profileData.userId));
        dispatch(setError([]))
    } else {
        dispatch(setError(data.messages))
    }
}

export default profileReducer;