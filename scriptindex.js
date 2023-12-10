let indexpos = document.getElementsByClassName("rowIndex")[0]
let lunghezza
let completamento = 0
setTimeout(()=>{fetch("https://striveschool-api.herokuapp.com/api/product/", {

    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDk0OWZlMDMxZTAwMTliYTE1MmYiLCJpYXQiOjE3MDIwMzc4MzMsImV4cCI6MTcwMzI0NzQzM30.cw0yp3zc7d30TEg7LENi3fJysGxmhdSqWKrm-nNlZzo"
    },

})
    .then(response => {
        if (!response.ok) {
            erroreGenerico('Api non caricata correttamente attendi qualche secondo prima di procedere');
        }


        return response.json();
    })
    .then(data => {


        data.forEach(element => {
            addIndex(element)

        })
    })},1500)



function addIndex(data) {
    indexpos.innerHTML += `<div class="col-3">
    <div class="card">
        <img class="card-img-top" src="${data.imageUrl}" alt="" />
        <div class="card-body">
            <h4 class="card-title">Modello: ${data.name}</h4>
            <p class="card-text">Marca: ${data.brand}</p>
            <p class="card-text">Prezzo: ${data.price} €</p>
        </div>
        <div class="d-flex justify-content-center ">
            <button class="" href="details.html" onclick='descObj("${data._id}")'>Scopri di più</button>
            <button class="" onclick='openModal("${data.name}","${data.brand}","${data.description}","${data.imageUrl}","${data.price}","${data._id}")'>Modifica</button>

        </div>
    </div>
</div>`

}



