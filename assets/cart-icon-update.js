function waitForElem(waitFor, callback, minElements = 1, isVariable = false, timer = 10000, frequency = 25) {
  let elements = isVariable ? window[waitFor] : document.querySelectorAll(waitFor);
  if (timer <= 0) return;
  (!isVariable && elements.length >= minElements) || (isVariable && typeof window[waitFor] !== "undefined") ? callback(elements) : setTimeout(() => waitForElem(waitFor, callback, minElements, isVariable, timer - frequency), frequency);
}

waitForElem(".cart__item", (element) => {
  if (element) {
    

    let itemCountFunction = {
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
        
        const itemCount =()=>{
          jQuery.getJSON('/cart.js', function(cart) {
           document.querySelectorAll(".site-nav .cart-item-count.cart-link__bubble").forEach(e=>{
             e.innerText= cart.item_count;
             if(e.innerText.length > 1){
               e.style.right="19%";
             }
           });
          } );
        }


        itemCount();
        
        let target = document.querySelector(".cart-items-wrapper-np");
            let observer = new MutationObserver(function() {
              console.log("From ZiLLur Mutation")
                itemCount();
            });
            observer.observe(target, {
                 childList: true,
              
            });
        
       
        if (location.href.indexOf("cart") > -1) {
            let target = document.querySelector(".cart__page-col");
            let observer = new MutationObserver(function() {
                itemCount();
            });
            observer.observe(target, {
                 childList: true,
                
            });
          }
      },
    };

    itemCountFunction.init();
  }
});