
// this function adds an item to the cart
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://beyond-designs-backend.onrender.com/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// this function deletes an item from the cart
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    resolve({ data: { id: itemId } });
  });
}


// this function updates the quantity of an item in the cart
export function updateCart(itemId, quantity) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://beyond-designs-backend.onrender.com/cart/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// this function fetches all items in the cart for a given user _id
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('https://beyond-designs-backend.onrender.com/cart/'+userId); 
    const data = await response.json()
    resolve({data})
  })
}


// this function creates an order and adds item to the orders collection in the db
export function createOrder(orderData) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://beyond-designs-backend.onrender.com/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchLatestOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://beyond-designs-backend.onrender.com/orders?user=${userId}&sort=createdAt&limit=1`);
    const data = await response.json();
    resolve({ data });
  });
}