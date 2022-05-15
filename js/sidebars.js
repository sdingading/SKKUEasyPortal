var uid = 0;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, uid로 사용자 파일관리
      uid = user.uid;
      if(document.querySelector("#login")) document.querySelector("#login").remove();
      let li = document.createElement("li");
      li.id= "logout"
      li.className ="dropdown-item"
      li.innerText = "Sign out";
      li.addEventListener("click",()=>{
        firebase.auth().signOut();
      });
      document.querySelector("#dropdown").appendChild(li);
      // ...
    } else {
      // User is signed out
      if(document.querySelector("#logout"))document.querySelector("#logout").remove();
      let li = document.createElement("li");
      li.id= "login"
      li.className ="dropdown-item"
      li.innerText = "Sign in";
      li.addEventListener("click",()=>{
      changeIframe("page/login.html");
      })
      document.querySelector("#dropdown").appendChild(li);
        
    }
  });

/* global bootstrap: false */
(function () {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

function changeIframe(url){
  document.getElementById("content").src=url;
}


let logout = document.querySelector("#logout");
