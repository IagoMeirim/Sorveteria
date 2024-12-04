const menu = document.getElementById("menu")
const fimBtn = document.getElementById("fim-btn")
const myCarrinho = document.getElementById("my-carrinho")
const cartItemsContainer = document.getElementById("cart-items")
const closeModalBtn = document.getElementById("close-modal-btn")
const addressWarn = document.getElementById("address-warn")
const addressInput = document.getElementById("address")
const cartCounter = document.getElementById("cart-count")
const checkoutBtn = document.getElementById("checkout-btn")
const cartTotal = document.getElementById("cart-total")
const barra = document.getElementById("barra")
const cadastro = document.getElementById("cadastro")

let cart = [];


fimBtn.addEventListener("click", function () {
    updatemyCarrinho();
    myCarrinho.style.display = "flex"

})



myCarrinho.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        myCarrinho.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function () {
    myCarrinho.style.display = "none"
})

menu.addEventListener("click", function (event) {

    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        
        addToCart(name, price)

    }
})


function addToCart(name, price) {
    const existingItem = cart.find(item => item.name == name)

    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push({
            name,
            price,
            quantity: 1,
        })

    }

    updatemyCarrinho()
}


function updatemyCarrinho() {

    cartItemsContainer.innerHTML = "";
    let total = 0;


    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });


    cartCounter.innerHTML = cart.length;

}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-900")
        addressWarn.classList.add("hidden")
    }
})
checkoutBtn.addEventListener("click", function(){


    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-900")
        return;
    }

    const cartItems = cart.map((item) => {
        return (
            `${item.name} | Preço: R$${item.price} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "5534997668356"

    window.open(`https://wa.me/${phone}?text=${message} Meu endereço: ${addressInput.value}`, "_blank")


    cart = [];
    updatemyCarrinho();
})



function checkLojaon(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkLojaon();

if(isOpen){
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.removve("bg-green-600")
    spanItem.classList.add("bg-red-500")
}