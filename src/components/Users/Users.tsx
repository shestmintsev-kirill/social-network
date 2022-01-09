import { useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FilterType, followThunk, getUsers, unFollowThunk } from '../../redux/users-reducer';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersState
} from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import Pagination from '../common/Paginate/Pagination';
import User from './User';
import UsersSearchForm from './UsersSearchForm';
import { Row, BackTop, Skeleton } from 'antd';

type QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
    size?: string;
};

const Users: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    let filter = useSelector(getUsersFilter);
    let currentPage = useSelector(getCurrentPage);
    let pageSize = useSelector(getPageSize);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const isFetching = useSelector(getIsFetching);
    const users = useSelector(getUsersState);
    const followingInProgress = useSelector(getFollowingInProgress);

    useEffect(() => {
        const query = queryString.parse(history.location.search) as QueryParamsType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (query.page) currentPage = Number(query.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (query.size) pageSize = Number(query.size);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (query.term) filter = { ...filter, term: query.term };
        if (query.friend)
            filter = {
                ...filter,
                friend: query.friend === 'null' ? null : query.friend === 'true' ? true : false
            };

        dispatch(getUsers(currentPage, pageSize, filter));
    }, []);

    useEffect(() => {
        const queryParams: QueryParamsType = {};
        if (filter.term) queryParams.term = filter.term;
        if (filter.friend !== null) queryParams.friend = String(filter.friend);
        if (currentPage !== 1) queryParams.page = String(currentPage);
        if (pageSize !== 5) queryParams.size = String(pageSize);
        history.push({
            pathname: '/developers',
            search: queryString.stringify(queryParams)
        });
    }, [currentPage, filter.friend, filter.term, history, pageSize]);

    const onPaginationChanged = (page: number, size: number = pageSize) => {
        dispatch(getUsers(page, size, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    };

    const unFollow = (userId: number) => {
        dispatch(unFollowThunk(userId));
    };

    const follow = (userId: number) => {
        dispatch(followThunk(userId));
    };

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Pagination
                currentPage={currentPage}
                onPaginationChanged={onPaginationChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />

            {isFetching && <Skeleton active paragraph={{ rows: 10 }} />}

            {!isFetching && (
                <>
                    <Row gutter={[16, 24]}>
                        {users.map((user: UserType) => (
                            <User
                                user={user}
                                followingInProgress={followingInProgress}
                                unFollow={unFollow}
                                follow={follow}
                                key={user.id}
                            />
                        ))}
                    </Row>
                    <BackTop />
                </>
            )}
        </div>
    );
};

export default Users;
