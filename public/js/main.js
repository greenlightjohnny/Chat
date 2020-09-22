const chat = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

///// get username and room from web URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
const socket = io();

///Join chatroom
socket.emit("joinRoom", { username, room });
//// Get message from server

socket.on("message", (message) => {
  outputMessage(message);

  ///scroll down when message is received
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

///Listen for submit

chat.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  ////

  ////Sends back to server
  socket.emit("chatMessage", msg);

  ///clear input, but keeps focuseds
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

///Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = ` <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
