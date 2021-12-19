// import s from './Profile.module.css';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  authorizedUserId: number
  errors: Array<string>
  isOwner: boolean
  profile: ProfileType
  status: string
  updateStatus: (status:string) => void
  savePhoto: (file:any) => void
  updateProfile: (payload: ProfileType) => void
}

const Profile:React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        updateProfile={props.updateProfile}
        authorizedUserId={props.authorizedUserId}
        errors={props.errors}
      />
      <MyPostsContainer />
    </div>
  );
}

export default Profile;