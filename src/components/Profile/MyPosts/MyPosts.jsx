// import s from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = () => {
  return (
    <div>
      My Posts
      <div>
        <textarea></textarea>
        <button>Add post</button>
        <button>Remove</button>
      </div>
      <Post message="Hello" likesCount="0"/>
      <Post message="By!" likesCount="15"/>
    </div>
  );
}

export default MyPosts