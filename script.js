


//funzione popola Api
function addElement() {

    let urlInput = document.getElementById('url').value;
    let num = document.getElementById("price").value
    if (validateUrl(urlInput) && validateNum(num)) {

        fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDk0OWZlMDMxZTAwMTliYTE1MmYiLCJpYXQiOjE3MDIwMzc4MzMsImV4cCI6MTcwMzI0NzQzM30.cw0yp3zc7d30TEg7LENi3fJysGxmhdSqWKrm-nNlZzo"
            },
            body: JSON.stringify(
                takeData()
            )
        })
            .then(response => {
                response.json()
                if (!response.ok) {
                    erroreGenerico("Articolo già presente in inventario")
                    resetForm()
                }
                else{
                    location.reload()
                }

            })

            .then(()=> {
                
                resetForm()
            })
        //.catch(erroreGenerico("Articolo già presente in inventario"))




    }
    else if (validateUrl(urlInput) == false) {
        erroreGenerico("Devi inserire un Url valido")
    }
    else {
        erroreGenerico("Devi inserire un Prezzo valido")
    }
}
function descObj(id) {
    location.href = "details.html"
    localStorage.setItem("id", id)
}
function takeData() {

    return {
        "name": document.getElementById("nome").value,
        "description": document.getElementById("desc").value,
        "brand": document.getElementById("brand").value,
        "imageUrl": document.getElementById("url").value,
        "price": document.getElementById("price").value,
    }

}
function resetForm() {
    document.getElementById("nome").value = ""
    document.getElementById("desc").value = ""
    document.getElementById("brand").value = ""
    document.getElementById("url").value = ""
    document.getElementById("price").value = ""
    closeModal2()

}
function modObj(id) {
    let urlInput = document.getElementById('urlModal').value;
    let num = document.getElementById("priceModal").value
    if (validateUrl(urlInput) && validateNum(num)) {
        fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDk0OWZlMDMxZTAwMTliYTE1MmYiLCJpYXQiOjE3MDIwMzc4MzMsImV4cCI6MTcwMzI0NzQzM30.cw0yp3zc7d30TEg7LENi3fJysGxmhdSqWKrm-nNlZzo"
            },
            body: JSON.stringify(
                takeDataModal()
                
            )
            
        })
            .then(response => response.json())
            .then(() => location.reload())
        closeModal()
        

    }
    else if (validateUrl(urlInput) == false) {
        erroreGenerico("Devi inserire un Url valido")
    }
    else {
        erroreGenerico("Devi inserire un Prezzo valido")
    }
}




function delObj(id) {
    console.log(id)
    fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczMDk0OWZlMDMxZTAwMTliYTE1MmYiLCJpYXQiOjE3MDIwMzc4MzMsImV4cCI6MTcwMzI0NzQzM30.cw0yp3zc7d30TEg7LENi3fJysGxmhdSqWKrm-nNlZzo"
        },
    })
        .then(response => response.json())
        .then(() => {
            location.reload()

        })
    closeModal3()
}



function enableModifier() {
    let listabottoni = document.getElementsByClassName("rimuovi")
    if (document.getElementById("modifica").innerText == "Termina Modifica") {
        Array.from(listabottoni).forEach(element => {
            element.classList.add("d-none")
        });
        document.getElementById("modifica").innerText = "Modifica Elementi"
    } else {
        Array.from(listabottoni).forEach(element => {
            element.classList.remove("d-none")
        });
        document.getElementById("modifica").innerText = "Termina Modifica"
    }



}

function openModal(name, brand, desc, url, price, id) {
    console.log(name)
    document.getElementById('myModal').style.display = 'block';
    document.getElementById("modArt").innerHTML = ""
    document.getElementById("modArt").innerHTML += `
            
            <div class="d-flex flex-column ">
                <div>
                    <label>Modello:</label>
                    <input type="text" id="nomeModal" class="card-text" value= ${name}>
                </div>
                <div>
                    <label>Marca:</label>
                    <input type="text" id="brandModal" class="card-text" value= ${brand}>
                </div>
                <div>
                    <label>Descrizione:</label>
                    <input type="text" id="descModal" class="card-text" value= ${desc}>
                </div>
                <div>
                    <label>Url:</label>
                    <input type="text" id="urlModal" class="card-text" value= ${url}>
                </div>
                <div>
                    <label>Prezzo:</label>
                    <input type="number" id="priceModal" class="card-text" value= ${price}>
                </div>
            </div>
           
            <button id="saveChanges" onclick='modObj("${id}")'>Salva Modifiche</button>
            <button onclick="closeModal()">Annulla Modifiche</button>`
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}
function closeModal2() {
    document.getElementById('myModal2').style.display = 'none';
}
function closeModal3() {
    document.getElementById('myModal3').style.display = 'none';
}
function closeModal4() {
    document.getElementById('myModal4').style.display = 'none';
}


function takeDataModal() {
    return {
        "name": document.getElementById("nomeModal").value,
        "description": document.getElementById("descModal").value,
        "brand": document.getElementById("brandModal").value,
        "imageUrl": document.getElementById("urlModal").value,
        "price": document.getElementById("priceModal").value,
    }
}


function validateUrl(urlInput) {

    let urlRegex = /^(ftp|http|https):\/\/[^ "]+$/

    return urlRegex.test(urlInput)
}
function validateNum(numberInput) {
    console.log(numberInput)
    if (isNaN(numberInput)) {
        return false
    }
    else {
        return true
    }

}

function resetbuttonForm() {
    document.getElementById('myModal2').style.display = 'block';
    document.getElementById("modArt2").innerHTML = ""
    document.getElementById("modArt2").innerHTML += `
            <button id="" onclick='resetForm()'>Si resettalo</button>
            <button onclick="closeModal2()">No torna indietro</button>`
}
function delCheck(index) {
    document.getElementById('myModal3').style.display = 'block';
    document.getElementById("modArt3").innerHTML = ""
    document.getElementById("modArt3").innerHTML += `
            <button id="" onclick='delObj("${index}")'>Si eliminalo</button>
            <button onclick="closeModal3()">No torna indietro</button>`
}
function erroreGenerico(errore) {
    document.getElementById('myModal4').style.display = 'block';
    document.getElementById("modArt4").innerHTML = ""
    document.getElementById("Errore").innerText = errore
    document.getElementById("modArt4").innerHTML += `<button onclick="closeModal4()">Chiudi</button>`
}