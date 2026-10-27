
document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // ELEMENTS
  // ========================================
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const passwordToggle = document.getElementById("pwdToggle");
  const loginError = document.getElementById("loginError");
  const btnText = document.getElementById("btnText");
  const rememberCheckbox = document.getElementById("remember");
  const emailLabel = document.getElementById("emailLabel");
  const roleCards = document.querySelectorAll("#lm .role-card");

  if (!loginForm || !emailInput || !passwordInput) {
    console.error("Login form or required inputs were not found.");
    return;
  }

  const submitButton = loginForm.querySelector(
    'button[type="submit"], input[type="submit"]'
  );

  let selectedRole = "client";

  // ========================================
  // DASHBOARD ROUTES
  // These files must exist at these paths.
  // ========================================
  const dashboardRoutes = {
    client: "./client-dashboard.html",
    attorney: "./attorney-dashboard.html"
  };

  // ========================================
  // VALIDATION
  // ========================================
  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function showError(message) {
    if (loginError) {
      loginError.textContent = message;
      loginError.style.display = "block";
    } else {
      alert(message);
    }
  }

  function clearError() {
    if (loginError) {
      loginError.textContent = "";
      loginError.style.display = "none";
    }
  }

  // ========================================
  // ROLE SELECTION
  // ========================================
  function selectRole(role) {
    if (!dashboardRoutes[role]) return;

    selectedRole = role;

    roleCards.forEach((card) => {
      const isSelected = card.dataset.role === role;

      card.classList.toggle("active", isSelected);
      card.classList.toggle("on", isSelected);
      card.setAttribute("aria-pressed", String(isSelected));
    });

    if (btnText) {
      btnText.textContent =
        role === "attorney" ? "Attorney Login" : "Client Login";
    }

    if (emailLabel) {
      emailLabel.textContent =
        role === "attorney" ? "Attorney Email" : "Client Email";
    }

    emailInput.placeholder =
      role === "attorney"
        ? "Enter your attorney email"
        : "Enter your client email";

    clearError();
  }

  roleCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectRole(card.dataset.role);
    });
  });

  // ========================================
  // SHOW / HIDE PASSWORD
  // ========================================
  if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
      const showPassword = passwordInput.type === "password";

      passwordInput.type = showPassword ? "text" : "password";

      const icon = passwordToggle.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-eye", !showPassword);
        icon.classList.toggle("fa-eye-slash", showPassword);
        icon.classList.toggle("fa-regular", !showPassword);
        icon.classList.toggle("fa-solid", showPassword);
      }

      passwordToggle.setAttribute(
        "aria-label",
        showPassword ? "Hide password" : "Show password"
      );
    });
  }

  // ========================================
  // CLEAR ERRORS WHILE TYPING
  // ========================================
  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", clearError);
  });

  // ========================================
  // LOGIN FORM
  // ========================================
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError();

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;

    if (!emailValue) {
      showError("Please enter your email address.");
      emailInput.focus();
      return;
    }

    if (!validateEmail(emailValue)) {
      showError("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    if (!passwordValue.trim()) {
      showError("Please enter your password.");
      passwordInput.focus();
      return;
    }

    const dashboard = dashboardRoutes[selectedRole];

    if (!dashboard) {
      showError("Please select Client or Attorney.");
      return;
    }

    // Demo session only — this does not authenticate credentials.
    const currentUser = {
      name: emailValue.split("@")[0],
      email: emailValue,
      role: selectedRole
    };

    try {
      localStorage.removeItem("stacklyCurrentUser");
      sessionStorage.removeItem("stacklyCurrentUser");

      if (rememberCheckbox?.checked) {
        localStorage.setItem(
          "stacklyCurrentUser",
          JSON.stringify(currentUser)
        );
      } else {
        sessionStorage.setItem(
          "stacklyCurrentUser",
          JSON.stringify(currentUser)
        );
      }
    } catch (error) {
      console.error("Unable to save login session:", error);
      showError(
        "Unable to save your session. Please check your browser storage."
      );
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add("loading");
    }

    if (btnText) {
      btnText.textContent = "Signing in...";
    }

    // Redirect to the selected dashboard.
    window.location.href = dashboard;
  });

  // ========================================
  // COPYRIGHT YEAR
  // ========================================
  const loginYear = document.getElementById("loginYear");

  if (loginYear) {
    loginYear.textContent = new Date().getFullYear();
  }

  // ========================================
  // INITIALIZE
  // ========================================
  selectRole("client");
});
