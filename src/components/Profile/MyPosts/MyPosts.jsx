import { Formik } from 'formik';
import React from 'react';
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

  return (
    <div>
      <Formik
        initialValues={{
          post: '',
        }}
        onSubmit={(values, { resetForm }) => {
          props.addNewPost(values);
          resetForm();
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, dirty }) => (
          <div>
            <div>
              <textarea
                name={'post'}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.post}
                placeholder={'Enter your post'}
              />
            </div>
            <div>
              <button
                disabled={!dirty}
                onClick={handleSubmit}
                type={'submit'}
              >
                Add post
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default MyPosts;