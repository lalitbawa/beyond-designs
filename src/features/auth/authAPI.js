// Function to create a new user
export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://beyond-designs-backend.onrender.com/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error.error);
      }
    } catch (error) {
      reject(error.message);
    }
  });
}

// Function to check user login
export function checkUser(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = loginData.email;
      const password = loginData.password;
      const response = await fetch(`https://beyond-designs-backend.onrender.com/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(new Error(error.message));
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Function to sign out user
export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: 'success' });
  });
}
