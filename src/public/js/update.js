const contenedor = document.querySelector('#contenedor');
const deleteImgBtn = document.getElementsByClassName('container')[0];

const ID = contenedor.dataset.id

//Obtener el producto y desplegarlo
const getProduct = async () => {
  const res = await fetch(`/api/tela/${ID}`);
  const {tela} = await res.json();

  contenedor.innerHTML = 
  `
    <div class="mt-3">
      <h2>Artículo: ${tela.nombre}</h2>
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
        <img
          src=${img}
          alt=${tela.nombre}
          class="card-img-top imgs"
        />
        <div class="card-body">
          <button class="btn btn-danger mt-3" data-img="${img}">
            X
          </button>
        </div>
      </div>
    `
  })
  return tela.imagenes;
}

window.onload = getProduct();

//Eliminar imagenes del producto
deleteImgBtn?.addEventListener('click', async (e) => {

  const btn = e.target;
  
  if(btn.classList.contains('btn-danger')) {

    const imagen = btn.dataset.img;
    const imagenes = await getProduct();
    const imagenesFiltradas = imagenes.filter( img => img !== imagen)

    try { 
      const res = await fetch(`/admin/${ID}`, {
        method: "put",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({imagenes: imagenesFiltradas})
      });
      const data = await res.json();
      if (data.ok) {
        getProduct();
      }
    } catch (err) {
        console.warn(err);
    };

  }

});


//Agregar una nueva imagen al producto
const formImg = document.querySelector('#formImg');
const img1 = document.querySelector("#inputGroupFile01");

formImg.addEventListener('submit', async (e) => {
  e.preventDefault()
  let newImg;
  const formData = new FormData();
  formData.append('images', img1.files[0]);

  try {
    const res = await fetch('/upload', {
    method:'POST',
    body: formData
    })
    const {url} = await res.json();
    newImg = url;
  } catch (err) {
      console.warn(err);
  }

  try { 
    const res = await fetch(`/admin/upload/${ID}`, {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newImg})
    });
    const data = await res.json();
    if (data.ok) {
      getProduct();
    }
  } catch (err) {
      console.warn(err);
  };


})


