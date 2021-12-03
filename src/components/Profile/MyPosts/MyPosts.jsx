import { useFormik } from 'formik';
import React from 'react';
import { Textarea } from '../../common/FormsControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {
  let postsElements =
    props.posts.map((p, i) => <Post message={p.message} likesCount={p.likesCount} key={i} />);

  let addNewPost = (values) => {
    props.addPost(values.post);
  }
  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <PostForm addNewPost={addNewPost} />
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
}

const PostForm = (props) => {

  const formik = useFormik({
    initialValues: {
      post: ''
    },
    onSubmit: (values, { resetForm }) => {
      props.addNewPost(values);
      resetForm();
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Textarea
        name={'post'}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.post}
        placeholder={'Enter your post'} />
      <div>
        <button
          disabled={!formik.dirty}
          type={'submit'}
        >
          Add post
        </button>
      </div>
    </form>
  )
}

export default MyPosts;