import s from './Pagination.module.css';

const Pagination = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map(page =>
        <span
          onClick={() => { props.onPageChanged(page) }}
          key={page}
          className={`${s.page} ${props.currentPage === page && s.activePage}`}
        >{page}
        </span>
      )}
    </div>)
}

export default Pagination