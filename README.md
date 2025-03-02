# GrowTeens

GrowTeens is a youth empowerment initiative focused on equipping African teenagers with digital, entrepreneurial, and leadership skills to prepare them for the future of work. Our mission is to bridge the skills gap among African youth and empower them to become active contributors to the global economy through hands-on training, mentorship programs, and entrepreneurial support.

## Table of Contents

- [GrowTeens](#growteens)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Server Setup](#server-setup)
    - [Client Setup](#client-setup)
  - [Running the Application](#running-the-application)

## Overview

GrowTeens aims to impact over 100,000 African teenagers within the next five years by providing training in digital literacy, coding, entrepreneurship, and leadership. Our platform integrates online learning with in-person workshops and mentorship to equip youth with both theoretical knowledge and practical skills.

## Features

- **User Registration & Authentication:**  
  Secure signup and login for teenagers, mentors, sponsors, and school representatives.
- **Program Management:**  
  Comprehensive listings of training programs (digital literacy, coding bootcamps, entrepreneurship, etc.), scheduling, and course materials.
- **Mentorship & Networking:**  
  Connect teenagers with industry professionals for guidance and support.
- **Sponsorship & Funding:**  
  Manage sponsorships and funding opportunities.
- **Payment Processing:**  
  Handle subscriptions, event fees, and other financial transactions.
- **Responsive Design:**  
  Modern, responsive UI built with Next.js, Tailwind CSS, and Chakra UI.
- **Robust Backend:**  
  RESTful API built with Express and Prisma ORM connecting to a PostgreSQL database.

## Tech Stack

- **Frontend:**
  - Next.js (using the new App Directory)
  - Tailwind CSS
  - Chakra UI
- **Backend:**
  - Node.js & Express
  - PostgreSQL
  - Prisma ORM

## Project Structure

The project is organized as a monorepo with separate directories for the backend and frontend:

growteens/ ├── server/ │ ├── prisma/ │ │ └── schema.prisma │ ├── index.js │ ├── package.json │ └── .env └── client/ ├── app/ │ ├── layout.tsx │ ├── page.tsx │ ├── register/ │ │ └── page.tsx │ └── programs/ │ └── page.tsx ├── public/ ├── styles/ ├── package.json └── .env.local


## Setup and Installation

### Prerequisites

- **Node.js:** v16 or higher  
- **npm:** or yarn  
- **PostgreSQL:** (Supabase for development)

### Server Setup

1. **Navigate to the server directory:**

   ```bash
   cd server

2. **Install dependencies:**

    ```bash
    npm install

3. **Configure Environment Variables:**

    ```env
    DATABASE_URL="postgresql://your_username:your_password@your_host:5432/growteens"
    PORT=8080
    NODE_ENV=development

4. **Run Prisma Migrations:**
    
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init

5. **Start the Backend Server:**

    ```bash
    npm run dev

### Client Setup

1. **Navigate to the client directory:**

    ```bash
    cd client

2. **Install dependencies:**

    ```bash
    npm install

3. **Configure Environment Variables:**

    ```env
    NEXT_PUBLIC_API_URL="http://localhost:3000/api"

4. **Start the Frontend Server:**

    ```bash
    npm run dev

## Running the Application

- The **backend** will run on http://localhost:8080 by default or another specified port.
- The **frontend** will run on http://localhost:3000 by default or another specified port.
- Make sure both the backend and frontend servers are running to fully test the application.