document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const radioInputs = document.querySelectorAll("input[name='queryType']");
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");

  const firstNameError = firstName.nextElementSibling;
  const lastNameError = lastName.nextElementSibling;
  const emailError = email.nextElementSibling;
  const queryError = document.getElementById("query-error");
  const messageError = message.nextElementSibling;
  const consentError = document.getElementById("consent-error");

  const successSection = document.querySelector(".success");

  // Real-time input error removal
  [firstName, lastName, email, message].forEach((input) => {
    input.addEventListener("input", () => {
      if (input === email) {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (emailPattern.test(email.value.trim())) {
          email.classList.remove("error");
          emailError.classList.add("hide");
        }
      } else if (input.value.trim() !== "") {
        input.classList.remove("error");
        input.nextElementSibling.classList.add("hide");
      }
    });
  });

  // Real-time radio validation
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", () => {
      document
        .querySelectorAll(".radio")
        .forEach((r) => r.classList.remove("active"));
      radio.closest(".radio").classList.add("active");
      queryError.classList.add("hide");
    });
  });

  // Real-time checkbox validation
  consent.addEventListener("change", () => {
    if (consent.checked) {
      consentError.classList.add("hide");
    }
  });

  // show success
  function showSuccessMessage() {
    successSection.classList.add("show");
    setTimeout(() => {
      successSection.classList.remove("show");
    }, 3000);
  }

  const API_BASE_URL = "https://contact-form-828g.onrender.com";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    // First Name
    if (firstName.value.trim() === "") {
      firstName.classList.add("error");
      firstNameError.classList.remove("hide");
      isValid = false;
    }

    // Last Name
    if (lastName.value.trim() === "") {
      lastName.classList.add("error");
      lastNameError.classList.remove("hide");
      isValid = false;
    }

    // Email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add("error");
      emailError.classList.remove("hide");
      isValid = false;
    }

    // Query Type
    const isRadioChecked = Array.from(radioInputs).some(
      (radio) => radio.checked
    );
    if (!isRadioChecked) {
      queryError.classList.remove("hide");
      isValid = false;
    }

    // Message
    if (message.value.trim() === "") {
      message.classList.add("error");
      messageError.classList.remove("hide");
      isValid = false;
    }

    // Consent
    if (!consent.checked) {
      consentError.classList.remove("hide");
      isValid = false;
    }

    // Success
    if (isValid) {
      try {
        const response = await fetch(`${API_BASE_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            queryType: document.querySelector("input[name='queryType']:checked")
              .value,
            message: message.value.trim(),
            consent: consent.checked,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          showSuccessMessage();
          form.reset();
          document
            .querySelectorAll(".radio")
            .forEach((r) => r.classList.remove("active"));
        } else {
          alert("Error submitting form");
        }
      } catch (error) {
        alert("Server error");
      }
    }
  });
});
