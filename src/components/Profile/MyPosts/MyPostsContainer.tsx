import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import { PostType } from '../../../types/types';
import MyPosts from './MyPosts';

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    };
};

type MapStatePropsType = {
    posts: Array<PostType>;
    newPostText: string;
};

type MapDispatchPropsType = {
    addPost: (post: string) => void;
};

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {
    addPost: actions.addPost,
})(MyPosts);
