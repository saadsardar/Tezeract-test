# Employee Management System - Backend Development

<p>Hello, below are some points that I have implemented and used in the project.</p>

<ol>
  <li>Module folders will have each domain; in this project, our domain is Employee.</li>
  <li>Used Dto layer for each request for request validations.</li>
  <li>The domain folder has entities; <code>employee.ts</code> contains the class of Employee and method(s) which are being used for an employee.</li>
  <li>I have added a repository folder, but in this case, the employee was reading files from the file service. The employee service tells the file service to get the details of the JSON file.</li>
  <li>I placed the dataset inside the JSON file and read the contents using the file system lib, converted the file JSON to an entity so that it can be mapped.</li>
  <li>The common module contains all the things which are shared across the project.</li>
  <li>I have made a response factory method so that the application can send the same response in any case.</li>
  <li>Added a catch block on the global level so that all exceptions can be caught in that scope. It also handles the Bad request error handling which is given by DTO.</li>
  <li>The POSTMAN API collection is attached with this project.</li>
</ol>

<h2>Installation</h2>

```bash
$ npm install
```

<h2>Running the App</h2>

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev