# Dummy Login System Documentation

## Overview
A complete dummy login system has been implemented for testing the authentication flow. Two user types are available: **User** and **Admin**, each with different dashboard access.

---

## Dummy Credentials

### User Account
- **Email:** `user@example.com`
- **Password:** `User@123`
- **Dashboard:** `/dash`

### Admin Account
- **Email:** `admin@example.com`
- **Password:** `Admin@123`
- **Dashboard:** `/admin`

---

## How It Works

### 1. **Authentication Flow**
- Users enter email and password on the login page (`/auth/login`)
- Credentials are validated against the dummy credentials in `authSlice.js`
- On successful login:
  - User data is stored in Redux
  - Data is also saved to localStorage
  - User/Admin is redirected to their respective dashboard

### 2. **Files Created/Modified**

#### New Files:
- `src/features/auth/authSlice.js` - Redux slice for authentication
- `src/pages/dash/AdminDashboard.jsx` - Admin dashboard page
- `src/router/components/ProtectedRoute.jsx` - Route protection component

#### Modified Files:
- `src/features/store.js` - Added auth reducer
- `src/pages/auth/LoginView.jsx` - Added login logic and dummy credentials UI
- `src/pages/dash/dash_home/DashboardView.jsx` - Updated user dashboard
- `src/router/router.jsx` - Added protected dashboard routes

### 3. **Redux State Structure**
```javascript
{
  auth: {
    user: {
      email: 'user@example.com',
      name: 'John User'
    },
    isAuthenticated: true,
    role: 'user', // or 'admin'
    error: null,
    loading: false
  }
}
```

### 4. **Key Features**

✅ **Error Handling** - Invalid credentials show error message
✅ **Loading State** - Button shows loading state during login
✅ **Automatic Redirect** - Redirects to appropriate dashboard based on role
✅ **Protected Routes** - Dashboards accessible only when authenticated
✅ **Logout** - Both dashboards have logout functionality
✅ **Dummy Credentials UI** - Section on login page to reveal test credentials
✅ **localStorage Persistence** - Auth data saved to localStorage

---

## Testing the Login System

### Using the Dummy Credentials Button
1. Go to `/auth/login`
2. Click "**Afficher les identifiants de test**" at the bottom
3. Click "**Remplir**" to auto-fill credentials
4. Click "**Se connecter**"

### Manual Login
1. Enter the email and password from above
2. Click "**Se connecter**"
3. You'll be redirected to:
   - `/dash` for user credentials
   - `/admin` for admin credentials

---

## Integration with Real Backend

To connect with a real API:

1. **Update `authSlice.js`:**
   - Replace the dummy validation with an API call
   - Update the `loginAsync` thunk to call your backend

2. **Example:**
```javascript
export const loginAsync = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('YOUR_API_ENDPOINT/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    // ... handle response
  } catch (error) {
    dispatch(setError(error.message));
  }
};
```

---

## Protected Routes

All dashboard routes are protected by the `ProtectedRoute` component, which checks:
- If user is authenticated
- If not, redirects to login page

---

## Important Notes

⚠️ **Development Only** - The dummy credentials section should be removed in production.

⚠️ **localStorage** - Currently data is stored in localStorage. Consider using secure cookies for production.

⚠️ **No Token Implementation** - This is a basic auth system. Add JWT tokens when integrating with a real backend.

---

## Routes Summary

| Route | Access | Component |
|-------|--------|-----------|
| `/` | Public | Home |
| `/auth/login` | Public | LoginView |
| `/auth/register` | Public | RegisterView |
| `/dash` | Protected (User) | DashboardView |
| `/admin` | Protected (Admin) | AdminDashboard |

---

## Redux Actions Available

```javascript
// Async thunk
dispatch(loginAsync(email, password))

// Synchronous actions
dispatch(logout())
dispatch(setError(errorMessage))
dispatch(setLoading(boolean))
dispatch(restoreAuth({user, role}))
```

---

**Created:** April 2026
**Status:** Ready for testing and integration with backend
