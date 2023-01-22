import { menuArray } from './data.js'

const checkout = document.getElementById('checkout-box')
const orderFeed = document.getElementById('order-feed')

let orders = []

document.addEventListener("click", function(e){
    if (e.target.dataset.order){
        handleOrder(e.target.dataset.order)
    } else if (e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    } else if(e.target.dataset.buy){
        buyOrder(e.target.dataset.buy)
    }
})

document.getElementById('form').addEventListener("submit", function(e){

    e.preventDefault(e)

    document.getElementById('confirmation').classList.remove('hidden')
    orderFeed.classList.add('hidden')
    checkout.classList.add('hidden')
    orders = []

})

function buyOrder(){
    checkout.classList.remove('hidden')
}

function handleOrder(orderId){
    const orderObj = menuArray.filter(function(order){
        return order.id == orderId
    })[0]

    console.log(orderObj)

    orders.push({'name': orderObj.name , 'price':orderObj.price})

    orderFeed.classList.remove('hidden')

    renderOrder()

}

function removeOrder(deletedOrder){
    const removeObj = orders.filter(function(order){
        return order.name == deletedOrder
    })[0]

    orders.pop(removeObj)

    if (orders.length < 1){
        orderFeed.classList.add('hidden')
    }

    renderOrder()

}


function getmenuFeed(){

    let feedHtml = ``

    menuArray.forEach(function(item){
    
    feedHtml += `
    <div class="menu-items" id="menu-items">
        <div class="item menu-pic">
            <p>${item.emoji}</p>
        </div>
        <div class="item">
            <h2>${item.name}</h2>
            <p class="light-font">${item.ingredients}</p>
            <p class="price">£${item.price}</p>
        </div>
        <div class="item">
            <input class="add-btn" type="button" value="+" data-order="${item.id}">
        </div>
    </div>` 
}); 

return feedHtml
}


function getOrderFeed(){

    let orderHtml = `
    <div class="order-summary" id="order-summary">
    <h1>Your Order</h1>
    <hr>
    </div>`

    let total = 0
    if (orders.length > 0){
    orders.forEach(function(order){
        orderHtml += `
        <div class="itemised">
            <span class="main-item">${order.name}</span>
            <span class="remove light-font" data-remove="${order.name}">remove</span>
            <span class="ordered-price">£${order.price}</span> 
        </div>`
        total += order.price
        console.log(total)
    }
    )}
    
    orderHtml += `
    <hr>
    <div class="itemised">
        <span class="main-item">TOTAL</span>
        <span class="ordered-price">£${total}</span> 
    </div>
    <hr>
    <br>
    <input data-buy="bought" class="purchase-btn" type="submit" value="Complete Order">
    </div>`

    return orderHtml
}

function renderOrder(){
    orderFeed.innerHTML = getOrderFeed()
}

function render(){
    document.getElementById('menu-feed').innerHTML = getmenuFeed()
}

render()