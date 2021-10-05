import s from './Post.module.css'

const Post = (props) => {
  return (
    <div className={s.item}>
      <img src="http://ok-radio.ru/wp-content/uploads/2016/03/image-3.jpg" alt="post" />
      { props.message }
      <div>
        <span>like { props.likesCount }</span>
      </div>
    </div>
  );
}

export default Post