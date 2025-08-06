// /auth/signup.js

const form = document.getElementById("signupForm");
const message = document.getElementById("signupMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value.trim(),
        address: form.address.value.trim(),
    };

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    message.style.color = "green";
    message.textContent = "Account created successfully! Redirecting to login...";

    setTimeout(() => {
        window.location.href = "/login/login.html";
    }, 1500);
});
