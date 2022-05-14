//for firebase

//user login
var uid = 0;
firebase.auth().onAuthStateChanged((user) => {
if (user) {
// User is signed in, uid로 사용자 파일관리
uid = user.uid;

// ...
} else {
// User is signed out
location.href = "login.html";
}
}); 


const storage = firebase.storage();
const db = firebase.database();

///////////////timer////////////////

//setting subject name
//과목 이름 설정하기

//더블클릭하면 다시 입력창 나오게


let timers=[];

//load and save
function loadTimer(){
    let getTimes = localStorage.getItem("timers");
    if (!getTimes) return;
    JSON.parse(getTimes).forEach(setTime);
}

function saveTimer(){
    localStorage.getItem("timers", JSON.stringify(timers));
}

//timer function
const Button = {
    play: 0,
    pause: 1
}

window.addEventListener("load", () => {
    loadTimer();
    let timerPlay = null; //for saving interval

    document.querySelectorAll('.playButton').forEach( function(timer){
      timer.addEventListener("click", e=>{
        timer.classList.toggle('pauseButton');
        let a = 0; //for make timer id

        //for getting id
        if (e.target.classList.contains('play1')){
          a=1;
        }
        else if (e.target.classList.contains('play2')){
          a=2;
        }  
        else if (e.target.classList.contains('play3')){
          a=3;
        }
        else if (e.target.classList.contains('play4')){
          a=4;
        }

        //create object
        let timeObj = {
            id: "timer"+a,
            totalId : "timerTotal"+a,
            button: Button.play,
            time: 0,
            totalTime: getTotalTime();
        }


        if (e.target.classList.contains('pauseButton')){
          timeObj.button = Button.pause;
          //if displayed button shape is pause shape, time goes
          timerPlay = setInterval(timePlay, 1000, timeObj);
        }

        else{
          //displayed button shape is play shape, time paused.
          if (timerPlay !== null){
            clearInterval(timerPlay);
          }
        }

        //save
        //timer box always starts with 00:00:00
        timeObj.time = 0;
        timeObj.button = Button.play;
        saveTimer();
        
      })
    });
  });

  
  //set Time when loaded
  function setTime(timeObj){
    let tsec = timeObj.totalTime;
    let tmin = 0;
    let thr = 0;

    if (tsec>=60){
      tsec=Math.floor(timeObj.totalTime%60);
      tmin+=Math.floor(timeObj.totalTime/60);
    }

    if(tmin>=60){
      tmin=Math.floor(tmin%3600);
      thr+=Math.floor(thr/3600);
    }

    //display
    let timeBox2 = document.getElementById(timeObj.totalId);
    timeBox2.innerHTML = twoDigit(thr) + " : " + twoDigit(tmin) + " : " + twoDigit(tsec);  
  }

  //time goes & display it
  function timePlay(timeObj){  
    //timer box always starts with 00:00:00
    timeObj.time ++;
    let sec = timeObj.time;
    let min = 0;
    let hr = 0;

    if (sec>=60){
      sec=Math.floor(timeObj.time%60);
      min+=Math.floor(timeObj.time/60);
    }

    if(min>=60){
      min=Math.floor(timeObj.time%3600);
      hr+=Math.floor(timeObj.time/3600);
    }

    //display
    let timeBox = document.getElementById(timeObj.id);
    timeBox.innerHTML = twoDigit(hr) + " : " + twoDigit(min) + " : " + twoDigit(sec);
    
    //total time box starts with saved time
    timeObj.totalTime ++;

    let tsec = timeObj.totalTime;
    let tmin = 0;
    let thr = 0;

    if (tsec>=60){
      tsec=Math.floor(timeObj.totalTime%60);
      tmin+=Math.floor(timeObj.totalTime/60);
    }

    if(tmin>=60){
      tmin=Math.floor(tmin%3600);
      thr+=Math.floor(thr/3600);
    }

    //display
    let timeBox2 = document.getElementById(timeObj.totalId);
    timeBox2.innerHTML = twoDigit(thr) + " : " + twoDigit(tmin) + " : " + twoDigit(tsec);
    saveTimer();
  }

  //for representing time in 2 digits
  function twoDigit(num){

    if (num>=0 && num<10){
        num = num.toString();
        num = "0" + num;
    }
    return num;
  }


  //d-day




  //to-do? 