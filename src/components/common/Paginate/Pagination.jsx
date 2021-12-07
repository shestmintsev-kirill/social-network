import { useState } from 'react';
import s from './Pagination.module.css';

const Pagination = ({ portionSize = 10, ...props }) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let portionCount = Math.ceil(pagesCount / portionSize)
  let [potrionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (potrionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = potrionNumber * portionSize

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const prevPage = () => {
    if (props.currentPage - 1 < leftPortionPageNumber) {
      setPortionNumber(potrionNumber - 1)
    }
    props.onPageChanged(props.currentPage - 1)
  }
  const prevPortion = () => {
    props.onPageChanged(leftPortionPageNumber - 1)
    setPortionNumber(potrionNumber - 1)
  }
  const prevLastPage = () => {
    setPortionNumber(1)
    props.onPageChanged(1)
  }
  const nextPage = () => {
    if (props.currentPage + 1 > rightPortionPageNumber) {
      setPortionNumber(potrionNumber + 1)
    }
    props.onPageChanged(props.currentPage + 1)
  }
  const nextPortion = () => {
    props.onPageChanged(rightPortionPageNumber + 1)
    setPortionNumber(potrionNumber + 1)
  }
  const nextLastPage = () => {
    setPortionNumber(portionCount)
    props.onPageChanged(pagesCount)
  }

  return (
    <div>
      {potrionNumber > 1 && <button onClick={prevLastPage}>{'<<'}</button>}
      {potrionNumber > 1 && <button onClick={prevPortion}>{'<'}</button>}
      {props.currentPage > 1 && <button onClick={prevPage}>Prev</button>}
      {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map(page =>
        <span
          onClick={() => { props.onPageChanged(page) }}
          key={page}
          className={`${s.page} ${props.currentPage === page && s.activePage}`}
        >{page}
        </span>
      )}
      {pagesCount !== props.currentPage && <button onClick={nextPage}>Next</button>}
      {portionCount > potrionNumber && <button onClick={nextPortion}>{'>'}</button>}
      {portionCount > potrionNumber && <button onClick={nextLastPage}>{'>>'}</button>}
    </div>
  )
}

export default Pagination