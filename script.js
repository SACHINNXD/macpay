// Auto redirect if already logged in
if (localStorage.getItem("loggedIn") === "true") {
  if (!location.href.includes("home.html")) {
    window.location.href = "home.html";
  }
}

// Toggle login / register
function showLogin() {
  loginBox.style.display = "block";
  registerBox.style.display = "none";
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
}

function showRegister() {
  registerBox.style.display = "block";
  loginBox.style.display = "none";
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
}

// Default
showLogin();

// UserID preview
if (document.getElementById("userid")) {
  userid.addEventListener("input", () => {
    uidPreview.innerText = userid.value;
  });
}

// Register
function register() {
  const user = {
    fname: fname.value,
    lname: lname.value,
    number: number.value,
    email: email.value,
    age: age.value,
    userid: userid.value + "@okmacpay",
    password: regPassword.value
  };

  if (!user.email || !user.password || !userid.value) {
    alert("Fill all required fields");
    return;
  }

  localStorage.setItem("userData", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");
  window.location.href = "home.html";
}

// Login
function login() {
  const stored = JSON.parse(localStorage.getItem("userData"));
  if (!stored) {
    alert("No account found");
    return;
  }

  if (
    (loginId.value === stored.email ||
     loginId.value === stored.userid) &&
    loginPassword.value === stored.password
  ) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html";
  } else {
    alert("Invalid login details");
  }
}

// Logout
function logout() {
  localStorage.setItem("loggedIn", "false");
  window.location.href = "index.html";
}
