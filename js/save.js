let buttonMainBook = document.querySelector("#mainbook");
buttonMainBook.addEventListener("click",()=>{
  let booklet = document.getElementById("booklet");
    if(booklet.style.display === "none"){
        booklet.style.display = "flex";
    }
    else{
        booklet.style.display = "none";
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
  newBook.style.backgroundColor = bgColor;
  newBook.style.color = ftColor;
  newBook.classList.add("book","m-1");
  newBook.innerHTML =`<p>${document.querySelector(".letter").innerText}</p>`;
  newBook.style.cursor="pointer";
  newBook.addEventListener("click",()=>{
    let book = document.querySelector("#mainbook");
    let temp = book.cloneNode();
    temp.innerHTML = book.innerHTML;
    book.style.backgroundColor = newBook.style.backgroundColor;
    book.style.color = newBook.style.color;
    book.innerHTML = newBook.innerHTML;
    newBook.style.backgroundColor = temp.style.backgroundColor;
    newBook.style.color = temp.style.color;
    newBook.innerHTML = temp.innerHTML;
    document.querySelector("#booklet").style.display = "none";
  })
  let booklet = document.querySelector("#tab");
  booklet.insertBefore(newBook,booklet.firstChild);
  document.getElementById("gray-container").style.display = "none";
})