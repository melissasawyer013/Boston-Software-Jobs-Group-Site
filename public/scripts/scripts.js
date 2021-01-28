//JS for organizations.ejs page - collapsible button used on organizations.ejs page - expands each organization's information when the user clicks the "+" button next to an organization's name and logo, turns the "+" button into a "-" button, retracts information when the "-" button is clicked and returns it to a "+" button
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

//JS for graduates.ejs page - expands each graduate's personal information when the user clicks the "+" button next to a graduate's name and headshot, turns the "+" button into a "-" button, retracts information when the "-" button is clicked and returns it to a "+" button
let gradCollection = document.getElementsByClassName("collapsible-button-grad");
for (let i = 0; i < gradCollection.length; i++) {
    gradCollection[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let container = this.parentNode.parentNode.parentNode;
        let content = this.parentNode.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
            gradCollection[i].innerText = "+";
        } else {
            content.style.display = "block";
            gradCollection[i].innerText = "-";
    }
    });
}

//JS for graduates.ejs page - only works from the narrowist through 877 pixels because 878 pixels is when the page expands enough to display all three cohorts in the same row

//JS for graduates.edj page through 877 pixels - expands to show the 2018 cohort list when when the user clicks the "+" button next to "2018 COHORT" header, turns the "+" button into a "-" button, retracts information when the "-" button is clicked and returns it to a "+" button 
let cohortButton2018 = document.getElementsByClassName("cohort-button-2018");
for (let i = 0; i < cohortButton2018.length; i++) {
    cohortButton2018[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let cohortCollection2018 = document.getElementsByClassName("cohort-grads-2018");
        let divToElongate = document.getElementById('div-to-elongate-2018');
        if ((window.getComputedStyle(cohortCollection2018[0], null).getPropertyValue("display")) === "none") {
            cohortButton2018[0].innerText = "-";
            for (let i=0; i < cohortCollection2018.length; i++) {
                cohortCollection2018[i].style.display = "flex";
            };
            divToElongate.style.height = "fit-content";
        } else {
            cohortButton2018[0].innerText = "+"
            for (let i=0; i < cohortCollection2018.length; i++) {
                cohortCollection2018[i].style.display = "none";
            };
            divToElongate.style.height = "50px";
        };
    });
};

//JS for graduates.edj page through 877 pixels - expands to show the 2019 cohort list when when the user clicks the "+" button next to "2019 COHORT" header, turns the "+" button into a "-" button, retracts information when the "-" button is clicked and returns it to a "+" button 
let cohortButton2019 = document.getElementsByClassName("cohort-button-2019");
for (let i = 0; i < cohortButton2019.length; i++) {
    cohortButton2019[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let cohortCollection2019 = document.getElementsByClassName("cohort-grads-2019");
        let divToElongate = document.getElementById('div-to-elongate-2019');
        if ((window.getComputedStyle(cohortCollection2019[0], null).getPropertyValue("display")) === "none") {
            cohortButton2019[0].innerText = "-";
            for (let i=0; i < cohortCollection2019.length; i++) {
                cohortCollection2019[i].style.display = "flex";
            };
            divToElongate.style.height = "fit-content";
        } else {
            cohortButton2019[0].innerText = "+"
            for (let i=0; i < cohortCollection2019.length; i++) {
                cohortCollection2019[i].style.display = "none";
            };
            divToElongate.style.height = "50px";
        };
    });
};

//JS for graduates.edj page through 877 pixels - expands to show the 2020 cohort list when when the user clicks the "+" button next to "2020 COHORT" header, turns the "+" button into a "-" button, retracts information when the "-" button is clicked and returns it to a "+" button 
let cohortButton2020 = document.getElementsByClassName("cohort-button-2020");
for (let i = 0; i < cohortButton2020.length; i++) {
    cohortButton2020[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let cohortCollection2020 = document.getElementsByClassName("cohort-grads-2020");
        let divToElongate = document.getElementById('div-to-elongate-2020');
        if ((window.getComputedStyle(cohortCollection2020[0], null).getPropertyValue("display")) === "none") {
            cohortButton2020[0].innerText = "-";
            for (let i=0; i < cohortCollection2020.length; i++) {
                cohortCollection2020[i].style.display = "flex";
            };
            divToElongate.style.height = "fit-content";
        } else {
            cohortButton2020[0].innerText = "+"
            for (let i=0; i < cohortCollection2020.length; i++) {
                cohortCollection2020[i].style.display = "none";
            };
            divToElongate.style.height = "50px";
        };
    });
};

//JS for the organizations.ejs page - confirmations and prompts pop up when a user tries to add themselves to any of the three lists
// function confirmAddWorkHere () {
//     confirm("Do you want to add yourself to the list of people who currently work at this organization?");
// };

function confirmAddWorkHere () {
    //edit function to get userID from user logged in, push the name associated with the userID to the array in the company object for people who work there now
    //function should also update user object to include name of org in the array for current workplaces
    if(confirm("Do you want to add yourself to the list of people who currently work at this organization?") === true) {
        console.log(`Add in the id of ${user.name}, which is ${user._id}`);
    } else {
        console.log("abort add");
    };
};

function confirmAddWorkedHere () {
    confirm("Do you want to add yourself to the list of people who have worked at this organization in the past?");
};

function confirmInterviewHere () {
    prompt("Do you want to add yourself to the list of people who have interviewed at this organization?\n \nTell us briefly about your experience being interviewed here.", " hiring process | interviewing questions | whiteboard challenge | etc.");
}
//USerProfile add_ a_ btton 
document.getElementById("add_company").addEventListener("click", addNewCompany);

function addNewCompany(){
    document.getElementById("employed").style.display="block"
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
};

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
};

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
};
/**addexperience ends here */

//USerProfile add_ a_ btton 
document.getElementById("add_company").addEventListener("click",addNewCompany)

function addNewCompany(){
    document.getElementById("employed").style.display="block"
}
