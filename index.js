let myLeads = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
let localLeads = JSON.parse(localStorage.getItem("savedLeads"))
if (localLeads) {
    myLeads = localLeads
    render(myLeads)
}


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems +=
            `
    <li>
    <a href="https://${leads[i]}" target="_blank">
    ${leads[i]}
    </a>
    </li>
    `
    }
    ulEl.innerHTML = listItems
}

saveBtn.addEventListener("click", function () {
    if (inputEl.value) {
        myLeads.push(inputEl.value)
        inputEl.value = null
        localStorage.setItem("savedLeads",JSON.stringify(myLeads))
    }
    render(myLeads)
})


deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear("savedLeads")
    myLeads=[]
    render(myLeads)
})

tabBtn.addEventListener("click",function() {
 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("savedLeads",JSON.stringify(myLeads))
     render(myLeads)
     });
     
})