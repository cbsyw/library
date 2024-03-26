// book class

function createBook(title,author,pages,status) {
    return {
      title: title,
      author: author,
      pages: pages,
      status: status,
      info: function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`;}
    };
  }
  
  
  // store books in array
  
  const myLibrary = [];
  
  // put books in library
  
  function toLibrary(book) {
      myLibrary.push(book);
  }
  
  // handle form submission
  
  function handleBook(){
    
    const title = document.getElementById('book').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const status = document.getElementById('status').value
  
    
  
    const newBook = createBook(title, author, pages, status);
  
    if (myLibrary.includes(newBook)){
      form = document.getElementById('favDialog')
      const newContent = document.createTextNode("this is already in your library");
      form.appendChild(newContent);
  
    }
    else{
      toLibrary(newBook);
      handleInput(newBook);
    }
  }
  
  
  // maybe can delete this
  const addBook = document.getElementById("addBook");
  let table = document.getElementById('grid');  // temp div to enter submit
  // 
  
  var x = 0
  
  function handleInput(book){ 
  
      const newGridItem = document.createElement("div")
      newGridItem.setAttribute('class', 'grid-item')
      newGridItem.setAttribute('id', 'grid-item-' + (x+=1))
  
      table.appendChild(newGridItem)  
  
      const div = document.getElementById('grid')
      
      let p1 = document.createElement('p')
      p1.textContent = '"' + book.title + '"';
      newGridItem.appendChild(p1)
  
      let p2 = document.createElement('p')
      p2.textContent = book.author;
      newGridItem.appendChild(p2)
  
      let p3 = document.createElement('p')
      p3.textContent = book.pages;
      newGridItem.appendChild(p3)
  
      let b1 = document.createElement('button')
      b1.textContent = book.status;
  
        if (book.status == ('read')){
          b1.style.backgroundColor = "#90EE90";
        }
        else{
        b1.style.backgroundColor = "#FF7F7F";
        }
  
      b1.className = ('gridButton');
      b1.id = ('readRead-' + (x))
      b1.setAttribute("onclick",`changeStatus(${x})`);
      newGridItem.appendChild(b1)
  
  
      let b2 = document.createElement('button')
      b2.textContent = ('delete');
      b2.className = ('gridButton')
      b2.setAttribute('onclick',`removeBook(${x})`)
      newGridItem.appendChild(b2)
  
      return resetForm();
  
  }
  
  
  // reset value of form
  
  function resetForm(){
  
    document.getElementById('book').value = ''
    document.getElementById('author').value = ''
    document.getElementById('pages').value = ''
    document.getElementById('status').value = ''
  
  }
  
  
  
  // dialog
  
  
  const favDialog = document.getElementById("favDialog");
  const outputBox = document.querySelector("output");
  const confirmBtn = favDialog.querySelector("#submit");
  const cancelBtn = favDialog.querySelector("#cancel");
  
  // "add book" button opens the <dialog> modally
  addBook.addEventListener("click", () => {
    favDialog.showModal();
  });
  
  
  // "Cancel" button closes the dialog without submitting because of [form method="dialog"], triggering a close event.
  favDialog.addEventListener("close", (e) => {
    outputBox.value = (null);
      favDialog.returnValue === "default"
        ? "No return value."
        : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
  });
  
  
  
  // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
  
  
  confirmBtn.addEventListener("click", (event) => {
  
    let userBook = document.getElementById('book').value 
    let userAuthor = document.getElementById('author').value 
    let userPages = document.getElementById('pages').value 
    let userStatus = document.getElementById('status').value
  
    event.preventDefault();
    // require form to be filled
  
    if(
      userBook.length == 0 ||
      userAuthor.length  == 0 ||
      userPages == 0 ||
      userStatus.length == 0
    ){
      alert('please fill out all fields');
    }
    else{
    handleBook();
    favDialog.close(); // Have to send the select box value here.
    }
  
  });
  
  
  
  cancelBtn.addEventListener('click',(event)=>{
    resetForm();
  });
  
  // function to switch read/not read on click
  
  function changeStatus(x){
  
    b1 = document.getElementById('readRead-'+ x)
  
    if (b1.textContent == ('read'))
      {  b1.innerHTML = ('not read');
      b1.style.backgroundColor = "#FF7F7F";
      b1.style.color = 'black';
    }
  
    else if (b1.textContent == ('not read')){
      b1.innerHTML = ('read')
      b1.style.backgroundColor = "#90EE90";
      b1.style.color = 'black'
    }
  }
  
  function removeBook(x){
  
    b1 = document.getElementById('grid-item-'+ x)
    b1.remove()
  }
  
  
  