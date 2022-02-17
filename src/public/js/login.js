const formLogin = document.querySelector('#form-login');
const user = document.querySelector('#username');
const pass = document.querySelector('#password');

let token;
//Si ya hay un token no se puede entrar al login
const getToken = () => {
  const tokenGetted = sessionStorage.getItem('token');
  token = tokenGetted;
  if(token) {
    window.location.href = '/admin'
  }
}

getToken();

//Inicio de sesión
formLogin.addEventListener('submit', async (e) => {

  e.preventDefault();

  try {

    const username = user.value;
    const password = pass.value;

    if([username, password].includes('')) return;

    const res = await fetch('/auth/login', {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    });

    const data = await res.json();

    token = data.token

    if(data.ok) {
      sessionStorage.setItem('token', token)
      window.location.href = '/admin'
    } else {
      return alert(data.msg);
    }
   
  } catch (err) {
    console.warn(err);
  }

});