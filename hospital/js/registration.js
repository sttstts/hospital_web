function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

function handleRegistration(event) {
    event.preventDefault();

    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    var userData = {
        fullName: fullName,
        email: email,
        password: password
    };

    saveUserData(userData);

    document.getElementById("registrationForm").reset();

    window.location.href = "main.html";
}

document.getElementById("registrationForm").addEventListener("submit", handleRegistration);

function handleLogin(event) {
    event.preventDefault(); 

    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;

    var userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && loginEmail === userData.email && loginPassword === userData.password) {
        window.location.href = "main.html";
    } else {
        alert("Неверный адрес электронной почты или пароль!");
    }
}

document.getElementById("loginForm").addEventListener("submit", handleLogin);
