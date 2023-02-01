const WaitForElement = (
    waitFor,
    callback,
    minElements = 1,
    variable = false
) => {
    const checkElements = () => {
        if (variable) {
            return waitFor;
        } else {
            return window.document.querySelectorAll(waitFor);
        }
    };
    let thisElem = checkElements(),
        timeOut;
    if (
        (!variable && thisElem.length >= minElements) ||
        (variable && typeof thisElem !== "undefined")
    ) {
        return callback(thisElem);
    } else {
        let interval = setInterval(() => {
            thisElem = checkElements();
            if (
                (!variable && thisElem.length >= minElements) ||
                (variable && typeof thisElem !== "undefined")
            ) {
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
};

const mainFunc = {
    init: function() {
        this.mainCss();
        this.mainJS();
    },
    mainCss: function() {
        let style = document.createElement("style");
        style.setAttribute("type", "text/css");
        document.head.appendChild(style).textContent = `
      `;
    },
    mainJS: function() {
        cartSizeDropdown();
       
            let target = document.querySelector(".cart-items-wrapper-np");
            let observer = new MutationObserver(function() {
                cartSizeDropdown();
            });
            observer.observe(target, {
                 childList: true,
              
            });
        
       
        if (location.href.indexOf("cart") > -1) {
            let target = document.querySelector(".cart__page-col");
            let observer = new MutationObserver(function() {
                cartSizeDropdown();
            });
            observer.observe(target, {
                 childList: true,
                
            });
          }

        function cartSizeDropdown() {
            let dropDownBtn = Array.from(document.querySelectorAll(".dropbtn"));

            dropDownBtn.forEach((btn) => {
                btn.addEventListener("click", function(clickedBtn) {
                    clickedBtn.target.closest(".dropdown").querySelector(".size-dropdown-wrapper").classList.toggle("show-dropdown");

                   

                    if (clickedBtn.target.closest(".dropdown").querySelector(".size-dropdown-wrapper").classList.contains("show-dropdown")) {
                        clickedBtn.target.closest(".dropdown").nextElementSibling.style.transform = "rotate(-135deg)"
                    } else {
                        clickedBtn.target.closest(".dropdown").nextElementSibling.style.transform = "rotate(45deg)"
                    }
                })
            });


            let counter = 0;
            
         document.querySelectorAll('.dropdown-option').forEach((option) => {
                option.addEventListener("click", function(clickedOption) {
                    counter += 1;
                    let productInfoUrl = clickedOption.target.closest(".cart-item-name").querySelector("a").href;
                    let url = productInfoUrl.split("?variant=")[0];
                    let variant = productInfoUrl.split("?variant=")[1];
                    removeItemById();
                    function removeItemById() {
                        return removeItem({
                            id: variant
                        });
                    };
                   

                    function removeItem(data) {
                        fetch("/cart/change.json", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                ...data,
                                quantity: 0
                            })
                        });


                    }

                    fetch(url + ".js")
                        .then(function(response) {
                            switch (response.status) {
                                case 200:
                                    return response.text();
                                case 404:
                                    throw response;
                            }
                        }).then(function(template) {
                            var json = JSON.parse(template);
                            let selectedColor = clickedOption.target.closest(".dropdown").querySelector(".selected-color").innerText;
                            let selectedSize = clickedOption.target.innerText;

                            variantsArray = json.variants;
                            let newVariantId;
                            let newVariantPrice;
                            let newVariantComparePrice;
                            if (variantsArray.length > 0) {
                                let a = variantsArray.filter(e => e.option2 === selectedSize.trim() && e.option1 === selectedColor.trim());
                                newVariantId = a[0].id;
                                newVariantPrice = a[0].price;
                                
                                newVariantComparePrice = ((a[0].compare_at_price)/100).toFixed()
                            }
                            let executed = false;

                            if ( !executed) {
                                const lineItem = addItem(newVariantId, 1);
                                executed = true;
                            }
                            console.log( typeof(newVariantComparePrice) )
                            if (newVariantComparePrice === "0") {
                               
                                clickedOption.target.closest(".np-cart-dropdown-style").closest(".cart__item-title").querySelector(".compared-price").style.display = "none"
                            } 
                            else {
                                clickedOption.target.closest(".np-cart-dropdown-style").closest(".cart__item-title").querySelector(".compared-price").innerText = "€" + newVariantComparePrice
                            }
                            
                            function addItem(variantId, quantity) {
                               const result =  fetch("/cart/add.json", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json"
                                    },
                                    body: JSON.stringify({
                                        id: variantId,
                                        quantity: quantity
                                    })
                                }).then(response => response.json())
                                .then ( (cartItem) => {
                                    let varPrice = parseInt(cartItem.price)
                                    clickedOption.target.closest(".np-cart-dropdown-style").closest(".cart__item-title").querySelector(".cart__price").innerText = "€" + varPrice
                                    clickedOption.target.closest(".cart__item-details").querySelector(".js-qty__num").value = (cartItem.quantity).toString();
                                    jQuery.getJSON('/cart.js', function(cart) {
                                        let totPrice = (cart.total_price / 100).toFixed()
                                        document.querySelector("[data-subtotal]").innerText = "€" + totPrice
                                        if (location.href.indexOf("cart") > -1) {
                                            document.querySelectorAll("[data-subtotal]")[0].innerText = "€" + totPrice
                                            document.querySelectorAll("[data-subtotal]")[1].innerText = "€" + totPrice
                                          }
                                        let newProductInfoUrl = clickedOption.target.closest(".cart-item-name").querySelector("a").href;
                                        let newUrl = newProductInfoUrl.split("?variant=")[0];
                                        clickedOption.target.closest(".cart-item-name").querySelector("a").href = newUrl + "?variant=" + cartItem.id 
                                     } );
                                } )
                            }
                            
                        })
                  
                       let allOptions = clickedOption.target.closest(".size-dropdown-wrapper").querySelectorAll(".dropdown-option");
                       allOptions.forEach(function(e){
                        e.style.textDecoration = "none";
                       })
                       clickedOption.target.style.textDecoration = "underline";

                    clickedOption.target.closest(".dropdown").querySelector('.dropbtn').innerText = clickedOption.currentTarget.innerText;
                 
                    clickedOption.target.closest(".dropdown").nextElementSibling.style.transform = "rotate(45deg)"

                    if (clickedOption.target.closest(".dropdown").querySelector(".size-dropdown-wrapper.show-dropdown")) {
                        clickedOption.target.closest(".dropdown").querySelector(".size-dropdown-wrapper").classList.remove('show-dropdown');
                        // clickedOption.target.closest(".dropdown").nextElementSibling.style.transform = "rotate(-135deg)"

                    } 
                    // else {
                    //     clickedOption.target.closest(".dropdown").nextElementSibling.style.transform = "rotate(45deg)"
                    // }

                })
            });
        }




    },
};

WaitForElement(".cart__item", (e) => {
    if (e) {

        mainFunc.init();
    }
});