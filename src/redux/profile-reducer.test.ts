import profileReducer, { actions } from "./profile-reducer";
import store from "./redux-store";

let state = store.getState().profilePage

test('length of posts should be incremented', () => {
    let action = actions.addPost('tested')

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length + 1);
});

test('message of new post should be correct', () => {
    let action = actions.addPost('tested')

    let newState = profileReducer(state, action);

    expect(newState.posts[newState.posts.length - 1].message).toBe('tested');
});

test('after deleting length of messages should be decrement', () => {
    let action = actions.deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length - 1);
});

test('after deleting length shouldn`t be decrement if id is incorrect', () => {
    let action = actions.deletePost(1000);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length);
});

