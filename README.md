# CloudHub

CloudHub is an API wrapper for managing authentication, products, and orders seamlessly. It is built with TypeScript and designed for flexibility and scalability.

## Installation

Install the package using npm or yarn:

```bash
npm install cloudhub.mn
```

## Usage

Import CloudHub and configure it for your application:

```ts
import CloudHub from "cloudhub";

// Set host and logger
await CloudHub.setHost("https://api.example.com");
await CloudHub.setLogger(true);

// Authenticate
const authResult = await CloudHub.auth.LOGIN({
  email: "user@example.com",
  password: "password123",
});
console.log(authResult);
```

## Features

- **Authentication**: Login and manage tokens.
- **Item Management**: Retrieve and manage items.
- **Product Management**: Retrieve products and details.
- **Order Verification**: Verify orders by ID.

## API

### `CloudHub.setHost(url: string)`

Set the API host URL.

### `CloudHub.setLogger(status: boolean)`

Enable or disable logging.

### `CloudHub.auth.LOGIN(body: { email: string; password: string })`

Authenticate a user and retrieve an access token.

### `CloudHub.auth.getToken()`

Retrieve a new authentication token using stored credentials.

## License

MIT License
