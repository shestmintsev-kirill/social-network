import s from './Users.module.css';
import userPhoto from '../../assets/images/avatar.png';
import { Link } from 'react-router-dom';
import { UserType } from '../../types/types';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
    user: UserType;
    followingInProgress: number[];
    unFollow: (id: number) => void;
    follow: (id: number) => void;
};

const User: React.FC<PropsType> = ({ user, followingInProgress, unFollow, follow }) => {
    const ownerId = useSelector((state: AppStateType) => state.auth.userId);

    return (
        <div>
            <div>
                <div className={s.avatarWrapper}>
                    <Link
                        to={{
                            pathname: '/profile/' + user.id
                        }}
                    >
                        <img src={user.photos.small ? user.photos.small : userPhoto} alt="user" />
                    </Link>
                </div>
                <div>
                    {user.followed ? (
                        <Button
                            disabled={followingInProgress.some((id: number) => id === user.id)}
                            onClick={() => {
                                unFollow(user.id);
                            }}
                        >
                            Unfollow
                        </Button>
                    ) : (
                        <Button
                            disabled={
                                followingInProgress.some((id: number) => id === user.id) ||
                                user.id === ownerId
                            }
                            onClick={() => {
                                follow(user.id);
                            }}
                        >
                            Follow
                        </Button>
                    )}
                </div>
            </div>
            <div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
            </div>
        </div>
    );
};

export default User;
