
document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // ELEMENTS
  // =========================================

  const form = document.getElementById("signupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("signupEmail");
  const passwordInput = document.getElementById("signupPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );

  if (
    !form ||
    !nameInput ||
    !emailInput ||
    !passwordInput ||
    !confirmPasswordInput
  ) {
    console.error("Signup form or required inputs were not found.");
    return;
  }

  // =========================================
  // PASSWORD SHOW / HIDE
  // =========================================

  function togglePasswordVisibility(input, button) {
    if (!input || !button) return;

    const icon = button.querySelector("i");
    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";

    if (icon) {
      icon.classList.toggle("fa-eye", !isPassword);
      icon.classList.toggle("fa-eye-slash", isPassword);
      icon.classList.toggle("fa-regular", !isPassword);
      icon.classList.toggle("fa-solid", isPassword);
    }

    button.setAttribute(
      "aria-label",
      isPassword ? "Hide password" : "Show password"
    );
  }

  togglePassword?.addEventListener("click", () => {
    togglePasswordVisibility(passwordInput, togglePassword);
  });

  toggleConfirmPassword?.addEventListener("click", () => {
    togglePasswordVisibility(
      confirmPasswordInput,
      toggleConfirmPassword
    );
  });

  // =========================================
  // VALIDATION REGEX
  // =========================================

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;

  // =========================================
  // SHOW MESSAGE
  // =========================================

  function showMessage(message, success = false) {
    let box = document.getElementById("signupMessage");

    if (!box) {
      box = document.createElement("p");
      box.id = "signupMessage";
      box.className = "ev-message";
      box.setAttribute("role", "status");
      box.setAttribute("aria-live", "polite");

      const submitButton = form.querySelector(".ev-submit");

      if (submitButton) {
        form.insertBefore(box, submitButton);
      } else {
        form.appendChild(box);
      }
    }

    box.textContent = message;
    box.classList.add("show");
    box.classList.toggle("success", success);
    box.classList.toggle("error", !success);
  }

  function clearMessage() {
    const box = document.getElementById("signupMessage");

    if (box) {
      box.textContent = "";
      box.classList.remove("show", "success", "error");
    }
  }

  // =========================================
  // CLEAR ERRORS WHILE TYPING
  // =========================================

  [
    nameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput
  ].forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "";
      clearMessage();
    });
  });

  // =========================================
  // SIGNUP SUBMIT
  // =========================================

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage();

    const terms = form.querySelector('input[name="terms"]');

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim().toLowerCase();
    const passwordValue = passwordInput.value;
    const confirmPasswordValue = confirmPasswordInput.value;

    // FULL NAME
    if (nameValue.length < 3) {
      showMessage("Please enter your full name.");
      nameInput.focus();
      return;
    }

    // EMAIL
    if (!emailRegex.test(emailValue)) {
      showMessage("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    // PASSWORD
    if (!passwordRegex.test(passwordValue)) {
      showMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
      passwordInput.focus();
      return;
    }

    // CONFIRM PASSWORD
    if (passwordValue !== confirmPasswordValue) {
      showMessage("Passwords do not match.");
      confirmPasswordInput.focus();
      return;
    }

    // TERMS AND PRIVACY
    if (!terms || !terms.checked) {
      showMessage("Please accept the Terms and Privacy Policy.");
      terms?.focus();
      return;
    }

    // BUTTON LOADING
    const submitButton = form.querySelector('button[type="submit"]');

    if (!submitButton) return;

    const originalHTML = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.classList.add("loading");

    submitButton.innerHTML = `
      <span>Creating Account...</span>
      <span class="ev-submit-arrow">
        <i class="fa-solid fa-arrow-right"></i>
      </span>
    `;

    // DEMO SIGNUP PROCESS
    // Connect a backend to create real accounts.

    window.setTimeout(() => {
      submitButton.disabled = false;
      submitButton.classList.remove("loading");
      submitButton.innerHTML = originalHTML;

      showMessage(
        "Your details are valid! Connect your backend to complete registration.",
        true
      );
    }, 1000);
  });
});
