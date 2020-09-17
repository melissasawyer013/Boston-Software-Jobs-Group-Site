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