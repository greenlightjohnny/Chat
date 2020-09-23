const users = [];

// Join user and chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

//// Current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

////Someone leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

///// Room users current
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  getCurrentUser,
  userJoin,
  userLeave,
  getRoomUsers,
};
