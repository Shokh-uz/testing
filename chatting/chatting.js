const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = text;
  chatMessages.appendChild(userMsg);

  input.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // fake AI reply
  setTimeout(() => {
    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai";
    aiMsg.textContent = "Tushundim 👍";
    chatMessages.appendChild(aiMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 700);
}
