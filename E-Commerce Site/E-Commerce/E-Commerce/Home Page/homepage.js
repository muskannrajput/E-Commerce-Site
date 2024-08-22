let username = localStorage.getItem('userfullname')
let unameblk = document.getElementById('uname')
unameblk.innerHTML=`<p>Hello, ${username}</p>`

let p_icon=document.getElementById('profile-icon');
let p_block=document.getElementById('profile-block')

p_icon.addEventListener('click',() => {
    p_block.style.display='block'
    // p_block.style.transform
})

let p_close=document.getElementById('close')
p_close.addEventListener('click', () => {
    p_block.style.display='none'
})

let l_btn=document.getElementById('lbtn')
l_btn.addEventListener('click',() => {
    location.href='../Login Page/login.html'
})


let cartdata = JSON.parse(localStorage.getItem('cartdata')) || [];
let wishlistdata = JSON.parse(localStorage.getItem('wishlistdata')) || [];

let fetchdata=async function() {
    let result=await fetch('https://dummyjson.com/products')
    let data=await result.json()
    displaydata(data)
}
fetchdata();

let product_block=document.getElementById('product-block')
let displaydata=(data) => {
    data.products.forEach(element => {
        // console.log(element)
        let cartdisable='';
        if(cartdata.length!=0) {
            cartdata.forEach(ele => {
                if(ele.id===element.id){
                    cartdisable='disabled';
                }
            })
        }

        let wishlistdisable='';
        if(wishlistdata.length!=0) {
            wishlistdata.forEach(ele => {
                if(ele.id===element.id){
                    wishlistdisable='disabled';
                }
            })
        }

        

        let subdiv=document.createElement('div');
        subdiv.innerHTML=`<img src=${element.images[0]} height='200px' width='150px'>
        <p>${element.title}</p>
        <strong>Price: ${element.price}$</strong>
        <div>
        <button class="wishlistbtn" id=${element.id} ${wishlistdisable}>Add to Wishlist</button>
        <button class='cartbtns' id=${element.id} ${cartdisable}>Add to Cart</button>
        </div>`
        product_block.appendChild(subdiv)

        //pop-up
        let popupbox=document.getElementById('popup');
        subdiv.addEventListener('click',() => {
            popupbox.style.display='flex';
            popupbox.innerHTML=`<div>
            <p id="popup-close"><i class="fa-sharp fa-solid fa-xmark"></i></p>
            <img src=${element.images[0]} height='200px' width='150px'>
            <h2>${element.title}</h2>
            <p id="popup-desc">${element.description}</p>
            <strong>Price: ${element.price}$</strong>
            <strong>Rating: ${element.rating}/5</strong>
            <button id="closebtn">Close</button>
            </div>`


            let closebtn=document.getElementById('closebtn')
            closebtn.addEventListener('click',() => {
                popupbox.style.display='none'
            })

            let pu_close=document.getElementById('popup-close')
            pu_close.addEventListener('click', () => {
                popupbox.style.display='none'
            })
        })

        //js for addtocart
        let cartbtns=document.getElementsByClassName('cartbtns')
        // let cartdata = JSON.parse(localStorage.getItem('cartdata')) || []; 
        for(let i=0;i<cartbtns.length;i++){
            cartbtns[i].addEventListener('click',(e)=>{
                console.log(e)
                e.stopPropagation()
                let pid = parseInt(cartbtns[i].id);
                console.log(pid);
                if (element.id === pid) {
                    cartdata.push(element);
                    localStorage.setItem('cartdata', JSON.stringify(cartdata));
                    cartbtns[i].disabled=true;

                }
            })
        }

        //js for wishlist

        let wishlistbtn=document.getElementsByClassName('wishlistbtn')
        // let wishlistdata = JSON.parse(localStorage.getItem('wishlistdata')) || []; 
        for(let i=0;i<wishlistbtn.length;i++){
            wishlistbtn[i].addEventListener('click',(e)=>{
                e.stopPropagation()
                let pid = parseInt(wishlistbtn[i].id); 
                console.log(pid);
                if (element.id === pid) { 
                    wishlistdata.push(element);
                    localStorage.setItem('wishlistdata', JSON.stringify(wishlistdata));
                    wishlistbtn[i].disabled=true;
                }
            })
        }


    });
}
