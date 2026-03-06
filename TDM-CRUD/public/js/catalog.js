// Script base para la vista de catálogo 
import { getItems } from "./services/api.js";
import { initModal, openModal } from "./modal.js";


// Aquí deben consumir la API de items y mostrarlos en la página

// Constante con la URL base de la API
const API_URL = "/api/items";

// TODO: Seleccionar el contenedor donde se mostrarán los items

const catalogContainer = document.getElementById("catalogContainer");
initModal();

// Función principal para cargar los items desde la API
async function loadCatalog() {
    try {
        // 1. Hacer fetch a la API (GET /api/items)
        // 2. Parsear la respuesta a JSON
        const items = await getItems()
        
        // 3. Limpiar el contenedor del catálogo
        catalogContainer.innerHTML = "";

        // 4. Iterar sobre cada item y llamar a renderItem()
        items.forEach(item => {
            renderItem(item);
        });

    } catch (err) {
        // TODO: Mostrar mensaje de error en la UI
        console.error("Error cargando catálogo:", err);
        alert("No se pudieron cargar el catálogo");
        
    }
}

// Función para renderizar un item en el catálogo
function renderItem(item) {
    
    // TODO: Crear un elemento HTML (ej: div o card)
    const card = document.createElement("div");
    card.classList.add("catalog-card");

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;

    const name = document.createElement("h3");
    name.textContent = item.name;

    
    // modal
    const btnModal = document.createElement("button");
    btnModal.textContent = "Ver más";
    btnModal.classList.add("btn-modal");

    btnModal.addEventListener("click", () => {
        openModal(item);
    });

    const price = document.createElement("p");
    price.textContent = "Precio: $" + item.price;

    const seller = document.createElement("p");
    seller.textContent = "Vendedor: " + item.seller;

    const stock = document.createElement("p");
    stock.textContent = "Stock: " + item.stock;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(seller);
    card.appendChild(stock);
    card.appendChild(btnModal);

    catalogContainer.appendChild(card);
}

// Inicializar el catálogo cuando cargue la página
loadCatalog();