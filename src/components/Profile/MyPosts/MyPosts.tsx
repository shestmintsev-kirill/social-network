import { useFormik } from 'formik';
import { PostType } from '../../../types/types';
import { Textarea } from '../../common/FormsControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Button, Skeleton } from 'antd';
import { AppStateType } from '../../../redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';

const MyPosts: React.FC = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: AppStateType) => state.profilePage.profile);
    const posts = useSelector((state: AppStateType) => state.profilePage.posts);

    const postsElements = posts.map((p: PostType, i: number) => (
        <Post message={p.message} likesCount={p.likesCount} key={i} />
    ));

    const addNewPost = (values: PostFormValues) => {
        dispatch(actions.addPost(values.post));
    };

    if (!profile) {
        return <Skeleton avatar active style={{ position: 'absolute', bottom: 100 }} />;
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
            post: ''
        },
        onSubmit: (values: PostFormValues, { resetForm }) => {
            props.addNewPost(values);
            resetForm();
        }
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
                <Button disabled={!formik.dirty} htmlType="submit">
                    Add post
                </Button>
            </div>
        </form>
    );
};

export default MyPosts;
