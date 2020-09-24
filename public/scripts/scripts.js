let coll = document.getElementsByClassName("collapsible-button");

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

let gradCollection = document.getElementsByClassName("collapsible-button-grad");

for (let i = 0; i < gradCollection.length; i++) {
    gradCollection[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let container = this.parentNode.parentNode.parentNode;
    let content = this.parentNode.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
        gradCollection[i].innerText = "+";
        container.style.width = "30%";
    } else {
        content.style.display = "block";
        gradCollection[i].innerText = "-";
        container.style.width = "100%";
    }
    });
}

let gradCollection2 = document.getElementsByClassName("collapsible-button-grad-2");

for (let i = 0; i < gradCollection2.length; i++) {
    gradCollection2[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let container = this.parentNode.parentNode.parentNode;
    let container2018 = document.getElementsByClassName("container-2018-cohort");
    let container2019 = document.getElementsByClassName("container-2019-cohort");
    let container2020 = document.getElementsByClassName("container-2020-cohort");
    let content = this.parentNode.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
        gradCollection2[i].innerText = "+";
        gradCollection2[i].id = ""
        container.style.width = "30%";
        container2018[0].style.display = "flex";
        container2019[0].style.display = "flex";
        container2020[0].style.display = "flex";
        window.location = "#jump-back-here";
    } else {
        content.style.display = "block";
        gradCollection2[i].innerText = "-";
        gradCollection2[i].id = "jump-here"
        container.style.width = "70%";
        container2018[0].style.display = "inline-block";
        container2019[0].style.display = "inline-block";
        container2020[0].style.display = "inline-block";
        window.location = "#jump-here";
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