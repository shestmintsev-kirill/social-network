import { connect } from 'react-redux';
import { follow, unFollow, getUsers, FilterType } from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import { compose } from 'redux';
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
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number;
    pageSize: number;
    isFetching: boolean;
    totalUsersCount: number;
    users: Array<UserType>;
    followingInProgress: Array<number>;
    filter: FilterType;
};

type MapDispatchPropsType = {
    getUsers: (page: number, pageSize: number, filter: FilterType) => void;
    unFollow: (userId: number) => void;
    follow: (userId: number) => void;
};

type OwnPropsType = {}; //standart props

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
    }

    onPageChanged = (page: number) => {
        this.props.getUsers(page, this.props.pageSize, this.props.filter);
    };

    onFilterChanged = (filter: FilterType) => {
        this.props.getUsers(1, this.props.pageSize, filter);
    };

    render() {
        return (
            <div>
                <Users
                    isFetching={this.props.isFetching}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unFollow={this.props.unFollow}
                    onFilterChanged={this.onFilterChanged}
                    onPageChanged={this.onPageChanged}
                    followingInProgress={this.props.followingInProgress}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersState(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unFollow,
        getUsers
    })
)(UsersContainer);
