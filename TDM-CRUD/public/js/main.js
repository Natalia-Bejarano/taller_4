import { getItems, getItem, createItem, updateItem, deleteItem } from "./services/api.js";
import { renderItems, resetForm, fillForm } from "./ui/ui.js";

const form = document.getElementById("itemForm");
const tableBody = document.getElementById("itemsTable");
const submitBtn = document.getElementById("submitBtn");
//imagenes
const imgSelect = document.getElementById("img");

const images = [
"recursos/bandanaDrag.png",
"recursos/BandanaJapB.png",
"recursos/BandanaJapN.png",
"recursos/CapaL.png",
"recursos/cosplayL.png",
"recursos/funkoPopLuffy.png",
"recursos/GetaMaderaN.png",
"recursos/GetaMaderaR.png",
"recursos/GetaNegra.png",
"recursos/HaoriAzulRey.png",
"recursos/HaoriB.png",
"recursos/HaoriBeigeBlue.png",
"recursos/itachiFunko.jpg",
"recursos/itachiFunko.png",
"recursos/Katana.png",
"recursos/KatanaMangoN.png",
"recursos/KatanaRoja.png",
"recursos/Kimono.png",
"recursos/KimonoAR.png",
"recursos/mikasa.png",
"recursos/narutoFunko.png",
"recursos/sombreroLuffy.png",
"recursos/sombreroOneP.png",
"recursos/SombreroOnePiece.png",
"recursos/TsubaDor.png",
"recursos/TsubaVer.png",
"recursos/TsubaVerd.png",
"recursos/Yukata.png",
"recursos/YukataAzulR.png",
"recursos/YukataBeige.png",
"recursos/YukataFlor.png",
"recursos/YukataRojo.png"
];



let editingId = null;

// Eventos de tabla (delegación)
tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    if (btn.classList.contains("btn-delete")) {
        try {
            await deleteItem(id);
            loadItems();
        } catch (err) {
            console.error("Error eliminando:", err);
            alert("No se pudo eliminar el item.");
        }
    } else if (btn.classList.contains("btn-edit")) {
        try {
            if (editingId === id) {
                resetForm(form, submitBtn);
                editingId = null;
                return;
            }
            const item = await getItem(id);
            fillForm(form, item, submitBtn);
            editingId = id;
        } catch (err) {
            console.error("Error cargando item:", err);
            alert("No se pudo cargar el item para edición.");
        }
    }
});

// Envío del form
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.querySelector("#name").value;
    const description = form.querySelector("#description").value;
    const price = form.querySelector("#price").value;
    const seller = form.querySelector("#seller").value;
    const img = form.querySelector("#img").value;
    const category = form.querySelector("#category").value;
    const date = form.querySelector("#date").value;
    const stock = form.querySelector("#stock").value;

    if (!name) {
        alert("El campo nombre es obligatorio");
        return;
    }
    if (!price) {
        alert("El campo precio es obligatorio");
        return;
    }
    if (!category) {
        alert("El campo de categoría es obligatorio");
        return;
    }
    if (!date) {
        alert("El campo de fecha es obligatorio");
        return;
    }
    if (!stock) {
        alert("El campo de disponibilidad es obligatorio");
        return;
    }



    try {
        if (editingId) {
            await updateItem(editingId, { name, description,price, seller, img, category, date, stock });
            editingId = null;
        } else {
            await createItem({ name, description, price, seller, img, category, date, stock });
        }

        resetForm(form, submitBtn);
        loadItems();
    } catch (err) {
        console.error("Error guardando item:", err);
        alert("No se pudo guardar el item.");
    }
});

//append de imagenes
images.forEach(imgPath => {
    const option = document.createElement("option");
    option.value = imgPath;
    option.textContent = imgPath.split("/").pop();
    imgSelect.appendChild(option);
});

// Cargar al inicio
async function loadItems() {
    try {
        const items = await getItems();
        renderItems(items, tableBody);
    } catch (err) {
        console.error("Error cargando lista:", err);
        alert("No se pudieron cargar los items.");
    }
}

loadItems();