# API Services Implementation Guide

This document provides a comprehensive guide on how to implement API services following the established patterns and conventions in this project.

## Overview

This guide explains the standardized approach for creating type-safe API services using TypeScript. All API services should follow this pattern for consistency, maintainability, and type safety.

## Project Structure Convention

```
src/services/api/
├── base/                    # Base API services
│   └── [service-name]/
│       ├── index.ts         # Service exports (functions)
│       └── types/
│           ├── args.ts      # Request argument types
│           └── responses.ts # Response types
└── [other-api-groups]/
```

## Type System Architecture

### 1. Data Models (`types/api/base/`)

All backend data models are defined in `src/types/api/base/` with the `BE_` prefix:

```typescript
// src/types/api/base/user/index.ts
export interface BE_User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  // ... other fields
}
```

**Naming Convention**: `BE_[ModelName]` (e.g., `BE_User`, `BE_Product`, `BE_Order`)

### 2. Request Arguments (`types/args.ts`)

Define all request parameters and body types:

```typescript
// src/services/api/base/[service]/types/args.ts
export interface LoginArgs {
  email: string;
  password: string;
}

export interface UpdateUserArgs {
  id: string;
  firstName?: string;
  lastName?: string;
}
```

### 3. Response Types (`types/responses.ts`)

Define all API response structures:

```typescript
// src/services/api/base/[service]/types/responses.ts
import { BE_User } from "@/types/api/base/user";

export interface LoginResponse {
  user: BE_User;
  token: string;
}

export interface GetUsersResponse {
  users: BE_User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}
```

## Implementation Pattern

### Service Implementation (`index.ts`)

All API services should be implemented as objects with methods for better organization:

```typescript
// src/services/api/base/auth/index.ts
import { baseApi } from "@/lib/axios/instances/base";
import { LoginArgs, RegisterArgs } from "./types/args";
import { LoginResponse, RegisterResponse } from "./types/responses";

// ✅ Export as objects with methods (Recommended)
export const AuthApi = {
  login: (args: LoginArgs) => baseApi.post<LoginResponse>("/auth/login", args),

  register: (args: RegisterArgs) =>
    baseApi.post<RegisterResponse>("/auth/register", args),

  logout: () => baseApi.post<void>("/auth/logout"),

  refreshToken: () => baseApi.post<{ token: string }>("/auth/refresh"),
};

// Example: User service
export const UserApi = {
  list: (args?: { page?: number; limit?: number }) =>
    baseApi.get<GetUsersResponse>("/users", { params: args }),

  getMe: () => baseApi.get<GetUserResponse>("/users/me"),

  getById: (id: string) => baseApi.get<GetUserResponse>(`/users/${id}`),

  update: (args: UpdateUserArgs) =>
    baseApi.put<UpdateUserResponse>(`/users/${args.id}`, args),

  delete: (id: string) => baseApi.delete<void>(`/users/${id}`),
};
```

## Complete Implementation Example

Let's create a complete example for a "Products" service:

### Step 1: Define Data Model

```typescript
// src/types/api/base/product/index.ts
export interface BE_Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BE_Category {
  id: string;
  name: string;
  description: string;
}
```

### Step 2: Define Request Arguments

```typescript
// src/services/api/base/products/types/args.ts
export interface GetProductsArgs {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}

export interface CreateProductArgs {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
}

export interface UpdateProductArgs {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  imageUrl?: string;
}

export interface DeleteProductArgs {
  id: string;
}
```

### Step 3: Define Response Types

```typescript
// src/services/api/base/products/types/responses.ts
import { BE_Product, BE_Category } from "@/types/api/base/product";

export interface GetProductsResponse {
  products: BE_Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetProductResponse {
  product: BE_Product;
  category: BE_Category;
}

export interface CreateProductResponse {
  product: BE_Product;
  message: string;
}
```

### Step 4: Implement Service Objects

```typescript
// src/services/api/base/products/index.ts
import { baseApi } from "@/lib/axios/instances/base";
import {
  GetProductsArgs,
  CreateProductArgs,
  UpdateProductArgs,
  DeleteProductArgs,
} from "./types/args";
import {
  GetProductsResponse,
  GetProductResponse,
  CreateProductResponse,
} from "./types/responses";

export const ProductApi = {
  list: (args?: GetProductsArgs) =>
    baseApi.get<GetProductsResponse>("/products", { params: args }),

  getById: (id: string) => baseApi.get<GetProductResponse>(`/products/${id}`),

  create: (args: CreateProductArgs) =>
    baseApi.post<CreateProductResponse>("/products", args),

  update: (args: UpdateProductArgs) =>
    baseApi.put<void>(`/products/${args.id}`, args),

  delete: (args: DeleteProductArgs) =>
    baseApi.delete<void>(`/products/${args.id}`),
};

// Additional service example
export const CategoryApi = {
  list: () => baseApi.get<GetCategoriesResponse>("/categories"),

  getById: (id: string) =>
    baseApi.get<GetCategoryResponse>(`/categories/${id}`),

  create: (args: CreateCategoryArgs) =>
    baseApi.post<CreateCategoryResponse>("/categories", args),
};
```

## Usage Examples

### In Components or Hooks

```typescript
// In a React component or custom hook
import { ProductApi, AuthApi, UserApi } from "@/services/api/base/products";
import { AuthApi } from "@/services/api/base/auth";
import { UserApi } from "@/services/api/base/users";

// Authentication
const handleLogin = async () => {
  try {
    const response = await AuthApi.login({
      email: "user@example.com",
      password: "password123",
    });
    console.log("User:", response.data.user);
    console.log("Token:", response.data.token);
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// User operations
const fetchCurrentUser = async () => {
  try {
    const response = await UserApi.getMe();
    console.log("Current user:", response.data.user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
};

const fetchUserById = async (userId: string) => {
  try {
    const response = await UserApi.getById(userId);
    console.log("User:", response.data.user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
};

// Product operations
const fetchProducts = async () => {
  try {
    const response = await ProductApi.list({
      page: 1,
      limit: 10,
      categoryId: "category-123",
    });
    console.log("Products:", response.data.products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

// Create new product
const createNewProduct = async () => {
  try {
    const response = await ProductApi.create({
      name: "New Product",
      description: "Product description",
      price: 29.99,
      categoryId: "category-123",
    });
    console.log("Product created:", response.data.product);
  } catch (error) {
    console.error("Failed to create product:", error);
  }
};
```

## Best Practices

### 1. Object and Method Naming

- Use PascalCase for API objects: `AuthApi`, `UserApi`, `ProductApi`
- Use camelCase for methods: `login`, `register`, `getMe`, `getById`, `list`
- Use descriptive method names that clearly indicate the action

### 2. Common Method Patterns

- **`list`**: For fetching multiple items (e.g., `UserApi.list()`, `ProductApi.list()`)
- **`getById`**: For fetching a single item by ID (e.g., `UserApi.getById(id)`)
- **`getMe`**: For fetching current user data (e.g., `UserApi.getMe()`)
- **`create`**: For creating new resources (e.g., `ProductApi.create()`)
- **`update`**: For updating existing resources (e.g., `UserApi.update()`)
- **`delete`**: For deleting resources (e.g., `ProductApi.delete()`)

### 3. Type Safety

- Always define argument and response types
- Use generic types for Axios responses: `baseApi.get<ResponseType>`
- Import data models from `@/types/api/base/[model]`

### 3. HTTP Methods

- `GET` for fetching data
- `POST` for creating resources
- `PUT` for updating entire resources
- `PATCH` for partial updates
- `DELETE` for removing resources

### 4. Error Handling

Always wrap API calls in try-catch blocks in your components:

```typescript
try {
  const response = await AuthApi.login(loginData);
  // Handle success
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data);
  }
}
```

### 5. Optional Parameters

Use optional properties for non-required parameters:

```typescript
export interface GetUsersArgs {
  page?: number; // Optional
  limit?: number; // Optional
  search?: string; // Optional
  status: "active" | "inactive"; // Required
}
```

## File Checklist

When creating a new API service, ensure you have:

- [ ] Data model in `src/types/api/base/[model]/index.ts` with `BE_` prefix
- [ ] Request arguments in `src/services/api/base/[service]/types/args.ts`
- [ ] Response types in `src/services/api/base/[service]/types/responses.ts`
- [ ] Service objects with methods in `src/services/api/base/[service]/index.ts`
- [ ] Proper TypeScript generics for all axios calls
- [ ] Descriptive object and method names following established patterns
- [ ] Consistent method naming: `list`, `getById`, `getMe`, `create`, `update`, `delete`

## Common Patterns

### Pagination Response

```typescript
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

### ID-based Operations

```typescript
// Always use string for IDs
export const getById = (id: string) =>
  baseApi.get<GetResponse>(`/resource/${id}`);

export const deleteById = (id: string) =>
  baseApi.delete<void>(`/resource/${id}`);
```

This guide ensures consistency across all API services while maintaining type safety and following React/Next.js best practices.
