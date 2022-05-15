// database
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

function changeIframe(url) {
  document.getElementById("js-searchContent").src = url;
}

function getGrad() {
  let majorType = document.querySelector("#majorType");
  let enterYear = document.querySelector("#enterYear").value;
  let regex = /[^0-9]/g;
  let year = enterYear.replace(regex, "");
  let _url = `https://www.skku.edu/_res/skku/etc/${year}_p7.pdf`;
  window.open(_url);
}

// modal
var myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
let cards = document.querySelectorAll(".card");

let data = new Array();
// wifi
data.push(`<div class="row">
<div>
  <br>
  &nbsp;kingo ID가 있다면 교내에서 SKKU 와이파이 사용이 가능합니다.
  <br><br>
  <ol class="">
    <li class="">
      <p>
         안드로이드<br>
        <img
          src="https://images.unsplash.com/photo-1607027340690-37e80b0f1b31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
          class="figure-img img-fluid rounded" alt="..." style="width: 400px;">
        <img
          src="https://images.unsplash.com/photo-1607027340690-37e80b0f1b31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
          class="figure-img img-fluid rounded" alt="..." style="width: 400px;">
        <img
          src="https://images.unsplash.com/photo-1607027340690-37e80b0f1b31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
          class="figure-img img-fluid rounded" alt="..." style="width: 400px;">
      </p>
    </li>
    <li class="">
      <p>
        ios<br>
        <img
          src="https://images.unsplash.com/photo-1607027340690-37e80b0f1b31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
          class="figure-img img-fluid rounded" alt="..." style="width: 400px;">
      </p>
    </li>
  </ol>
</div>
<div>
  <h5>
    [ 참고 문서 ]
  </h5>
  <ul>
    <li><a href="http://ibook.skku.edu/Viewer/wifi_android">안드로이드</a> <br></li>
    <li><a href="http://ibook.skku.edu/Viewer/wifi_android11">안드로이드11</a> <br></li>
    <li><a href="http://ibook.skku.edu/Viewer/wifi_windows10">win 10</a> <br></li>
    <li><a href="http://ibook.skku.edu/Viewer/wifi_ios">ios</a> <br></li>
    <li><a href="http://ibook.skku.edu/Viewer/wifi_mac">mac</a> <br></li>
  </ul>
</div>
</div>
`);
// grad
data.push(`<div class="row">
<div class="col-8">
  <div class="col-auto my-1">
    <label class="mr-sm-2" for="majorType"> 전공 </label>
    <select class="form-select form-select-lg mb-3" id="majorType" style="width:auto;" onchange="majTypeChange()">
      <option value="major" selected> 원전공</option>
      <option value="sub">복수 전공</option>
    </select>
  </div>
  <div class="col-auto my-1" id="majYear" style="display: ;">
    <label class="mr-sm-2" for="majorEnterYear"> 학번 </label>
    <select class="form-select form-select-lg mb-3" id="majorEnterYear" style="width:auto;>
      <option value="y2022" selected> 2022 </option>
      <option value="y2021"> 2021 </option>
      <option value="y2020"> 2020 </option>
      <option value="y2019"> 2019 </option>
      <option value="y2018"> 2018 </option>
      <option value="y2017"> 2017 </option>
    </select>
  </div>
  <div class="col-auto my-1" id="subMajYear" style="display: none;">
    <label class="mr-sm-2" for="subMajorEnterYear"> 복전 진입 시점 </label>
    <select class="form-select form-select-lg mb-3" id="subMajorEnterYear" style="width:auto;>
      <option value="y2022_1" selected> 2022_1 </option>
      <option value="y2022_2" selected> 2022_2 </option>
      <option value="y2021_1"> 2021_1 </option>
      <option value="y2021_2"> 2021_2 </option>
      <option value="y2020_1"> 2020_1 </option>
      <option value="y2020_2"> 2020_2 </option>
      <option value="y2019_1"> 2019_1 </option>
      <option value="y2019_2"> 2019_2 </option>
      <option value="y2018_1"> 2018_1 </option>
      <option value="y2018_2"> 2018_2 </option>
      <option value="y2017_1"> 2017_1 </option>
      <option value="y2017_2"> 2017_2 </option>
    </select>
  </div>
  <div class="col-auto my-1">
    <button type="submit" class="btn btn-primary" onclick="getGrad()">확인</button>
  </div>
  <div id="gradRes">
  </div>
</div>
<div class="col-4">
  <div class="mx-1">
    소프트웨어 학과 사무실 <br>
    &nbsp;(031-299-4100)<br><br>
    참고<br>
    <a href="https://www.skku.edu/skku/edu/bachelor/ca_de_schedule01.do"
      target="_blank" class="btn btn-outline-secondary m-2">2022 학사제도</a><br>
  </div>
</div>
</div>
`);
// prev
data.push(`<div class="row">
<div>
    <div>학교에서 제공하는 여러 SW, 사이트들을 이용할 수 있습니다.
        <div>
            <br>
            <button type="button" class="btn btn-info" id="tipBtn-1"
                onclick="handleTipButton()">G-Suite</button>
            <button type="button" class="btn btn-info" id="tipBtn-2" onclick="handleTipButton()">MS
                Office</button>
            <button type="button" class="btn btn-info" id="tipBtn-3"
                onclick="handleTipButton()">Adobe</button>
            <button type="button" class="btn btn-info" id="tipBtn-4" onclick="handleTipButton()">논문,
                전자저널</button>
        </div>
        <div id="tipContents"> 
            <br>
            <div id="tipContent-1" style="display: none;">
                <h3>[ G-suite ]</h3>
                G-suite란 구글에서 제공하는 클라우드 기반의서비스로, kingoID 회원가입 시 (kingoID)@g.skku.edu 의 구글 계정이 생성됩니다. <br>
                교육, 협업, 커뮤니케이션 등을 위한 다양한 구글 서비스를 사용할 수 있습니다. <br>
                <br>(22/5/14기준) 구글 드라이브 용량: 무제한 <br><br>
            </div>
            <div id="tipContent-2" style="display: none;">
                <h3>[ MS Office ]</h3>
                성균관대학교 교직원 및 학생의 학교 생활을 위해 MS office(word, power point, excel 등의 프로그램)를 제공하고 있습니다. <br>
                최대 5대의 디바이스까지 정품 오피스를 설치할 수 있으며, one Drive 클라우드 스토리지 1TB를 사용할 수 있습니다. <br>
                <br>
                <h4>~@o365.skku.edu 계정이 없는 경우</h4>
                1. office 365를 사용하기 위해서는 o365.skku.edu 아이디를 생성해야 합니다. <br>
                <img src="../images/ms_gls.png" alt="" class="px-5 my-2 img-fluid rounded"
                    style=";"> <br>
                2. GLS - IT 서비스 - office365 설치 버튼을 클릭 후 계정을 생성합니다.<br>
                <img src="../images/ms_gls_2.png" alt="" class="px-5 my-2 img-fluid rounded"
                    style=";"><br>
                3. 우측 Office 설치 버튼 클릭 후 설정에 맞게 설치합니다.<br>
                <img src="../images/ms_ms.png" alt="" class="px-5 my-2 figure-img img-fluid rounded"
                    style=";">
                <br>
                <br>
                [~@o365.skku.edu 계정이 있는 경우]<br>
                1. 킹고포털 접속 후 상단 메뉴바 우측
                Office365 버튼 클릭<br>
                <img src="../images/ms_portal.png" alt="" class="px-5 my-2 figure-img img-fluid rounded"
                    style=";"><br>
                2. ~@o365.skku.edu 계정으로 로그인 후 우측 Office 설치 버튼 클릭 후 설정에 맞게 설치합니다. <br>
                <img src="../images/ms_ms_2.png" alt="" class="px-5 my-2 figure-img img-fluid rounded"
                    style=";">
                <br>
            </div>
            <div id="tipContent-3" style="display: none;">
                <div>
                    <h3>[ Adobe ]</h3>
                    수업, 연구, 행정용으로 adobe SW를 제공하고 있습니다. <br>
                    (22.5.14 기준) 계약 기간 : ~ 23/8/27 <br>
                    - 해당 게시글 : <ul>
                        <li>(kingoID 로그인 상태에서 접속 가능) <a
                                href="https://app.skku.edu/emate_app/bbs/b1805133145.nsf/view01_ko/6E2D67163C6C5154492585D20046269B?OpenDocument&rowid=6E2D67163C6C5154492585D20046269B_2996&ui=webmail"
                                target="_blank" class="btn btn-secondary">LINK</a></li>
                        <li>SKKU -> kingoID로그인 -> 게시판 -> "Adobe 소프트웨어 라이선스 갱신 및 이용 안내" (8566번 게시글) 확인</li>
                        </ul>
                        &nbsp;<i class="bi bi-exclamation-octagon"></i>
                       설치가 모두 완료되고 학교 인증을 거쳐야 사용이 가능합니다. </li>
                    <br>
                </div>
            </div>
            <div id="tipContent-4" style="display: none;">
              <h3>[ 논문(학술DB), 전자저널 등 조회 ]</h3>
                성균관대학교 학술 정보관에서는 여러 전자자료(DBpia, RISS 등)를 제공하고 있습니다. <br>
                재학 및 재직 중인 구성원에 한해서 이용할 수 있고 학술정보관 홈페이지를 통하여 접속이 가능합니다.<br>
                <a href="https://lib.skku.edu/suwon/#/er/database#firstChartset" target="_blank"
                    class="btn btn-secondary">LINK</a><br><br>
            </div>
        </div>
    </div>
</div>
</div>`);

cards.forEach((e, i) => {
  e.addEventListener("click", () => {
    let title = document.querySelector(`#${e.id} .card-title`);
    let subTitle = document.querySelector(`#${e.id} .card-text`);

    let myModalLabel = document.querySelector("#myModalLabel");
    let myModalSubLable = document.querySelector("#myModalSubLable");
    let myModalContents = document.querySelector("#myModalContents");

    myModalLabel.innerHTML = title.innerText;
    myModalSubLable.innerHTML = subTitle.innerText;
    myModalContents.innerHTML = data[i];
    myModal.show();
    // console.log(myModal);
  });
});

function majTypeChange() {
  if (event.target.value === "major") {
    console.log(event.target.value);
    document.querySelector("#subMajYear").style.display = "none";
  }
  if (event.target.value === "sub") {
    console.log(event.target.value);
    document.querySelector("#subMajYear").style.display = "";
  }
}

function setButtonAtChild(_href, _contents) {
  let child = document.createElement("a");
  // child.href = `https://www.skku.edu/_res/skku/etc/${year}_p7.pdf`;
  child.href = _href;
  child.target = "_blank";
  child.innerText = _contents;
  child.classList.add("btn", "btn-outline-secondary", "m-2");
  return child;
}

function getGrad() {
  let majorType = document.querySelector("#majorType").value;
  let regex = /[^0-9]/g;
  let majorEnterYear = document.querySelector("#majorEnterYear").value;
  majorEnterYear = majorEnterYear.replace(regex, "");
  let subMajorEnterYear = document.querySelector("#subMajorEnterYear").value;
  subMajorEnterYear = subMajorEnterYear.replace(regex, "");
  let gradRes = document.querySelector("#gradRes");
  gradRes.textContent = "";
  if (majorType === "major") {
    let _url = `https://cs.skku.edu/ko/news/notice/view/6087`;
    let contents = `인턴십 졸업요건`;
    gradRes.appendChild(setButtonAtChild(_url, contents));
    gradRes.appendChild(document.createElement("br"));
  } else {
    if (subMajorEnterYear >= 20192) {
      let _url = `https://cs.skku.edu/ko/news/notice/view/4669`;
      let contents = `복수 전공 졸업 평가`;
      gradRes.appendChild(setButtonAtChild(_url, contents));
      gradRes.appendChild(document.createElement("br"));
    }
  }

  if (majorEnterYear >= 2020) {
    let _url = "https://www.skku.edu/_res/skku/etc/2022_p19.pdf";
    let contents = `${majorEnterYear}학번 (신)삼품`;
    gradRes.appendChild(setButtonAtChild(_url, contents));
    // gradRes.appendChild(document.createElement("br"));
  } else {
    let _url = "https://www.skku.edu/_res/skku/etc/2022_p20.pdf";
    let contents = `${majorEnterYear}학번 (구)삼품`;
    gradRes.appendChild(setButtonAtChild(_url, contents));
    // gradRes.appendChild(document.createElement("br"));
  }

  if (1) {
    let _url = `https://www.skku.edu/_res/skku/etc/${majorEnterYear}_p7.pdf`;
    let contents = `${majorEnterYear}학번 학사제도`;
    gradRes.appendChild(setButtonAtChild(_url, contents));
    // gradRes.appendChild(document.createElement("br"));

    _url = `https://www.skku.edu/_res/skku/etc/${majorEnterYear}_p12.pdf`;
    contents = `${majorEnterYear}학번 졸업요건`;
    gradRes.appendChild(setButtonAtChild(_url, contents));
    // gradRes.appendChild(document.createElement("br"));
  }
}

//pervi
function handleTipButton() {
  let tar = event.target;
  let parent = document.querySelector("#tipContents");
  for (let i = 1; i < parent.children.length; i++) {
    parent.children[i].style.display = "none";
  }
  let tarCont = tar.id;
  document.querySelector(
    `#${tarCont.replace("Btn", "Content")}`
  ).style.display = "";
}
