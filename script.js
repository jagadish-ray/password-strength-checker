function togglePassword() {
  const pwd = document.getElementById("password");
  const icon = document.getElementById("toggle");

  if (pwd.type === "password") {
    pwd.type = "text";
    icon.textContent = "🙈"; // Show monkey when password is visible
  } else {
    pwd.type = "password";
    icon.textContent = "👁️"; // Show eye when password is hidden
  }
}

function estimateCrackTime(length, strength) {
  const guesses = Math.pow(10, length * (strength / 2));
  const guessesPerSecond = 1e6; // 1 million guesses/second
  const seconds = guesses / guessesPerSecond;

  if (seconds < 60) return `${seconds.toFixed(2)} seconds`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(2)} minutes`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(2)} hours`;
  if (seconds < 2592000) return `${(seconds / 86400).toFixed(2)} days`;
  if (seconds < 31536000) return `${(seconds / 2592000).toFixed(2)} months`;
  return `${(seconds / 31536000).toFixed(2)} years`;
}

function checkPassword() {
  const pwd = document.getElementById("password").value;
  const strengthBar = document.getElementById("strengthBar");
  const barContainer = document.querySelector(".bar-container");
  const lengthText = document.getElementById("length");
  const timeText = document.getElementById("timeToCrack");

  const lowerCase = document.getElementById("lower");
  const upperCase = document.getElementById("upper");
  const number = document.getElementById("number");
  const symbol = document.getElementById("symbol");

  const lower = /[a-z]/.test(pwd);
  const upper = /[A-Z]/.test(pwd);
  const num = /[0-9]/.test(pwd);
  const sym = /[^A-Za-z0-9]/.test(pwd);
  const length = pwd.length;

  // ✅ Update character criteria with ❌ or ✅ and color
  lowerCase.textContent = lower ? "✅ Lower Case" : "❌ Lower Case";
  lowerCase.style.color = lower ? "green" : "gray";

  upperCase.textContent = upper ? "✅ Upper Case" : "❌ Upper Case";
  upperCase.style.color = upper ? "green" : "gray";

  number.textContent = num ? "✅ Number" : "❌ Number";
  number.style.color = num ? "green" : "gray";

  symbol.textContent = sym ? "✅ Symbols" : "❌ Symbols";
  symbol.style.color = sym ? "green" : "gray";

  // ✅ Update length display
  lengthText.textContent = length;

  // ✅ If empty, reset everything
  if (pwd === "") {
    strengthBar.style.width = "0%";
    strengthBar.style.backgroundColor = "transparent";
    barContainer.style.display = "none";
    timeText.textContent = "0 seconds";
    return;
  }

  // ✅ Show bar
  barContainer.style.display = "block";

  // ✅ Calculate strength
  let strength = 0;
  if (lower) strength++;
  if (upper) strength++;
  if (num) strength++;
  if (sym) strength++;

  let width = "20%";
  let color = "#B00020"; // Very Weak

  if (length < 6) {
    width = "20%";
    color = "#e60000"; // Deep red
  } else if (strength <= 2) {
    width = "40%";
    color = "#ff4d4d"; // Soft red
  } else if (strength === 3) {
    width = "60%";
    color = "#FFA500"; // Orange
  } else if (strength === 4 && length >= 8) {
    width = "80%";
    color = "#80cc00"; // Lime green
  }
  if (strength === 4 && length >= 14) {
    width = "100%";
    color = "green"; // Very Strong
  }

  // ✅ Apply strength bar styles
  strengthBar.style.width = width;
  strengthBar.style.backgroundColor = color;

  // ✅ Estimate crack time
  timeText.textContent = estimateCrackTime(length, strength);
}
