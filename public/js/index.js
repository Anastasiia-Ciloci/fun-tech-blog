//declaring all variables
const homeBtnEl = document.querySelector(".home");
const dashboardBtnEl = document.querySelector(".dashboard");
const loginBtnEl = document.querySelector(".login");
const logoutBtnEl = document.querySelector(".logout");
const loginBlockEl = document.querySelector(".login-block");
const signUpBlockEl = document.querySelector(".sign-up-block");

// Navigation buttons
homeBtnEl.addEventListener("click", () => console.log("homegage here"));
dashboardBtnEl.addEventListener("click", () => console.log("Dashboard here"));
loginBtnEl.addEventListener("click", () => {
  console.log("Login here");
  loginBlockEl.classList.remove("hidden");
});
signUpBtnEl.addEventListener("click", () => {
  console.log("Sign Up here");
  signUpBlockEl.classList.remove("hidden");
});
loginBlockEl.addEventListener("submit", () => console.log("Login"));
signUpBlockEl.addEventListener("submit", () => console.log("Sign Up"));
