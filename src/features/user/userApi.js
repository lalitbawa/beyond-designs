// fetch all orders for the current logged in user
export function fetchUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`https://beyond-designs-backend.onrender.com/orders?user=${userId}`);
    const data = await response.json();
    resolve({ data });
  });
}