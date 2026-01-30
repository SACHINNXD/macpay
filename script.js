// AUTO REDIRECT
if (localStorage.getItem("loggedIn") === "true") {
  if (!location.href.includes("home.html")) {
    location.href = "home.html";
  }
}

// TOGGLE
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

showLogin();

// USERID PREVIEW
if (document.getElementById("userid")) {
  userid.addEventListener("input", () => {
    uidPreview.innerText = userid.value;
  });
}

// REGISTER
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
  location.href = "home.html";
}

// LOGIN
function login() {
  const stored = JSON.parse(localStorage.getItem("userData"));
  if (!stored) return alert("No account found");

  if (
    (loginId.value === stored.email ||
     loginId.value === stored.userid) &&
    loginPassword.value === stored.password
  ) {
    localStorage.setItem("loggedIn", "true");
    location.href = "home.html";
  } else {
    alert("Invalid credentials");
  }
}

// LOGOUT
function logout() {
  localStorage.setItem("loggedIn", "false");
  location.href = "index.html";
}

// -------- HOME LOGIC --------
if (location.href.includes("home.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    location.href = "index.html";
  }

  const user = JSON.parse(localStorage.getItem("userData"));
  let balances = JSON.parse(localStorage.getItem("balances")) || {};

  if (!balances[user.userid]) {
    balances[user.userid] = 2000;
    localStorage.setItem("balances", JSON.stringify(balances));
  }

  balance.innerText = "₹" + balances[user.userid];
}

// MODAL
function openPay() {
  payModal.style.display = "flex";
}

function closePay() {
  payModal.style.display = "none";
}

// PAY
function sendPayment() {
  const user = JSON.parse(localStorage.getItem("userData"));
  let balances = JSON.parse(localStorage.getItem("balances"));

  const to = payUserId.value.trim();
  const amt = Number(payAmount.value);
  const pass = payPassword.value;

  if (!to || !amt || !pass) return alert("Fill all fields");
  if (pass !== user.password) return alert("Wrong password");
  if (balances[user.userid] < amt) return alert("Insufficient balance");

  if (!balances[to]) balances[to] = 0;

  balances[user.userid] -= amt;
  balances[to] += amt;

  localStorage.setItem("balances", JSON.stringify(balances));
  balance.innerText = "₹" + balances[user.userid];

  closePay();
  alert("Payment successful");
}
