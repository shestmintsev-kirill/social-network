import { FilterType } from '../../redux/users-reducer';
import { UserType } from '../../types/types';
import Pagination from '../common/Paginate/Pagination';
import Preloader from '../common/Preloader/Preloader';
import User from './User';
import UsersSearchForm from './UsersSearchForm';

type PropsType = {
    currentPage: number;
    pageSize: number;
    totalUsersCount: number;
    isFetching: boolean;
    users: Array<UserType>;
    followingInProgress: Array<number>;
    onPageChanged: (page: number) => void;
    onFilterChanged: (filter: FilterType) => void;
    unFollow: (userId: number) => void;
    follow: (userId: number) => void;
};
const Users: React.FC<PropsType> = ({
    currentPage,
    users,
    totalUsersCount,
    pageSize,
    isFetching,
    followingInProgress,
    onPageChanged,
    onFilterChanged,
    unFollow,
    follow
}) => {
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
