const alertBanner = document.getElementById("alert");
const notificationBell = document.getElementById('notificationBell');
const notificationDiv = notificationBell.parentNode;
const notificationTray = document.getElementById('notifications');
const notificationBanners = document.getElementsByClassName('notificationAlert');
const chartSelector = document.getElementById('traffic-nav');
const chartOptions = document.getElementsByClassName('traffic-nav-link');
const user = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');
const alert = document.getElementById('messageSent');
const userList = ['Victoria Chambers', 'Dale Byrd', 'Dawn Wood', 'Dan Oliver'];

let emailSetting = document.getElementById('email');
let profileSetting = document.getElementById('profile');
let timezoneSetting = document.getElementById('timezone');

const saveButton = document.getElementById('save');
const cancelButton = document.getElementById('cancel');

const settingsAlert = document.getElementById('settingsAlert');

// Chart.JS Content -----------//
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById('daily-chart');
const mobileCanvas = document.getElementById('mobile-chart');
let hourlyData = {
    labels: ['08:00AM', '09:00AM', '10:00AM', '11:00AM', '12:00PM', '01:00PM', '02:00PM', '03:00PM', '04:00PM', '05:00PM', '06:00PM', '07:00PM'],
    datasets: [{
        data: [0, 5, 4, 10, 12, 15, 13, 10, 18, 20, 22, 15],
        backgroundColor: '#499797',
        borderWidth: 1,
    }]
};
let weeklyData = {
    labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
    datasets: [{
        data: [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: '#499797',
        borderWidth: 1,
    }]
};
let monthlyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
    datasets: [{
        data:[4500, 5000, 4000, 6500, 5500, 6000, 7000, 6000, 8000, 7000, 9000, 9000],
        backgroundColor: '#499797',
        borderWidth: 1,
    }]
}
let trafficOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
};
let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: weeklyData,
    options: trafficOptions
});
let dailyData = {
    labels: ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
    datasets: [{
        data: [75, 100, 175, 125, 225, 200, 100],
        backgroundColor: '#499797',
        borderWidth: 1,
    }]
};
let dailyOptions = {
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    legend : {
        display: false
    }
};
let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});
let mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: '# of Users',
        data: [65, 15, 20],
        borderWidth: 0,
        backgroundColor: [
            '#499797',
            '#977049',
            '#974970'
        ]
    }]
};
let mobileOptions = {
    legend: {
        position: 'right',
        labels: {
            boxWidth: 20,
            fontStyle: 'bold'
        }
    }
};
let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

//Traffic Chart Function to change data

chartSelector.addEventListener('click', (e) => {
    let text = e.target.textContent;
    for (let i = 0; i < chartOptions.length; i++){
        chartOptions[i].classList = 'traffic-nav-link';
    }
    if (text === "Hourly"){
        chartOptions[0].classList = "traffic-nav-link active";
        trafficChart = new Chart(trafficCanvas, {
            type: 'line',
            data: hourlyData,
            options: trafficOptions
        });
    } else if (text === 'Daily'){
        chartOptions[1].classList = "traffic-nav-link active";
        trafficChart = new Chart(trafficCanvas, {
            type: 'line',
            data: dailyData,
            options: trafficOptions
        });
    } else if (text === 'Weekly'){
        chartOptions[2].classList = "traffic-nav-link active";
        trafficChart = new Chart(trafficCanvas, {
            type: 'line',
            data: weeklyData,
            options: trafficOptions
        });
    } else if (text === 'Monthly'){
        chartOptions[3].classList = "traffic-nav-link active";
        trafficChart = new Chart(trafficCanvas, {
            type: 'line',
            data: monthlyData,
            options: trafficOptions
        });
    }
});

// notification tray Event Handler 

notificationBell.addEventListener('click', (e) => {
    if (notificationTray.style.display === ""){
        notificationTray.style.display = "block";
    } else if (notificationTray.style.display === "block"){
        notificationTray.style.display = "";
    }
})

notificationTray.addEventListener('click', (e) => {
    if(e.target.classList.contains('alert-banner-close')){
        e.target.parentNode.style.display = 'none';
    }
});


// Top Alert Banner HTML and event handler 

alertBanner.innerHTML = "<div class='alertBanner'><p><strong>Alert</strong>: Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p><p class='alert-banner-close'>X</p></div>"

alertBanner.addEventListener('click', (e) => {
    if(event.target.classList.contains('alert-banner-close')){
        alertBanner.style.display = 'none';
    }
});

// Messaging the User Section

$('#userField').autocomplete({
    source: userList,
});

send.addEventListener('click', (e) => {
    e.preventDefault();
    if (user.value === '' && message.value === ''){
        alert.innerHTML = '<div class="errorAlert"><p>User field cannot be empty. Message field cannot be empty.</p><p class="alert-banner-close">X</p></div>';
    } else if (user.value === ''){
        alert.innerHTML = '<div class="errorAlert"><p>User field cannot be empty.</p><p class="alert-banner-close">X</p></div>';
    } else if (message.value === '') {
        alert.innerHTML = '<div class="errorAlert"><p>Message field cannot be empty.</p><p class="alert-banner-close">X</p></div>';
    } else {
        alert.innerHTML = '<div class="alertBanner"><p>Message sent.</p><p class="alert-banner-close">X</p></div>';
    }
});

alert.addEventListener('click', (e) => {
    if(event.target.classList.contains('alert-banner-close')){
        alert.innerHTML="";
    }
});

// Settings Alert ----------------//




// Local Storage funtimes

saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    let isEmailChecked = emailSetting.checked;
    let isProfileSettingChecked = profileSetting.checked;
    let timezoneSettingSelected = timezoneSetting.value;
    localStorage.setItem('email', isEmailChecked);
    localStorage.setItem('profile', isProfileSettingChecked);
    localStorage.setItem('timezone', timezoneSettingSelected);
    settingsAlert.innerHTML='<div class="alertBanner"><p>Settings Saved!</p><p class="alert-banner-close">X</p></div>';
});

cancelButton.addEventListener('click', (e) => {
    localStorage.setItem('email', false);
    localStorage.setItem('profile', false);
    localStorage.setItem('timezone', "00000");
    settingsAlert.innerHTML='<div class="alertBanner"><p>Settings Reset.</p><p class="alert-banner-close">X</p></div>';
});

settingsAlert.addEventListener('click', (e) => {
    if(e.target.classList.contains('alert-banner-close')){
        settingsAlert.innerHTML="";
    }
})

emailSetting.checked = JSON.parse(localStorage.getItem('email'));
profileSetting.checked = JSON.parse(localStorage.getItem('profile'));
timezoneSetting.value = localStorage.getItem('timezone');