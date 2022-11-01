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

// Functions when loading pg
loadExistingData();

function save() {
    let existingPeople = JSON.parse(localStorage.getItem("People"));

    if (existingPeople == null) {
        existingPeople = [];
    }

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let savedAs = document.getElementById("save-as").value;

    const person = {
        savedAs: savedAs,
        name: name,
        age: age
    }

    // Check for duplicate savedAs in localStorage
    let alreadyExist = [];
    for (i = 0; i < saved.length; i++) {
        let maybeDup = saved[i].value;
        alreadyExist.push(maybeDup);
    }

    if (alreadyExist.includes(savedAs)) {
        for (i = 0; i < existingPeople.length; i++) {
            if (savedAs == existingPeople[i].savedAs) {
                existingPeople.splice(i, 1);
                alert("Name already taken. File will be overwritten.");
                break;
            }
        } 
    } else {
        let option = document.createElement("option");
        option.text = savedAs;

        saved.add(option);
        alert("Save Successful!");
        let saveAs = document.getElementById("save-as")
        saveAs.value = "";
    }

    // window.localStorage.setItem("person", JSON.stringify(person));

    existingPeople.push(person); // push person into the existing array
    window.localStorage.setItem("People", JSON.stringify(existingPeople)); // show new person + old entries
}

function retreive() {
    let keyToLoad = saved.value;

    let name = document.getElementById("name");
    let age = document.getElementById("age");

    const keys = Object.keys(localStorage);
    for (let key of keys) {
        if (key == "People") {
            let jsonObj = JSON.parse(window.localStorage.getItem("People"))
            console.log(jsonObj);

            for (i = 0; i < jsonObj.length; i++) {
                console.log(jsonObj[i].name, keyToLoad);
                if (jsonObj[i].savedAs == keyToLoad) { // Note: Issues if there is 2 Bobs (e.g)
                    console.log(jsonObj[i].name, keyToLoad);
                    name.value = jsonObj[i].name;
                    age.value = jsonObj[i].age;
                }
            }
        }
    }
}

function deleteItem() {
    let keyCompare = saved.value;

    const keys = Object.keys(localStorage);
    for (let key of keys) {
        if (key == "People") {
            let jsonStr = window.localStorage.getItem(key); // returns str
            let jsonObj = JSON.parse(jsonStr); // turns str to obj
            for (i = 0; i < jsonObj.length; i++) {
                if (jsonObj[i].savedAs == keyCompare) {
                    saved.remove(i);
                    jsonObj.splice(i, 1);
                    window.localStorage.setItem("People", JSON.stringify(jsonObj));
                    alert("File has been deleted")
                    break;
                }
            }
        }
    }
}

function deleteAll() {
    const keys = Object.keys(localStorage);
    for (let key of keys) {
        if (key == "People") {
            window.localStorage.removeItem(key);
            for (i = saved.length; i >= 0; i--) {
                saved.remove(i);
            }
            break;
        }
    }
}

// Load key names from local storage into saved input box
function loadExistingData() {
    const keys = Object.keys(localStorage);
    for (let key of keys) {
        if (key == "People") {
            let jsonStr = window.localStorage.getItem(key); // returns str
            let jsonObj = JSON.parse(jsonStr); // turns str to obj

            for (i = 0; i < jsonObj.length; i++) {
                let option = document.createElement("option");
                option.text = jsonObj[i].savedAs;
                saved.add(option);
            }
        }
    }
}


// Potential use for future 
// let text = document.createTextNode(records);
// info.appendChild(text);

// Resouces used
// https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_select_remove
// https://stackoverflow.com/questions/41112624/remove-select-option-with-specific-value
// https://stackoverflow.com/questions/3364493/how-do-i-clear-all-options-in-a-dropdown-box
// ***My savior: https://stackoverflow.com/questions/19635077/adding-objects-to-array-in-localstorage 

// Of Note
// remove() rearranges the index, so when you remove all options from select, you might run into issues 
// splice() targets the original array rather than creating a new one altogether