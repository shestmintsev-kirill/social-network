import profileReducer, { actions } from './profile-reducer';
import store from './redux-store';

const state = store.getState().profilePage;

test('length of posts should be incremented', () => {
    const action = actions.addPost('tested');

    const newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length + 1);
});

test('message of new post should be correct', () => {
    const action = actions.addPost('tested');

    const newState = profileReducer(state, action);

    expect(newState.posts[newState.posts.length - 1].message).toBe('tested');
});

test('after deleting length of messages should be decrement', () => {
    const action = actions.deletePost(1);

    const newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length - 1);
});

test('after deleting length shouldn`t be decrement if id is incorrect', () => {
    const action = actions.deletePost(1000);

    const newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length);
});
