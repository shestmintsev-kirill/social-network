import { useState } from 'react';
import s from './Pagination.module.css';
import { Button } from 'antd';

type PropsType = {
    portionSize?: number;
    currentPage?: number;
    pageSize: number;
    totalUsersCount: number;
    onPaginationChanged?: (page: number, size?: number) => void;
};

const PaginationBase: React.FC<PropsType> = ({
    portionSize = 10,
    currentPage = 1,
    onPaginationChanged = (x) => x,
    pageSize,
    totalUsersCount
}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const portionCount = Math.ceil(pagesCount / portionSize);
    const [potrionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (potrionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = potrionNumber * portionSize;

    const pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const prevPage = () => {
        if (currentPage - 1 < leftPortionPageNumber) {
            setPortionNumber(potrionNumber - 1);
        }
        onPaginationChanged(currentPage - 1);
    };
    const prevPortion = () => {
        onPaginationChanged(leftPortionPageNumber - 1);
        setPortionNumber(potrionNumber - 1);
    };
    const prevLastPage = () => {
        setPortionNumber(1);
        onPaginationChanged(1);
    };
    const nextPage = () => {
        if (currentPage + 1 > rightPortionPageNumber) {
            setPortionNumber(potrionNumber + 1);
        }
        onPaginationChanged(currentPage + 1);
    };
    const nextPortion = () => {
        onPaginationChanged(rightPortionPageNumber + 1);
        setPortionNumber(potrionNumber + 1);
    };
    const nextLastPage = () => {
        setPortionNumber(portionCount);
        onPaginationChanged(pagesCount);
    };

    return (
        <div>
            {potrionNumber > 1 && <Button onClick={prevLastPage}>{'<<'}</Button>}
            {potrionNumber > 1 && <Button onClick={prevPortion}>{'<'}</Button>}
            {currentPage > 1 && <Button onClick={prevPage}>Prev</Button>}
            {pages
                .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((page) => (
                    <span
                        onClick={() => {
                            onPaginationChanged(page);
                        }}
                        key={page}
                        className={`${s.page} ${currentPage === page && s.activePage}`}
                    >
                        {page}
                    </span>
                ))}
            {pagesCount !== currentPage && <Button onClick={nextPage}>Next</Button>}
            {portionCount > potrionNumber && <Button onClick={nextPortion}>{'>'}</Button>}
            {portionCount > potrionNumber && <Button onClick={nextLastPage}>{'>>'}</Button>}
        </div>
    );
};

export default PaginationBase;
