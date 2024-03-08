// ROUTING
const express = require("express"); // Importing the Express framework and assigning it to the 'express' variable
const app = express(); // Creating an instance of the Express application

const port = 8083;
const path = require("path"); // Importing the 'path' module for working with file paths

// DATABASE INTERACTIONS
// Using google cloud to store resume and cover letter
const { Storage } = require("@google-cloud/storage"); // Importing the Google Cloud Storage library and assigning it to 'Storage'
const multer = require("multer"); // Importing the 'multer' library for handling file uploads
const bodyParser = require("body-parser"); // Importing the 'body-parser' middleware for parsing HTTP request bodies

// STATIC FILE SERVING
// Defining the source directory for static files i.e term_project.html, term_project.js and term_project.css
const src = path.join(__dirname, "front_end");
app.use(express.static(src)); // Serving static files from the 'front_end' directory

// FILE UPLOAD CONFIGURATION
// Setting up 'Multer' to handle file uploads, using in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GOOGLE CLOUD STORAGE CONFIGURATION
// Configuring Google Cloud Storage using project ID and key file
let projectId = "akunna-project-1";
let keyFilename = "mykey.json";
const storageClient = new Storage({
  projectId,
  keyFilename,
});
const bucket = storageClient.bucket("neptune-tech-proj"); // Specifying the name of the Google Cloud Storage bucket

// FILE UPLOAD ROUTE
// Defining a route to handle file uploads when a POST request is made to '/submit_application'
app.post("/submit_application", upload.fields([{ name: "resume" }, { name: "cover_letter" }]), (req, res) => {
  // req.files contains the uploaded files

  // Extracting the uploaded files (resume and cover_letter) and the other form data
  const resumeFile = req.files["resume"][0];
  const coverLetterFile = req.files["cover_letter"][0];
  const {
    firstName, middleName, lastName, dob, gender, phoneNumber, email, homeNumber, UnitNumber, streetName,
    city, usState, zipCode, degreeType, major, uni_name, gradDate, current_enrollment_Details, degreeType_1, major_1,
    current_employer, current_job_title, current_job_duration, previous_employers, linkInput, linkInput_1,
    skills, certs, refs
  } = req.body;

  // Creating a new data object for the job application
  const applicationData = {
    firstName, middleName, lastName, dob, gender, phoneNumber, email, homeNumber, UnitNumber, streetName,
    city, usState, zipCode, degreeType, major, uni_name, gradDate, current_enrollment_Details, degreeType_1, major_1,
    current_employer, current_job_title, current_job_duration, previous_employers, linkInput, linkInput_1,
    skills, certs, refs
  };

  // Unique ID generator
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>

        ( 
            c^
            (crypto .getRandomValues (new Uint8Array (1))[0] & (15 >> (c / 4)))
    ).toString(16)
    );
  }

  // GOOGLE CLOUD STORAGE FILE UPLOAD
  // Uploading form data as a .txt file to Google Cloud Storage with a unique ID
  const uniqueId = uuidv4();
  const formDataFileName = `form_data_${uniqueId}.txt`;
  const formDataFile = bucket.file(formDataFileName);

  formDataFile.save(JSON.stringify(applicationData, null, 2), {
    metadata: {
      contentType: "text/plain" // Set content type to plain text
    }
  }, (err) => {
    if (err) {
      console.error("Error saving form data:", err);
      res.status(500).send("Internal Server Error");
    } else {
      // Creating objects for uploading files to Google Cloud Storage
      const resumeFileUpload = bucket.file(resumeFile.originalname);
      const coverLetterFileUpload = bucket.file(coverLetterFile.originalname);

      // Creating write streams for the files and saving the uploaded data to Google Cloud Storage
      const resumeFileStream = resumeFileUpload.createWriteStream();
      const coverLetterFileStream = coverLetterFileUpload.createWriteStream();

      // Ending the write streams, effectively uploading the files
      resumeFileStream.end(resumeFile.buffer);
      coverLetterFileStream.end(coverLetterFile.buffer);

      // Sending a successful response back to the client
      res.status(200).send("Thank you for taking the first step in joining Neptune Technologies. We've received your application and will carefully review your qualifications. Stay tuned for updates on your application status.");
    }
  });
});

// BODY PARSER MIDDLEWARE
// Using 'body-parser' middleware to parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROOT ROUTE
// Defining a route for the root URL that serves 'term_project.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(src, "term_project.html"));
});

// SERVER START
// Starting the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
