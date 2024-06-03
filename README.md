# Publisher Portal

## Overview

The Publisher Portal is a web application that allows publishers to upload and manage their content offerings. It includes features for content submission, listing content on a home screen, and a checkout system where users can add items to a cart and complete transactions. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React.

## Features

- **Content Offering Submission:** Publishers can add new content offerings with metadata like title, description, price, and document URL.
- **Home Screen/Listings Page:** Displays all content offerings with details.
- **Cart and Checkout:** Users can add content offerings to a cart and proceed to a checkout page that summarizes the items and shows the total price.
- **Transaction Management:** Saves transactions to the database upon completion.

## Technology Stack

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Axios, React Router
- **Database:** MongoDB

## Project Structure
backend/
├── controllers/
│ ├── offeringsController.js
│ └── transactionController.js
├── models/
│ ├── Offering.js
│ └── Transaction.js
├── routes/
│ ├── offerings.js
│ └── transactions.js
├── server.js
frontend/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── OfferingForm.js
│ │ └── OfferingList.js
│ ├── pages/
│ │ ├── Cart.js
│ │ ├── Checkout.js
│ │ ├── Home.js
│ │ └── Success.js
│ ├── App.js
│ ├── index.js
│ └── App.css
├── package.json
└── README.md
## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/publisher-portal.git
    cd publisher-portal/backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Start MongoDB:
    ```bash
    mongod
    ```

4. Start the backend server:
    ```bash
    node server.js
    ```
    The backend server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```
    The frontend server will run on `http://localhost:3000`.

## Usage

1. **Add New Offering:**
   - Navigate to the "New Offering" page.
   - Fill out the form with title, description, price, and document URL.
   - Submit the form to add the offering to the database.

2. **View Offerings:**
   - Navigate to the home page to view all content offerings.

3. **Add to Cart:**
   - Click on the "Add to Cart" button for any offering on the home page.

4. **Checkout:**
   - Go to the "Cart" page to view items in the cart.
   - Click on the "Checkout" button to complete the transaction.

## API Endpoints

### Offerings

- **POST /api/offerings**
  - Create a new offering.
- **GET /api/offerings**
  - Retrieve all offerings.

### Transactions

- **POST /api/create-order**
  - Create a new order.
- **POST /api/transaction**
  - Create a new transaction.
