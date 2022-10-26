let saveBtn = document.querySelector(".save");
let retreiveBtn = document.querySelector(".retreive");
let info = document.querySelector(".display-info")
let saved = document.getElementById("saved");

saveBtn.addEventListener("click", save);
retreiveBtn.addEventListener("click", retreive);

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
}

function retreive() {
    // info.value = JSON.parse
    // let key = "Person1";
    let key = saved.value;
    let records = window.localStorage.getItem(key);
    let text = document.createTextNode(records);
    info.appendChild(text);
}

// for later
  // let option = document.createElement("option");
    // option.text = saveAs;
    // saved.add(option);