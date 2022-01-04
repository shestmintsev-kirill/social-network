import { useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FilterType, getUsers } from '../../redux/users-reducer';
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
import Preloader from '../common/Preloader/Preloader';
import User from './User';
import UsersSearchForm from './UsersSearchForm';

type QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
};

const Users: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const totalUsersCount = useSelector(getTotalUsersCount);
    let currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    // const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching);
    const isFetching = useSelector(getIsFetching);
    let filter = useSelector(getUsersFilter);
    const users = useSelector(getUsersState);
    const followingInProgress = useSelector(getFollowingInProgress);

    useEffect(() => {
        const query = queryString.parse(history.location.search) as QueryParamsType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (!!query.page) currentPage = Number(query.page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (!!query.term) filter = { ...filter, term: query.term };
        if (query.friend)
            filter = {
                ...filter,
                friend: query.friend === 'null' ? null : query.friend === 'true' ? true : false
            };

        dispatch(getUsers(currentPage, pageSize, filter));
    }, []);

    useEffect(() => {
        const queryParams: QueryParamsType = {};
        if (!!filter.term) queryParams.term = filter.term;
        if (!!filter.friend !== null) queryParams.friend = String(filter.friend);
        if (currentPage !== 1) queryParams.page = String(currentPage);

        history.push({
            pathname: '/developers',
            search: queryString.stringify(queryParams)
        });
    }, [currentPage, filter, history]);

    const onPageChanged = (page: number) => {
        dispatch(getUsers(page, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    };

    const unFollow = (userId: number) => {
        dispatch(unFollow(userId));
    };
    const follow = (userId: number) => {
        dispatch(follow(userId));
    };

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Pagination
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />

            {isFetching && <Preloader />}

            {!isFetching &&
                users.map((user: UserType) => (
                    <User
                        user={user}
                        followingInProgress={followingInProgress}
                        unFollow={unFollow}
                        follow={follow}
                        key={user.id}
                    />
                ))}
        </div>
    );
};

export default Users;
