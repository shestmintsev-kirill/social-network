import MyPosts from '../components/Profile/MyPosts/MyPosts';
import ProfileInfo from '../components/Profile/ProfileInfo/ProfileInfo';

const Profile: React.FC = () => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts />
        </div>
    );
};

export default Profile;
