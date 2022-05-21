var uid = 0;
let currenturl = "page/home.html";
const storage = firebase.storage();
const db = firebase.database();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, uid로 사용자 파일관리
      uid = user.uid;
      changeIframe(currenturl);
      document.getElementById("logout").style.display = "block";
      document.getElementById("login").style.display = "none";

      document.getElementById("divider").style.display = "block";
      document.getElementById("Profiles").style.display = "block";
      storage.ref().child('users/'+ uid + '/profile').listAll().then((res)=>{
        res.items.forEach((itemRef)=>{
          itemRef.getDownloadURL().then((url)=>{
            document.getElementById("profileimg").src = url;
            document.getElementById("settingimg").src = url;
          })
        })
      })
      db.ref('users/'+ uid).get().then((snap)=>{
        document.getElementById("User").textContent = snap.val().name;
        document.querySelector("#text").value = snap.val().name;
      })
      // ...
    } else {
      // User is signed out
      document.getElementById("login").style.display = "block";        
      document.getElementById("logout").style.display = "none";
    }
  });
document.querySelector("#logout").addEventListener("click",()=>{
    firebase.auth().signOut();
    uid = 0;
    document.getElementById("content").src="page/login.html";
    document.getElementById("settingimg").src = "images/unknownuser.jpg";
    document.getElementById("profileimg").src = "images/unknownuser.jpg";
    document.getElementById("Profiles").style.display = "none";
    document.getElementById("divider").style.display = "none";
    document.getElementById("User").textContent = "user";
    document.querySelector("#text").value = "user";
});

function changeIframe(url){
  if(uid || url =="page/home.html")
    document.getElementById("content").src=url;
  else document.getElementById("content").src = "page/login.html"
  currenturl = url;
}


let logout = document.querySelector("#logout");
function check_length(area){
  let text = area.value;
  const max_length = 7;
  if(text.length > max_length){
    text = text.substr(0,max_length);
    area.value = text;
  }
}
var file = 0;
var fileInput = document.getElementById("FileUpload");
fileInput.addEventListener("input",() =>{
  var selectedFile = fileInput.files[0];
  file = selectedFile;
  SettingImage(selectedFile);
 
});

function SettingImage(File){
  var img = new FileReader();
  img.onload = function (e){
    document.getElementById("settingimg").src = e.target.result;
  };
  img.readAsDataURL(File);
}
document.querySelector("#Cancel").addEventListener("click",()=>{
  document.querySelector("#text").value = document.getElementById("User").textContent;
  document.getElementById("settingimg").src = document.getElementById("profileimg").src;
  fileInput.value = '';
})
  document.querySelector("#Add").addEventListener("click",()=>{
    document.getElementById("profileimg").src = document.getElementById("settingimg").src;
    db.ref('users/'+uid).update(
      {name: document.querySelector("#text").value})
      .then(()=>{document.getElementById("User").textContent = document.querySelector("#text").value;})
    if(fileInput.value){
    const storageRef = storage.ref();
      storageRef.child('users/'+uid + '/profile').listAll().then((res)=>{
        res.items.forEach((itemRef)=>{
          itemRef.delete();
        })
      })
      .then(()=>{
        const uploadPath = storageRef.child('users/' + uid + '/profile' +'/'+ file.name);
        const upload = uploadPath.put(file);
        upload.on('state_changed',
        //변화시 동작하는 함수
        null,
        //에러시 동작하는 함수
        (error) =>{
          console.error(error);
        },
        //성공시 동작하는 함수
        ()=>{
          fileRef = uploadPath;
          fileRef.getDownloadURL().then(()=>{
            fileInput.value = '';
          })
        });
      })
    }
  })