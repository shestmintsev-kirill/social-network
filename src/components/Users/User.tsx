import userPhoto from '../../assets/images/avatar.png';
import { useHistory } from 'react-router-dom';
import { UserType } from '../../types/types';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { Card, Col, Tooltip, message, Button } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

type PropsType = {
    user: UserType;
    followingInProgress: number[];
    unFollow: (id: number) => void;
    follow: (id: number) => void;
};

const User: React.FC<PropsType> = ({ user, followingInProgress, unFollow, follow }) => {
    const ownerId = useSelector((state: AppStateType) => state.auth.userId);
    const history = useHistory();

    return (
        <Col className="gutter-row" xl={{ span: 6 }}>
            <Card
                hoverable
                style={{ minWidth: 180, maxWidth: 250 }}
                cover={
                    <img
                        src={user.photos.small ? user.photos.small : userPhoto}
                        style={{ maxWidth: 250 }}
                        alt="user"
                    />
                }
                onClick={() => {
                    history.push('/profile/' + user.id);
                }}
                actions={[
                    user.followed ? (
                        <Tooltip placement="right" title={`Unfollow ${user.name}`}>
                            <Button
                                style={{ border: 0, width: '100%' }}
                                loading={followingInProgress.some((id: number) => id === user.id)}
                                key="unfollow"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    message.info(`You unfollow from ${user.name}`);
                                    unFollow(user.id);
                                }}
                            >
                                <UserDeleteOutlined style={{ color: '#ff7070', fontSize: 24 }} />
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip placement="right" title={`Follow ${user.name}`}>
                            <Button
                                style={{ border: 0, width: '100%' }}
                                loading={
                                    followingInProgress.some((id: number) => id === user.id) ||
                                    user.id === ownerId
                                }
                                key="follow"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    message.success(`You follow from ${user.name}`);
                                    follow(user.id);
                                }}
                            >
                                <UserAddOutlined style={{ color: '#00810d', fontSize: 24 }} />
                            </Button>
                        </Tooltip>
                    )
                ]}
            >
                <Meta title={user.name} description={user.status} />
            </Card>
        </Col>
    );
};

export default User;
