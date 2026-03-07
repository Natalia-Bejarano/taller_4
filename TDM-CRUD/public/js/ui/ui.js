export function renderItems(items, tableBody) {
    tableBody.innerHTML = "";
    items.forEach(item => {
        const row = document.createElement("tr");
        // si existe imagen se muestra con lo nuevo agregado
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description || ""}</td>
            <td>${item.price}</td>
            <td>${item.seller || ""}</td>
            <td>${item.category}</td>
            <td>
                ${
                    item.img
                        ? `<img src="${item.img}" alt="${item.name}" class="table-item-img">`
                        : ""
                }
            </td>
            <td>${item.date}</td>
            <td>${item.stock}</td>
            <td>
                <button class="btn-edit" data-id="${item.id}">Editar</button>
                <button class="btn-delete" data-id="${item.id}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
// esta funcion reinicia el formulario a su estado inicial haciendo que se llene ez
export function resetForm(form, submitBtn) {
    form.reset();

    if (submitBtn) {
        submitBtn.textContent = "Agregar";
    }
// y aqui tambien se limpia la vista previa de la imagen
    const imgPreview = document.getElementById("imgPreview");
    if (imgPreview) {
        imgPreview.src = "";
        imgPreview.style.display = "none";
    }
}

export function fillForm(form, item, submitBtn) {
    form.querySelector("#name").value = item.name;
    form.querySelector("#description").value = item.description || "";
    form.querySelector("#price").value = item.price;
    form.querySelector("#seller").value = item.seller || "";
    form.querySelector("#category").value = item.category;
    form.querySelector("#img").value = item.img || "";
    form.querySelector("#date").value = item.date;
    form.querySelector("#stock").value = item.stock;
    // se busca la imagen de vista previa
    const imgPreview = document.getElementById("imgPreview");
    // si el item tiene imagen se muestr
    // si no tiene no y se limpia la prev
    if (imgPreview && item.img) {
        imgPreview.src = item.img;
        imgPreview.style.display = "block";
    } else if (imgPreview) {
        imgPreview.src = "";
        imgPreview.style.display = "none";
    }
    // se cambia el texto para indicar que se esta editando
    if (submitBtn) {
        submitBtn.textContent = "Guardar cambios";
    }
}