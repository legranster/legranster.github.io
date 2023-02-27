window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
  
    var targetY = 0;
    do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
    } while (target = target.offsetParent);
  
    scroll = function(c, a, b, i) {
      i++;
      if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function() {
        scroll(c, a, b, i);
      }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
  }
  


// Submit Demographics Button
document.querySelector("#submitDemographics").addEventListener("click", function(){
    var nameValue = document.getElementById("name").value;          
    var ageValue = document.getElementById("age").value;
    var genderValue = document.getElementById("gender").value;
    var educationValue = document.getElementById("education").value;
    var diagnosisValue = document.getElementById("diagnosis").value;
    var medsValue = document.getElementById("meds").value;
    if (nameValue == null || nameValue == ""){
        var result = "Please fill out the Name field.";
        document.getElementById("error").textContent = result;
    } else if (ageValue == null || ageValue == ""){
        var result = "Please fill out the Age field.";
        document.getElementById("error").textContent = result;
    } else if (genderValue == "none"){
        var result = "Please select an option from the Gender field.";
        document.getElementById("error").textContent = result;
    } else if (educationValue == "none"){
        var result = "Please select an option from the Education field.";
        document.getElementById("error").textContent = result;
    } else if (diagnosisValue == "none"){
        var result = "Please select an option from the Diagnosis field.";
        document.getElementById("error").textContent = result;
    } else {
        document.getElementById('error').textContent = "";  
        document.getElementById('nameResult').textContent = 'Name: ' + nameValue;
        document.getElementById('ageResult').textContent = 'Age: ' + ageValue;
        document.getElementById('genderResult').textContent = 'Gender: ' + genderValue;
        document.getElementById('educationResult').textContent = 'Education: ' + educationValue;
        document.getElementById('diagnosisResult').textContent = 'Diagnosed: ' + diagnosisValue;
        document.getElementById('medsResult').textContent = 'Medications: ' + medsValue;
        document.getElementById('demographics').style.display = "none";
        document.getElementById('step1Instructions').style.display="block";
        smoothScroll(document.getElementById('step1Instructions'));
    }

});

document.querySelector('#continueEval').addEventListener("click", function(){
    document.getElementById('step1Instructions').style.display="none";
    document.getElementById('step1Form').style.display="block";
    smoothScroll(document.getElementById('step1Form'));
})

// Timer 
// stopwatch functions...
var Stopwatch = function(elem, options) {
    var timer = createTimer(),
      startButton = createButton("start", start),
      stopButton = createButton("stop", stop),
      resetButton = createButton("reset", reset),
      offset,
      clock,
      interval;
  
    // default options
    options = options || {};
    options.delay = options.delay || 1;
  
    // append elements     
    elem.appendChild(timer);
    elem.appendChild(startButton);
    elem.appendChild(stopButton);
    elem.appendChild(resetButton);
  
    // initialize
    reset();
  
    // private functions
    function createTimer() {
      return document.createElement("span");
    }
  
    function createButton(action, handler) {
      var a = document.createElement("button");
      a.id = action;
      a.class = "btn";
      a.innerHTML = action;
      a.addEventListener("click", function(event) {
        handler();
        event.preventDefault();
      });
      return a;
    }
  
    function start() {
      if (!interval) {
        offset = Date.now();
        interval = setInterval(update, options.delay);
      }
    }
  
    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  
    function reset() {
      clock = 0;
      render(0);
    }
  
    function update() {
      clock += delta();
      render();
    }
  
    function render() {
      var s = Math.floor(clock / 1000) % 60;
      var ms = Math.floor(clock % 1000);
      if (s < 10) {
        s = "0" + s;
      }
      if (ms < 100) {
        ms = "0" + ms;
      }
      if (ms < 10) {
        ms = "0" + ms;
      }
  
      timer.innerHTML = s + ' sec' ; 
  
    }
  
    function delta() {
      var now = Date.now(),
        d = now - offset;
  
      offset = now;
      return d;
    }
  
    this.start = start;
    this.stop = stop;
    this.reset = reset;
  };
  
  
  var elems = document.getElementsByClassName("basic");
  for (var i = 0, len = elems.length; i < len; i++) {
    new Stopwatch(elems[i]);
  }
  
  


//final submit
var timeResults = [];
var evalResults = [];
var step1Submit = document.getElementById('step1Submit');
step1Submit.addEventListener('click', function(){
    var prepTime = parseInt(document.getElementById('prepTime').firstElementChild.innerHTML);
    var evalTime = parseInt(document.getElementById('evalTime').firstElementChild.innerHTML);
    var observation = document.getElementById('generalObservations').value;
    var compliance = document.getElementById('instructionCompliance').value;
    var reaction = document.getElementById('emotionalReaction').value;
    var notes = document.getElementById('additionalNotes1').value;
    if (prepTime == ''){
        document.getElementById('eval1ErrorText').textContent = "Please fill out the Preparation Time field.";
    } else if (evalTime == ''){
        document.getElementById('eval1ErrorText').textContent = "Please fill out the Evaluation Time field.";
    } else if (observation == '0'){
        document.getElementById('eval1ErrorText').textContent = "Please fill out the General Observations field.";
    } else if (compliance == '0'){
        document.getElementById('eval1ErrorText').textContent = "Please fill out the Instruction Compliance field.";
    } else if (reaction == '0'){
        document.getElementById('eval1ErrorText').textContent = "Please fill out the Emotional Reaction field.";
    } else {
        document.getElementById('eval1ErrorText').textContent = "";
        timeResults.push(parseInt(prepTime));
        timeResults.push(parseInt(evalTime));
        evalResults.push(parseInt(observation));
        evalResults.push(parseInt(compliance));
        evalResults.push(parseInt(reaction));
        var OES = calculateOES(evalResults);
        var OTS = calculateOTS(timeResults);
        var ZPS = calculateZPS(OES, OTS);
        document.getElementById('OES').textContent = "OES: " + OES;
        document.getElementById('OTS').textContent =  "OTS: " + OTS;
        document.getElementById('ZPS').textContent = "Your Zheimer Puzzles Score Is: " + ZPS;
        document.getElementById('notes').textContent = 'Additional notes for Exercise 1: ' + notes;

        smoothScroll(document.getElementById('toggleResults'));
        step1Submit.style.display = 'none';
        document.getElementById('step1Form').style.display = 'none';
        document.getElementById('resultsToggle').style.display= 'block';

    }
})

function calculateOES(evalArray){
    var OES = 0;
    for (i = 0; i < evalArray.length; i++){
        OES = OES + evalArray[i];
    }
    OES = OES/evalArray.length;
    return OES;
}

function calculateOTS(timeArray){
    var OTS = 0;
    for (i=0; i < timeArray.length; i++){
        OTS = OTS + timeArray[i];
    }
    OTS = OTS/(timeArray.length/2);
    return OTS;
}

function calculateZPS(OES, OTS){
    var ZPS = (OES * 100)/OTS;
    return ZPS;
}

var resultsSection = document.getElementById('results');
var toggleResultsButton = document.getElementById('toggleResults');
toggleResultsButton.addEventListener("click", function(){
        resultsSection.style.display = 'flex';
        document.getElementById('resultsToggle').style.display= 'none';
})