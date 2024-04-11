const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const formAlarm = document.getElementById('form-alarm');

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTime();
});
  

    
    
function getCurrentTime( ){
    const currentDate = new Date();

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconds.innerText = formatNumber(currentSeconds);
    

}; 

//const currentDate = new Date;
//console.log(currentDate.getHours());

function formatNumber(value){
    if(value < 10){
        return "0" + value;
    } 
    else{
        return value;
    }
    //return value<10 ? "0" + value : value;
}

