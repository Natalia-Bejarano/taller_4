export function renderItems(items, tableBody) {
    tableBody.innerHTML = "";
    items.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description || ""}</td>
            <td>${item.price}</td>
            <td>${item.seller || ""}</td>
            <td>${item.img || ""}</td>
            <td>${item.category}</td>
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

export function resetForm(form, submitBtn) {
    form.reset();
    if (submitBtn) submitBtn.textContent = "Agregar";
}

export function fillForm(form, item, submitBtn) {
    form.querySelector("#name").value = item.name;
    form.querySelector("#description").value = item.description || "";
    form.querySelector("#price").value = item.price;
    form.querySelector("#seller").value = item.seller || "";
    form.querySelector("#img").value = item.img || "";
    form.querySelector("#category").value = item.category;
    form.querySelector("#date").value = item.date;
    form.querySelector("#stock").value = item.stock;
    

    if (submitBtn) submitBtn.textContent = "Guardar cambios";
}