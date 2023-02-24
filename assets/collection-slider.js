
function waitForElem(waitFor, callback, minElements = 1, isVariable = false, timer = 10000, frequency = 25) {
  let elements = isVariable ? window[waitFor] : document.querySelectorAll(waitFor);
  if (timer <= 0) return;
  (!isVariable && elements.length >= minElements) || (isVariable && typeof window[waitFor] !== "undefined") ? callback(elements) : setTimeout(() => waitForElem(waitFor, callback, minElements, isVariable, timer - frequency), frequency);
}

waitForElem("#CollectionAjaxContent", (element) => {
  if (element) {

    let filterButton = {
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
        // function to find index of active class
  function findActvieIndex(productId){
    var images = document.querySelectorAll(`.image-item-${productId}`)
    var index;
    for (var i=0; i < images.length; i++){
        if( images[i].classList.contains("active")){
            index = i
            break
        }
    }
    return {index: index, images: images}
}

// function for changing class
function changeNextImage(productId, event) {
    var data = findActvieIndex(productId)
    var index = data.index
    var images = data.images
    images[index].classList.remove("active")
    if (images[index + 1] !== undefined){
      images[index+1].classList.add("active")
    }
    if (images[index + 1] === undefined) {
      images[0].classList.add("active")
    }
}

function changePreviousImage(productId, event) {
    var data = findActvieIndex(productId)
    var index = data.index
    var images = data.images
    if(images[index-1] === undefined){
      if (images.length > 1) {
        images[0].classList.remove("active");
        images[images.length -1].classList.add("active");
      }
    }
  else{
        images[index-1].classList.add("active")
        images[index].classList.remove("active")
  }
}

function applyClickEventForMobileSorting() {
    var target = document.querySelector(".sort-btn-mobile")
    target.addEventListener('click', ()=>{
      // sorting
      if (document.querySelector(".sort-list-mobile").classList.contains('show-sort-list')){
        document.querySelector(".sort-list-mobile").classList.remove('show-sort-list')
      }
      else {
        document.querySelector(".sort-list-mobile").classList.add('show-sort-list')
      }
    })
  }

const leftArrow=()=>{
    document.querySelectorAll(".left-arrow").forEach(a=>{
      a.addEventListener('click',(e)=>{
        let productId = e.target.classList[0].split("-")[1];
        changePreviousImage(productId, e)
        e.preventDefault();
      })
})
}

const rightArrow=()=>{
    document.querySelectorAll(".right-arrow").forEach(a=>{
      a.addEventListener('click',(e)=>{
        let productId = e.target.classList[0].split("-")[1];
        changeNextImage(productId, e)
        e.preventDefault();
      })
})
}

function sizeFilterRemoval() {
  var sizeFilters = document.querySelectorAll(".active.size-filter")
  sizeFilters.forEach(item=>{
    item.addEventListener("click", (e)=>{
      e.preventDefault()
      if (e.target.dataset.url.includes("option.size")){
        var tempUrl = e.target.dataset.url
      }
      else {
        var tempUrl = e.target.dataset.url.replace("&filter.v.availability=1", "")
      }
      var index = tempUrl.indexOf("?")
      var length = tempUrl.length
      var newParam = tempUrl.substr(index, length-1)
      if (newParam === '?filter.v.availability=1'){
        window.location.search = ""
      }
      else {
        window.location.search = newParam
      }
    })
  })
}

function sizeFilterAddition(){
  var sizeFilters = document.querySelectorAll(".inactive.size-filter")
  sizeFilters.forEach(item=>{
    item.addEventListener("click", (e)=>{
      e.preventDefault()
      var url;
      if (e.target.dataset.url.includes("availability")){
        url = e.target.dataset.url
      }
      else {
        url = e.target.dataset.url + "&filter.v.availability=1"
      }
      var tempUrl = url
      var index = tempUrl.indexOf("?")
      var length = tempUrl.length
      var newParam = tempUrl.substr(index, length-1)
      window.location.search = newParam
    })
  })
}

function showClearFilter(){
    const activeFilters = document.querySelectorAll(".active-filter-item")
    if (activeFilters.length > 0) document.querySelector(".active-filter-clear-item").classList.remove("dont-show")
}
  function resetFilter(){
    var target = document.querySelector(".filter-reset")
    target.addEventListener('click', ()=>{
      window.location.search = ""
    })
  }
  function sortingFunctionWithoutMultipleOptions(){
    var sortItems = document.querySelectorAll(".sort-list-item")
    sortItems.forEach(item=>{
      item.addEventListener('click', (e)=>{
        let url = "";
        if (window.location.search.indexOf("filter") === -1){
          url += `?sort_by=${e.target.dataset.name}`
        }
        else {
          var index = window.location.search.indexOf("sort_by")
          switch (index) {
            case -1: url += window.location.search + `&sort_by=${e.target.dataset.name}`; break;
            default:
              var initIndex = window.location.search.indexOf("sort_by")
              var toBeReplaced = window.location.search.slice(initIndex)
              url += window.location.search.replace(toBeReplaced, `sort_by=${e.target.dataset.name}`)
          }
        }
        window.location.search = url
      })
    })
  }
  function sortingFunctionWithMultipleOptions(){
    var sortItems = document.querySelectorAll(".sort-list-item")
    sortItems.forEach(item=>{
      item.addEventListener('click', (e)=>{
        let url = "";
        if (window.location.search.indexOf("filter") === -1){
          var index = window.location.search.indexOf("sort_by")
          switch (index) {
            case -1: url += `?sort_by=${e.target.dataset.name}`; break;
            default: url = window.location.search + `&sort_by=${e.target.dataset.name}`;
          }
        }
        else {
          url += window.location.search + `&sort_by=${e.target.dataset.name}`
        }
        window.location.search = url
      })
    })
  }
  function applyClickEventForFilter() {
    document.querySelectorAll(".filter-label").forEach(label=>{
      label.addEventListener('click', (event)=> {
        var className = `${event.target.classList[1]}-options`
        var target = document.querySelector(`.${className}`)
        var sortingList = document.querySelector(".sort-list")
        if (target.classList.contains("show-filter")){
          target.classList.remove("show-filter")
        }
        else {
          target.classList.add("show-filter")
          document.querySelectorAll(".filter-options-list").forEach(item => {
            if (item !== target) item.classList.remove("show-filter");
          })
        }
        if (sortingList.classList.contains("show-sort-list")) {
          sortingList.classList.remove("show-sort-list")
        }
      })
    })
  }
  function applyClickEventForSorting() {
    var target = document.querySelector(".sorting-section")
    target.addEventListener('click', ()=>{
      // sorting
      document.querySelectorAll(".filter-options-list").forEach(option=>{
        if (option.classList.contains("show-filter")) {
          option.classList.remove("show-filter")
        }
      })

      if (document.querySelector(".sort-list").classList.contains('show-sort-list')){
        document.querySelector(".sort-list").classList.remove('show-sort-list')
      }
      else {
        document.querySelector(".sort-list").classList.add('show-sort-list')
      }
    })
  }
  function removeFilterOptionList(){
    var topBarFilterSection = document.querySelector(".topbar-filter-section")
    topBarFilterSection.addEventListener('click', (e)=>{
      if (e.target !== topBarFilterSection) return false
      document.querySelectorAll(".filter-options-list").forEach(item => {
        item.classList.remove("show-filter")
      })
    })
  }

  function checkForActiveFilters(){
    const target = document.querySelector(".topbar-active-filter-section")
    if (window.location.search.indexOf("filter") != -1){
      target.classList.remove("hide")
    }
    else {
      target.classList.add("hide")
    }
  }

        
  leftArrow();
  rightArrow();
  applyClickEventForMobileSorting();
  applyClickEventForFilter();
  applyClickEventForSorting();
  sortingFunctionWithoutMultipleOptions();
  resetFilter();
  removeFilterOptionList();
  showClearFilter();
  sizeFilterRemoval();
  sizeFilterAddition();
  checkForActiveFilters();

      

let target = document.querySelector("#CollectionAjaxContent");
let observer = new MutationObserver(function() {
  leftArrow();
  rightArrow();
  applyClickEventForMobileSorting();
  applyClickEventForFilter();
  applyClickEventForSorting();
  sortingFunctionWithoutMultipleOptions();
  resetFilter();
  removeFilterOptionList();
  showClearFilter();
  sizeFilterRemoval();
  sizeFilterAddition();
  checkForActiveFilters();
});
observer.observe(target, {
  childList: true,
});
},
};

    filterButton.init();
  }
});


 