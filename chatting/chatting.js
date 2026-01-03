// ...existing code...
const prompt = document.querySelector("#prompt")
const chatContainer = document.querySelector(".chat-container")
const imagebtn = document.querySelector("#image")
const imageinput = document.querySelector("#image input")

const Api_Url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAdnrQa20Fk5ag10WWH3esScfdTOGqveT8"

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null
  }
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function createChatBox(html = "", classes = "") {
  const div = document.createElement("div")
  if (classes) div.className = classes
  div.innerHTML = html
  return div
}

async function generateResponse(aiChatBox) {
  const textEl = aiChatBox.querySelector(".ai-chat-area")
  const body = {
    contents: [
      {
        parts: [
          { text: user.message || "" },
          ...(user.file.data
            ? [{ inline_data: { mime_type: user.file.mime_type, data: user.file.data } }]
            : [])
        ]
      }
    ]
  }

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(Api_Url, requestOptions)
    if (!response.ok) throw new Error(`API error: ${response.status}`)
    const data = await response.json()
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        .trim() ?? ""
    // Use textContent to avoid injecting HTML
    textEl.textContent = text
  } catch (error) {
    console.error(error)
    textEl.textContent = "Error getting response."
  } finally {
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" })
  }
}

function handleChatResponse(message) {
  user.message = message
  const userHtml = `<img src="user.png" alt="" class="userImage" width="50">
    <div class="user-chat-area">${escapeHtml(message)}</div>`
  const userBox = createChatBox(userHtml, "chat-row user")
  chatContainer.appendChild(userBox)

  const aiHtml = `<img src="ai.png" alt="" class="aiImage" width="50">
    <div class="ai-chat-area">Thinking...</div>`
  const aiBox = createChatBox(aiHtml, "chat-row ai")
  chatContainer.appendChild(aiBox)

  generateResponse(aiBox)
}

/* Basic event handlers */
if (prompt) {
  prompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = (e.target.value || "").trim()
      if (!val) return
      handleChatResponse(val)
      e.target.value = ""
    }
  })
}

if (imagebtn && imageinput) {
  imagebtn.addEventListener("click", () => imageinput.click())
  imageinput.addEventListener("change", (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(",")[1] // data:image/...;base64,...
      user.file.mime_type = file.type
      user.file.data = base64
    }
    reader.readAsDataURL(file)
  })
}
// ...existing code...