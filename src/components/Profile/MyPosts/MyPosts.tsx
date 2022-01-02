import { useFormik } from 'formik';
import { PostType } from '../../../types/types';
import { Textarea } from '../../common/FormsControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';

type MyPostsPropsType = {
    posts: Array<PostType>;
    newPostText: string;
    addPost: (post: string) => void;
};
const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    const postsElements = props.posts.map((p: PostType, i: number) => (
        <Post message={p.message} likesCount={p.likesCount} key={i} />
    ));

    const addNewPost = (values: PostFormValues) => {
        props.addPost(values.post);
    };
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostForm addNewPost={addNewPost} />
            </div>
            <div className={s.posts}>{postsElements}</div>
        </div>
    );
};

type PostFormValues = {
    post: string;
};

type PostFormPropsType = {
    addNewPost: (values: PostFormValues) => void;
};

const PostForm: React.FC<PostFormPropsType> = (props) => {
    const formik = useFormik({
        initialValues: {
            post: '',
        },
        onSubmit: (values: PostFormValues, { resetForm }) => {
            props.addNewPost(values);
            resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Textarea
                name={'post'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.post}
                placeholder={'Enter your post'}
            />
            <div>
                <button disabled={!formik.dirty} type={'submit'}>
                    Add post
                </button>
            </div>
        </form>
    );
};

export default MyPosts;
