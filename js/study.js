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

///////////////timer///////////////

function saveSubject(subject){
  db.ref('users/'+uid+'/subjects/').update({
    [subject] : 0
  })
}
function saveTime(subject,time){
  db.ref('users/' + uid +'/subjects/').update({
    [subject] : time
  })
}
function loadSubjects(){
  db.ref('users/'+uid+'/subjects/').get().then((subs)=>{
    
    subObj = subs.val();
    Object.entries(subObj).forEach((sub)=>{
      SubjectAdd(sub[0],sub[1]);
    })
    //console.log('saved'); //testing
  }).catch((error)=>{
    //console.log('not saved'); //testing
    return;
  })
};

function check_length(area){
  let text = area.value;
  const max_length = 12;
  if(text.length > max_length){
    text = text.substr(0,max_length);
    area.value = text;
  }
}
function SubjectAdd(title,time){
  let dflex = document.createElement("div");
  dflex.className = "d-flex mb-4";

  let div = document.createElement("div");
  div.className = "subTitle";
  div.innerText = title;
  dflex.appendChild(div);

  let button = document.createElement("button");
  button.type = "button";
  button.className = "playButton";

  let clocking = 0;
  let timer = null;
  let autosave = null;
  let count = time;
  let curcount = 0;
  button.addEventListener("click",()=>{
    if(clocking){
      clocking= 0;
      if(timer != null){
        clearInterval(timer);
      }
      saveTime(title,count);
      button.className = "playButton"
    }
    else{
      clocking = 1;
      autosave = setInterval(()=>{
        saveTime(title,count);
      },10000)
      timer = setInterval(() => {
        let sec = ++count;
        let min = 0;
        let hr = 0;
        let cursec = ++curcount;
        let curmin = 0;
        let curhr = 0;
        if (sec>=60){
          sec=Math.floor(curcount%60);
          min+=Math.floor(curcount/60);
        }
        if(cursec >= 60){
          cursec=Math.floor(curcount%60);
          curmin+=Math.floor(curcount/60);
        }
        if(min>=60){
          min=Math.floor(min%60);
          hr+=Math.floor(min/60);
        }
        if(curmin>=60){
          curmin=Math.floor(curmin%60);
          curhr+=Math.floor(curmin/60);
        }
      
        //display
        curstrong.innerText = twoDigit(curhr) + " : " + twoDigit(curmin) + " : " + twoDigit(cursec);
        strong.innerText = twoDigit(hr) + " : " + twoDigit(min) + " : " + twoDigit(sec);
      }, 1000);
      button.className = "pauseButton";
    }
  })
  dflex.appendChild(button);
  let sec = count;
  let min = 0;
  let hr = 0;

  if (sec>=60){
    sec=Math.floor(count%60);
    min+=Math.floor(count/60);
  }

  if(min>=60){
    min=Math.floor(min%60);
    hr+=Math.floor(min/60);
  }
  let curtimediv = document.createElement("div");
  curtimediv.id = "timer";
  curtimediv.className = "timeBox";
  let curstrong = document.createElement("strong");
  curstrong.innerText = "00 : 00 : 00";
  curtimediv.appendChild(curstrong);
  dflex.appendChild(curtimediv);

  let timediv = document.createElement("div");
  timediv.id = "timer";
  timediv.className = "timeBox";
  let strong = document.createElement("strong");
  strong.innerText = twoDigit(hr) + " : " + twoDigit(min) + " : " + twoDigit(sec);

  timediv.appendChild(strong);
  dflex.appendChild(timediv);

  document.querySelector(".timerSet").appendChild(dflex);
}
document.querySelector("#Add").addEventListener("click",()=>{
  let Time = 0;
  saveSubject(document.getElementById("text").value);
  SubjectAdd(document.getElementById("text").value,Time);
})


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
