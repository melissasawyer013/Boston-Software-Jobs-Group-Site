let addneworgbutton = document.getElementById('add-new-org');
addneworgbutton.addEventListener('click', function (){
    mynewOrg();
});

function mynewOrg(){
    let x = document.getElementById('exp-current-organization');
    if(x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

let addpreviousorgbutton = document.getElementById('add-previous-org');
addpreviousorgbutton.addEventListener('click', function (){
    mypreviousOrg();
});

function mypreviousOrg(){
    let x = document.getElementById('exp-previous-organization');
    if(x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

let addnewinterviewbutton = document.getElementById('add-new-interview');
addnewinterviewbutton.addEventListener('click', function (){
    mynewInterview();
});

function mynewInterview(){
    let x = document.getElementById('add-interview');
    if(x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


