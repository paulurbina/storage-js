// GLOBAL VARIABLES
const formulario = document.querySelector("#formulario");
const listWrite = document.querySelector("#listWrite");
let arrayWrites = [];

    

// TOTAL FUNCIONS

const createItem = (writing) => {

    // total items
    let item = {
        writing: writing,
        estado: true
    }

    // add list client
    arrayWrites.push(item);

    return item;
}

const saveLocal = () => {

    // localStorage
    localStorage.setItem('write', JSON.stringify(arrayWrites));
    
    showItems();
};

const showItems = () => {
    listWrite.innerHTML = '';

    arrayWrites = JSON.parse(localStorage.getItem('write'));

    if(arrayWrites === null) {
        arrayWrites= [];
    } else {

        arrayWrites.forEach(element => {

            if(element.estado) {
                listWrite.innerHTML += `
                <div class="alert alert-info" role="alert"><i class="material-icons float-left mr-2">folder_open</i><b>${element.writing}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>
                `;
            } else {
                listWrite.innerHTML += `
                <div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">folder_open</i><b>${element.writing}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>
                `;
            }

           
        });
    }
}

const deleteItem = (writing) => {
    let indexArray;
    arrayWrites.forEach((element, index) => {

        if(element.writing === writing) {
            indexArray = index;
        }
    });

    //delete item writing
    arrayWrites.splice(indexArray, 1);

    //save writing
    saveLocal();
}       

const editItem = (writing) => {
    let indexArray = arrayWrites.findIndex((element) => {
        return element.writing === writing;
    });

    arrayWrites[indexArray].estado = true;

    // save items
    saveLocal();
    
};


// ADD EVENT LISTENER
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let writingInput = document.getElementById('write').value;
    createItem(writingInput);

    // save writing
    saveLocal();

    // reset input
    formulario.reset();
});

        // Shot when the HTML document has been fully loaded and parsed
        document.addEventListener('DOMContentLoaded', showItems);

listWrite.addEventListener('click', (e) => {
    
    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {

        let textItem = e.path[2].childNodes[1].innerHTML;
        let textAction = e.target.innerHTML;
        if(textAction === 'done') {
            editItem(textItem);
        }  

        if(textAction === 'delete') {
            deleteItem(textItem)
        }
        
    }

    e.preventDefault();
});
