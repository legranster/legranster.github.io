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
        smoothScroll(document.getElementById('step1Instructions'));
    }

});

document.querySelector('#continueEval').addEventListener("click", function(){
    smoothScroll(document.getElementById('step1Form'));
})

// let startBtn1 = document.getElementById('start1');
// let stopBtn1 = document.getElementById('stop1');
// let resetBtn1 = document.getElementById('reset1');
  
// let hour = 00;
// let minute = 00;
// let second = 00;
// let count = 00;
  
// startBtn1.addEventListener('click', function () {
//     timer = true;
//     stopWatch();
// });
  
// stopBtn1.addEventListener('click', function () {
//     timer = false;
// });
  
// resetBtn1.addEventListener('click', function () {
//     timer = false;
//     hour = 0;
//     minute = 0;
//     second = 0;
//     count = 0;
//     document.getElementById('hr1').innerHTML = "00";
//     document.getElementById('min1').innerHTML = "00";
//     document.getElementById('sec1').innerHTML = "00";
//     document.getElementById('count1').innerHTML = "00";
// });
  
// function stopWatch() {
//     if (timer) {
//         count++;
  
//         if (count == 100) {
//             second++;
//             count = 0;
//         }
  
//         if (second == 60) {
//             minute++;
//             second = 0;
//         }
  
//         if (minute == 60) {
//             hour++;
//             minute = 0;
//             second = 0;
//         }
  
//         let hrString = hour;
//         let minString = minute;
//         let secString = second;
//         let countString = count;
  
//         if (hour < 10) {
//             hrString = "0" + hrString;
//         }
  
//         if (minute < 10) {
//             minString = "0" + minString;
//         }
  
//         if (second < 10) {
//             secString = "0" + secString;
//         }
  
//         if (count < 10) {
//             countString = "0" + countString;
//         }
  
//         document.getElementById('hr1').innerHTML = hrString;
//         document.getElementById('min1').innerHTML = minString;
//         document.getElementById('sec1').innerHTML = secString;
//         document.getElementById('count1').innerHTML = countString;
//         setTimeout(stopWatch, 10);
//     }
// }

var timeResults = [];
var evalResults = [];
var step1Submit = document.getElementById('step1Submit');
step1Submit.addEventListener('click', function(){

    var prepTime = document.getElementById('prepTime').value;
    var evalTime = document.getElementById('evalTime').value;
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
        step1Submit.style.display = 'none';
        smoothScroll(document.getElementById('toggleResults'));
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
    var ZPS = (OES + OTS)/2;
    return ZPS;
}

var resultsSection = document.getElementById('results');
var toggleResultsButton = document.getElementById('toggleResults');
toggleResultsButton.addEventListener("click", function(){
    if (resultsSection.style.display === 'none'){
        resultsSection.style.display = 'block';
        toggleResultsButton.textContent = "Hide Results";
    } else {
        resultsSection.style.display = 'none';
        toggleResultsButton.textContent = "Show Results";
    }
})