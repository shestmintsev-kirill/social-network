export type PostType = {
    id: number;
    message: string;
    likesCount: number;
};
export type ContactsType = {
    github: string | null;
    vk: string | null;
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    website: string | null;
    youtube: string | null;
    mainLink: string | null;
};
export type PhotosType = {
    small: string | null;
    large: string | null;
};
export type ProfileType = {
    userId: number;
    aboutMe: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: ContactsType;
    photos?: PhotosType;
};

export type UserType = {
    followed: boolean;
    id: number;
    name: string;
    photos: PhotosType;
    status: string;
    uniqueUrlName: string | null;
};
