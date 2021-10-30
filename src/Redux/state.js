export let rerender = () => {
  console.log('update state');
}

let state = {
  profilePage: {
    posts: [
      { id: 1, message: "Hello", likesCount: 12 },
      { id: 2, message: "By!", likesCount: 15 },
    ]
  },
  messagesPage: {
    dialogs: [
      { id: 1, name: "Kirill" },
      { id: 2, name: "Anton" },
      { id: 3, name: "Andrew" },
      { id: 4, name: "Kirill" },
      { id: 5, name: "Nikita" },
      { id: 6, name: "Kirill" },
    ],
    messages: [
      { id: 1, message: "Hi" },
      { id: 2, message: "lorem lorem" },
      { id: 3, message: "lorem lorem lorem" },
      { id: 4, message: "lorem lorem lorem lorem" },
      { id: 5, message: "lorem lorem lorem lorem lorem" },
      { id: 6, message: "lorem lorem hi" },
    ],
  },
};

export let addPost = (post) => {
  let newPost = {
    id: 5,
    message: post,
    likesCount: 0
  };
  state.profilePage.posts.push(newPost);
  rerender(state);
}

export const subscribe = (observer) => {
  rerender = observer;
}

export default state;