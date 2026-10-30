
let products=[
    {id:1,name:"Laptop",price:45000,emoji:"💻"},
    {id:2,name:"Mouse",price:500,emoji:"🖱️"},
    {id:3,name:"Headphones",price:1500,emoji:"🎧"},
    {id:4,name:"Keyboard",price:800,emoji:"⌨️"},
    {id:5,name:"Smartwatch",price:2500,emoji:"⌚"}
];

let cart=[];

function displayProducts(){
    let div=document.getElementById("products");
    div.innerHTML="";

    products.forEach(p=>{
        div.innerHTML+=`
            <div class="product">
                <div class="emoji">${p.emoji}</div>
                <h3>${p.name}</h3>
                <p class="price">₹${p.price}</p>
                <button onclick="addToCart(${p.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// BUBBLE SORT LOGIC
function sortProducts(order){

    let n=products.length;
    let comparisons=0;
    let swaps=0;

    for(let i=0;i<n-1;i++){

        for(let j=0;j<n-1-i;j++){

            comparisons++;

            if(order==="asc" &&
               products[j].price>products[j+1].price){

                let temp=products[j];
                products[j]=products[j+1];
                products[j+1]=temp;

                swaps++;
            }

            else if(order==="desc" &&
                    products[j].price<products[j+1].price){

                let temp=products[j];
                products[j]=products[j+1];
                products[j+1]=temp;

                swaps++;
            }
        }
    }

    displayProducts();

    document.getElementById("message").innerText=
        "Bubble Sort Completed | Comparisons: "+
        comparisons+" | Swaps: "+swaps;
}

function addToCart(id){
    let p=products.find(x=>x.id===id);
    cart.push(p);
    updateCart();
}

function updateCart(){
    let div=document.getElementById("cart");
    div.innerHTML="";

    let total=0;

    cart.forEach((p,i)=>{
        total+=p.price;

        div.innerHTML+=`
            <p>${p.name} - ₹${p.price}
            <button onclick="removeItem(${i})">Remove</button>
            </p>
        `;
    });

    document.getElementById("count").innerText=cart.length;
    document.getElementById("total").innerText="Total: ₹"+total;
}

function removeItem(i){
    cart.splice(i,1);
    updateCart();
}

document.getElementById("search").addEventListener("input",function(){
    let value=this.value.toLowerCase();
    let filtered=products.filter(p=>
        p.name.toLowerCase().includes(value)
    );

    document.getElementById("products").innerHTML=
        filtered.map(p=>`
            <div class="product">
                <div class="emoji">${p.emoji}</div>
                <h3>${p.name}</h3>
                <p class="price">₹${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `).join("");
});

displayProducts();
updateCart();
