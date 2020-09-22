const chat = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const socket = io();

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

  ///clear input
  e.target.elements.msg.value = "";
});

///Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = ` <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
      ${message}
    </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
