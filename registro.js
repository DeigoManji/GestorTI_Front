function togglePasswordVisibility(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
}


const registrationForm = document.getElementById("registration-form");


registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm-password").value;

    if (password !== confirm_password) {
        alert("Passwords do not match!");
        return;
    }

    if (!name || !last_name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        await registerUser({ name, email, password, last_name });

        registrationForm.reset();
        alert("Registration successful! Redirecting to login...");
        window.location.href = "index.html";

    } catch (error) {
        console.error("Error:", error);
        return;
    }
});

const registerUser = async (data) => {
    try {
        const response = await fetch("https://gestortiback.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status !== 200) {
            alert("Registration failed: ", response.statusText);
            throw new Error("Registration failed: ", response.statusText);
        }

        const result = await response.json();
        console.log("Registration successful:", result);
        return result;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
}