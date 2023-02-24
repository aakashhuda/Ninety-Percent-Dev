function waitForElem(
  waitFor,
  callback,
  minElements = 1,
  isVariable = false,
  timer = 10000,
  frequency = 25
) {
  let elements = isVariable
    ? window[waitFor]
    : document.querySelectorAll(waitFor);
  if (timer <= 0) return;
  (!isVariable && elements.length >= minElements) ||
  (isVariable && typeof window[waitFor] !== "undefined")
    ? callback(elements)
    : setTimeout(
        () =>
          waitForElem(
            waitFor,
            callback,
            minElements,
            isVariable,
            timer - frequency
          ),
        frequency
      );
}

waitForElem(".logIn-button", (element) => {
  if (element) {
    let loginFunc = {
      init: function () {
        this.mainCss();
        this.mainJs();
      },
      mainCss: function () {
        var styles = document.createElement("style");
        styles.setAttribute("type", "text/css");
        document.head.appendChild(styles).textContent = `
            `;
      },
      mainJs: function () {
        document.querySelectorAll(".logIn-button").forEach((item) => {
          item.addEventListener("click", (e) => {
            e.preventDefault();
            document
              .querySelector(".login-section")
              .classList.add("drawer--is-open");
            document
              .querySelector(".login-overlay")
              .classList.add("login-overlay-appeared");
            document.body.classList.add("overflow--none");
            if (document.querySelector(".mobile-menu-close-button")) {
              document
                .querySelector(".menu-drawer__close-button.js-drawer-close")
                .click();
            }
            if (
              document.querySelector(".login-overlay.login-overlay-appeared")
            ) {
              document
                .querySelector(".login-overlay.login-overlay-appeared")
                .addEventListener("click", () => {
                  document.querySelector(".login-section-close").click();
                });
            }
          });
        });

        if (document.querySelector("#RecoverPassword")) {
          document
            .querySelector("#RecoverPassword")
            .addEventListener("click", () => {
              document
                .querySelector("#RecoverPasswordForm")
                .classList.remove("hide");
            });
        }
        if (document.querySelector("#HideRecoverPasswordLink")) {
          document
            .querySelector("#HideRecoverPasswordLink")
            .addEventListener("click", () => {
              document
                .querySelector("#RecoverPasswordForm")
                .classList.add("hide");
            });
        }

        if (document.querySelector(".login-section-close")) {
          document
            .querySelector(".login-section-close")
            .addEventListener("click", () => {
              document
                .querySelector(".login-section")
                .classList.remove("is-transitioning" , "drawer--is-open");
              document
                .querySelector(".login-overlay")
                .classList.remove("login-overlay-appeared");
              document.body.classList.remove("overflow--none");
            });
        }

        if (document.querySelector(".new-register-button")) {
          document
            .querySelector(".new-register-button")
            .addEventListener("click", () => {
              document
                .querySelector(".register-section")
                .classList.add("is-transitioning" , "drawer--is-open");
              document
                .querySelector(".register-overlay")
                .classList.add("register-overlay-appeared");
              document.body.classList.add("overflow--none");
              document
                .querySelector(".login-section")
                .classList.remove("is-transitioning" , "drawer--is-open");
              document
                .querySelector(".login-overlay")
                .classList.remove("login-overlay-appeared");
              if (
                document.querySelector(
                  ".register-overlay.register-overlay-appeared"
                )
              ) {
                document
                  .querySelector(".register-overlay.register-overlay-appeared")
                  .addEventListener("click", () => {
                    document.querySelector(".register-section-close").click();
                  });
              }
            });
        }

        if (document.querySelector(".register-section-close")) {
          document
            .querySelector(".register-section-close")
            .addEventListener("click", () => {
              document
                .querySelector(".register-section")
                .classList.remove("is-transitioning" , "drawer--is-open");
              document
                .querySelector(".register-overlay")
                .classList.remove("register-overlay-appeared");
              document.body.classList.remove("overflow--none");
            });
        }

        //        if(document.querySelector("#CustomerRegisterForm .errors") ){
        //          document.querySelector(".login-section").classList.remove("login-section-appeared");
        //          document.querySelector(".login-overlay").classList.remove("login-overlay-appeared");
        // document.querySelector(".register-section").classList.add("register-section-appeared");
        //          document.querySelector(".register-overlay").classList.add("register-overlay-appeared");
        //          document.body.classList.add("overflow--none");

        //        }

        if (document.querySelector("#CustomerLoginForm .errors")) {
          document.querySelectorAll(".logIn-button").forEach((item) => {
            item.click();
          });
        }
      },
    };

    loginFunc.init();
  }
});
