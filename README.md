# Phone Directory Web App

This project is a web application built using React that allows users to search for contacts by phone number and county of residence. It interacts with the Contact Registry API to fetch and display contact details.
Features

    Search for contacts by phone number.

    Search for contacts by county of residence.

## Technologies Used

    Frontend: React, Axios, Css

    Backend API: Java (Servlets and JDBC) - Contact Registry API
    

## Getting Started
 1 : Prerequisites

    Node.js and npm

    Contact Registry API running (Backend API for fetching contacts).

 2 : Setup Instructions

    Clone the repository:

git clone https://github.com/your-username/phone-directory-web-app.git

Go to the project directory:

cd phone-directory-web-app

Install the required dependencies:

npm install

Start the React development server:

    npm start

    This will start the frontend application at http://localhost:3000.

API Endpoints Used
1. Get Contact by Phone Number

    URL: /contacts/by-phone

    Method: GET

    Query Parameters:

        phoneNumber: The phone number of the contact you want to search for.

    Example URL:
    http://localhost:8080/contact-registry/contacts/by-phone?phoneNumber=0712345678

   2. Get Contacts by County

    URL: /contacts/by-county

    Method: GET

    Query Parameters:

        county: The county to search for contacts.

    Example URL:
    http://localhost:8080/contact-registry/contacts/by-county?county=Nairobi

   ## Overview
   The React app consists of two primary components for searching:

    PhoneSearch: Allows users to search for a contact using a phone number.

    CountySearch: Allows users to search for contacts by county of residence.

    ViewContacts: A user can view all there contacts

   ## Future Improvements
   
    Add Pagination: Improve performance and usability when displaying large lists of contacts.

    Implement Filtering and Sorting: Allow users to filter contacts by gender, age range, organization, etc.

    Validation on Frontend: Add form validation to catch input errors before API calls are made.

    Responsive Design: Enhance layout and styles for better mobile and tablet experiences.

    Unit and Integration Tests: Add tests for UI components and API integration to ensure stability.

    Authentication: Secure the app with login functionality (e.g., JWT or session-based).

    Contact Update/Delete: Allow users to edit or delete existing contacts.

    Better Error Handling UI: Display clearer messages and retry options when API calls fail.

    User Notifications: Show success/failure toasts when actions are performed.


   
