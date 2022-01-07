import MyPostsContainer from '../components/Profile/MyPosts/MyPostsContainer';
import ProfileInfo from '../components/Profile/ProfileInfo/ProfileInfo';

const Profile: React.FC = () => {
    return (
        <div>
            <ProfileInfo />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
