// /auth/login.js

const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("token", "fake-jwt-token");
        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Login failed. Invalid email or password.";
        setTimeout(() => {
            window.location.href = "/login/signup.html";
        }, 1000);
    }
});
