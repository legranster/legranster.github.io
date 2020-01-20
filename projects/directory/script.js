const employees = [];
const directory = document.getElementById('directory');
const modal = document.getElementById('modal');
const previous = document.getElementById('left');
const next = document.getElementById('right');
let employee;

fetch('https://randomuser.me/api/?nat=us,gb&results=12')
  .then(response => response.json())
  .then((myJson) => {
    for(let i = 0; i < myJson.results.length; i++){
      employees.push(myJson.results[i]);
    }
    for(let i = 0; i < employees.length; i++){
        let html = `<div class="card">`;
        html += `<img class="headshot" src=${employees[i].picture.large} alt="Employee Headshot">`;
        html += `<div class="employeeText"><h4>${employees[i].name.first} ${employees[i].name.last}</h4>`;
        html += `<p>${employees[i].email}</p>`;
        html += `<p>${employees[i].location.city}</p>`;
        html += '</div></div>';
        directory.innerHTML += html;
    }
})

// Modal function
function modalHTML(employee){
    let html = `<div class="modalCard">`;
    html += `<img class="xOut" src="assets/close_button.svg" alt="Close Button" title="close button by Henning Gross from the Noun Project">`
    html += `<div class="leftArrow"><img class="arrow" id="left" src="assets/arrow_left.svg" alt="Arrow by Ghiyats Mujtaba from the Noun Project"></div>`;
    html += `<div class="modalBody">`;
    html += `<img class="modalHeadshot" src=${employees[employee].picture.large} alt="Employee Headshot">`;
    html += `<h4>${employees[employee].name.first} ${employees[employee].name.last}</h4>`;
    html += `<p>${employees[employee].email}</p>`;
    html += `<p>${employees[employee].location.city}</p>`;
    html += `<hr>`;
    html += `<p>${employees[employee].cell}</p>`;
    html += `<p>${employees[employee].location.street.number} ${employees[employee].location.street.name} ${employees[employee].location.city}, ${employees[employee].location.state} ${employees[employee].location.postcode}</p>`;
    html += `<p>${employees[employee].dob.date.slice(5,7)}/${employees[employee].dob.date.slice(8,10)}/${employees[employee].dob.date.slice(0,4)}</p>`;
    html += `</div>`;
    html += `<div class="rightArrow"><img class="arrow" id="right" src="assets/arrow_right.svg" alt="Arrow by Ghiyats Mujtaba from the Noun Project"></div>`;
    html += `</div>`;
    modal.innerHTML = html;
    modal.style.display = 'block';
    return employee;
};

// Creating the modal
$('#directory').on('click', '.card', function(){
    employee = $(this).index();
    modalHTML(employee);
});

// Navigating the Modal
modal.addEventListener('click', (e) => {
    if(e.target.className === "xOut" || e.target === modal ){
        modal.innerHTML = "";
        modal.style.display = "none";
    } else if (e.target.id === "left"){
        if (employee === 0) {
            employee = 13;
        }
        employee -= 1;
        modalHTML(employee);
    } else if (e.target.id === "right"){
        if (employee === 11) {
            employee = -1;
        }
        employee += 1;
        modalHTML(employee);
    }
});

// Escape button
document.onkeydown = function(e){
    if(e.keyCode === 27){
        modal.innerHTML = "";
        modal.style.display = "none";
    } else if (e.keyCode === 37){
        if (employee === 0) {
            employee = 13;
        }
        employee -= 1;
        modalHTML(employee);
    } else if (e.keyCode === 39){
        if (employee === 11) {
            employee = -1;
        }
        employee += 1;
        modalHTML(employee);
    }
};

// Search
$('#search').keyup(function(){
    const criteria = $('#search').val().toLowerCase();
    for (let i = 0; i < employees.length; i ++){
        const card = $('.card')[i];
        const fullName = `${employees[i].name.first.toLowerCase()}  ${employees[i].name.last.toLowerCase()}`;
        const username = `${employees[i].login.username}`;
        if(username.includes(criteria)){
            card.style.display = "flex";}
        else if (fullName.includes(criteria)){
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    }
});