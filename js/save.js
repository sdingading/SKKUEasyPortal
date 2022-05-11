let buttonBookAdd = document.querySelector("#Add");
let buttonCreate = document.querySelector("#create");
let containerClick = document.querySelector("#gray-container");
const fileInput = document.getElementById("fileUpload");
let books = [];
const Type = {
  main:0,
  list:1,
}
window.addEventListener("load",()=>{
  loadBooks();
})
const handleFiles = (e) =>{
  const selectedFile = fileInput.files[0];
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
buttonMainBook.addEventListener("click",()=>{
  let booklet = document.getElementById("booklet");
    if(booklet.style.display === "none") booklet.style.display = "flex";
    else booklet.style.display = "none";
})
buttonBookAdd.addEventListener("click",()=>{
  document.getElementById("gray-container").style.display = "block";
})

containerClick.addEventListener("click",(e)=>{
  if(e.target===document.getElementById("gray-container")) 
    e.target.style.display = "none";
})
function loadBooks(){
  let lastBooks = localStorage.getItem("books");
  if(lastBooks === '0') return;
  if(books.find(b => b.type === 0) !== '0') document.getElementById("mainbook").remove();
  books = JSON.parse(lastBooks);
  
  books.forEach(addToList);
}
function saveBooks(){
  localStorage.setItem("books", JSON.stringify(books));
}

function addToList(book){
  if(book.type === 1){
    let newBook = document.createElement("li");
    newBook.style.backgroundColor = book.backgroundColor;
    newBook.style.color = book.color;
    newBook.innerHTML = book.text;
    newBook.style.cursor="pointer";
    newBook.className ="book m-1";
    newBook.addEventListener("click",(e)=>{
      if(e.target === newBook){

        let booklist = books.find(b => b === book);
        let mainbook = books.find(b => b.type === 0);
        booklist.type = 0;
        console.log(books);
        document.getElementById("mainbook").remove();
        newBook.remove();

        if(mainbook){
          mainbook.type = 1;
          addToList(mainbook);
        }

        addToList(booklist);
        document.querySelector("#booklet").style.display = "none";
      }
    })
    let icon = document.createElement("i");
    icon.id = "delete";
    icon.className = "bi bi-x fs-2"
    icon.style = "position: absolute; left: 170px; color : #000000; cursor:pointer;";
    icon.addEventListener("click",()=>{
      newBook.remove();
      books = books.filter(b=>b !== book);
      saveBooks();
    })
    newBook.appendChild(icon);
    let booklet = document.querySelector("#tab");
    booklet.insertBefore(newBook,booklet.firstChild); 
    saveBooks();
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
    saveBooks();
  }
}

buttonCreate.addEventListener("click",()=>{
  let book = {
    text: `<p>${document.querySelector(".letter").innerText}</p>`,
    backgroundColor : bgColor,
    color : ftColor,
    type : 1,
    page :{}
  }
  books.push(book);
  saveBooks();
  addToList(book);
  document.getElementById("gray-container").style.display = "none";
})