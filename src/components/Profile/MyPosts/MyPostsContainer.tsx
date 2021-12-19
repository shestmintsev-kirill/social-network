import { connect } from "react-redux";
import { addPost } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../types/types";
import MyPosts from './MyPosts';

type MapStatePropsType = {
  posts: Array<PostType>,
  newPostText: string
}

type MapDispatchPropsType = {
  addPost: (post:string) => void
}

let mapStateToProps = (state:AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, { addPost })(MyPosts);

export default MyPostsContainer;