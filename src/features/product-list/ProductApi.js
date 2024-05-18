// This file contains the API call to fetch all products from the server.
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{ 
    const response = await fetch('https://beyond-designs-backend.onrender.com/products')
    const data = await response.json()
    resolve({data})
});
}
