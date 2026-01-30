// ---------- GLOBAL ----------
const loggedIn = localStorage.getItem("loggedIn");

// Redirect logic
if (loggedIn === "true" && !location.href.includes("home.html")) {
  location.href = "home.html";
}
if (loggedIn !== "true" && location.href.includes("home.html")) {
  location.href = "index.html";
}

// ---------- AUTH ----------
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

if (typeof showLogin === "function") showLogin();

if (document.getElementById("userid")) {
  userid.addEventListener("input", () => {
    uidPreview.innerText = userid.value;
  });
}

function register() {
  const user = {
    email: email.value,
    userid: userid.value + "@okmacpay",
    password: regPassword.value
  };

  if (!user.email || !userid.value || !user.password) {
    return alert("Fill all required fields");
  }

  localStorage.setItem("userData", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");

  // Initialize balance
  let balances = JSON.parse(localStorage.getItem("balances")) || {};
  balances[user.userid] = 2000;
  localStorage.setItem("balances", JSON.stringify(balances));

  location.href = "home.html";
}

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

function logout() {
  localStorage.setItem("loggedIn", "false");
  location.href = "index.html";
}

// ---------- HOME ----------
if (location.href.includes("home.html")) {
  const user = JSON.parse(localStorage.getItem("userData"));
  let balances = JSON.parse(localStorage.getItem("balances")) || {};

  if (balances[user.userid] === undefined) {
    balances[user.userid] = 2000; // ✅ FIX
    localStorage.setItem("balances", JSON.stringify(balances));
  }

  document.getElementById("balance").innerText =
    "₹" + balances[user.userid];
}

// ---------- PAY ----------
function openPay() {
  document.getElementById("payModal").style.display = "flex";
}

function closePay() {
  document.getElementById("payModal").style.display = "none";
}

function sendPayment() {
  const user = JSON.parse(localStorage.getItem("userData"));
  let balances = JSON.parse(localStorage.getItem("balances")) || {};

  const to = payUserId.value.trim();
  const amount = Number(payAmount.value);
  const pass = payPassword.value;

  if (!to || amount <= 0 || !pass)
    return alert("Fill all fields");

  if (pass !== user.password)
    return alert("Wrong password");

  if (balances[user.userid] < amount)
    return alert("Insufficient balance");

  if (balances[to] === undefined) balances[to] = 2000;

  balances[user.userid] -= amount;
  balances[to] += amount;

  localStorage.setItem("balances", JSON.stringify(balances));

  document.getElementById("balance").innerText =
    "₹" + balances[user.userid];

  closePay();
  alert("Payment successful");
}
