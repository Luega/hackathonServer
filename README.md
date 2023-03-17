# Manual Therapy Management App - Back End

This is the back-end part of the Manual Therapy Management App, a web application designed to help manual therapists manage their patients and information related to their visits. This part of the application is built using Node.js and Express, and is connected to a MongoDB database.

## Installation
To install the application, clone the repository to your local machine and run the following commands:

npm install
npm run build
npm run dev
This will install all the necessary dependencies and start the development server.

## Usage
Once the development server is running, the back-end APIs can be accessed from the front-end application to perform CRUD (Create, Read, Update, Delete) operations on patient and treatment data.

## IMPORTANT
You will need a connection to a MongoDB database to use the features.
You can use the front-end part in the repo (https://github.com/Luega/hackathonFront) in order to use the app.

## API Documentation
The following endpoints are available:

GET /api/patients -Returns a list of all patients in the system.
GET /api/patients/:id -Returns one specific patient in the system.
POST /api/patients -Create a new patient in the system.
PUT /api/patients/:id/treatments -Update a specific patient in the system in order to add a new treatment.
DELETE /api/patients/:id -Delete one specific patient in the system.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.
