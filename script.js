// Dummy users stored in localStorage (Run once to initialize)
const users = [
    { username: "consultant", password: "1234", role: "consultant" },
    { username: "manager", password: "admin", role: "manager" }
]

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Function to handle authentication
function authenticateUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        
        // Redirect based on role
        if (user.role === "consultant") {
            window.location.href = "consultant_dashboard.html";
        } else {
            window.location.href = "manager_dashboard.html";
        }
        
        return false;
    } else {
        document.getElementById("error-message").innerText = "Invalid username or password.";
        return false;
    }
}

// Check if user is logged in and has the correct role
function checkAuth(role) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== role) {
        alert("Unauthorized! Redirecting to login...");
        window.location.href = "login.html";
    }
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
