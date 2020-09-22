const users = [];

// Join user and chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  user.push(user);

  return user;
}

//// Current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  getCurrentUser,
  userJoin,
};
