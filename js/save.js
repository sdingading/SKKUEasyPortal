let buttonMainBook = document.querySelector("#mainbook");
console.log(document.getElementById("booklet"));
buttonMainBook.addEventListener("click",()=>{
    if(document.getElementById("booklet").style.display === "none"){
        document.getElementById("booklet").style.display = "flex";
    }
    else{
        document.getElementById("booklet").style.display = "none";
    }
})
let buttonBookAdd = document.querySelector("#Add");
buttonBookAdd.addEventListener("click",()=>{
  document.getElementById("gray-container").style.display = "block";
})
let containerClick = document.querySelector("#gray-container");
containerClick.addEventListener("click",(e)=>{
  if(e.target===document.getElementById("gray-container")) document.getElementById("gray-container").style.display = "none";
})
let buttonCreate = document.querySelector("#create");
buttonCreate.addEventListener("click",()=>{
  let newBook = document.createElement("li");
  console.log("a");
  newBook.style.backgroundColor = SethexColor;
  newBook.classList.add("book","m-1");
  let booklet = document.querySelector("#list");
  booklet.insertBefore(newBook,booklet.firstChild);
  document.getElementById("gray-container").style.display = "none";
})