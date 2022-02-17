const contenedor = document.querySelector('#contenedor');
const deleteImgBtn = document.getElementsByClassName('container')[0];
const body = document.querySelector('#body');
const loader = document.querySelector('#loader')

let token;
//Si no hay token en el storage se redirecciona al login
const getToken = () => {
  const tokenGetted = sessionStorage.getItem('token');
  token = tokenGetted;
  if(!token) {
    window.location.href = '../login'
  }
}

getToken();
//Cerrar sesión
document.querySelector('#signout').addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = '../login';
 });

//Loader spinner empieza
const startLoad = () => {
  body.classList.add('d-none');
  loader.classList.remove('d-none');
}

//Loader spinner termina
const stopLoad = () => {
  loader.classList.add('d-none');
  body.classList.remove('d-none');
}

const ID = contenedor.dataset.id

//Obtener el producto y desplegarlo
const getProduct = async () => {

  try {
    startLoad();
    const res = await fetch(`/api/tela/${ID}`);
    const data = await res.json();
    const {tela} = data;

    contenedor.innerHTML = 
      `
        <div class="mt-3">
          <h2 id="err" class= "text-center alert alert-danger d-none"></h2>
          <h2>Artículo: ${tela.nombre}</h2>
          <button class="buttons color-principal" data-bs-toggle="modal" data-bs-target="#modal-nombre">Editar nombre</button>
        </div>
        <hr />
        <div>
          <h3>Composición:</h3>
          <p class="fw-normal fs-5">${tela.comp}</p>
          <button class="buttons color-principal" data-bs-toggle="modal" data-bs-target="#modal-comp">Editar composición</button>
        </div>
        <hr />
        <div>
          <h3>Descripción</h3> 
          <p class="tela-desc">${tela.desc}</p>
          <button class="buttons color-principal" data-bs-toggle="modal" data-bs-target="#modal-desc">Editar descripción</button>
        </div>
        <hr />
        <article>
          <div id="delete-img" data-id=${tela._id}>
            <h3>Imagenes</h3>
            <div class="grid">
            </div>
          </div>
        </article>
      `
    tela.imagenes.map( img => {
      document.querySelector('.grid').innerHTML += 
      `
        <div class="me-3 mt-3 card">
          <div class="p-3 text-end">
            <button class="btn btn-danger" data-img="${img.public_id}">
              X
            </button>
          </div>
          <img
            src=${img.url}
            alt=${tela.nombre}
            class="imgs"
          />
        </div>
      `
    })

    return tela;
    
  } catch (err) {
    console.warn(err);
  } finally {
    stopLoad();
  }
  
}

window.onload = getProduct();

const formText = document.querySelectorAll("#form-text");

//Editar el nombre, la composición y la descripción
const updateValues = async (e, imagen) => {
  e.preventDefault()

  const {nombre, desc, comp, imagenes} = await getProduct()

  const nombreValue = document.querySelector('#nombre');
  const compValue = document.querySelector('#comp');
  const descValue = document.querySelector('#desc');

  const productToUpdate = {
    nombre: nombreValue.value ?? nombre,
    desc: descValue.value ?? desc,
    comp: compValue.value ?? comp,
    imagenes,
    imagen
  }

  try {
    startLoad();
    const res = await fetch(`/admin/${ID}`, {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productToUpdate)
    });

    const data = await res.json();
    const errorMessage = document.querySelector('#err');

    if (data.ok) {
      getProduct();  
      errorMessage.classList.add('d-none');
    } else {
      errorMessage.classList.remove('d-none');
      errorMessage.textContent = data.errors[0].msg;
      setTimeout(() => {
        errorMessage.classList.add('d-none');
      }, 5000);
    }

  } catch (err) {
    console.warn(err);
  } finally {
    stopLoad();
  }

}

formText.forEach(form => {
  form.addEventListener('submit', updateValues);
});


//Eliminar imagenes del producto
deleteImgBtn?.addEventListener('click', async (e) => {

  const btn = e.target;
  
  if(btn.classList.contains('btn-danger')) {

    const imagenUrl = btn.dataset.img;
    const {imagenes} = await getProduct()
    
    const imagen = imagenes.find( img => img.public_id === imagenUrl );

    updateValues(e, imagen)

  }

});


//Agregar una nueva imagen al producto
const formImg = document.querySelector('#formImg');
const img = document.querySelector("#inputGroupFile01");

formImg.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData();
  formData.append('images', img.files[0]);
  
  try { 
    startLoad();
    const res = await fetch(`/admin/upload/${ID}`, {
      method: "put",
      body: formData
    });

    const data = await res.json();
    const errorMessage = document.querySelector('#err');

    if (data.ok) {
      getProduct();
      errorMessage.classList.add('d-none');
    } else {
      errorMessage.classList.remove('d-none');
      errorMessage.textContent = data.msg;
      setTimeout(() => {
        errorMessage.classList.add('d-none');
      }, 5000);
    }
    
  } catch (err) {
      console.warn(err);
  } finally {
    stopLoad();
  }

})


