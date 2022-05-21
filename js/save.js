let uid = 0;
let mainbookUID = 0;
let count = 0;
let deletePath =0;
let deletediv = 0;
let buttonCreate = document.querySelector("#Add");
const fileInput = document.getElementById("FileUpload");
const storage = firebase.storage();
const db = firebase.database();
const Type = {
  list:0,
  main:1, 
}
// 로딩 화면 호출 document.getElementById("LoadButton").click();
// 로딩 화면 삭제 document.getElementById("CompleteButton").click();
window.addEventListener("load",()=>{
  document.getElementById("LoadButton").click();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, uid로 사용자 파일관리
      uid = user.uid;
      loadBooks();
      // ...
    }
  });
})
//Color Picker
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
        mode: 'edit',
        type: 'box',
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
      document.querySelector(".FileOff").className = "FileOn";
      document.querySelector("#filebox").style.pointerEvents = "auto";
      let mainbookindex;
       Object.values(snap.val()).find((val,i)=>{
      if(val.type === 1)mainbookindex = i;})
      mainbookUID =Object.keys(snap.val())[mainbookindex];
      loadPages();
    }
    document.getElementById("CompleteButton").click();
  });
}
function loadPages(){
  storage.ref().child('users/' + uid + '/' + mainbookUID).listAll().then((res)=>
    res.items.forEach((itemRef)=>{
      itemRef.getDownloadURL().then((url)=>{
        addPage(url,itemRef);
      })
    })
  )
  .then(()=>document.getElementById("CompleteButton").click())
}
function addPage(url,Ref){
  let div = document.createElement("div");
  div.id = "page";
  div.className = "page m-3";
  let tab = document.createElement("div");
  tab.className="d-flex";
  tab.style="width:250px;height:25px;";
  let p = document.createElement("p");
  p.textContent = Ref.name;
  p.style="margin-left:5px;margin-bottom:0px;width:200px;height:25px;overflow:hidden;text-overflow:ellipsis; color:#6F5141;"
  div.style=" textAlign:center; background-color:#F9EDE1";

  let Deleteicon = document.createElement("i");
  let Searchicon = document.createElement("i");
  Deleteicon.className="bi bi-x ms-auto";
  Searchicon.className="bi bi-search ms-auto";
  Deleteicon.style ="cursor:pointer;"
  Searchicon.style ="cursor:pointer;"
  Deleteicon.addEventListener("click",()=>{
    document.getElementById("DeleteTitle").textContent = Ref.name;
    deletePath = Ref.fullPath;
    deletediv = div;
    document.getElementById("DeletePage").click();
  })
  Searchicon.addEventListener("click",()=>{
    let a =document.createElement("a");
    a.target = "_blank";
    a.href = url;
    a.click();
  })
  tab.appendChild(p);
  tab.appendChild(Searchicon);
  tab.appendChild(Deleteicon);
  let embed = document.createElement("embed");
  embed.style="width:250px;height:275px;";
  embed.src= url;
  embed.alt = "이미지 없음";
  div.appendChild(tab);
  div.appendChild(embed);
  let list = document.querySelector("#list");
  list.insertBefore(div,list.firstChild);
}
document.getElementById("DeleteButton").addEventListener("click",()=>{
  storage.ref().child(deletePath).delete().then(deletediv.remove());
})
function check_length(area){
  let text = area.value;
  const max_length = 15;
  if(text.length > max_length){
    text = text.substr(0,max_length);
    area.value = text;
  }
  document.querySelector("#color-show").innerHTML=`<p>${text}</p>`
}

fileInput.addEventListener("input",() =>{
  const selectedFile = fileInput.files[0];
  fileInput.value = '';
  const storageRef = storage.ref();
  const spaceRef = storageRef.child('users/' + uid + '/' + mainbookUID);
  let name = selectedFile.name.slice(0,-4);
  let type = selectedFile.name.slice(-4);
  let pagecount = 0;
  spaceRef.listAll().then((res)=>{
    while(1){
      let check = false;
      let checkname = name;
    res.items.forEach((itemRef)=>{
      if(pagecount) checkname = name + "-" + pagecount;
      if(checkname + type == itemRef.name){
        pagecount++;
        check = true;
      }
    })
    if(!check) break;
  }
  })
  .then(()=>{
    if(pagecount) name = name + "-" + pagecount;
    pagecount = 0;
    const uploadPath = storageRef.child('users/' + uid + '/' + mainbookUID +'/'+ name + type);
  document.getElementById("LoadButton").click();
  const upload = uploadPath.put(selectedFile);
  upload.on('state_changed',
  //변화시 동작하는 함수
  null,
  //에러시 동작하는 함수
  (error) =>{
    //console.error(error);
  },
  //성공시 동작하는 함수
  ()=>{
    fileRef = uploadPath;
    fileRef.getDownloadURL().then((url)=>{
      document.getElementById("CompleteButton").click();
      addPage(url,fileRef);
    })
  });
  })
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
        document.getElementById("LoadButton").click();
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
                  document.getElementById("CompleteButton").click();
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
        storage.ref().child('users/'+uid +'/' + Object.keys(snap.val())[bookindex]).listAll().then((res)=>{
          res.items.forEach((itemRef)=>{
              itemRef.delete();
          })
        });
        
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
    document.querySelector(".FileOff").className = "FileOn";
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

