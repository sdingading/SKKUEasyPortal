let uid = 0;
let mainbookUID = 0;
let count = 0;
let buttonCreate = document.querySelector("#Add");
const fileInput = document.getElementById("FileUpload");
const storage = firebase.storage();
const db = firebase.database();
const Type = {
  list:0,
  main:1,
}
window.addEventListener("load",()=>{
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, uid로 사용자 파일관리
      uid = user.uid;
      loadBooks();
      // ...
    } else {
      // User is signed out
      location.href = "login.html";
    }
});
})
//Color Picker
let Color = CodeMirrorColorPicker.Color;
let bgColor = '#FFFFFF';
let ftColor = 'black';
let bgnode = document.querySelector(".bgcolor-picker");
let ftnode = document.querySelector(".ftcolor-picker");
  let bgpicker = new CodeMirrorColorPicker.create({
        position: 'inline',
        container: bgnode,
        type: 'ring',
        color: '#FFFFFF',
        onChange: function(color){
          bgColor = color;
          document.querySelector(".color-show").style.backgroundColor = color;
        }
    });
  let ftpicker = new CodeMirrorColorPicker.create({
        position: 'inline',
        container: ftnode,
        type: 'palette',
        color: 'black',
        onChange: function(color){
          ftColor = color;
          document.querySelector(".color-show").style.color = color;
        }
  });
function loadBooks(){

  db.ref('users/'+uid+'/books/').get().then((snap)=>{
    if(snap.exists()){
      count = Object.keys(snap.val()).length;
      let books = Object.values(snap.val());
      if(!books.find(val=>val.type===1)){
        books[0].type=1;
      }
      books.forEach(addToList);
      document.querySelector("#InputBook").remove();
      document.querySelector("#filebox").style.pointerEvents = "auto";
      let mainbookindex;
       Object.values(snap.val()).find((val,i)=>{
      if(val.type === 1)mainbookindex = i;
      })
        mainbookUID =Object.keys(snap.val())[mainbookindex];
        loadPages();
    }
  });
}
function loadPages(){

  storage.ref().child('users/' + uid + '/' + mainbookUID).listAll().then((res)=>
    res.items.forEach((itemRef)=>{
      itemRef.getDownloadURL().then((url)=>{
        addPage(url);
      })
    })
  )
}
function addPage(url){
  let embed = document.createElement("embed");
  embed.id = "page";
  embed.className = "page m-3";
  embed.src= url;

  let list = document.querySelector("#list");
  list.insertBefore(embed,list.firstChild);
}

function check_length(area){
  let text = area.value;
  const max_length = 15;
  if(text.length > max_length){
    text = text.substr(0,max_length);
    area.value = text;
  }
  document.querySelector("#color-show").innerHTML=`<p>${text}</p>`
}

fileInput.addEventListener("change",(e) =>{
  const selectedFile = fileInput.files[0];
  const storageRef = storage.ref();
  const uploadPath = storageRef.child('users/' + uid + '/' + mainbookUID +'/'+ selectedFile.name);
  const upload = uploadPath.put(selectedFile);
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
    fileRef.getDownloadURL().then((url)=>{
      addPage(url);
    })
  });
  });

let buttonMainBook = document.querySelector("#mainbook");

let doubleFlag = 0;

function addToList(book){

  let newBook = document.createElement("div");
  newBook.style.backgroundColor = book.backgroundColor;
  newBook.style.color = book.color;
  newBook.innerHTML = book.text;
  newBook.style.cursor="pointer";

  //booklist (not mainbook)
  if(book.type === 0){
    newBook.className ="book m-1";
    newBook.addEventListener("click",(e)=>{
      if(doubleFlag === 0 && e.target === newBook){
        doubleFlag = 1;
        let booklist;
        let mainbook;
        db.ref('users/'+uid+'/books').get().then((snap)=>{
          let bookindex = 0;
          let mainbookindex = 0;
          //find book in Database
          booklist = Object.values(snap.val()).find((val,i)=>{
            if(JSON.stringify(book) === JSON.stringify(val)){
              bookindex= i;
              mainbookUID =Object.keys(snap.val())[bookindex];
              return val;
            }})
            
          //find mainbook in Database
          mainbook = Object.values(snap.val()).find((val,i)=>{
            if(val.type === 1){
              mainbookindex = i;
              return val;
            }})
          //update Database
          db.ref('users/'+uid+'/books/'+Object.keys(snap.val())[bookindex]).update({type:1})
            .then(()=>{
              db.ref('users/'+uid+'/books/'+Object.keys(snap.val())[mainbookindex]).update({ type:0})
                .then(()=>{
                  //update UI
                  mainbook.type = 0;
                  booklist.type = 1;
                  document.getElementById("mainbook").remove();
                  newBook.remove();
                  addToList(mainbook);
                  addToList(booklist);
                  if(document.querySelectorAll("#page") != null) document.querySelectorAll("#page").forEach((document)=>document.remove());
                  loadPages();
                  document.querySelector("#booklet").style.display = "none";
                  doubleFlag = 0;
              });
            })
          })
        }
          })
    let icon = document.createElement("i");
    icon.id = "delete";
    icon.className = "bi bi-x fs-2"
    icon.style = "position: absolute;top:-15px;left: 180px; color : #000000; cursor:pointer;";
    icon.addEventListener("click",()=>{
      newBook.remove();
      db.ref('users/'+uid+'/books').get().then((snap)=>{
        let bookindex = 0;
        book = Object.values(snap.val()).find((val,i)=>{
          if(JSON.stringify(book) === JSON.stringify(val,i)){
            bookindex= i;
            return val;
          }})
        db.ref('users/'+uid+'/books/'+Object.keys(snap.val())[bookindex]).remove();
      })
    })
    newBook.appendChild(icon);
    let booklet = document.querySelector("#tab");
    booklet.insertBefore(newBook,booklet.firstChild); 
  }
  else{
    newBook.className = "book m-5";
    newBook.id = "mainbook";
    let container = document.querySelector(".pageContainer");
    newBook.addEventListener("click",()=>{
      let booklet = document.getElementById("booklet");
        if(booklet.style.display === "none") booklet.style.display = "flex";
        else booklet.style.display = "none";
    })
    container.insertBefore(newBook,container.firstChild);
  }
}

buttonCreate.addEventListener("click",()=>{
  let initialBook = 0;
  if(document.querySelector("#InputBook")){
    document.querySelector("#InputBook").remove();
    document.querySelector("#filebox").style.pointerEvents = "auto";
    initialBook = 1;
  }
  let book = {
    backgroundColor : bgColor,
    color : ftColor,
    number : count,
    text: `<p>${document.querySelector(".letter").value}<p>`,
    type : initialBook,
  }
  count++;
  db.ref('users/'+uid+"/"+"books").push().set(book);
  addToList(book)
})

