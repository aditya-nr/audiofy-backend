# Node.js Backend API Documentation

## Overview

This backend API is built using Node.js, Express, MongoDB, and Mongoose. It includes user registration and login functionality, the ability to add audio files, create and update playlists, generate presigned URLs for uploading files to AWS S3, and process YouTube URLs to extract and upload audio to AWS S3.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Add Audio](#add-audio)
  - [Create Playlist](#create-playlist)
  - [Update Playlist](#update-playlist)
  - [Get Presigned URL](#get-presigned-url)
  - [Process YouTube URL](#process-youtube-url)
- [Error Handling](#error-handling)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file with the following environment variables:
   ```
   MONGO_URI=mongodb://localhost:27017/yourDatabaseName
   JWT_SECRET=your_jwt_secret
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-region
   S3_BUCKET_NAME=your-bucket-name
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### User Registration

- **URL:** `/api/register`
- **Method:** `POST`
- **Input:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
