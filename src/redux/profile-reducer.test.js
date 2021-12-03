import profileReducer, { addPost, deletePost } from "./profile-reducer";
import store from "./redux-store";

let state = store.getState().profilePage

// let state = {
//     posts: [
//         { id: 1, message: 'Hi, how are you?', likesCount: 12 },
//         { id: 2, message: 'It\'s my first post', likesCount: 11 },
//         { id: 3, message: 'Blabla', likesCount: 11 },
//         { id: 4, message: 'Dada', likesCount: 11 }
//     ]
// }

test('length of posts should be incremented', () => {
    let action = addPost('tested')

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length + 1);
});

test('message of new post should be correct', () => {
    let action = addPost('tested')

    let newState = profileReducer(state, action);

    expect(newState.posts[newState.posts.length - 1].message).toBe('tested');
});

test('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length - 1);
});

test('after deleting length shouldn`t be decrement if id is incorrect', () => {
    let action = deletePost(1000);

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(state.posts.length);
});

