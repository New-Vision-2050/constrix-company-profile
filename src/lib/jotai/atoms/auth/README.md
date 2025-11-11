# Local Storage Sync with Jotai Auth Atoms

This guide explains how your authentication state is automatically synced with localStorage using Jotai atoms.

## Overview

Your auth atoms are set up to automatically persist authentication state to localStorage, ensuring users stay logged in across browser sessions and tabs.

## Key Features

### 1. **Automatic Persistence**

The `authAtom` uses Jotai's `atomWithStorage` which automatically:

- Reads from localStorage on initialization
- Saves to localStorage whenever the state changes
- Handles JSON parsing/stringification
- Includes error handling and validation with Zod

### 2. **SSR Safe**

The implementation handles server-side rendering gracefully by checking for `window` availability.

### 3. **Type Safe**

Full TypeScript support with Zod schema validation ensures data integrity.

### 4. **Error Handling**

Corrupted localStorage data is automatically detected and cleared.

## Available Atoms

### Core Auth Atom

```typescript
export const authAtom = atomWithStorage<AuthState>("auth", null, {
  /* custom storage config */
});
```

### Derived Atoms

```typescript
export const userAtom = atom((get) => get(authAtom)?.user ?? null);
export const tokenAtom = atom((get) => get(authAtom)?.token ?? null);
export const isAuthenticatedAtom = atom((get) => get(authAtom) !== null);
```

### Action Atoms

```typescript
export const loginAtom = atom(null, (get, set, authData) => {
  /* login logic */
});
export const logoutAtom = atom(null, (get, set) => {
  /* logout logic */
});
export const initAuthAtom = atom(null, (get, set) => {
  /* initialization logic */
});
```

## Usage Examples

### In Components

```typescript
import { useAtom, useAtomValue } from 'jotai';
import { authAtom, userAtom, loginAtom, logoutAtom, isAuthenticatedAtom } from '@/lib/jotai/atoms/auth';

function AuthComponent() {
  const [auth, setAuth] = useAtom(authAtom);
  const user = useAtomValue(userAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const [, login] = useAtom(loginAtom);
  const [, logout] = useAtom(logoutAtom);

  const handleLogin = async () => {
    // After successful API call
    login({
      user: { id: '1', email: 'user@example.com', name: 'John', roles: ['user'] },
      token: 'jwt-token'
    });
  };

  const handleLogout = () => {
    logout(); // Automatically clears localStorage
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name || user?.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### With API Integration

```typescript
import { AuthApi } from "@/services/api/base/auth";
import { useAtom } from "jotai";
import { loginAtom } from "@/lib/jotai/atoms/auth";

function LoginForm() {
  const [, login] = useAtom(loginAtom);

  const handleSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await AuthApi.login(formData);

      // This will automatically sync to localStorage
      login({
        user: response.data.user,
        token: response.data.token,
      });

      console.log("User logged in and state persisted!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // ... rest of component
}
```

### App Initialization

```typescript
// In your app root or layout component
import { useAtom } from 'jotai';
import { initAuthAtom } from '@/lib/jotai/atoms/auth';
import { useEffect } from 'react';

function App() {
  const [, initAuth] = useAtom(initAuthAtom);

  useEffect(() => {
    // Initialize auth state from localStorage on app start
    initAuth();
  }, [initAuth]);

  return (
    // Your app content
  );
}
```

## How It Works

### 1. **Reading from localStorage**

When the app starts, `atomWithStorage` automatically:

- Checks if we're in a browser environment (`window` exists)
- Reads the stored value from localStorage using key "auth"
- Validates the data using the Zod schema
- Sets the atom value or clears invalid data

### 2. **Writing to localStorage**

When the auth state changes:

- The new value is automatically JSON stringified and saved
- If the value is `null` (logout), the localStorage item is removed
- All subscribed components re-render with the new state

### 3. **Error Handling**

- Invalid JSON is caught and localStorage is cleared
- Schema validation failures result in state reset
- SSR compatibility prevents hydration mismatches

## Benefits

1. **Persistent Sessions**: Users stay logged in across browser restarts
2. **Multi-Tab Sync**: Auth state syncs automatically between tabs
3. **Automatic Cleanup**: Invalid or corrupted data is automatically handled
4. **Type Safety**: Full TypeScript support with runtime validation
5. **Performance**: Minimal re-renders due to Jotai's atomic approach

## Storage Structure

The localStorage entry looks like this:

```json
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "roles": ["user", "admin"]
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Security Considerations

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- Clear localStorage on logout to prevent unauthorized access
- Consider token expiration and refresh mechanisms
- Use HTTPS to prevent token interception

## Testing

```typescript
// Test localStorage sync
import { renderHook, act } from "@testing-library/react";
import { useAtom } from "jotai";
import { authAtom, loginAtom } from "@/lib/jotai/atoms/auth";

test("auth state syncs with localStorage", () => {
  const { result } = renderHook(() => {
    const [auth] = useAtom(authAtom);
    const [, login] = useAtom(loginAtom);
    return { auth, login };
  });

  act(() => {
    result.current.login({
      user: { id: "1", email: "test@example.com", name: null, roles: [] },
      token: "test-token",
    });
  });

  // Check localStorage was updated
  const stored = JSON.parse(localStorage.getItem("auth") || "{}");
  expect(stored.token).toBe("test-token");
  expect(stored.user.email).toBe("test@example.com");
});
```

Your authentication state will now persist automatically across sessions and stay in sync between browser tabs!
