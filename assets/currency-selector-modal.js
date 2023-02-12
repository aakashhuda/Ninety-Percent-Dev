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
    if ((!variable && thisElem.length >= minElements) || (variable && typeof thisElem !== "undefined")) {
      return callback(thisElem);
    } else {
      var interval = setInterval(function() {
        thisElem = checkElements();
        if ((!variable && thisElem.length >= minElements) || (variable && typeof thisElem !== "undefined")) {
          clearInterval(interval);
          clearTimeout(timeOut);
          return callback(thisElem);
        }
      }, 200);
      timeOut = setTimeout(function() {
        // Fallback
        clearInterval(interval);
        return callback(false);
      }, 500000);
    }
  });



waitForElem(".currency-selector-toggler", (body) => {
  if (body) {
    let echoVariation = {
      init: function() {
        this.mainCss();
        this.mainJs();
      },
      mainCss: function() {
        var styles = document.createElement("style");
        styles.setAttribute("type", "text/css");
        document.head.appendChild(styles).textContent =
          "" +
          /* CSS will be imported here */
          "";
      },
      mainJs: function() {
let currencySelectorToggler = document.querySelectorAll(".currency-selector-toggler")
currencySelectorToggler.forEach((e)=>{
  e.addEventListener("click", function(){
           // document.querySelector(".faux-select.disclosure__toggle").click();
           document.querySelector(".np-currency-selector").style.display = "block"
           document.querySelector("#CurrencyList-footer").style.display = "block"
           // document.querySelector(".faux-select.disclosure__toggle").ariaExpanded = "true";
           // document.querySelector("#CurrencyList-footer").classList.add("disclosure-list--visible");
            document.querySelector("body").classList.add("overflow--none");
})
})
           

document.querySelector(".close-currency-selector").addEventListener("click", function(){
           // document.querySelector(".faux-select.disclosure__toggle").click();
           document.querySelector(".np-currency-selector").style.display = "none"
           document.querySelector("#CurrencyList-footer").style.display = "none"
document.querySelector("body").classList.remove("overflow--none");
           // document.querySelector(".faux-select.disclosure__toggle").ariaExpanded = "true";
           // document.querySelector("#CurrencyList-footer").classList.add("disclosure-list--visible");

})



        
      },
    };

    echoVariation.init();
  }
});



  


