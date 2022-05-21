//user login
var uid = 0;


window.addEventListener("load",()=>{
  document.getElementById("LoadButton").click();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, uid로 사용자 파일관리
      uid = user.uid;
      loadSubjects();
      loadDday();
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
  deleteButton.className = "bi bi-x-square-fill clickButton"
  deleteButton.style = "font-size:32px; cursor:pointer";
  
  //refresh Button
  let refreshButton = document.createElement("div");
  refreshButton.id = "refreshButton";
  refreshButton.className = "bi bi-eraser-fill ms-2 clickButton";
  refreshButton.style = "font-size:32px; cursor:pointer";

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
document.querySelector("#S_add").addEventListener("click",()=>{
  document.getElementById("Subjecttext").value = '';
})
document.querySelector("#SubjectAdd").addEventListener("click",()=>{
  let Time = 0;
  let title = document.getElementById("Subjecttext").value;
  if(title == '') title = "null";
  let count = 0;
  db.ref('users/' + uid + '/subjects/').get().then((subjects)=>{
    if(subjects.exists()){
      while(1){
        let check = false;
        let checkname = title;
        Object.keys(subjects.val()).forEach((subject)=>{
        if(count) checkname = title + "-" + count;
        if(checkname == subject){
          count++;
          check = true;
        }
      })
        if(!check) break;
      }
    }
  }).then(()=>{
    if(count) title = title + "-" + count;
    count = 0;
    saveSubject(title);
    SubjectAdd(title,Time);
  })
})

document.querySelector("#DdayAdd").addEventListener("click",()=>{
  let event = document.getElementById("Ddaytext").value;
  if(event =='') event = "null";
  let count = 0;
  db.ref('users/' + uid + '/Ddays').get().then((ddays)=>{
    if(ddays.exists()){
      while(1){
        let check = false;
        let checkname = event;
        Object.keys(ddays.val()).forEach((dday)=>{
        if(count) checkname = event + "-" + count;
        if(checkname == dday){
          count++;
          check = true;
        }
      })
      if(!check) break;
      }
    }
  }).then(()=>{
    if(count) event = event + "-" + count;
    count = 0;
    let Startdate = document.getElementById("Startdate").value.split("-");
    Startdate = calDday(Startdate[0],Startdate[1],Startdate[2]);
    let Enddate = document.getElementById("Enddate").value.split("-");
    Enddate = calDday(Enddate[0],Enddate[1],Enddate[2]);
    saveDday(event,Startdate,Enddate);
    DdayAdd(event,Startdate,Enddate);
  })
})
function loadDday(){
  db.ref('users/' + uid + '/Ddays/').get().then((Ddays)=>{
    if(Ddays.exists()){
      DdaysObj = Ddays.val();
      Object.entries(DdaysObj).forEach((Dday)=>{
        DdayAdd(Dday[0],Dday[1].starttime,Dday[1].endtime);
      })
    }
  })
}
function saveDday(title,starttime,endtime){
  document.getElementById("LoadButton").click();
  db.ref('users/' + uid +'/Ddays/').update({
    [title] : {starttime, endtime}
  })
  .then(document.getElementById("CompleteButton").click())
}
function DdayAdd(event,Startdate,Enddate){
  let tr = document.createElement("tr");
  let Event = document.createElement("td");
  Event.innerText = event;
  let startday = document.createElement("td");
  if(Startdate) startday.innerText = "D"+Startdate+" days"; 
  else startday.innerText = "--";
  let end = document.createElement("td");
  end.className = "position-relative";
  let endday = document.createElement("p");
  endday.className = "position-absolute";
  let deleteDate = document.createElement("i");
  deleteDate.className ="bi bi-x position-absolute";
  deleteDate.style = "font-size:15pt; top:5px; right:-25px; cursor:pointer";
  deleteDate.addEventListener("click",()=>{
    db.ref('users/' + uid + '/Ddays/' + event).remove();
    tr.remove();
  })
  if(Enddate) endday.innerText = "D"+Enddate+" days";
  else endday.innerText = "--";
  end.append(endday);
  end.append(deleteDate);
  
  tr.append(Event,startday,end);
  document.querySelector("#Ddaybody").append(tr);
}
document.querySelector("#Startdate").addEventListener("change",(e)=>{
  let tomorrow = new Date();
  tomorrow = e.target.valueAsDate;
  tomorrow.setDate(tomorrow.getDate()+1);
  document.querySelector("#Enddate").valueAsDate = tomorrow;
  document.querySelector('#Enddate').setAttribute("min",tomorrow.toISOString().split("T")[0]);
})
document.querySelector("#D_add").addEventListener("click",()=>{
  let date = new Date();
  let today = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  let nextday = new Date(date.getTime() - date.getTimezoneOffset() * 60000 + 86400000);
  document.querySelector("#Ddaytext").value = '';
  document.querySelector("#Startdate").valueAsDate = today;
  document.querySelector("#Enddate").valueAsDate = nextday;
  document.querySelector('#Startdate').setAttribute("min",today.toISOString().split("T")[0]);
  document.querySelector('#Enddate').setAttribute("min",nextday.toISOString().split("T")[0]);
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
