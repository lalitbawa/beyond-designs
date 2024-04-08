Welcome to my Web App. It is created with Html, Tailwind CSS, React and Redux for front-end with various npm packaages that you can find in the package.json file.
For back-end It makes use of express JS for Rest Api and mongodb as database.


For frontend - 
To get started, extract the beyond-designs folder or download it from my github. Open the terminal inside that folder and type "npm install" to install all the required dependencies. then type "npm start" and it will start the application. for the front end.

For backend - 
To get started, extract the beyond-designs-backend folder or download it from my github. Again install all the dependencies using "npm install" inside the beyond-designs-backend folder. then type"npm run dev" to start the backend server using nodemon. Please make sure that the application for the backend is running on localhost:8080 as all the api calls from the front-end are made to this port. Also, please make sure the database i am using is connected. if it is connected, it will return "database connected" in the terminal.

Please note - if you are downloading my back end code from github, you will need to use your own database. However, i have added a sample data file and with a populateDB.js file. Once you have connected your database, you can go to the beyond-designs-backend folder in your terminal and type "node populateDB.js" . By default, it takes the sample data file that i have provided in the backend code. however, you can also use your own database file if the structure is exactly similar. Once you run the populateDB.js file, it will populate the database with products array. rest of the data will not be sent to the database. 