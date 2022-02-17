const confirmModal = document.querySelector('#confirm-modal');
const formAdd = document.querySelector('#form-add');
const body = document.querySelector('#body');
const loader = document.querySelector('#loader')

let token;
//Si no hay token en el storage se redirecciona al login
const getToken = () => {
  const tokenGetted = sessionStorage.getItem('token');
  token = tokenGetted;
  if(!token) {
    window.location.href = 'admin/login'
  }
}

getToken()
//Cerrar sesión
document.querySelector('#signout').addEventListener('click', () => {
  sessionStorage.removeItem('token');
 window.location.href = 'admin/login';
});

const startLoad = () => {
  body.classList.add('d-none');
  loader.classList.remove('d-none');
}

const stopLoad = () => {
  loader.classList.add('d-none');
  body.classList.remove('d-none');
}

formAdd.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.querySelector('#nombre');
  const comp = document.querySelector('#comp');
  const desc = document.querySelector('#desc');

  const newTela = {
    nombre: nombre.value,
    comp: comp.value,
    desc: desc.value
  }
  
  try {

    startLoad();
    const res = await fetch('/admin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTela)
    });

    const data = await res.json();
    const err = document.querySelector('#add-err');
    
    if(data.ok) {
      window.location.reload();
    } else {
      err.classList.remove('d-none');
      err.textContent = data.errors[0].msg;
      setTimeout(() => {
        err.classList.add('d-none');
      }, 7000);
    }
    
  } catch (err) {
    console.warn(err.msg);
  } finally {
    stopLoad();
  } 

});

confirmModal?.addEventListener('click', async (e) => {
  
  if(e.target.classList.contains('cancel-btn')) return;
  
  else if(e.target.classList.contains('conf-btn')){
    
    const id = document.querySelector('#btn-trash').dataset.id;

    try { 
      const res = await fetch(`/admin/${id}`, {method: "delete"})
      const data = await res.json();
      
      if(data.ok) {
        window.location.reload();
      }
      
    } catch (err) {
        console.warn(err);
    }  
  }
}); 

