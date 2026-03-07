import { getItems, getItem, createItem, updateItem, deleteItem } from "./services/api.js";
import { renderItems, resetForm, fillForm } from "./ui/ui.js";
// se trae para trabajr con ellos
const form = document.getElementById("itemForm");
const tableBody = document.getElementById("itemsTable");
const submitBtn = document.getElementById("submitBtn");

//se agregan para las validaciones porque sino pailas
const imgPreview = document.getElementById("imgPreview");
const dateInput = document.getElementById("date");
//imagenes
const imgSelect = document.getElementById("img");
//aqui estan todas las imagenes que emtimos en recursos poara que se vea mela la pagina
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

//fecha de hoy en formato año mes dia
const today = new Date().toISOString().split("T")[0];

//fecha maxima
dateInput.max = today;

//limpiar texto al inicio y al final
function cleanText(value) {
    return value.trim();
}

//para validad tamaño maximo y asi que no venga vacio y obligatotio como el nombre y la categoria
function validarTexto(value, fieldName, minLength = 2, maxLength = 60) {
    const cleaned = cleanText(value);

    if (!cleaned) {
        throw new Error(`El campo ${fieldName} es obligatorio.`);
    }

    if (cleaned.length < minLength) {
        throw new Error(`El campo ${fieldName} debe tener al menos ${minLength} caracteres.`);
    }

    if (cleaned.length > maxLength) {
        throw new Error(`El campo ${fieldName} no puede tener más de ${maxLength} caracteres.`);
    }

    return cleaned;
}

//validar opcional
function validareElTextoOpcional(value, fieldName, maxLength = 120) {
    const cleaned = cleanText(value);

    if (!cleaned) return "";

    if (cleaned.length > maxLength) {
        throw new Error(`El campo ${fieldName} no puede tener mas de ${maxLength} caracteres.`);
    }

    return cleaned;
}

//validar precio
function validarPrecio(value) {
    if (value === "") {
        throw new Error("El campo precio es obligatorio.");
    }

    const price = Number(value);

    if (Number.isNaN(price) || !Number.isFinite(price)) {
        throw new Error("El precio debe ser un número válido.");
    }

    if (price <= 0) {
        throw new Error("El precio debe ser mayor que 0.");
    }

    if (price > 10000000) {
        throw new Error("El precio es demasiado grande.");
    }

    return Number(price.toFixed(2));
}

//validar stock disponibilidad
function validarStock(value) {
    if (value === "") {
        throw new Error("El campo de disponibilidad es obligatorio.");
    }

    const stock = Number(value);

    if (Number.isNaN(stock) || !Number.isFinite(stock)) {
        throw new Error("El stock debe ser un número válido.");
    }

    if (!Number.isInteger(stock)) {
        throw new Error("El stock debe ser un número entero.");
    }

    if (stock < 0) {
        throw new Error("El stock no puede ser negativo.");
    }

    if (stock > 999) {
        throw new Error("El stock es demasiado grande.");
    }

    return stock;
}

//validar fecha
function validarFechas(value) {
    if (!value) {
        throw new Error("El campo de fecha es obligatorio.");
    }

    const selectedDate = new Date(value + "T00:00:00");

    if (Number.isNaN(selectedDate.getTime())) {
        throw new Error("La fecha no es válida.");
    }

    if (value > today) {
        throw new Error("La fecha no puede ser futura.");
    }

    return value;
}

//aqui se usan las de arriba y se valida todo todo, osea recoge todo del form y luego devuelve, ez
function validarItems() {
    const name = validarTexto(form.querySelector("#name").value, "nombre", 2, 60);
    const description = validareElTextoOpcional(form.querySelector("#description").value, "descripción", 300);
    const price = validarPrecio(form.querySelector("#price").value);
    const seller = validareElTextoOpcional(form.querySelector("#seller").value, "vendedor", 60);
    const category = validarTexto(form.querySelector("#category").value, "categoría", 2, 40);
    const img = form.querySelector("#img").value;
    const date = validarFechas(form.querySelector("#date").value);
    const stock = validarStock(form.querySelector("#stock").value);

    return {
        name,
        description,
        price,
        seller,
        img,
        category,
        date,
        stock
    };
}
//aqui se guarda el id del producto que se edita
let editingId = null;

// Eventos de tabla (delegación)
tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);

    // validar id
    if (!id || isNaN(id) || id <= 0) {
        alert("El producto no tiene un ID válido.");
        return;
    }

    if (btn.classList.contains("btn-delete")) {
        const confirmar = confirm("¿Seguro que quieres eliminar este producto?");
        if (!confirmar) return;

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

            if (!item) {
                alert("No se encontró el producto para editar.");
                return;
            }

            fillForm(form, item, submitBtn);
            editingId = id;
        } catch (err) {
            console.error("Error cargando item:", err);
            alert("No se pudo cargar el item para edición.");
        }
    }
});

// Envío del form se cambia restro porque arriba se hacen nuevas validaciones y no funcionaba con el anterior
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    //botones

    try {
        const itemData = validarItems();

        if (editingId) {
            await updateItem(editingId, itemData);
            editingId = null;
        } else {
            await createItem(itemData);
        }

        resetForm(form, submitBtn);
        loadItems();
    } catch (err) {
        console.error("Error guardando item:", err);
        alert(err.message || "No se pudo guardar el item.");
    }
});

//append de imagenes para el select
images.forEach(imgPath => {
    const option = document.createElement("option");
    option.value = imgPath;
    option.textContent = imgPath.split("/").pop();
    imgSelect.appendChild(option);
});
//aqui se usa logica para que cuando se select una imagen aparezca chiquita al lado y se quite si no hay nada
imgSelect.addEventListener("change", () => {
    if (imgSelect.value) {
        imgPreview.src = imgSelect.value;
        imgPreview.style.display = "block";
    } else {
        imgPreview.src = "";
        imgPreview.style.display = "none";
    }
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