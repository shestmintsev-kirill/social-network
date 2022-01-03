import usersReducer, { actions, UsersInitialStateType } from './users-reducer';

let state: UsersInitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: 'Kirill',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 0',
                uniqueUrlName: null
            },
            {
                id: 1,
                name: 'Kirill',
                followed: false,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 1',
                uniqueUrlName: null
            },
            {
                id: 2,
                name: 'Kirill',
                followed: true,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 2',
                uniqueUrlName: null
            },
            {
                id: 3,
                name: 'Kirill',
                followed: true,
                photos: {
                    small: null,
                    large: null
                },
                status: 'status 3',
                uniqueUrlName: null
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };
});

test('follow success', () => {
    const newState = usersReducer(state, actions.setFollowUnfollow(1, true));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () => {
    const newState = usersReducer(state, actions.setFollowUnfollow(3, false));
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});
