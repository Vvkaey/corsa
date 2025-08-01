# Admin Session Booking Page

## Overview
This is an admin-only page for booking sessions between users and mentors. The page is only accessible to users with the email `Vivek@stroda.club`.

## Access Requirements
- User must be logged in
- User email must be exactly `Vivek@stroda.club`
- If these conditions are not met, users will be redirected to login or home page

## Features
- **Form Fields**: 
  - Mentor ID (required)
  - User ID (required)
- **API Integration**: Submits to `https://backend.stroda.club/api/users/sessions/create`
- **Responsive Design**: Works on both mobile and desktop
- **Admin Styling**: Dark theme with glassmorphism effects
- **Status Feedback**: Shows success/error messages
- **Loading States**: Visual feedback during API calls

## Navigation
- Admin link appears in both desktop and mobile navigation menus
- Only visible to the authorized user (`Vivek@stroda.club`)
- Direct access via `/admin/book-session`
- Back button in top-left corner for navigation to home page

## API Endpoint
```
POST https://backend.stroda.club/api/users/sessions/create
Content-Type: application/json

{
  "userId": "string",
  "mentorId": "string"
}
```

## Security
- Route protection based on authentication and email verification
- No header/footer on admin pages for clean interface
- Automatic redirects for unauthorized access

## Styling
- Consistent with website's dark theme
- Glassmorphism card design
- Gradient backgrounds and modern UI elements
- Responsive design for all screen sizes 