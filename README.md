# Job Application Management Frontend

This is the frontend for a Job Application Management system built using React and React Router. The application allows users to browse jobs, apply for jobs, and manage their profiles, while recruiters can manage companies, post jobs, and view applicants. Admin users have access to an additional interface for managing jobs and companies.

## Features

### **Student Interface:**
  - Browse jobs and apply.
  - View job details and manage profile.
  - Login and Signup functionality.<br/>
```
    Student Username: hdm@guvi.co.in
    Student Password: Santosh@1234
```
![](https://github.com/user-attachments/assets/047cc38e-f95d-4aad-a4cf-e021b286f3ea)<br/><br/>
![](https://github.com/user-attachments/assets/f298a357-1f38-4dd5-9b54-b550a5276086)<br/><br/>
![](https://github.com/user-attachments/assets/01119af0-5bfd-402f-8aab-044d28b852f7)<br/><br/>
![](https://github.com/user-attachments/assets/795cf721-fa8a-4ee3-b8cc-b7631a88991c)<br/><br/>


  
### **Recruiter Interface:**
  - Manage companies.
  - Post new jobs.
  - View applicants for specific jobs.
```
    Recruiter Username: recruiter@gmail.com
    Recruiter Password: Durai@1234
```
![](https://github.com/user-attachments/assets/5bc8d932-61ce-4a1e-abe3-a928848b0dd9)<br/><br/>
![](https://github.com/user-attachments/assets/d2d84002-4aaf-4e49-81ea-593be2442a9d)<br/><br/>

### **Admin Interface:**
  - Manage jobs and companies via a dedicated admin dashboard.<br/><br/>
![](https://github.com/user-attachments/assets/d58176a8-0a25-4e23-9777-0a210cc3a460) <br/><br/>
```
   Admin Username: admin@cpp.jobs.in
   Admin Password: admin@1234
```

### **Protected Routes:**<br/><br/>
Routes are protected based on user roles to ensure only authorized users can access certain sections (e.g., recruiters or admins).


## Technologies Used 


- React
- React Router for navigation
- Redux
- Shadecn
- TailwindCSS for styling
- NodeJs
- MongoDB

## Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm or yarn

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-frontend-repo-name.git
cd your-frontend-repo-name
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

### 3. Run the Application

Start the development server:

```bash
npm start
```

or

```bash
yarn start
```

The application will run on `http://localhost:3000`.

## Project Structure

```
├── src
│   ├── components
│   │   ├── auth
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── admin
│   │   │   ├── Companies.js
│   │   │   ├── CompanyCreate.js
│   │   │   ├── CompanySetup.js
│   │   │   ├── AdminJobs.js
│   │   │   ├── PostJob.js
│   │   │   └── Applicants.js
│   │   ├── mainAdmin
│   │   │   ├── AdminHome.js
│   │   │   └── ProtectedRouteMain.js
│   │   ├── Home.js
│   │   ├── Jobs.js
│   │   ├── Browse.js
│   │   ├── Profile.js
│   │   └── JobDescription.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── README.md
└── package.json
```

## Routing Setup

This application uses `react-router-dom` for navigation between different pages. Below is the routing configuration:

### Main Routes

- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/jobs` - List of available jobs
- `/browse` - Browse jobs
- `/profile` - User profile
- `/description/:id` - Job description page (with dynamic job ID)

### Recruiter Routes (Protected)

- `/admin/companies` - List of companies (Requires recruiter access)
- `/admin/companies/create` - Create a new company (Requires recruiter access)
- `/admin/companies/:id` - Setup or edit company details (Requires recruiter access)
- `/admin/jobs` - List of jobs posted by the recruiter (Requires recruiter access)
- `/admin/jobs/create` - Post a new job (Requires recruiter access)
- `/admin/jobs/:id/applicants` - View job applicants (Requires recruiter access)

### Admin Routes (Protected)

- `/admin/main` - Admin dashboard home (Requires admin access)

### Route Protection

- **ProtectedRoute**: Used to protect recruiter-related routes.
- **ProtectedRouteMain**: Used to protect admin-related routes.

## How to Modify

You can modify the route protection logic or add more routes in the `App.js` file using the `createBrowserRouter` function from `react-router-dom`. Here's an example of a protected route:

```javascript
{
  path: "/admin/companies",
  element: <ProtectedRoute><Companies/></ProtectedRoute>
}
```

## Customizing

- You can modify the styling by editing the `App.css` file.
- To customize the components or add new ones, navigate to the `src/components/` folder and create or modify existing components.



