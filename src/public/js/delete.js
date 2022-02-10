const productsContainer = document.querySelector('#productsContainer');
const button = document.querySelectorAll('#eliminarBtn');

productsContainer?.addEventListener('click', async (e) => {
  const btn = e.target;
  
  if(btn.classList.contains('bi-trash-fill') || btn.classList.contains("btn-danger")){
    const id = btn.dataset.id;

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