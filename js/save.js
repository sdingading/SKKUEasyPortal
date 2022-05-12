var uid = 0;
var initialBook= 0;
var isthere = 0;
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

let buttonBookAdd = document.querySelector("#Add");
let buttonCreate = document.querySelector("#create");
let containerClick = document.querySelector("#gray-container");
const fileInput = document.getElementById("fileUpload");
const storage = firebase.storage();
const db = firebase.database();
let books = [];
const Type = {
  main:0,
  list:1,
}


function loadBooks(){

  db.ref('users/'+uid+'/books/').get().then((snap)=>{
    if(snap.exists()){
      books = Object.values(snap.val());
      console.log(books);
      if(!books.find(val=>val.type===0)) books[0].type=0;
      initialBook = 1;
      books.forEach(addToList);
    }
    else{
      document.getElementById("gray-container").style.display = "block";
    }
  });
}
function loadPages(){
}
function savePages(){
}


const handleFiles = (e) =>{
  const selectedFile = fileInput.files[0];
  const storageRef = storage.ref();
  const uploadPath = storageRef.child(uid + '/' + selectedFile.name);
  const upload = uploadPath.put(selectedFile);
  upload.on('state_changed',
  //변화시 동작하는 함수
  null,
  //에러시 동작하는 함수
  (error) =>{
    console.error(error);
  },
  //성공시 동작하는 함수
  ()=>{});
  let selectedFile_url = URL.createObjectURL(selectedFile);
  let embed = document.createElement("embed");
  embed.id = "page";
  embed.className = "page m-3";
  embed.src= selectedFile_url;
  let list = document.querySelector("#list");
  list.insertBefore(embed,list.firstChild);
};
fileInput.addEventListener("change",handleFiles);

let buttonMainBook = document.querySelector("#mainbook");
buttonBookAdd.addEventListener("click",()=>{
  document.getElementById("gray-container").style.display = "block";
})
containerClick.addEventListener("click",(e)=>{
  if(e.target===document.getElementById("gray-container")) 
    e.target.style.display = "none";
})
let doubleFlag = 0;
function addToList(book){
  if(book.type === 1){
    let newBook = document.createElement("li");
    newBook.style.backgroundColor = book.backgroundColor;
    newBook.style.color = book.color;
    newBook.innerHTML = book.text;
    newBook.style.cursor="pointer";
    newBook.className ="book m-1";
    newBook.addEventListener("click",(e)=>{
      if(doubleFlag === 0)
      if(e.target === newBook){
        doubleFlag = 1;
        let booklist;
        let mainbook;
        db.ref('users/'+uid+'/books').get().then((snap)=>{
          let bookindex = 0;
          let mainbookindex = 0;
          booklist = Object.values(snap.val()).find((val,i)=>{
            if(JSON.stringify(book) === JSON.stringify(val)){
            bookindex= i;
            return val;
            }})
           db.ref('users/'+uid+'/books/'+Object.keys(snap.val())[bookindex])
              .update({type:0})
          mainbook = Object.values(snap.val()).find((val,i)=>{
            if(val.type === 0){
              mainbookindex = i;
              return val;
            }})
            db.ref('users/'+uid+'/books/'+Object.keys(snap.val())[mainbookindex])
              .update({ type:1})
              .then(()=>{
                booklist.type = 0;
                document.getElementById("mainbook").remove();
                if(mainbook){
                  mainbook.type = 1;
                  addToList(mainbook);
                }
                newBook.remove();
                addToList(booklist)
                document.querySelector("#booklet").style.display = "none";
                doubleFlag = 0;
              });
          })
        }
          })
    let icon = document.createElement("i");
    icon.id = "delete";
    icon.className = "bi bi-x fs-2"
    icon.style = "position: absolute; left: 170px; color : #000000; cursor:pointer;";
    icon.addEventListener("click",()=>{
      newBook.remove();
      books = books.filter(b=>b !== book);
    })
    newBook.appendChild(icon);
    let booklet = document.querySelector("#tab");
    booklet.insertBefore(newBook,booklet.firstChild); 
  }
  else{
    let newBook = document.createElement("div");
    newBook.id = "mainbook";
    newBook.style.backgroundColor = book.backgroundColor;
    newBook.style.color = book.color;
    newBook.innerHTML = book.text;
    newBook.style.cursor="pointer";
    newBook.className = "book m-5";
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
  let book = {
    text: `<p>${document.querySelector(".letter").innerText}</p>`,
    backgroundColor : bgColor,
    color : ftColor,
    type : initialBook,
    isthere : isthere,
    page :{}
  }
  initialBook = 1;
  addToList(book);
  if(book.isthere === 0){
    book.isthere = 1;
    books.push(book);
    db.ref('users/'+uid+"/"+"books").push().set(book);
  }
  document.getElementById("gray-container").style.display = "none";
})