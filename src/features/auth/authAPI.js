// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async(resolve) =>{ 
    const response = await fetch("http://localhost:8080/users",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json()
    resolve({data})
});
}


export function checkUser(loginData) {
  return new Promise(async (resolve, reject) => {
    const email = loginData.email;
    const password = loginData.password;
    const response = await fetch("http://localhost:8080/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if (data[0].password === password) {
        resolve({ data: data[0] });
      } else {
        reject(new Error("Password is incorrect"));
      }
    } else {
      reject(new Error("User not found"));
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}