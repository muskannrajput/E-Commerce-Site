let username = localStorage.getItem('userfullname');
let unameblk = document.getElementById('uname');
unameblk.innerHTML = `<p>Hello, ${username}</p>`;

let p_icon = document.getElementById('profile-icon');
let p_block = document.getElementById('profile-block');

p_icon.addEventListener('click', () => {
    p_block.style.display = 'block';
});

let p_close = document.getElementById('close');
p_close.addEventListener('click', () => {
    p_block.style.display = 'none';
});

let l_btn = document.getElementById('lbtn');
l_btn.addEventListener('click', () => {
    location.href = '../Login Page/login.html';
});

let wishlistdata = JSON.parse(localStorage.getItem('wishlistdata')) || [];
let cartdata = JSON.parse(localStorage.getItem('cartdata')) || [];
console.log(wishlistdata);
let totalprice = 0;
let price = document.createElement('h3');
let product_block = document.getElementById("product-block");

let updateprice = () => {
    // Check if the total price is very close to 0, set it to 0
    if (Math.abs(totalprice) < 1e-10) {
        totalprice = 0;
    }
    if (totalprice > 0) {
        price.innerText = `Total Price = ${totalprice.toFixed(2)}$`;
    } else {
        price.innerText = '';
        product_block.innerHTML = `
            <p class="noproduct">No products available in the cart.</p>
            <a class="noproduct" href="../Home Page/homepage.html">Click here to explore the products</a>
        `;
    }
};


let initializeCart = () => {
    product_block.innerHTML = '';
    totalprice = 0;
    wishlistdata.forEach(element => {
    totalprice += element.price;
    product_block.innerHTML += `
        <div>
            <img src=${element.images[0]} height='200px' width='150px'>
            <p>${element.title}</p>
            <strong>Price: ${element.price}$</strong>
            <div>
                <button class="cartbtns" id=${element.id}>Add to Cart</button>
                <button class="wishlistbtn" id=${element.id}>Remove from Wishlist</button>
            </div>
        </div>`;
    updateprice();

    let wishlistbtns = document.getElementsByClassName('wishlistbtn');
    for (let i = 0; i < wishlistbtns.length; i++) {
        wishlistbtns[i].addEventListener('click', () => {
            let product = wishlistdata.find(ele => ele.id == parseInt(wishlistbtns[i].id));
            wishlistdata = wishlistdata.filter(ele => ele.id != parseInt(wishlistbtns[i].id));
            localStorage.setItem('wishlistdata', JSON.stringify(wishlistdata));
            wishlistbtns[i].parentElement.parentElement.style.display = 'none';
            totalprice -= product.price;
            updateprice();
        });
    }

    let cartbtns = document.getElementsByClassName('cartbtns');
    for (let i = 0; i < cartbtns.length; i++) {
        cartbtns[i].addEventListener('click', () => {
            let product = wishlistdata.find(ele => ele.id == parseInt(cartbtns[i].id));
            cartdata.push(product);
            wishlistdata = wishlistdata.filter(ele => ele.id != parseInt(cartbtns[i].id));
            localStorage.setItem('wishlistdata', JSON.stringify(wishlistdata));
            localStorage.setItem('cartdata', JSON.stringify(cartdata));
            cartbtns[i].parentElement.parentElement.style.display = 'none';
            totalprice -= product.price;
            updateprice();
        });
    }
});
};

initializeCart();


product_block.appendChild(price);
