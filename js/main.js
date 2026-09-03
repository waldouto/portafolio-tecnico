import {
  initFilters
} from "./filters.js";


import {
  initNavigation
} from "./navigation.js";


const initProjectCards = () => {

  const cards =
    document.querySelectorAll(
      ".project-card"
    );


  if (!cards.length) {
    return;
  }


  const toggleCard = (card) => {

    cards.forEach((item) => {

      if (item !== card) {
        item.classList.remove(
          "is-active"
        );
      }

    });


    card.classList.toggle(
      "is-active"
    );

  };


  cards.forEach((card) => {

    card.setAttribute(
      "tabindex",
      "0"
    );


    card.addEventListener(
      "click",
      (event) => {

        if (
          event.target.closest(
            "a"
          )
        ) {
          return;
        }


        toggleCard(card);

      }
    );


    card.addEventListener(
      "keydown",
      (event) => {

        const validKey =
          event.key === "Enter" ||
          event.key === " ";


        if (!validKey) {
          return;
        }


        event.preventDefault();

        toggleCard(card);

      }
    );

  });

};


const initContactForm = () => {

  const form =
    document.getElementById(
      "contactForm"
    );


  if (!form) {
    return;
  }


  const status =
    document.getElementById(
      "formStatus"
    );


  const rules = {

    name: {
      validate: (value) =>
        value.trim().length >= 2,

      message:
        "Ingresa al menos dos caracteres."
    },

    email: {
      validate: (value) => {

        const pattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        return pattern.test(
          value.trim()
        );

      },

      message:
        "Ingresa un correo electrónico válido."
    },

    message: {
      validate: (value) =>
        value.trim().length >= 10,

      message:
        "El mensaje debe tener al menos 10 caracteres."
    }

  };


  const setError = (
    fieldName,
    message
  ) => {

    const errorElement =
      form.querySelector(
        `[data-error="${fieldName}"]`
      );


    if (errorElement) {
      errorElement.textContent =
        message;
    }

  };


  const validateField = (
    fieldName
  ) => {

    const field =
      form.elements[fieldName];

    const rule =
      rules[fieldName];


    if (!field || !rule) {
      return true;
    }


    const isValid =
      rule.validate(
        field.value
      );


    field.setAttribute(
      "aria-invalid",
      String(!isValid)
    );


    setError(
      fieldName,
      isValid
        ? ""
        : rule.message
    );


    return isValid;

  };


  Object.keys(rules)
    .forEach((fieldName) => {

      const field =
        form.elements[fieldName];


      if (!field) {
        return;
      }


      field.addEventListener(
        "blur",
        () => {
          validateField(
            fieldName
          );
        }
      );


      field.addEventListener(
        "input",
        () => {

          if (
            field.getAttribute(
              "aria-invalid"
            ) === "true"
          ) {

            validateField(
              fieldName
            );

          }

        }
      );

    });


  form.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const results =
        Object.keys(rules)
          .map(
            validateField
          );


      const valid =
        results.every(
          Boolean
        );


      if (!valid) {

        if (status) {
          status.textContent =
            "Revisa los campos marcados.";
        }


        const firstInvalid =
          form.querySelector(
            '[aria-invalid="true"]'
          );


        firstInvalid?.focus();

        return;
      }


      if (status) {

        status.textContent =
          "Formulario validado correctamente. La integración de envío se agregará después.";

      }


      form.reset();


      Object.keys(rules)
        .forEach((fieldName) => {

          const field =
            form.elements[fieldName];


          field?.removeAttribute(
            "aria-invalid"
          );


          setError(
            fieldName,
            ""
          );

        });

    }
  );

};


const initApp = () => {

  initNavigation();

  initFilters();

  initProjectCards();

  initContactForm();

};


initApp();
