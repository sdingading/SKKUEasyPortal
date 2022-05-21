//user login
var uid = 0;


window.addEventListener("load",()=>{
  document.getElementById("LoadButton").click();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, uid로 사용자 파일관리
      uid = user.uid;
      loadSubjects();
      
      // ...
    }
  }); 
})
// 로딩 화면 호출 document.getElementById("LoadButton").click();
// 로딩 화면 삭제 document.getElementById("CompleteButton").click();
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
    if(subs.exists()){
      subObj = subs.val();
      Object.entries(subObj).forEach((sub)=>{
        SubjectAdd(sub[0],sub[1]);
      })
    }
    document.getElementById("CompleteButton").click();
    //console.log('saved'); //testing
  }).catch((error)=>{
    console.log(error);
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
  
  //delete Button 추가
  let deleteButton = document.createElement("a");
  deleteButton.id = "deleteButton"
  deleteButton.className = "bi bi-x-square-fill"
  deleteButton.style = "font-size:32px; color:#6F5141; cursor:pointer";
  
  //refresh Button
  let refreshButton = document.createElement("div");
  refreshButton.id = "refreshButton";
  refreshButton.className = "bi bi-eraser-fill ms-2";
  refreshButton.style = "font-size:32px; color:#6F5141; cursor:pointer";

  let div = document.createElement("div");
  div.className = "subTitle mt-1";
  div.innerText = title;

  let button = document.createElement("button");
  button.type = "button";
  button.className = "playButton";

  let clocking = 0;
  let timer = null;
  let autosave = null;
  let count = time;
  let curcount = 0;

  deleteButton.addEventListener("click",()=>{
    dflex.remove();
    db.ref('users/' + uid +'/subjects/' + title).remove();
  })

  refreshButton.addEventListener("click", ()=>{
    count = 0;
    curcount = 0;
    timediv.innerHTML = "<strong>00 : 00 : 00</strong>";
    curtimediv.innerHTML = "<strong> 00 : 00 : 00</strong>";
    saveTime(title,count);
  })

  button.addEventListener("click",()=>{
    if(clocking){
      clocking= 0;
      if(timer != null){
        clearInterval(timer);
      }
      if(autosave != null){
        clearInterval(autosave);
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
          sec=Math.floor(count%60);
          min+=Math.floor(count/60);
        }
        if(cursec >= 60){
          cursec=Math.floor(curcount%60);
          curmin+=Math.floor(curcount/60);
        }
        if(min>=60){
          min=Math.floor(count%3600);
          hr+=Math.floor(count/3600);
        }
        if(curmin>=60){
          curmin=Math.floor(curcount%3600);
          curhr+=Math.floor(curcount/3600);
        }
      
        //display
        curtimediv.innerText = twoDigit(curhr) + " : " + twoDigit(curmin) + " : " + twoDigit(cursec);
        timediv.innerHTML = "<strong>" + twoDigit(hr) + " : " + twoDigit(min) + " : " + twoDigit(sec) + "</strong>";
      }, 1000);
      button.className = "pauseButton";
    }

  })
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
  curtimediv.innerHTML = "<strong>00 : 00 : 00</strong>";

  let timediv = document.createElement("div");
  timediv.id = "timer";
  timediv.className = "timeBox";
  timediv.innerHTML = "<strong>" + twoDigit(hr) + " : " + twoDigit(min) + " : " + twoDigit(sec) + "</strong>";

  dflex.append(deleteButton,div,button,curtimediv,timediv,refreshButton);
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
