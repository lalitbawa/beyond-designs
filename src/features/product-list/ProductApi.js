// A mock function to mimic making an async request for data
import data from '../../data.json'

export function fetchAllProducts(amount = 1) {
  return new Promise(async(resolve) =>{ 
    const response = await fetch('https://mocki.io/v1/07bfc58d-ec4a-4498-b1fa-d57c9060ec48')
    const data = await response.json()
    resolve({data})
});
}
