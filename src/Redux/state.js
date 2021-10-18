let state = {
  profilePage: {
    posts: [
      { id: 1, message: "Hello", likesCount: 12 },
      { id: 2, message: "By!", likesCount: 15 },
    ],
    dialogs: [
      { id: 1, name: "Kirill" },
      { id: 2, name: "Anton" },
      { id: 3, name: "Andrew" },
      { id: 4, name: "Kirill" },
      { id: 5, name: "Nikita" },
      { id: 6, name: "Kirill" },
    ],
  },
  messagesPage: {
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

export default state;