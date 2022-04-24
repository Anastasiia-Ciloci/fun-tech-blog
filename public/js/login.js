const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("Submitted!");
  // Grab values from form input
  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  // Makes Post request for validation
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/homepage");
    } else {
      alert("Failed to log in.");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
