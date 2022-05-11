const buttons = document.querySelector("#buttons");
const db = firebase.firestore();
const signupEmail = (email,password) =>{
    firebase.auth().createUserWithEmailAndPassword(email,password);
}
const loginEmail = (email,password)=>{
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().signInWithEmailAndPassword(email,password);
    firebase.auth().setStatus(" ");
}
firebase.auth().onAuthStateChanged((user)=>{
  console.log(firebase.auth().currentUser);
  if(user){
    location.href = "Search.html";
  }
});

const login_area = document.getElementById('login-area');
buttons.addEventListener('click', (e) => {
    e.preventDefault();
    email = document.querySelector("#inputEmail2");
    password = document.querySelector("#inputPassword2")
    if (e.target.id === 'signin') {
      loginEmail(email.value, password.value).then((result) => {
        const user = result.user;
        loginSuccess(user.email, user.uid);
      })
      .catch(()=> login_area.innerHTML ="아이디 또는 비밀번호가 틀렸습니다.");
    } else if (e.target.id === 'signup') {
      signupEmail(email.value, password.value) //
        .then((result) => {
          const user = result.user;
          db.collection("users").doc(email.value).set({
            email : email.value,
            password : password.value
          });
          login_area.innerHTML="회원가입이 완료되었습니다.";
        })
        .catch(()=> login_area.innerHTML="아이디가 이미 존재합니다.");
    }
  });
  const loginSuccess = (email, uid) => {
    login_area.innerHTML = `<h2>Login 성공!</h2><div>uid: ${uid}</div><div>email: ${email}</div>`;
  };
  