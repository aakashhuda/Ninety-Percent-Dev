function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function cookieSetup(){
  document.querySelector(".popUp-cookies").style.display="none";
    setCookie("cookies-appread-new", "true", 30);
    document.body.classList.remove("overflow--none");
}
  

if(document.querySelector(".popUp-cookies")){

  window.onload = (event) => {
    let x = getCookie("cookies-appread-new");
    
    if(!x){
      document.querySelector(".popUp-cookies").style.display="block";
      document.body.classList.add("overflow--none");
    
    }
}
  
  document.querySelector(".allCookies").addEventListener("click",()=>{
    cookieSetup();
  })
  document.querySelector(".necessaryCookies").addEventListener("click",()=>{
    cookieSetup();
  })
}
