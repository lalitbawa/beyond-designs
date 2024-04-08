
// this function adds an item to the cart
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
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
    const id = typeof itemId === 'object' ? itemId._id : itemId;
    const response = await fetch(`http://localhost:8080/cart/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}


// this function updates the quantity of an item in the cart
export function updateCart(itemId, quantity) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${itemId}`, {
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
    const response = await fetch('http://localhost:8080/cart/'+userId); 
    const data = await response.json()
    resolve({data})
  })
}


// this function creates an order and adds item to the orders collection in the db
export function createOrder(orderData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// this function fetches the latest order for a given user _id
export function fetchLatestOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders?user=${userId}&sort=createdAt&limit=1`);
    const data = await response.json();
    resolve({ data });
  });
}