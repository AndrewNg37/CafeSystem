1. Connect to MongoDB
--------------------------------------------------------------------
*Can ignore this setup if not going to view the DB, the backend code has already connected to this DB*

- Download MongoDB compass: https://www.mongodb.com/products/compass
- Open compass and enter connection string into the field and connect.
- Connection string: mongodb+srv://dbAndrew:001001@cluster0.2kqz7.mongodb.net/test

2. Download files
--------------------------------------------------------------------
- Get the CafeSystem.zip and extract it.
- Inside the folder has 2 folders
	1. CafeSystemWeb (FRONTEND)
	2. CafeSystemApi (BACKEND)

3.
--------------------------------------------------------------------
- Make sure you have node.js installed in your pc : https://nodejs.org/en/


4. Backend installation
--------------------------------------------------------------------
- Open terminal/cmd go to CafeSystemApi folder. (For example your folder place at: c:\projects, then it should be c:\projects\CafeSystemApi)
- Type "npm install" (ignore double quotes, just npm install)
- After the installation has done, type "npm start" (ignore double quotes, just npm start), the backend code will start running.
- The only thing may cause the app not working is the port. If the console saying the port is in use then change the port number.
- Go to CafeSystemApi folder find app.js, find line 10 (const port = 8080), change the port = 8080 to port = [whichever you can use].

5. Backend installation (Optional: If using Visual Studio code)
--------------------------------------------------------------------
- In VS code open the CafeSystemApi folder.
- In the terminal, type "npm install" (ignore double quotes, just npm install)
- After the installation has done, in the terminal, type "npm start" (ignore double quotes, just npm start), the backend code will start running.
- The only thing may cause the app not working is the port. If the console saying the port is in use then change the port number.
- Go to CafeSystemApi folder find app.js, find line 10 (const port = 8080), change the port = 8080 to port = [whichever you can use].

6. Frontend installation
--------------------------------------------------------------------
- Open terminal/cmd go to CafeSystemWeb folder. (For example your folder place at: c:\projects, then it should be c:\projects\CafeSystemWeb)
- Type "npm install" (ignore double quotes, just npm install)
- After the installation has done, type "npm start" (ignore double quotes, just npm start), the frontend code will start running.
- The only thing may cause the app not working is the port. If the console saying the port is in use then change the port number.
- Go to CafeSystemWeb folder find .env, find line 1 (PORT=7788), change the PORT=7788 to PORT=[whichever you can use].

*Please note that if the PORT has changed for backend in the app.js, in the CafeSystemWeb folder find .env and find line 3 (REACT_APP_API_URL=http://localhost:8080), update the port in order to connect to backend API.
*For example: if changed to 8181 then the value should be REACT_APP_API_URL=http://localhost:8181

7. Frontend installation (Optional: If using Visual Studio code)
--------------------------------------------------------------------
- In VS code open the CafeSystemWeb folder.
- In the terminal, type "npm install" (ignore double quotes, just npm install)
- After the installation has done, in the terminal, type "npm start" (ignore double quotes, just npm start), the frontend code will start running.
- The only thing may cause the app not working is the port. If the console saying the port is in use then change the port number.
- Go to CafeSystemWeb folder find .env, find line 1 (PORT=7788), change the PORT=7788 to PORT=[whichever you can use].

*Please note that if the PORT has changed for backend in the app.js, in the CafeSystemWeb folder find .env and find line 3 (REACT_APP_API_URL=http://localhost:8080), update the port in order to connect to backend API.
*For example: if changed to 8181 then the value should be REACT_APP_API_URL=http://localhost:8181

8. Note for the assignment
--------------------------------------------------------------------
- No experience on redux-saga, not using in the project to reduce the risk. 
