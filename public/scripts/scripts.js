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