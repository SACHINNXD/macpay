// Auto redirect if already logged in
if (localStorage.getItem("loggedIn") === "true") {
  if (!location.href.includes("home.html")) {
    window.location.href = "home.html";
  }
}

// UserID preview
const useridInput = document.getElementById("userid");
if (useridInput) {
  useridInput.addEventListener("input", () => {
    document.getElementById("uidPreview").innerText = useridInput.value;
  });
}

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
    alert("Please fill all required fields");
    return;
  }

  localStorage.setItem("userData", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");
  window.location.href = "home.html";
}

function login() {
  const stored = JSON.parse(localStorage.getItem("userData"));
  if (!stored) {
    alert("No user registered");
    return;
  }

  const id = loginId.value;
  const pass = loginPassword.value;

  if ((id === stored.email || id === stored.userid) && pass === stored.password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "home.html";
  } else {
    alert("Invalid credentials");
  }
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  window.location.href = "index.html";
}

// Show user info on home
if (location.href.includes("home.html")) {
  const user = JSON.parse(localStorage.getItem("userData"));
  document.getElementById("userInfo").innerText =
    `Logged in as: ${user.userid}`;
}
