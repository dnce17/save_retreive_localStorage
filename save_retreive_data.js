let saveBtn = document.querySelector(".save");
let retreiveBtn = document.querySelector(".retreive");
let deleteBtn = document.querySelector(".delete");
let info = document.querySelector(".display-info")
let saved = document.getElementById("saved");

saveBtn.addEventListener("click", save);
retreiveBtn.addEventListener("click", retreive);
deleteBtn.addEventListener("click", deleteItem)

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
        // let saveAs = document.getElementById("save-as")
        // saveAs.value = "";
    }
}

function save(nameToBeSaved) {
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

    // // check if duplicated in saved, then add if no duplicate
    // let alreadyExist = [];
    // for (i = 0; i < saved.length; i++) {
    //     let maybeDup = saved[i].value;
    //     alreadyExist.push(maybeDup);
    // }

    // if (alreadyExist.includes(saveAs)) {
    //     alert("Name already taken. File will be overwritten.")
    // } else {
    //     saved.add(option);
    //     alert("Save Successful!")
    // }
}

function retreive() {
    let key = saved.value;
    let records = window.localStorage.getItem(key);

    // show info in page
    let text = document.createTextNode(records);
    info.appendChild(text);

    // show in console
    console.log(JSON.parse(records).name);
    let name = document.getElementById("name");
    let age = document.getElementById("age");
    name.value = JSON.parse(records).name;
    age.value = JSON.parse(records).age;
}

function deleteItem() {
    let key = saved.value;
    localStorage.removeItem(key);
    console.log("item removed");
}

const keys = Object.keys(localStorage)
for (let key of keys) {
    // console.log(key);

    let option = document.createElement("option");
    option.text = key;
    saved.add(option);
}

// for later