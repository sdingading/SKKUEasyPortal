//user login
var uid = 0;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, uid로 사용자 파일관리
    uid = user.uid;
    loadSubjects();
    // ...
  } else {
  // User is signed out
  location.href = "login.html";
  }
}); 

const storage = firebase.storage();
const db = firebase.database();

///////////////timer////////////////

let subObj=[];

function loadSubjects(){
  db.ref('users/'+uid+'/subjects/').get().then((subs)=>{

    subObj = Object.values(subs.val());
    subObj.forEach(setTitle);
    //console.log('saved'); //testing
  }).catch((error)=>{
    //console.log('not saved'); //testing
    return;
  })
};


//title
window.addEventListener("load", () => {

  document.querySelectorAll('.subjectName').forEach( function(subject){

    if(subject.classList.contains('text')){

      subject.addEventListener("keydown", e=>{
        if(e.key === 'Enter'){
          let input = e.target.value;
          //console.log(input); //확인용
  
          if (e.target.classList.contains("subject1")){
            a=1;
          }
  
          else if (e.target.classList.contains("subject2")){
            a=2;
          }
  
          else if (e.target.classList.contains("subject3")){
            a=3;
          }
  
          else if (e.target.classList.contains("subject4")){
            a=4;
          }
  
          let subject = {
            name: input,
            id: a
          };
         
          db.ref('users/'+uid+'/subjects/').push(subject);
          setTitle(subject);
        }
      })
    }
  })
})

function setTitle(subject){
  let subTitle = document.querySelector('.subTitle'+subject.id);
  subTitle.innerText = subject.name;
}

//timer function
const Button = {
    play: 0,
    pause: 1
}

window.addEventListener("load", () => {
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
            button: Button.play,
            time: 0
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
      })
    });
  });

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
  }

  //for representing time in 2 digits
  function twoDigit(num){

    if (num>=0 && num<10){
        num = num.toString();
        num = "0" + num;
    }
    return num;
  }

  ///////////////D-Day////////////////

  function calDday(year,month,day){
    const targetDay = new Date(year, month-1, day);
    const today = new Date();
    var dDay = today.getTime() - targetDay.getTime();
    dDay = Math.floor(dDay/(1000*60*60*24));
    if (dDay>0){
      return "+"+dDay;
    }
    else
      return dDay;
  }

  //display d-days
  let finalStart = document.querySelector('#finalStart');
  finalStart.innerText = "D"+calDday(2022,5,30)+" days";

  let finalEnd = document.querySelector('#finalEnd');
  finalEnd.innerText = "D"+calDday(2022,6,3)+" days";

  let semesterEndStart = document.querySelector('#semesterEndStart');
  semesterEndStart.innerText = "D"+calDday(2022,6,5)+" days";

  let summerStart = document.querySelector('#summerStart');
  summerStart.innerText = "D"+calDday(2022,6,7)+" days";

  let summerEnd = document.querySelector('#summerEnd');
  summerEnd.innerText = "D"+calDday(2022,6,23)+" days";

  let scoreStart = document.querySelector('#scoreStart');
  scoreStart.innerText = "D"+calDday(2022,6,10)+" days";

  let scoreEnd = document.querySelector('#scoreEnd');
  scoreEnd.innerText = "D"+calDday(2022,6,15)+" days";

  let confirmStart = document.querySelector('#confirmStart');
  confirmStart.innerText = "D"+calDday(2022,6,20)+" days";

  let registerStart = document.querySelector('#registerStart');
  registerStart.innerText = "D"+calDday(2022,8,16)+" days";

  let registerEnd = document.querySelector('#registerEnd');
  registerEnd.innerText = "D"+calDday(2022,8,22)+" days";

  let secondSemester = document.querySelector('#secondSemester');
  secondSemester.innerText = "D"+calDday(2022,8,29)+" days";
