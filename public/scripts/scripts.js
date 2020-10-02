let coll = document.getElementsByClassName("collapsible-button");
console.log(coll)

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.parentNode.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
        coll[i].innerText = "+";
    } else {
        content.style.display = "block";
        coll[i].innerText = "-";
    }
    });
}

function confirmAddWorkHere () {
    confirm("Do you want to add yourself to the list of people who currently work at this organization?");
}

function confirmAddWorkedHere () {
    confirm("Do you want to add yourself to the list of people who have worked at this organization in the past?");
}

function confirmInterviewHere () {
    prompt("Do you want to add yourself to the list of people who have interviewed at this organization?\n \nTell us briefly about your experience being interviewed here.", " hiring process | interviewing questions | whiteboard challenge | etc.");
}

/**addexperience starts here */
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
/**addexperience ends here */

