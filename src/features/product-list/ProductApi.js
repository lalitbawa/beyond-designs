// This file contains the API call to fetch all products from the server.
export function fetchAllProducts() {
  return new Promise(async(resolve) =>{ 
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({data})
});
}
