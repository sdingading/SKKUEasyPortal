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


let subObj=[];

function saveSubject(subject){
 
  db.ref('users/'+uid+'/subjects/').get().then((subs)=>{
    subObj = Object.values(subs.val())
    let subObj2 = subObj;
    subObj.forEach(e => {  
      if (subject.id === e.id){
        subObj2 = subObj.filter((element)=> element !== e)
      }
    });
    db.ref('users/'+uid+'/subjects/').remove();
    for(let i=0; i<subObj2.length; i++){
      db.ref('users/'+uid+'/subjects/').push(subObj2[i]);
    }
    db.ref('users/'+uid+'/subjects/').push(subject);
    console.log('saved'); //testing
  }).catch((error)=>{
    console.log('not saved'); //testing
    db.ref('users/'+uid+'/subjects/').push(subject);
    return;
  }) 
}

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

document.querySelectorAll('.subjectName').forEach( function(subject){

    if(subject.classList.contains('text')){

      subject.addEventListener("keydown", e=>{
        if(e.key === 'Enter'){
          let input = e.target.value;
          //console.log(input); //확인용
  
  
          let subject = {
            name: input,
            id: a
          };
         
          saveSubject(subject);
          setTitle(subject);
        }
      })
    }
  })

function setTitle(subject){
  let subTitle = document.querySelector('.subTitle'+subject.id);
  subTitle.innerText = subject.name;
}

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
  let count = 0;
  button.addEventListener("click",()=>{
    if(clocking){
      clocking= 0;
      if(timer != null){
        clearInterval(timer);
      }
      console.log(count);
      button.className = "playButton"
    }
    else{
      clocking = 1;
      timer = setInterval(() => {
        let sec = ++count;
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
        strong.innerText = twoDigit(hr) + " : " + twoDigit(min) + " : " + twoDigit(sec);
      }, 1000);
      button.className = "pauseButton"
    }
  })
  dflex.appendChild(button);

  let timediv = document.createElement("div");
  timediv.id = "timer1";
  timediv.className = "timeBox";
  let strong = document.createElement("strong");
  strong.innerText = " 00 : 00 : 00 ";

  timediv.appendChild(strong);
  dflex.appendChild(timediv);

  document.querySelector(".timerSet").appendChild(dflex);
}
document.querySelector("#Add").addEventListener("click",()=>{
  savedTime ={
    sec : 0,
    min : 0,
    hr : 0
  }
  SubjectAdd(document.getElementById("text").value,savedTime);
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
