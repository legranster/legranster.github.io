const modal = document.getElementById('modal');
const contactBtns = document.getElementsByClassName('contact');
const jumbotron = document.getElementById('jumbotron');

function modalForm(){
    let html = `<div class="modalCard">`;
    html += `<h3 class="mb-3 mb-sm-5">Contact Us</h3> 
    <form>
        <h5 class="mb-1 mb-sm-3">Personal Info</h5>
        <div class="form-group row">
            <label for="inputName" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputName">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail">
            </div>
        </div>
        <h5 class="mt-5 mb-3">Interests</h5>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="webDesign">
            <label class="form-check-label" for="webDesign">
                Web Design
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="agileExpertise">
            <label class="form-check-label" for="agileExpertise">
                Agile Expertise
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="justChat">
            <label class="form-check-label" for="justChat">
                Just to Chat!
            </label>
        </div>
        <div class="form-group row">
            <div class="col-sm d-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary" id="formSubmit">Submit</button>
            </div>
        </div>
    </form>`;
    html += `</div>`;
    modal.innerHTML = html;
    modal.style.display = 'block';
}

for(let i = 0; i < contactBtns.length; i++){
    contactBtns[i].addEventListener('click', (e) => {
        modalForm();
    }
)};

modal.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.innerHTML = "";
        modal.style.display = "none";
    } else if (e.target.id === 'formSubmit'){
        scroll(0,0);
        console.log('Submit');
        modal.innerHTML = "";
        modal.style.display = "none";
        let alert = createAlert();
        jumbotron.insertBefore(alert, jumbotron.firstElementChild); 
    }
});

document.onkeydown = function(e){
    if(e.keyCode === 27){
        modal.innerHTML = "";
        modal.style.display = "none";
    }
};

function createAlert(){
    let alert = document.createElement("div");
    alert.className = "alert alert-success alert-dismissible fade show";
    alert.id = "alert-success";
    alert.innerHTML = `<strong>Thank you for your interest!</strong> Manuel will contact you as soon as possible.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>`;
    return alert;
}