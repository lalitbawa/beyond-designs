export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

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

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/cart/'+userId); 
    const data = await response.json()
    resolve({data})
  })
}




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

export function fetchLatestOrder(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/orders?user=${userId}&sort=createdAt&limit=1`);
    const data = await response.json();
    resolve({ data });
  });
}