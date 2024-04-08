const inputBox = document.getElementById("addNoteInput");
const addBtn = document.getElementById("addNoteBtn");
const allnotesCon = document.getElementById("allnotes");
const filter = document.getElementById("filter");
const checkInput = document.getElementsByClassName("checkedUncheked");
console.log(checkInput);
console.log("hello");

filter.addEventListener("change", () => {
  let x = event.target.value;
  displayMyNotes(x);
});

const saveNotes = localStorage.getItem("notes");
let notes = saveNotes ? JSON.parse(saveNotes) : [];
displayMyNotes();
function displayMyNotes(filter = "") {
  console.log(notes);
  allnotesCon.innerHTML = ""; 
  if(notes.length){
  
  

  notes.forEach((note, index) => {
    const checkBtn = document.createElement("input");
    checkBtn.type = "checkbox";
    checkBtn.classList.add("checkedUncheked");

    if (filter == "Completed") {
      checkBtn.setAttribute("checked", true);
      if (!note.status) {
        return;
      }
    } else if (filter == "Uncompleted") {
      if (note.status) {
        return;
      }
    } else {
      if (note.status) {
        checkBtn.setAttribute("checked", true);
      }
    }

    const noteContainer = document.createElement("div");
    const textSpan = document.createElement("div");
    textSpan.id = "text";
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    checkBtn.addEventListener("change", () => {
      notes = notes.map((ele, i) => {
        if (i === index) {
          ele.status = !ele.status;
          return ele;
        }
        return ele;
      });

      console.log(notes);

      saveInLocalStorage();
    });

    textSpan.textContent = note.text;
    editBtn.textContent = "edit";
    deleteBtn.textContent = "delete";

    noteContainer.appendChild(textSpan);
    noteContainer.appendChild(editBtn);
    noteContainer.appendChild(deleteBtn);
    noteContainer.appendChild(checkBtn);
    allnotesCon.appendChild(noteContainer);

    deleteBtn.addEventListener("click", () => {
      let flag = confirm("are you sure");
      if (flag) {
        notes.splice(index, 1);
        saveInLocalStorage();
        displayMyNotes();
      }
    });

    editBtn.addEventListener("click", (e) => {
      if (editBtn.textContent === "edit") {
        textSpan.contentEditable = "true";
        editBtn.textContent = "update";
        textSpan.style.backgroundColor = "white";
      } else if (editBtn.textContent == "update") {
        notes[index].text = textSpan.textContent;
        textSpan.contentEditable = "false";
        textSpan.style.backgroundColor = "gray";
        editBtn.textContent = "edit";
        saveInLocalStorage();
        displayMyNotes();
      }
    });
  });
}
else{
  const noitem = document.createElement('div');
  noitem.textContent="NO task AVAILBLE";
  allnotesCon.appendChild(noitem);
}
}
// saving the data to the local storage
function saveInLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

addBtn.addEventListener("click", () => {
  // Create a new note object
  let note = {
    text: inputBox.value,
    time: new Date(),
    status: false,
  };

  if (note.text.trim() !== "") {
    notes.push(note);
    inputBox.value = ""; // Clear the input box
    saveInLocalStorage();

    displayMyNotes(); // Display the updated notes
  }
});

// Initial display of notes when the page loads
