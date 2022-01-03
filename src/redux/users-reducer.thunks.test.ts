import { actions, follow, unFollow } from './users-reducer';
import { usersAPI } from '../api/users-api';
import { APIResponseType, ResultCodeEnum } from '../api/api';

jest.mock('../api/users-api');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    fieldsErrors: [],
    messages: [],
    data: {}
};

test('follow thunk success', async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setFollowUnfollow(1, true));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test('unfollow thunk success', async () => {
    usersAPIMock.unFollow.mockReturnValue(Promise.resolve(result));
    const thunk = unFollow(1);

    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setFollowUnfollow(1, false));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});
