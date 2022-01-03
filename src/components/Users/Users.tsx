import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const Users: React.FC = () => {
    const dispatch = useDispatch();

    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    // const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching);
    const isFetching = useSelector(getIsFetching);
    const filter = useSelector(getUsersFilter);
    const users = useSelector(getUsersState);
    const followingInProgress = useSelector(getFollowingInProgress);

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter));
    }, [currentPage, dispatch, filter, pageSize]);

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
