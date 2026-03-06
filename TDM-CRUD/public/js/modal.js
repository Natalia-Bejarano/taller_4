let modal;
let modalContent;

export function initModal(){

    modal = document.createElement("div");
    modal.classList.add("modal");

    modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.addEventListener("click", (e)=>{
        if(e.target === modal){
            modal.style.display = "none";
        }
    });
}

export function openModal(item){

    modalContent.innerHTML = "";

    const closeBtn = document.createElement("span");
    closeBtn.textContent = "X";
    closeBtn.classList.add("close-modal");

    const img = document.createElement("img");
    img.src = item.img;

    const name = document.createElement("h2");
    name.textContent = item.name;

    const description = document.createElement("p");
    description.textContent = item.description;

    const price = document.createElement("p");
    price.textContent = "Precio: $" + item.price;

    const seller = document.createElement("p");
    seller.textContent = "Vendedor: " + item.seller;

    const category = document.createElement("p");
    category.textContent = "Categoría: " + item.category;

    const date = document.createElement("p");
    date.textContent = "Fecha: " + item.date;

    const stock = document.createElement("p");
    stock.textContent = "Stock: " + item.stock;

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(img);
    modalContent.appendChild(name);
    modalContent.appendChild(description);
    modalContent.appendChild(price);
    modalContent.appendChild(seller);
    modalContent.appendChild(category);
    modalContent.appendChild(date);
    modalContent.appendChild(stock);

    modal.style.display = "flex";

    closeBtn.addEventListener("click", ()=>{
        modal.style.display = "none";
    });
}