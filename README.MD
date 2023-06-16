# REST API explanation for each method

## /register

Step 1: Validate User Data
Before proceeding, validate the user data such as email and name to ensure they meet the required format and criteria. If any validation checks fail, throw an error indicating the specific issue with the user data.

Step 2: Check User Existence
Next, check if the user already exists in the database based on their email. If a user with the same email is found, throw an error indicating that the user already exists and prompt the user to use a different email.

Step 3: Hash the Password
To securely store the user's password, use bcryptjs to hash it. Hashing transforms the plain-text password into an irreversible, encrypted string. This adds an extra layer of security by ensuring that even if someone gains access to the stored passwords, they cannot be easily deciphered.

Step 4: Save User Data to the Database
Once the user data has been validated and the password has been hashed, save the user's data, including the hashed password, to the database. This ensures that the user's information is securely stored and can be accessed when needed.

By following these steps, you can help ensure that user data is validated, passwords are securely hashed, and users are stored in the database without any duplication or security vulnerabilities.

## /login

Step 1: Validate User Data
Before proceeding, validate the user data, such as email and name, to ensure they meet the required format and criteria. If any validation checks fail, throw an error indicating the specific issue with the user data.

Step 2: Find User by Email
Attempt to find the user in the database based on their email. If no user is found, throw an error indicating that the user does not exist.

Step 3: Compare Hashed Password
Compare the hashed password stored in the database with the plain-text password provided by the user. If they do not match, throw an error indicating that the password is incorrect.

Step 4: Generate JSON Web Token (JWT)
If the user data and password are valid, generate a JWT token with a specified expiration time (e.g., 1 hour). This token will be used for authentication and authorization purposes.

Step 5: Send Response with User ID and Token
Return a response object containing the user ID and the generated token to the client. This allows the client to use the token for subsequent API requests and identify the user.

By following these steps, you can validate user data, authenticate the user, generate a JWT token, and provide the necessary information back to the client for further interaction with the API.
