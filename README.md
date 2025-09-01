# HD Notes App - React Frontend

A modern, responsive React frontend for the HD Notes application that integrates with Spring Boot backend. This application provides a beautiful user interface for user authentication and notes management.

## Features

- **Responsive Design**: Mobile-first approach with both mobile and desktop views
- **JWT Authentication**: Secure signup, signin, and logout functionality
- **Notes Management**: Create, view, and delete notes
- **Modern UI**: Beautiful design matching your Figma template
- **Protected Routes**: Automatic redirection based on authentication status

## Screenshots

The application includes:
- **Sign Up**: User registration with form validation
- **Sign In**: User authentication with remember me option
- **Dashboard**: Notes management with create/delete functionality

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Your Spring Boot backend running on `http://localhost:8080`

## Installation

1. **Clone or navigate to your project directory**
   ```bash
   cd /path/to/your/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── SignUp.js          # User registration component
│   ├── SignUp.css         # SignUp component styles
│   ├── SignIn.js          # User authentication component
│   ├── SignIn.css         # SignIn component styles
│   ├── Dashboard.js       # Main dashboard component
│   └── Dashboard.css      # Dashboard component styles
├── contexts/
│   └── AuthContext.js     # JWT authentication context
├── App.js                 # Main application component
├── App.css                # Global application styles
├── index.js               # Application entry point
└── index.css              # Base styles
```

## Backend Integration

This frontend expects your Spring Boot backend to have the following endpoints:

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/send-otp` - Send OTP to user's email
- `POST /api/auth/login` - User login with email and OTP

### Notes Endpoints
- `POST /api/notes/add` - Create a new note
- `DELETE /api/notes/delete/{id}` - Delete a note

### Expected Request/Response Format

#### Signup Request
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "dateOfBirth": "1990-01-01",
  "password": "password123"
}
```

#### Login Request
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Notes Request
```json
{
  "content": "Your note content here"
}
```

## Configuration

The application is configured to proxy requests to your Spring Boot backend running on port 8080. If you need to change this:

1. Update the `proxy` field in `package.json`
2. Or modify the axios base URL in `AuthContext.js`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not recommended)

## Responsive Design

The application automatically switches between mobile and desktop views based on screen size:
- **Mobile**: Optimized for screens ≤768px
- **Desktop**: Optimized for screens >768px

## Styling

The application uses:
- CSS3 with modern features
- Flexbox for layout
- CSS Grid for complex layouts
- CSS animations and transitions
- Responsive design principles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Backend Connection Error**
   - Ensure your Spring Boot backend is running on port 8080
   - Check that CORS is properly configured on your backend

2. **JWT Token Issues**
   - Clear browser localStorage and try again
   - Check that your backend is sending proper JWT tokens

3. **Port Already in Use**
   - Kill the process using port 3000: `npx kill-port 3000`
   - Or use a different port: `PORT=3001 npm start`

### Development Tips

- Use browser developer tools to inspect network requests
- Check the console for any JavaScript errors
- Verify that your backend endpoints match the expected format

## Contributing

1. Make your changes
2. Test thoroughly on both mobile and desktop
3. Ensure responsive design works correctly
4. Test authentication flow end-to-end

## License

This project is part of your HD Notes application.

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify backend connectivity
3. Ensure all dependencies are installed correctly
"# Note_front" 
