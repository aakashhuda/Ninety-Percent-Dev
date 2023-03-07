window.waitForElem =
  window.waitForElem ||
  ((waitFor, callback, minElements = 1, variable = false) => {
    function checkElements() {
      if (variable) {
        return waitFor;
      } else {
        return window.document.querySelectorAll(waitFor);
      }
    }

    var thisElem = checkElements(),
      timeOut;
    if (
      (!variable && thisElem.length >= minElements) ||
      (variable && typeof thisElem !== "undefined")
    ) {
      return callback(thisElem);
    } else {
      var interval = setInterval(function () {
        thisElem = checkElements();
        if (
          (!variable && thisElem.length >= minElements) ||
          (variable && typeof thisElem !== "undefined")
        ) {
          clearInterval(interval);
          clearTimeout(timeOut);
          return callback(thisElem);
        }
      }, 20);
      timeOut = setTimeout(function () {
        
        clearInterval(interval);
        return callback(false);
      }, 10000);
    }
  });

waitForElem(".swym-button-bar", (mainContent) => {
  if (mainContent) {
    let echoVariation = {
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
        
        let soldOutBtn = document.querySelector(".swym-button-bar");
        if (soldOutBtn) {
          document.querySelector(".add-to-cart").style.display = "none"
        }
        
              

        
      },
    };

    echoVariation.init();
  }
});
