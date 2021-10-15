import s from './MyPosts.module.css'
import Post from './Post/Post'

const MyPosts = () => {

  let posts = [
    { id: 1, message: "Hello", likesCount: 12 },
    { id: 2, message: "By!", likesCount: 15 }
  ];

  let postElements = posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <button>Add post</button>
        <button>Remove</button>
      </div>
      <div className={s.posts}>{postElements}</div>
    </div>
  );
}

export default MyPosts