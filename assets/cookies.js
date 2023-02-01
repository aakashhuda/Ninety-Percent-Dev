
if(document.title==="Ninety Percent - Responsible Womenswear and Menswear Label" || window.location.href==="https://ninetypercent.com/?_ab=0&_fd=0&_sc=1"){
  window.onload = (event) => {
    
    if(!sessionStorage.getItem("cookies-appread-new")){
      document.querySelector(".popUp-cookies").style.display="block";
    
    }
    
    
};

  document.querySelector(".allCookies").addEventListener("click",()=>{
    document.querySelector(".popUp-cookies").style.display="none";
    document.body.style.overflow = "auto";
    sessionStorage.setItem("cookies-appread-new", "true");
    if(document.querySelector(".cc-window.cc-banner.cc-type-info")){
  document.querySelector(".cc-window.cc-banner.cc-type-info").style.display = "none";
}
  })
  document.querySelector(".necessaryCookies").addEventListener("click",()=>{
    document.querySelector(".popUp-cookies").style.display="none";
    document.body.style.overflow = "auto";
    sessionStorage.setItem("cookies-appread-new", "true");
    if(document.querySelector(".cc-window.cc-banner.cc-type-info")){
  document.querySelector(".cc-window.cc-banner.cc-type-info").style.display = "none";
}
  })
}

