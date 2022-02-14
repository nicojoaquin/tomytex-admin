const confirmModal = document.querySelector('#confirm-modal');
const formAdd = document.querySelector('#form-add');
const body = document.querySelector('#body');
const loader = document.querySelector('#loader')

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
    })
    await res.json();
  } catch (err) {
    console.warn(err);
  } finally {
    window.location.reload();
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

