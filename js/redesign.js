
(() => {

    "use strict";


    /* =====================================================
       MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuToggle");

    const navigation =
        document.getElementById("mainNav");


    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            () => {

                const open =
                    navigation.classList.toggle(
                        "is-open"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(open)
                );

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navigation.classList.remove(
                            "is-open"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const form =
        document.getElementById(
            "contactForm"
        );

    const status =
        document.getElementById(
            "formStatus"
        );


    if (!form) {
        return;
    }


    const fields = {

        name: {
            check: (value) =>
                value.trim().length >= 2,

            message:
                "Escribe tu nombre."
        },

        email: {
            check: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(value.trim()),

            message:
                "Escribe un correo válido."
        },

        message: {
            check: (value) =>
                value.trim().length >= 10,

            message:
                "Escribe al menos 10 caracteres."
        }

    };


    const validate = (name) => {

        const input =
            form.elements[name];

        const rule =
            fields[name];

        const error =
            form.querySelector(
                `[data-error="${name}"]`
            );

        if (!input || !rule) {
            return true;
        }

        const valid =
            rule.check(input.value);

        input.setAttribute(
            "aria-invalid",
            String(!valid)
        );

        if (error) {
            error.textContent =
                valid
                    ? ""
                    : rule.message;
        }

        return valid;

    };


    Object
        .keys(fields)
        .forEach((name) => {

            const input =
                form.elements[name];

            input?.addEventListener(
                "blur",
                () => validate(name)
            );

        });


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const valid =
                Object
                    .keys(fields)
                    .map(validate)
                    .every(Boolean);

            if (!valid) {

                if (status) {
                    status.textContent =
                        "Revisa los campos indicados.";
                }

                return;
            }


            const submitButton =
                form.querySelector(
                    '[type="submit"]'
                );

            const originalText =
                submitButton.innerHTML;


            try {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Enviando...";

                if (status) {
                    status.textContent =
                        "Enviando mensaje...";
                }


                const data =
                    Object.fromEntries(
                        new FormData(form)
                            .entries()
                    );


                data._subject =
                    `Portafolio - ${data.project_type || "Nuevo proyecto"}`;

                data._template =
                    "table";


                const response =
                    await fetch(
                        "https://formsubmit.co/ajax/wandojimenez@gmail.com",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)
                        }
                    );


                const result =
                    await response.json();


                if (
                    !response.ok ||
                    result.success === "false" ||
                    result.success === false
                ) {

                    throw new Error(
                        result.message ||
                        "No fue posible enviar."
                    );

                }


                form.reset();

                if (status) {
                    status.textContent =
                        "Mensaje enviado correctamente. Gracias.";
                }


                Object
                    .keys(fields)
                    .forEach((name) => {

                        form.elements[name]
                            ?.removeAttribute(
                                "aria-invalid"
                            );

                    });

            }
            catch (error) {

                console.error(error);

                if (status) {
                    status.textContent =
                        "No se pudo enviar el mensaje. Intenta nuevamente.";
                }

            }
            finally {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalText;

            }

        }
    );

})();

