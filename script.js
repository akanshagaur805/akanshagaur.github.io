// Section switching
function showSection(id) {
  document.querySelectorAll("section").forEach((sec) => sec.classList.remove("active"));
  const section = document.getElementById(id);
  section.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Typing effect
const text = "Hi, I'm Akansha Gaur 👋";
let i = 0;
function typeEffect() {
  if (i < text.length) {
    document.getElementById("typing-text").textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  }
}
window.onload = typeEffect;

// Theme toggle
const toggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim() || "Portfolio Contact";
  const message = document.getElementById("message").value.trim();
  const msgBox = document.getElementById("responseMessage");

  if (!name || !email || !message) {
    msgBox.textContent = "❌ Please fill all required fields!";
    msgBox.style.color = "red";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    const data = await res.json();

    if (data.success) {
      msgBox.textContent = "✅ Message sent successfully!";
      msgBox.style.color = "green";
      document.getElementById("contactForm").reset();
    } else {
      msgBox.textContent = "❌ Error sending message!";
      msgBox.style.color = "red";
    }
  } catch (err) {
    console.error("❌ Request failed:", err);
    msgBox.textContent = "Server error. Please try again later.";
    msgBox.style.color = "red";
  }
});

// Load blog posts
async function loadBlogs() {
  try {
    const res = await fetch("http://localhost:5000/blogs");
    const blogs = await res.json();
    const container = document.getElementById("blogContainer");
    container.innerHTML = "";

    if (!blogs.length) {
      container.innerHTML = "<p>No blog posts yet!</p>";
      return;
    }

    blogs.forEach((b) => {
      const div = document.createElement("div");
      div.className = "blog-card";
      div.innerHTML = `
        <h3>${b.title}</h3>
        <p>${b.content.substring(0, 200)}...</p>
        <small>🕒 ${new Date(b.created_at).toLocaleString()}</small>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading blogs:", err);
    document.getElementById("blogContainer").innerHTML = "⚠️ Error loading blogs.";
  }
}
loadBlogs();
