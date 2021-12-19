import s from './Post.module.css';

type PropsType = {
  message: string,
  likesCount: number
}

const Post:React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' alt='user'/>
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;