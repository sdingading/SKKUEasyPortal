function changeIframe(url){
    document.getElementById("js-searchContent").src=url;
  }
var uid = 0;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, uid로 사용자 파일관리
      uid = user.uid;
      // ...
    } else {
      // User is signed out
      location.href = "login.html";
    }
  });

axios
  .get(
    "https://www.skku.edu/skku/campus/support/welfare_11_1.do?mode=info&conspaceCd=20201104&srResId=3&srShowTime=D&srCategory=L",
    {
      headers: {
        "User-Agent":
          navigator.userAgent,
      },
    }
  )
  .then((resp) => {
    console.log(resp.data);
  });
