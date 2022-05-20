const buttons = document.querySelector("#buttons");
let uid =0 ;
const db = firebase.database();
const signupEmail = (email,password) =>{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
      login_area.innerHTML="회원가입이 완료되었습니다.";
      uid = firebase.auth().currentUser.uid;
      db.ref('users/'+uid).set({
        email: email,
        password: password,
        name: "user"
      }).then(()=>location.href="../page/home.html")
      })
    .catch((e)=>{
      if(e.code === 'auth/email-already-in-use')
       login_area.innerHTML ="아이디가 이미 존재합니다.";
      else if(e.code === 'auth/invalid-email')
      login_area.innerHTML ="이메일 형식이 잘못되었습니다.";
      db.ref('users/'+uid).remove();
    });
    return 0;
}
const loginEmail = (email,password)=>{
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    return firebase.auth().signInWithEmailAndPassword(email,password);
}
const login_area = document.getElementById('login-area');
buttons.addEventListener('click', (e) => {
    e.preventDefault();
    email = document.querySelector("#inputEmail2");
    password = document.querySelector("#inputPassword2")
    if (e.target.id === 'signin') {
      loginEmail(email.value, password.value).then(() => {
        location.href="../page/home.html";
      })
      .catch((e)=>{
        if(e.code === 'auth/wrong-password')
        login_area.innerHTML ="비밀번호가 틀렸습니다."
        if(e.code === 'auth/user-not-found')
        login_area.innerHTML ="아이디가 존재하지 않습니다."
      });
    } else if (e.target.id === 'signup') {
      signupEmail(email.value, password.value)
    }
  });
  