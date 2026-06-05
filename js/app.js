let messages = [];
let memory = {};

/* ===== DOM ===== */
const msgBox = document.getElementById("messages");
const input = document.getElementById("input");

/* ===== RENDER ===== */
function render() {
  msgBox.innerHTML = "";
  messages.forEach(m => {
    const div = document.createElement("div");
    div.className = "msg " + m.role;
    div.textContent = (m.role === "user" ? "You: " : "AI: ") + m.content;
    msgBox.appendChild(div);
  });
}

/* ===== UTIL ===== */
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ===== SMART AI ===== */
function getAIResponse(text) {
  const msg = text.toLowerCase();

  // Memory (basic learning)
  memory.lastUser = text;

  /* ===== GREETING ===== */
  if (msg.match(/\b(hi|hello|hey)\b/)) {
    return random([
      "Hey ? tell me wtf you need bitch",
      "Hello? Ask nigga what you want",
      "why the hell you are still alive"
    ]);
  }

  /* ===== NAME ===== */
  if (msg.includes("your name")) {
    return "I’m your moms bestie, created by God Divyansh.";
  }

  /* ===== CREATOR ===== */
  if (msg.includes("who made you")) {
    return "I was built by God Divyansh 🚀";
  }

  /* ===== TIME / DATE ===== */
  if (msg.includes("time")) {
    return "I'm not your fucking watch⏰ " + new Date().toLocaleTimeString();
  }

  if (msg.includes("date") || msg.includes("day")) {
    return "Are you crazy , I'm not a calender nigga📅 " + new Date().toDateString();
  }

  /* ===== SIMPLE MATH ===== */
  try {
    if (msg.match(/^[0-9+\-*/(). ]+$/)) {
      let result = eval(msg);
      return "Don't you know the spelling of a calculator 🧮 Answer: " + result;
    }
  } catch {}

  /* ===== CODING HELP ===== */
  if (msg.includes("html")) {
    return "<h1>Hello World</h1>";
  }

  if (msg.includes("css")) {
    return "body { background: black; color: white; }";
  }

  if (msg.includes("javascript") || msg.includes("js")) {
    return "console.log('Hello World');";
  }

  /* ===== MEMORY RESPONSE ===== */
  if (msg.includes("what did i say")) {
    return "You said: " + (memory.lastUser || "nothing yet 😅");
  }

  /* ===== JOKES ===== */
  if (msg.includes("joke")) {
    return random([
      "Why do programmers hate bugs? Because they debug them 😆",
      "I told my code a joke… it didn’t compile 😂",
      "Why JavaScript is single? Because it doesn’t 'null' relationships 😎"
    ]);
  }

  /* ===== MOTIVATION ===== */
  if (msg.includes("motivate") || msg.includes("sad")) {
    return "Pull your ass up Nigga or someone else will smash your girl !!";
  }

  /* ===== FALLBACK (SMART RANDOM) ===== */
  return random([
    "Hmm 🤔 that's interesting... btw how's your mom!",
    "I don't know what shit you want go ask CHATGPT?",
    "Can you explain wtf you want poor kid?",
    "That’s a cool thought , Dumb😄",
    "Let’s break her ass together."
  ]);
}

/* ===== SEND ===== */
function send() {
  const text = input.value.trim();
  if (!text) return;

  messages.push({ role: "user", content: text });
  input.value = "";
  render();

  // typing delay
  setTimeout(() => {
    const reply = getAIResponse(text);
    messages.push({ role: "assistant", content: reply });
    render();
  }, 500);
}

/* ===== CLEAR ===== */
function clearChat() {
  messages = [];
  render();
}

/* ===== NEW CHAT ===== */
function newChat() {
  clearChat();
}