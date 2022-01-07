import { Pagination } from 'antd';

type PropsType = {
    portionSize?: number;
    currentPage?: number;
    pageSize: number;
    totalUsersCount: number;
    onPaginationChanged?: (page: number, size?: number) => void;
};

const PaginationBase: React.FC<PropsType> = ({
    currentPage = 1,
    onPaginationChanged = (x) => x,
    pageSize,
    totalUsersCount
}) => {
    return (
        <div>
            <Pagination
                style={{ marginBottom: 10 }}
                pageSize={pageSize}
                total={totalUsersCount}
                current={currentPage}
                onChange={(page, pageSize) => {
                    onPaginationChanged(page, pageSize);
                }}
                pageSizeOptions={[5, 10, 50, 100]}
            />
        </div>
    );
};

export default PaginationBase;
