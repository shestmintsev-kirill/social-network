import React, { useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';
import mockPhoto from '../../../../assets/images/avatar.png';

type PropsType = {
    message: string;
    likesCount: number;
};

const Post: React.FC<PropsType> = (props) => {
    const [likes, setLikes] = useState(props.likesCount);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState('');
    const userPhoto = useSelector((state: AppStateType) => state.profilePage.profile?.photos?.large);
    const userName = useSelector((state: AppStateType) => state.profilePage.profile?.fullName);

    const like = () => {
        setLikes((prev) => prev + 1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(props.likesCount);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>
    ];

    return (
        <Comment
            actions={actions}
            author={userName}
            avatar={<Avatar src={userPhoto || mockPhoto} alt="photo" />}
            content={<p>{props.message}</p>}
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    );
};

export default Post;
