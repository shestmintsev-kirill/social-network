import s from './Preloader.module.css'
import preloader from '../../../assets/images/preloader.svg'

const Preloader = (props) => {
  return (
    <div className={s.preloader}>
      <img src={preloader} alt="preloader" />
    </div>
  )
}

export default Preloader