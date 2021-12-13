import { profileAPI } from "../api/api";

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
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: '',
    errors: []
};

const profileReducer = (state = initialState, action) => {
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
                profile: { ...state.profile, photos: action.photos }
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


export const addPost = (post) => ({ type: ADD_POST, post })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SEVE_PHOTO_SUCCESS, photos })
export const setError = (err) => ({ type: SET_ERROR, err })

export const getUserProfile = (userId) => async (dispatch) => {
    const data = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(data));
}

export const getStatus = (userId) => async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId)
    dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const updateProfile = (profileData) => async (dispatch) => {
    const data = await profileAPI.updateProfile(profileData);
    if (data.resultCode === 0) {
        dispatch(getUserProfile(profileData.userId));
        dispatch(setError([]))
    } else {
        dispatch(setError(data.messages))
    }
}

export default profileReducer;