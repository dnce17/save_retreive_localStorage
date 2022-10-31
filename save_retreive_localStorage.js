let saveBtn = document.querySelector(".save");
let retreiveBtn = document.querySelector(".retreive");
let deleteBtn = document.querySelector(".delete");
let deleteAllBtn = document.querySelector(".delete-all");
let info = document.querySelector(".display-info");
let saved = document.getElementById("saved");

saveBtn.addEventListener("click", save);
retreiveBtn.addEventListener("click", retreive);
deleteBtn.addEventListener("click", deleteItem);
deleteAllBtn.addEventListener("click", deleteAll);

function checkDup(nameToBeSaved, option) {
    let alreadyExist = [];
    for (i = 0; i < saved.length; i++) {
        let maybeDup = saved[i].value;
        alreadyExist.push(maybeDup);
    }

    if (alreadyExist.includes(nameToBeSaved)) {
        alert("Name already taken. File will be overwritten.");
    } else {
        saved.add(option);
        alert("Save Successful!");
        let saveAs = document.getElementById("save-as")
        saveAs.value = "";
    }
}

function save() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let saveAs = document.getElementById("save-as").value; // this is basically what you name your saved file

    const person = {
        name: name,
        age: age
    }

    window.localStorage.setItem(saveAs, JSON.stringify(person));
    // console.log("Save successful");

    let option = document.createElement("option");
    option.text = saveAs;

    checkDup(option.value, option)
}

function retreive() {
    let key = saved.value;
    let records = window.localStorage.getItem(key);

    // Load the saved data
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    name.value = JSON.parse(records).name;
    age.value = JSON.parse(records).age;
}

function deleteItem() {
    let key = saved.value;
    localStorage.removeItem(key);

    // remove the deleted item from saved input box 
    let alreadyExist = [];
    for (i = 0; i < saved.length; i++) {
        let savedName = saved[i].value;
        alreadyExist.push(savedName);
    }

    if (alreadyExist.includes(key)) {
        for (i = 0; i < saved.length; i++) {
            let savedName = saved[i].value
            if (key == savedName) {
                // console.log(saved[i], saved[i].value, key, i);
                saved.remove(i);
                alert("File has been deleted")
            } 
        }
    }
}

function deleteAll() {
    window.localStorage.clear();

    for (i = saved.length - 1; i >= 0; i--) {
        console.log(saved[i])
        saved.remove(i);
    }
}

// Load key names from local storage into saved input box
const keys = Object.keys(localStorage);
for (let key of keys) {
    let option = document.createElement("option");
    option.text = key;
    saved.add(option);
}


// Potential use for future 
// let text = document.createTextNode(records);
// info.appendChild(text);

// Resouces used
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_select_remove
// https://stackoverflow.com/questions/41112624/remove-select-option-with-specific-value
// https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box

// Of Note
// remove() rearranges the index, so when you remove all options from select, you might run into issues 