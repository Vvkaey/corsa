# Admin Page Testing Guide

## Testing Setup

The admin page is now configured to allow access to two email addresses for testing:

### Authorized Emails:
1. `Vivek@stroda.club` (original admin)
2. `imu20122012@gmail.com` (testing access)

## How to Test

### 1. Login with Authorized Email
- Go to `/login`
- Login with either of the authorized emails
- You should see "Admin Panel" in the navigation menu

### 2. Access Admin Page
- Click "Admin Panel" in the navigation menu, OR
- Navigate directly to `/admin/book-session`

### 3. Test the Form
- Fill in Mentor ID and User ID fields
- Click "Book Session" button
- Check for success/error messages

### 4. Test Navigation
- Use the "← Back to Home" button to return to home page
- Verify the admin link appears in both desktop and mobile menus

### 5. Test Access Control
- Try accessing `/admin/book-session` with a non-authorized email
- Should be redirected to home page

## API Testing

The form submits to:
```
POST https://backend.stroda.club/api/users/sessions/create
Content-Type: application/json

{
  "userId": "string",
  "mentorId": "string"
}
```

## Test Cases

### ✅ Valid Access
- Login with `Vivek@stroda.club` → Should see admin panel
- Login with `imu20122012@gmail.com` → Should see admin panel

### ❌ Invalid Access
- Login with any other email → Should NOT see admin panel
- Direct access without login → Should redirect to login

### 🔄 Form Testing
- Empty fields → Should show validation error
- Valid data → Should show success message
- API error → Should show error message

## Reverting to Production

To revert to production (only `Vivek@stroda.club` access):

1. Update `src/app/admin/book-session/page.tsx`:
   ```typescript
   if (user?.email !== "Vivek@stroda.club") {
     router.push("/");
     return;
   }
   ```

2. Update `src/app/_components/global/header/index.tsx`:
   ```typescript
   {user?.email === "Vivek@stroda.club" && (
     <button className="ham-item" onClick={goToAdmin}>
       Admin Panel
     </button>
   )}
   ``` 