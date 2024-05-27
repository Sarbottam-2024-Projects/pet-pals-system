# Pet Pals | Pet Adoption Platform

## Overview
Welcome to Pet Pals, a platform designed to connect loving homes with pets in need. This guide will walk you through the user flow of the application.

## User Flow

### 1. User Authentication
- **Login Page:** When users open the application, they are redirected to the login page.
- **Registration Option:** Users who do not have an account can choose to register.

### 2. User Registration
- **Role Selection:** During registration, users can choose their role as either an `Adopter` or a `Shelter`.

### 3. Adopter Flow
- **Dashboard Access:** Once logged in, adopters can access their dashboard.
- **Pet Adoption:** Adopters can browse available pets and proceed with the adoption process.
- **Restrictions:** Adopters cannot access the shelter management page.

### 4. Shelter Flow
- **Dashboard Access:** Once logged in, shelters can access the shelter management page.
- **Manage Pets:** Shelters can add, update, or remove pet listings.
- **View Adoptions:** Shelters can view and manage adoption requests.

## Application Structure

### File Structure
/controllers
- getUserController.js
- loginController.js
- logoutController.js
- petController.js
- registerController.js
- updateUserProfileController.js
/middleware
- authenticateToken.js
/models
- petModel.js
- user.js
/public
/css
- styles.css
/img
- pet1.jpg
- pet2.jpg
- pet3.jpg
/js
- indexScript.js
- loginScript.js
- logoutScript.js
- petsScript.js
- profileScript.js
- registerScript.js
- shelterScript.js
- singlePetScript.js
/views
- 404.html
- index.html
- login.html
- register.html
- shelter.html
- pets.html
- profile.html
- single-pet.html
- shelter.html
- adoptionForm.html
/routers
- authRouter.js
- petRouter.js
- userRouter.js
- shelterRouter.js

.env
.gitignore
dbConnection.js
index.js
README.md

### Key Pages
- **index.html:** Home page with a parallax slideshow and navigation to view available pets.
- **login.html:** User login page.
- **register.html:** User registration page with role selection.
- **shelter.html:** Management page for shelters to handle pet listings and adoptions.
- **pets.html:** Page listing all available pets for adoption.
- **single-pet.html:** Detailed information page for a selected pet.
- **profile.html:** User profile page for updating personal information.
- **404.html:** Custom 404 error page.
- **adoptionForm.html:** Form for adopters to fill out for adopting a pet.

### Key Scripts
- **indexScript.js:** Script for the main index page.
- **loginScript.js:** Script for handling login functionality.
- **logoutScript.js:** Script to handle user logout.
- **registerScript.js:** Script for handling user registration.
- **profileScript.js:** Script for managing user profiles.
- **shelterScript.js:** Script for shelter management functionalities.
- **petsScript.js:** Script for displaying pets list.
- **singlePetScript.js:** Script for handling single pet details and adoption process.

### Controllers
- **getUserController.js:** Handles user data fetching.
- **loginController.js:** Manages user login.
- **logoutController.js:** Manages user logout.
- **petController.js:** Manages pet data (adding, updating, fetching).
- **registerController.js:** Handles user registration.
- **updateUserProfileController.js:** Manages user profile updates.

### Middleware
- **authenticateToken.js:** Middleware for token-based authentication.

### Models
- **petModel.js:** Mongoose model for pet data.
- **user.js:** Mongoose model for user data.

### Routers
- **authRouter.js:** Routes for authentication (login, registration).
- **petRouter.js:** Routes for pet-related actions.
- **userRouter.js:** Routes for user profile management.
- **shelterRouter.js:** Routes for shelter management actions.

## How to Run

### Prerequisites
- Ensure you have Node.js and npm installed on your machine.

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/Sarbottam-2024-Projects/pet-pals-system.git
    cd pet-pals
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

4. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## Contribution
Contributions are welcome! Please create a pull request with a detailed description of your changes.
In compliance with the requirements for SIT725 Applied Software Engineering T1 2024. 
Created by Team 12 Sarbottam Raj Shrestha, Angelo Remmil Bautista, Krizza Lou Isidro, Tejas Varun

## License
This project is licensed under the MIT License.


