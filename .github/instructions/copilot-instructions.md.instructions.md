---
applyTo: "**"
---

# GitHub Copilot Instructions - Medaya Project

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Folder Structure](#folder-structure)
5. [Routing System](#routing-system)
6. [API Service Layer](#api-service-layer)
7. [Type System & Interfaces](#type-system--interfaces)
8. [State Management (Jotai)](#state-management-jotai)
9. [Authentication & Authorization](#authentication--authorization)
10. [Workspace System](#workspace-system)
11. [Internationalization (i18n)](#internationalization-i18n)
12. [UI Components & Theme](#ui-components--theme)
13. [Form Handling](#form-handling)
14. [Module Architecture (3-Layer Pattern)](#module-architecture-3-layer-pattern)
15. [How to Implement Features](#how-to-implement-features)
16. [Code Conventions](#code-conventions)

---

## Project Overview

**Medaya** is a medical workspace management system built with Next.js 15, TypeScript, and Material-UI. It follows a multi-tenant architecture where users can create and manage workspaces, branches, and patients.

### Key Features

- Multi-workspace support
- Branch management
- Patient management
- Multi-language support (English & Arabic with RTL)
- Role-based access control
- Email verification system

---

## Technology Stack

### Core Framework

- **Next.js 15.5.0** (App Router with Turbopack)
- **React 19.1.0**
- **TypeScript 5+**

### UI & Styling

- **Material-UI (MUI) v7.3.1** - Component library
- **Minimal Template** - Based on minimals.cc free template
- **@emotion** - CSS-in-JS
- **Iconsax React** & **Tabler Icons** - Icon libraries

### State Management

- **Jotai 2.13.1** - Atomic state management
- **TanStack Query v5** (React Query) - Server state management

### Data Fetching

- **Axios 1.11.0** - HTTP client with interceptors
- Custom Axios instances with automatic header injection

### Forms & Validation

- **React Hook Form 7.62.0** - Form management
- **Zod 4.1.0** - Schema validation
- **@hookform/resolvers** - RHF + Zod integration

### Internationalization

- **next-intl 4.3.5** - i18n with Next.js App Router support

### Other Key Libraries

- **dayjs** - Date manipulation
- **notistack** - Toast notifications
- **simplebar-react** - Custom scrollbars
- **nuqs** - URL state management

---

## Project Architecture

### Architecture Principles

1. **Separation of Concerns** - Clear separation between data, logic, and presentation
2. **Type Safety** - Full TypeScript coverage with strict types
3. **Server-First** - Leverage Next.js server components where possible
4. **Client Components** - Used only when interactivity is needed
5. **Atomic Design** - Components organized by complexity and reusability

### Key Architectural Patterns

- **3-Layer Architecture** for complex features (Data → Logic → UI)
- **API Service Layer** with TypeScript-first approach
- **Headless Components** for logic reusability
- **Context Components** for prop drilling avoidance

---

## Folder Structure

```
src/
├── app/                          # Next.js App Router
│   └── [locale]/                 # Locale-based routing
│       ├── (auth)/               # Authentication routes (login, register)
│       ├── (dashboard)/          # Protected dashboard routes
│       ├── (public)/             # Public routes
│       └── layout.tsx            # Root layout with providers
│
├── components/                   # Shared components
│   ├── chart/                    # Chart components
│   ├── color-utils/              # Color picker utilities
│   ├── headless/                 # Headless utility components
│   │   ├── create-context-component/  # Context wrapper utility
│   │   ├── get-grid-item/        # Grid item factory
│   │   └── ...
│   ├── label/                    # Label components
│   ├── logo/                     # Logo components
│   ├── scrollbar/                # Custom scrollbar
│   ├── shared/                   # Shared utility components
│   └── ui/                       # UI components
│       ├── inputs/               # Form inputs
│       ├── interactions/         # Loading, dialogs, etc.
│       ├── others/               # Pagination, etc.
│       └── placeholders/         # Empty states
│
├── config/                       # Configuration files
│
├── i18n/                         # Internationalization setup
│   ├── global-config.ts          # i18n configuration
│   ├── routing.ts                # Route internationalization
│   └── request.ts                # Server-side i18n
│
├── layouts/                      # Layout components
│   ├── auth/                     # Auth layout
│   ├── dashboard/                # Dashboard layout
│   │   ├── layout.tsx            # Main dashboard layout
│   │   ├── nav.tsx               # Navigation
│   │   ├── content.tsx           # Content wrapper
│   │   └── page-content.tsx     # Page content with title/actions
│   └── core/                     # Core layout utilities
│
├── lib/                          # Libraries & utilities
│   ├── auth/                     # Authentication utilities
│   │   ├── client/               # Client-side auth (hooks, HOCs)
│   │   ├── server/               # Server-side auth (token, logout)
│   │   ├── hooks/                # Auth hooks
│   │   └── constants/            # Auth constants
│   ├── axios/                    # Axios configuration
│   │   ├── instances/            # Axios instances
│   │   │   ├── base/             # Base API instance
│   │   │   └── workspace/        # Workspace API instance
│   │   └── interceptors/         # Request interceptors
│   ├── jotai/                    # Jotai atoms
│   │   └── atoms/
│   │       ├── auth/             # Auth state atoms
│   │       └── workspace/        # Workspace state atoms
│   ├── providers/                # React providers
│   │   ├── theme/                # Theme provider
│   │   ├── react-query/          # React Query provider
│   │   └── notistack/            # Notification provider
│   └── workspace/                # Workspace utilities
│
├── messages/                     # Translation message utilities
│   ├── core.ts                   # Core message utilities
│   ├── types.ts                  # Message types
│   └── groups/                   # Message group definitions
│
├── modules/                      # Feature modules
│   ├── auth/                     # Authentication module
│   │   ├── login/
│   │   ├── register/
│   │   └── reset-password/
│   ├── workspace/                # Workspace module
│   │   ├── list/                 # List workspaces
│   │   ├── show/                 # Show workspace details
│   │   │   ├── view.tsx          # Main view component
│   │   │   └── views/            # Tab views
│   │   │       ├── overview/     # Overview tab
│   │   │       └── branches/     # Branches tab
│   │   └── components/           # Workspace-specific components
│   ├── branch/                   # Branch module
│   │   ├── list/
│   │   ├── show/
│   │   └── components/
│   │       ├── branch-card/
│   │       ├── branches-grid/          # Layer 3: Data
│   │       ├── branches-grid-with-controls/  # Layer 2: Logic
│   │       ├── branches-grid-ui/       # Layer 1: UI
│   │       └── create-branch-dialog/
│   └── patient/                  # Patient module
│
├── routes/                       # Route utilities
│   ├── sections.tsx              # Route sections
│   ├── hooks/                    # Routing hooks
│   └── components/               # Route components
│
├── sections/                     # Page sections (deprecated/demo)
│
├── services/                     # API services
│   └── api/
│       ├── base/                 # Base API services
│       │   ├── auth/
│       │   │   ├── index.ts      # Auth API methods
│       │   │   └── types/
│       │   │       ├── args.ts   # Request types
│       │   │       └── responses.ts  # Response types
│       │   ├── workspace/
│       │   ├── branch/
│       │   ├── user/
│       │   └── patient/
│       └── utils/                # API utilities
│
├── theme/                        # MUI theme configuration
│   ├── create-theme.ts           # Theme factory
│   ├── theme-provider.tsx        # Theme provider
│   ├── theme-config.ts           # Theme configuration
│   ├── rtl.tsx                   # RTL support
│   └── core/                     # Core theme files
│
├── types/                        # TypeScript type definitions
│   ├── page.ts                   # Page types
│   ├── api/
│   │   ├── base/                 # Backend entity types (BE_*)
│   │   │   ├── user/
│   │   │   ├── workspace/
│   │   │   ├── branch/
│   │   │   └── patient/
│   │   └── common/               # Common API types
│   │       ├── args/             # Common request types
│   │       └── pagination/       # Pagination types
│   └── common/                   # Common types
│
└── utils/                        # Utility functions
    ├── format-number.ts
    └── format-time.ts
```

---

## Routing System

### Next.js App Router Structure

The project uses **Next.js 15 App Router** with file-based routing and internationalization.

#### Route Groups

Routes are organized using Next.js route groups `(group-name)`:

1. **`(auth)`** - Authentication routes (public)
   - `/login`
   - `/register`
   - `/forgot-password`
   - `/reset-password`

2. **`(dashboard)`** - Protected routes requiring authentication
   - `/workspace` - List workspaces
   - `/workspace/[id]` - Workspace details
   - `/branches` - List branches
   - `/branches/[id]` - Branch details
   - `/patient` - Patient management

3. **`(public)`** - Public routes without authentication

#### Locale-Based Routing

All routes are prefixed with locale: `/[locale]/...`

```typescript
// src/i18n/global-config.ts
export const i18nGlobalConfig = {
  defaultLocale: "en",
  localePrefix: "as-needed",
  locales: ["en", "ar"],
} as const;
```

Examples:

- `/en/login` (English)
- `/ar/login` (Arabic)
- `/workspace` (defaults to English)

#### Dynamic Routes

```typescript
// Example: src/app/[locale]/(dashboard)/workspace/[id]/page.tsx
async function ShowWorkspacePage({
  params,
}: PageProps<"/[locale]/workspace/[id]">) {
  const { id } = await params;
  const res = await WorkspaceApi.show(id);
  return <ShowWorkspaceView workspace={res.data} />;
}
```

#### Layout Hierarchy

```
app/[locale]/layout.tsx              # Root layout (providers)
  └── (dashboard)/layout.tsx         # Dashboard layout (auth + workspace guards)
      └── workspace/[id]/page.tsx    # Page component
```

#### Protected Routes

Routes are protected using Higher-Order Components (HOCs):

```typescript
// src/app/[locale]/(dashboard)/layout.tsx
export default withServerWorkspace(withServerAuth(DashboardRootLayout));
```

**Authentication Guards:**

- `withServerAuth` - Server-side authentication check
- `withAuth` - Client-side authentication check (use sparingly)

**Workspace Guards:**

- `withServerWorkspace` - Ensures workspace context is available

---

## API Service Layer

### Architecture Overview

The API layer follows a **type-safe, standardized pattern** with clear separation of concerns.

### Axios Instances

Located in `src/lib/axios/instances/`:

#### 1. Base API Instance (`baseApi`)

```typescript
// src/lib/axios/instances/base/index.ts
export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
baseApi.interceptors.request.use(addAuthorizationHeader);
baseApi.interceptors.request.use(addLangHeader);
```

**When to use:** Most API calls (workspace-agnostic endpoints)

**Interceptors:**

- ✅ Authorization (Bearer token from cookies)
- ✅ Language (Accept-Language header)
- ❌ Workspace ID

#### 2. Base API No Auth (`baseApiNoAuth`)

```typescript
export const baseApiNoAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
baseApiNoAuth.interceptors.request.use(addLangHeader);
```

**When to use:** Public endpoints (login, register, forgot password)

**Interceptors:**

- ❌ Authorization
- ✅ Language
- ❌ Workspace ID

#### 3. Workspace API Instance (`workspaceApi`)

```typescript
// src/lib/axios/instances/workspace/index.ts
export const workspaceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
workspaceApi.interceptors.request.use(addAuthorizationHeader);
workspaceApi.interceptors.request.use(addLangHeader);
workspaceApi.interceptors.request.use(addWorkspaceHeader);
```

**When to use:** Workspace-scoped endpoints (branches, patients)

**Interceptors:**

- ✅ Authorization
- ✅ Language
- ✅ Workspace ID (from cookies)

### Service Structure

Each API service follows this pattern:

```
src/services/api/base/[service-name]/
├── index.ts              # API methods (exported as object)
└── types/
    ├── args.ts          # Request argument types
    └── responses.ts     # Response types
```

### Creating a New API Service

#### Step 1: Define Backend Entity Type

```typescript
// src/types/api/base/[entity]/index.ts
export interface BE_Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
```

**Naming Convention:** All backend entity types use `BE_` prefix.

#### Step 2: Define Request Arguments

```typescript
// src/services/api/base/product/types/args.ts
export interface CreateProductArgs {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface UpdateProductArgs extends Partial<CreateProductArgs> {}

export interface ListProductsArgs extends BE_ListParams {
  categoryId?: string;
}
```

#### Step 3: Define Response Types

```typescript
// src/services/api/base/product/types/responses.ts
import { BE_Product } from "@/types/api/base/product";
import { BE_Pagination } from "@/types/api/common/pagination";

export type ListProductsResponse = BE_Pagination<BE_Product[]>;
export type ShowProductResponse = BE_Product;
export interface CreateProductResponse extends BE_Product {}
```

#### Step 4: Implement API Methods

```typescript
// src/services/api/base/product/index.ts
import { baseApi } from "@/lib/axios/instances/base";
import {
  CreateProductArgs,
  UpdateProductArgs,
  ListProductsArgs,
} from "./types/args";
import {
  ListProductsResponse,
  ShowProductResponse,
  CreateProductResponse,
} from "./types/responses";

export const ProductApi = {
  list: (params?: ListProductsArgs) =>
    baseApi.get<ListProductsResponse>("products", { params }),

  show: (id: string) => baseApi.get<ShowProductResponse>(`products/${id}`),

  create: (args: CreateProductArgs) =>
    baseApi.post<CreateProductResponse>("products", args),

  update: (id: string, args: UpdateProductArgs) =>
    baseApi.put<CreateProductResponse>(`products/${id}`, args),

  delete: (id: string) => baseApi.delete(`products/${id}`),
};
```

### Usage in Components

```typescript
// In a React component or server component
import { ProductApi } from "@/services/api/base/product";

// Server Component
async function ProductsPage() {
  const res = await ProductApi.list({ page: 1, perPage: 10 });
  return <ProductsList products={res.data.list} />;
}

// Client Component with React Query
function ProductsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => (await ProductApi.list()).data,
  });
  // ...
}
```

### Common API Patterns

#### Pagination

```typescript
// Request
export interface BE_ListParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  search?: string;
}

// Response
export interface BE_Pagination<List> {
  list: List;
  metadata: BE_PaginationMetadata;
}

export interface BE_PaginationMetadata {
  page: number;
  perPage: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

#### File Upload

```typescript
import { serialize } from "object-to-formdata";

export const WorkspaceApi = {
  create: (args: CreateWorkspaceArgs) =>
    baseApi.post("workspace", serialize(args)),
};
```

---

## Type System & Interfaces

### Type Naming Conventions

1. **Backend Entity Types:** `BE_[EntityName]`

   ```typescript
   (BE_User, BE_Workspace, BE_Branch, BE_Patient);
   ```

2. **Request Argument Types:** `[Action][Entity]Args`

   ```typescript
   (CreateBranchArgs, UpdateBranchArgs, ListBranchesArgs);
   ```

3. **Response Types:** `[Action][Entity]Response`

   ```typescript
   (CreateBranchResponse, ListBranchesResponse, ShowBranchResponse);
   ```

4. **Component Props:** `Props` (local to component)
   ```typescript
   type Props = { workspace: BE_Workspace };
   ```

### Type Locations

```
src/types/
├── api/
│   ├── base/              # Backend entity definitions (BE_*)
│   │   ├── user/
│   │   │   └── index.ts   # export interface BE_User { ... }
│   │   ├── workspace/
│   │   ├── branch/
│   │   └── patient/
│   └── common/            # Common API types
│       ├── args/
│       │   └── list.ts    # BE_ListParams
│       └── pagination/
│           └── index.ts   # BE_Pagination, BE_PaginationMetadata
└── common/                # App-wide common types
```

### Example: Full Type Definition

```typescript
// src/types/api/base/branch/index.ts
import { BE_Workspace } from "../workspace";

export interface BE_TimeSlot {
  startTime: string;
  durationMs: number;
}

export interface BE_WorkingHours {
  mon?: BE_TimeSlot[];
  tue?: BE_TimeSlot[];
  wed?: BE_TimeSlot[];
  // ... other days
}

export interface BE_Branch {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  slug?: string;
  address: string;
  city: string;
  country?: string;
  phone: string;
  email?: string;
  workingHours?: BE_WorkingHours;
  logoUrl?: string;
  workspaceId: string;
}

export interface BE_BranchWithWorkspace extends BE_Branch {
  workspace?: BE_Workspace;
}
```

### Page Props Types

```typescript
// Built-in Next.js page props
async function Page({
  params,
  searchParams,
}: PageProps<"/[locale]/workspace/[id]">) {
  const { locale, id } = await params;
  const { tab } = await searchParams;
  // ...
}
```

---

## State Management (Jotai)

### Why Jotai?

- **Atomic state management** - Fine-grained updates
- **TypeScript-first** - Excellent type inference
- **Minimal boilerplate** - Simple API
- **localStorage persistence** - Built-in with `atomWithStorage`

### Atom Organization

```
src/lib/jotai/atoms/
├── auth/
│   └── index.ts          # userAtom, tokenAtom, isAuthenticatedAtom
└── workspace/
    └── index.ts          # currentWorkspaceAtom, workspaceIdAtom
```

### Auth State Management

```typescript
// src/lib/jotai/atoms/auth/index.ts
import { atom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

// User atom with localStorage persistence
export const userAtom = atomWithStorage<UserState>(
  "user", // localStorage key
  null, // initial value
  {
    getItem: (key) => {
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      try {
        return userStateSchema.parse(JSON.parse(stored));
      } catch {
        localStorage.removeItem(key);
        return null;
      }
    },
    setItem: (key, value) => {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);

// Runtime-only token atom (not persisted)
export const tokenAtom = atom<string | null>(null);

// Logout atom - write-only
export const logoutAtom = atom(null, (get, set) => {
  set(userAtom, null);
  set(tokenAtom, null);
});

// Derived atom
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

// Hook that throws if not authenticated
export const useUser = () => {
  const user = useAtomValue(userAtom);
  if (!user) {
    throw new Error("Using useUser outside of AuthProvider");
  }
  return user;
};
```

### Workspace State Management

```typescript
// src/lib/jotai/atoms/workspace/index.ts
export const currentWorkspaceAtom = atomWithStorage<WorkspaceState>(
  "current-workspace",
  null,
  {
    /* similar to userAtom */
  }
);

export const workspaceIdAtom = atom<string | null>(null);

export const useCurrentWorkspace = () => {
  const workspace = useAtomValue(currentWorkspaceAtom);
  if (!workspace) {
    throw new Error("Using useCurrentWorkspace outside of WorkspaceProvider");
  }
  return workspace;
};

export const clearWorkspaceAtom = atom(null, (get, set) => {
  set(currentWorkspaceAtom, null);
  set(workspaceIdAtom, null);
});
```

### Usage in Components

```typescript
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom, logoutAtom } from "@/lib/jotai/atoms/auth";

function UserProfile() {
  const user = useAtomValue(userAtom);
  const logout = useSetAtom(logoutAtom);

  return (
    <div>
      <p>{user?.firstName} {user?.lastName}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

---

## Authentication & Authorization

### Authentication Flow

1. **Login** → Token stored in HTTP-only cookie + user in Jotai atom
2. **Server Components** → Read token from cookies, validate
3. **Client Components** → Read user from Jotai atom
4. **API Calls** → Axios interceptor adds Bearer token from cookies
5. **Logout** → Clear cookies + Jotai atoms

### Cookie Management

```typescript
// Cookie names
export const AUTH_COOKIE_NAME = "auth_token"; // JWT token
export const WORKSPACE_COOKIE_NAME = "workspace_id"; // Current workspace
```

### Server-Side Auth

```typescript
// src/lib/auth/server/get-token.ts
import { cache } from "react";
import { cookies } from "next/headers";

export const getServerAuthToken = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value || null;
});
```

```typescript
// src/lib/auth/server/with-auth.tsx
import { redirect } from "next/navigation";

function withServerAuth(Component: any) {
  return async function AuthenticatedComponent(props: any) {
    const token = await getServerAuthToken();
    if (!isAuthenticated(token)) {
      redirect("/login");
    }
    return <Component {...props} />;
  };
}
```

### Client-Side Auth

```typescript
// src/lib/auth/hooks/use-auth.ts
import { useAtomValue } from "jotai";
import { userAtom, isAuthenticatedAtom } from "@/lib/jotai/atoms/auth";

export function useAuth() {
  const user = useAtomValue(userAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return { user, isAuthenticated };
}
```

### Auth Provider (Client)

```typescript
// Used in dashboard layout to hydrate user state
<AuthProvider token={token} user={user}>
  <DashboardLayout>
    {children}
  </DashboardLayout>
</AuthProvider>
```

### Logout

```typescript
// Server-side logout
import { serverLogout } from "@/lib/auth/server/logout";

await serverLogout("/login"); // Clears cookies and redirects

// Client-side logout
import { LogoutButton } from "@/lib/auth";

<LogoutButton />
```

---

## Workspace System

### Workspace Context

The application supports **multi-workspace** architecture. Users can belong to multiple workspaces and switch between them.

### Workspace Guards

```typescript
// src/lib/workspace/server/with-workspace.tsx
function withServerWorkspace(Component: any) {
  return async function WorkspaceRequiredComponent(props: any) {
    const workspaceId = await getServerWorkspaceId();
    if (!workspaceId) {
      redirect("/workspace");
    }
    return <Component {...props} />;
  };
}
```

### Workspace Selection Flow

1. User logs in
2. Redirected to `/workspace` (workspace list)
3. User selects workspace
4. Workspace ID stored in cookie + Jotai atom
5. User navigates to dashboard routes
6. `withServerWorkspace` guard validates workspace context
7. `workspaceApi` automatically includes workspace ID in headers

### Workspace-Scoped API Calls

```typescript
// Branches are always scoped to current workspace
import { BranchApi } from "@/services/api/base/branch";

// The workspace ID is automatically added by axios interceptor
const branches = await BranchApi.list(); // workspace-id header added
```

---

## Internationalization (i18n)

### Setup

The project uses **next-intl** for internationalization with support for:

- ✅ English (LTR)
- ✅ Arabic (RTL)

### Configuration

```typescript
// src/i18n/global-config.ts
export const i18nGlobalConfig = {
  defaultLocale: "en",
  localePrefix: "as-needed",
  locales: ["en", "ar"],
} as const;
```

### Translation Files

```
messages/
├── en.json    # English translations
└── ar.json    # Arabic translations
```

### Translation Structure

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "workspaces": {
    "pluralTitle": "Workspaces",
    "create": "Create Workspace",
    "details": "Workspace Details"
  },
  "branches": {
    "pluralTitle": "Branches",
    "create": "Create Branch"
  }
}
```

### Using Translations in Components

#### Client Components

```typescript
"use client";
import { useTranslations } from "next-intl";

function MyComponent() {
  const t = useTranslations("workspaces");
  const tCommon = useTranslations("common");

  return (
    <div>
      <h1>{t("pluralTitle")}</h1>
      <button>{tCommon("save")}</button>
    </div>
  );
}
```

#### With Parameters

```typescript
const t = useTranslations("workspace.overview");

// Translation: "Created on {date}"
<p>{t("createdAtValue", { date: dayjs(workspace.createdAt).format("YYYY-MM-DD") })}</p>

// Translation: "{count} members"
<p>{t("membersSubtitle", { count: 12 })}</p>
```

#### Server Components

```typescript
import { getTranslations } from "next-intl/server";

async function ServerComponent() {
  const t = await getTranslations("workspaces");

  return <h1>{t("pluralTitle")}</h1>;
}
```

### RTL Support

The layout automatically switches direction based on locale:

```typescript
// src/app/[locale]/layout.tsx
const direction = _langs.find((l) => l.value === locale)?.direction || "ltr";

<html lang={locale} dir={direction}>
  <ThemeProvider direction={direction}>
    {children}
  </ThemeProvider>
</html>
```

### Language Switching

```typescript
// Language is set via route parameter
import { useRouter } from "next/navigation";

const router = useRouter();
router.push(`/ar${pathname}`); // Switch to Arabic
```

---

## UI Components & Theme

### UI Library: Material-UI (MUI) v7

The project uses **Material-UI v7** with customizations from **minimals.cc free template**.

### Theme System

```typescript
// src/theme/create-theme.ts
export const baseTheme: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: palette.light,
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
  },
  components,
  typography,
  shape: { borderRadius: 8 },
  cssVariables: themeConfig.cssVariables,
};
```

### Theme Provider Setup

```typescript
// Multiple providers wrapped
<NextIntlClientProvider>
  <ReactQueryClientProvider>
    <AppRouterCacheProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiThemeProvider>
          <RTLProvider direction={direction}>
            <NotistackProvider>
              {children}
            </NotistackProvider>
          </RTLProvider>
        </MuiThemeProvider>
      </LocalizationProvider>
    </AppRouterCacheProvider>
  </ReactQueryClientProvider>
</NextIntlClientProvider>
```

### Component Categories

#### 1. Shared Components (`src/components/`)

**Headless Components** - Logic without UI

- `create-context-component` - Context wrapper utility
- `get-grid-item` - Grid item factory with responsive sizes
- `dialog-trigger` - Dialog state management

**UI Components** (`src/components/ui/`)

- `inputs/` - Form inputs (EntityImageUpload, etc.)
- `interactions/` - Loading states, dialogs, skeletons, ConfirmDeleteDialog
- `others/` - Pagination, utilities
- `placeholders/` - Empty states, search prompts

**Shared Components** (`src/components/shared/`)

- `buttons/` - Reusable buttons (SaveButton, CancelButton, DeleteIconButton, etc.)

#### Confirm Delete Dialog

A generic confirmation dialog for delete operations with loading states:

```typescript
import { ConfirmDeleteDialog } from "@/components/ui/interactions";
import { DialogTrigger } from "@/components/headless/dialog-trigger";

// Option 1: Using state management
const [deleteItem, setDeleteItem] = useState<Item | undefined>();

<ConfirmDeleteDialog
  open={!!deleteItem}
  onClose={() => setDeleteItem(undefined)}
  onDelete={async () => await ItemApi.delete(deleteItem!.id)}
  moduleName="service"
  title="Delete Service"
  subtitle={`Are you sure you want to delete "${deleteItem?.name}"?`}
  onSuccess={() => {
    setDeleteItem(undefined);
    refetch();
  }}
/>

// Option 2: Using DialogTrigger (cleaner)
import { DeleteIconButton } from "@/components/shared/buttons";

<DeleteIconButton
  onDelete={async () => await ItemApi.delete(item.id)}
  onSuccess={() => refetch()}
  moduleName="service"
  itemName={item.name}
/>
```

**ConfirmDeleteDialog Props:**

- `open` - Boolean to control dialog visibility
- `onClose` - Close callback
- `onDelete` - Async function to execute deletion
- `moduleName` - Module name for default messages (e.g., "service")
- `title` - Dialog title (optional, default: "Confirm Deletion")
- `subtitle` - Subtitle text (optional, default: "Are you sure you want to delete this {moduleName}?")
- `description` - Description text (optional, default: "This action cannot be undone.")
- `onSuccess` - Callback after successful deletion

#### 2. Layout Components (`src/layouts/`)

**PageContent** - Standard page wrapper

```typescript
<PageContent
  title="Workspace Details"
  actions={<CreateButton />}
  loading={isLoading}
>
  {children}
</PageContent>
```

**DashboardLayout** - Full dashboard with nav, header

```typescript
<DashboardLayout>
  <DashboardContent>
    {children}
  </DashboardContent>
</DashboardLayout>
```

#### 3. Module Components (`src/modules/[module]/components/`)

Module-specific components that are not shared.

### MUI Grid System (v7)

MUI v7 uses a new `size` prop:

```typescript
import Grid from "@mui/material/Grid";

<Grid container spacing={2}>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    {/* Content */}
  </Grid>
</Grid>
```

### Utility: getGridItem

```typescript
import getGridItem from "@/components/headless/get-grid-item";

const GridItem = getGridItem({ xs: 12, sm: 6 });
const GridItemFull = getGridItem({ xs: 12 });

<GridItem>
  <TextField {...register("name")} />
</GridItem>
```

### Icons

Two icon libraries are used:

1. **Iconsax React** (Primary)

   ```typescript
   import { Buildings2, Profile2User, Clock } from "iconsax-reactjs";
   ```

2. **Tabler Icons**
   ```typescript
   import { IconUser, IconSettings } from "@tabler/icons-react";
   ```

### Notifications

```typescript
import { useSnackbar } from "notistack";

const { enqueueSnackbar } = useSnackbar();

enqueueSnackbar("Branch created successfully", { variant: "success" });
enqueueSnackbar("Error creating branch", { variant: "error" });
```

---

## Form Handling

### Form Stack

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Integration layer

### Form Pattern

```typescript
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Define schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(1, "Phone is required"),
});

type FormValues = z.infer<typeof schema>;

// 2. Component
function CreateBranchDialog({ onClose, open, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 3. Submit handler
  const onSubmit = async (data: FormValues) => {
    try {
      await BranchApi.create(data);
      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      handleValidationErrors(error, setError);
    }
  };

  // 4. Render
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <GridItem>
              <TextField
                {...register("name")}
                label="Branch Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            </GridItem>
            <GridItem>
              <TextField
                {...register("email")}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </GridItem>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <SaveButton loading={isSubmitting} />
        </DialogActions>
      </form>
    </Dialog>
  );
}
```

### Validation Error Handling

The backend returns validation errors in a specific format. Use the utility function:

```typescript
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";

try {
  await BranchApi.create(data);
} catch (error) {
  // Automatically sets field errors from API response
  const handled = handleValidationErrors(error, setError);

  if (!handled) {
    // Handle other errors (network, server, etc.)
    enqueueSnackbar("An error occurred", { variant: "error" });
  }
}
```

### Edit Mode

```typescript
const isEdit = !!branch;

const { register, handleSubmit /* ... */ } = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: branch
    ? {
        name: branch.name,
        email: branch.email || "",
        // ...
      }
    : {
        name: "",
        email: "",
        // ...
      },
});

const onSubmit = async (data: FormValues) => {
  if (isEdit) {
    await BranchApi.update(branch.id, data);
  } else {
    await BranchApi.create(data);
  }
};
```

### Handling Number Fields (IMPORTANT!)

Number fields require special handling to avoid validation errors during edit operations.

#### Problem

When editing a form with number inputs:

- Form receives numbers from API
- Input fields emit strings on change
- Zod validation fails with "expected number, received string"
- Using `valueAsNumber` creates non-deletable `0` in empty fields

#### Solution: Use `z.coerce.number()`

```typescript
// ✅ CORRECT: Use z.coerce for number fields
const schema = z.object({
  name: z.string().min(1, "Required"),
  price: z.coerce.number().positive("Must be positive"),
  discount: z.coerce.number().min(0).max(100).optional(),
  durationMinutes: z.coerce.number().positive().optional(),
});

// ❌ WRONG: Direct z.number() causes string/number type errors
const schema = z.object({
  price: z.number().positive(), // Will fail on edit!
});
```

#### Default Values for Number Fields

```typescript
const { register, handleSubmit } = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: service
    ? {
        // ✅ Edit mode: use actual values
        price: service.price,
        discount: service.discount || undefined, // Use undefined for optional
      }
    : {
        // ✅ Create mode: use undefined, NOT 0
        price: undefined,
        discount: undefined,
      },
});
```

#### Register Number Inputs

```typescript
// ✅ CORRECT: Simple register, let z.coerce handle conversion
<TextField
  {...register("price")}
  type="number"
  label="Price"
  required
  inputProps={{ step: "0.01", min: 0 }}
/>

// ❌ WRONG: Don't use Controller with manual onChange
<Controller
  name="price"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      onChange={(e) => field.onChange(parseFloat(e.target.value))}  // Unnecessary!
    />
  )}
/>

// ❌ WRONG: Don't use valueAsNumber
<TextField
  {...register("price", { valueAsNumber: true })}  // Creates non-deletable 0!
/>
```

#### Submit Handler with Number Conversion

```typescript
const onSubmit = async (data: FormValues) => {
  try {
    const payload = {
      name: data.name,
      // ✅ Ensure numbers are properly typed
      price: Number(data.price),
      discount: data.discount ? Number(data.discount) : undefined,
      durationMinutes: data.durationMinutes
        ? Number(data.durationMinutes)
        : undefined,
    };

    if (isEdit) {
      await ServiceApi.update(service.id, payload);
    } else {
      await ServiceApi.create(payload);
    }
  } catch (error) {
    handleValidationErrors(error, setError);
  }
};
```

#### Complete Number Field Example

```typescript
const schema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().positive("Price must be positive"),
  discount: z.coerce.number().min(0).max(100).optional(),
});

type FormValues = z.infer<typeof schema>;

function ServiceDialog({ service, onClose, open }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: service
      ? {
          name: service.name,
          price: service.price,
          discount: service.discount || undefined,
        }
      : {
          name: "",
          price: undefined,
          discount: undefined,
        },
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      name: data.name,
      price: Number(data.price),
      discount: data.discount ? Number(data.discount) : undefined,
    };

    await ServiceApi.create(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        {...register("price")}
        type="number"
        label="Price"
        required
        error={!!errors.price}
        helperText={errors.price?.message}
        inputProps={{ step: "0.01", min: 0 }}
      />

      <TextField
        {...register("discount")}
        type="number"
        label="Discount %"
        error={!!errors.discount}
        helperText={errors.discount?.message}
        inputProps={{ step: "0.1", min: 0, max: 100 }}
      />
    </form>
  );
}
```

### Handling Enum Fields

For status and enum fields, use `Controller` with `Select`:

```typescript
const schema = z.object({
  status: z.nativeEnum(ServiceStatus),
});

<Controller
  name="status"
  control={control}
  render={({ field }) => (
    <FormControl fullWidth>
      <InputLabel>Status</InputLabel>
      <Select {...field} label="Status">
        <MenuItem value={ServiceStatus.ACTIVE}>Active</MenuItem>
        <MenuItem value={ServiceStatus.INACTIVE}>Inactive</MenuItem>
      </Select>
    </FormControl>
  )}
/>
```

### Loading Dependent Data for Dropdowns

When a form needs data from another API (e.g., categories list):

```typescript
// Fetch categories for dropdown
const {
  data: categoriesRes,
  isLoading: categoriesLoading,
  error: categoriesError,
} = useQuery({
  queryKey: ["service-categories-all"],
  queryFn: async () =>
    (await ServiceCategoryApi.list({ page: 1, perPage: 100 })).data,
  enabled: open, // Only fetch when dialog is open
});

const activeCategories = categoriesRes?.list.filter(
  (cat) => cat.status === ServiceCategoryStatus.ACTIVE
) || [];

// Show error notification if loading fails
React.useEffect(() => {
  if (categoriesError) {
    enqueueSnackbar("Failed to load categories", { variant: "error" });
  }
}, [categoriesError, enqueueSnackbar]);

// In the form
<Controller
  name="categoryId"
  control={control}
  render={({ field }) => (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        {...field}
        label="Category"
        value={field.value || ""}
        disabled={categoriesLoading}
      >
        <MenuItem value="">
          <em>{categoriesLoading ? "Loading..." : "None"}</em>
        </MenuItem>
        {activeCategories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
      {!categoriesLoading && activeCategories.length === 0 && (
        <FormHelperText>
          No categories available. Create one first.
        </FormHelperText>
      )}
    </FormControl>
  )}
/>
```

---

## Module Architecture (3-Layer Pattern)

### Overview

Complex features follow a **3-layer architecture** for separation of concerns:

```
Layer 3: DATA         → Fetches data, manages loading/caching
Layer 2: LOGIC        → Adds controls, pagination, interactions
Layer 1: UI (PURE)    → Only renders, no logic or state
```

### Example: Branches Grid Module

```
src/modules/branch/components/
├── branches-grid/                    # Layer 3: Data
├── branches-grid-with-controls/      # Layer 2: Logic
└── branches-grid-ui/                 # Layer 1: UI
```

#### Layer 1: UI (Pure Presentation)

```typescript
// src/modules/branch/components/branches-grid-ui/index.tsx
type Props = {
  branches: BE_Branch[];
};

function BranchesGridUI({ branches }: Props) {
  if (branches.length === 0) {
    return <EmptyState />;
  }

  return (
    <Grid container spacing={2}>
      {branches.map((branch) => (
        <Grid key={branch.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <BranchCard branch={branch} />
        </Grid>
      ))}
    </Grid>
  );
}
```

**Responsibilities:**

- ✅ Render grid layout
- ✅ Render branch cards
- ✅ Empty state
- ❌ NO data fetching
- ❌ NO state management
- ❌ NO logic

#### Layer 2: Logic (Controls & Interactions)

```typescript
// src/modules/branch/components/branches-grid-with-controls/index.tsx
type Props = {
  branches: BE_Branch[];
  pagination?: {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
  };
  enableAdd?: boolean;
  onAddSuccess?: () => void;
  showTitle?: boolean;
};

function BranchesGridWithControls({
  branches,
  pagination,
  enableAdd,
  onAddSuccess,
  showTitle,
}: Props) {
  const t = useTranslations("branches");

  return (
    <Box>
      {/* Header */}
      {(showTitle || enableAdd) && (
        <Box display="flex" justifyContent="space-between" mb={3}>
          {showTitle && <Typography variant="h6">{t("pluralTitle")}</Typography>}
          {enableAdd && <CreateBranchButton onSuccess={onAddSuccess} />}
        </Box>
      )}

      {/* Grid */}
      <BranchesGridUI branches={branches} />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <CenteredPagination
          page={pagination.page}
          onChange={(_, newPage) => pagination.onChange(newPage)}
          count={pagination.totalPages}
        />
      )}
    </Box>
  );
}
```

**Responsibilities:**

- ✅ Add controls (title, buttons)
- ✅ Pagination controls
- ✅ Compose UI layer
- ❌ NO data fetching

#### Layer 3: Data (Fetching & State)

```typescript
// src/modules/branch/components/branches-grid/index.tsx
type Props = {
  workspaceId?: string;
  initialData?: Awaited<ReturnType<typeof BranchApi.list>>["data"];
  defaultParams?: BE_ListParams;
  queryKey?: string;
  enableAdd?: boolean;
  showTitle?: boolean;
};

function BranchesGrid({
  workspaceId,
  initialData,
  defaultParams = { page: 1, perPage: 9 },
  queryKey = "branches-grid",
  enableAdd = true,
  showTitle = true,
}: Props) {
  const [page, setPage] = useState(defaultParams?.page || 1);

  const {
    data: res,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, workspaceId, page],
    queryFn: async () => {
      const params: BE_ListParams & { workspaceId?: string } = {
        page,
        perPage: defaultParams?.perPage || 9,
      };
      if (workspaceId) {
        params.workspaceId = workspaceId;
      }
      return (await BranchApi.list(params)).data;
    },
    placeholderData: page === defaultParams?.page ? initialData : undefined,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <BranchesGridWithControls
      branches={res?.list || []}
      pagination={
        res?.metadata?.pages
          ? {
              page,
              totalPages: res.metadata.pages,
              onChange: setPage,
            }
          : undefined
      }
      enableAdd={enableAdd}
      onAddSuccess={() => refetch()}
      showTitle={showTitle}
    />
  );
}
```

**Responsibilities:**

- ✅ Data fetching with React Query
- ✅ Loading states
- ✅ Pagination state
- ✅ Query caching
- ✅ Refetch on mutations

### When to Use 3-Layer Architecture

**Use for:**

- ✅ Complex features with data fetching + controls
- ✅ Reusable components with multiple use cases
- ✅ Features that need SSR + CSR support

**Don't use for:**

- ❌ Simple components
- ❌ One-off features
- ❌ Pure presentational components

---

## Feature Example: Services & Service Categories

The Services module demonstrates a complete implementation with categories, enums, dropdowns, and all best practices.

### Entity Types with Status Enums

```typescript
// src/types/api/base/service-category/index.ts
export enum ServiceCategoryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface BE_ServiceCategory {
  id: string;
  name: string;
  code: string;
  description?: string;
  color?: string;
  status: ServiceCategoryStatus;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

// src/types/api/base/service/index.ts
export enum ServiceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface BE_Service {
  id: string;
  name: string;
  code: string;
  description?: string;
  categoryId?: string;
  price: number;
  discount?: number; // Percentage 0-100
  durationMinutes?: number;
  status: ServiceStatus;
  notes?: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BE_ServiceWithCategory extends BE_Service {
  category?: BE_ServiceCategory;
}
```

### API Services with Query Methods

```typescript
// src/services/api/base/service-category/index.ts
export const ServiceCategoryApi = {
  list: (params?: BE_ListParams) =>
    workspaceApi.get<ListServiceCategoriesResponse>(
      "services/categories/list",
      { params }
    ),

  show: (id: string) =>
    workspaceApi.get<ShowServiceCategoryResponse>(`services/categories/${id}`),

  create: (args: CreateServiceCategoryArgs) =>
    workspaceApi.post<CreateServiceCategoryResponse>(
      "services/categories",
      args
    ),

  update: (id: string, args: UpdateServiceCategoryArgs) =>
    workspaceApi.put<CreateServiceCategoryResponse>(
      `services/categories/${id}`,
      args
    ),

  delete: (id: string) => workspaceApi.delete(`services/categories/${id}`),

  count: () => workspaceApi.get<number>("services/categories/count"),

  findByCode: (code: string) =>
    workspaceApi.get<ShowServiceCategoryResponse>(
      `services/categories/code/${code}`
    ),
};

// src/services/api/base/service/index.ts
export const ServiceApi = {
  list: (params?: BE_ListParams) =>
    workspaceApi.get<ListServicesResponse>("services/list", { params }),

  show: (id: string) => workspaceApi.get<ShowServiceResponse>(`services/${id}`),

  create: (args: CreateServiceArgs) =>
    workspaceApi.post<CreateServiceResponse>("services", args),

  update: (id: string, args: UpdateServiceArgs) =>
    workspaceApi.put<CreateServiceResponse>(`services/${id}`, args),

  delete: (id: string) => workspaceApi.delete(`services/${id}`),

  count: () => workspaceApi.get<number>("services/count"),

  findByCode: (code: string) =>
    workspaceApi.get<ShowServiceResponse>(`services/code/${code}`),

  findByCategory: (categoryId: string, params?: BE_ListParams) =>
    workspaceApi.get<ListServicesResponse>(`services/category/${categoryId}`, {
      params,
    }),
};
```

### Form with Categories Dropdown

```typescript
function CreateServiceDialog({ service, open, onClose, onSuccess }: Props) {
  // Fetch categories for dropdown
  const {
    data: categoriesRes,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["service-categories-all"],
    queryFn: async () =>
      (await ServiceCategoryApi.list({ page: 1, perPage: 100 })).data,
    enabled: open, // Only fetch when dialog is open
  });

  const activeCategories =
    categoriesRes?.list.filter(
      (cat) => cat.status === ServiceCategoryStatus.ACTIVE
    ) || [];

  // Show error if categories fail to load
  React.useEffect(() => {
    if (categoriesError) {
      enqueueSnackbar("Failed to load categories", { variant: "error" });
    }
  }, [categoriesError, enqueueSnackbar]);

  const schema = z.object({
    name: z.string().min(1),
    code: z.string().regex(/^[A-Z0-9_-]+$/),
    categoryId: z.string().optional(),
    price: z.coerce.number().positive(),
    discount: z.coerce.number().min(0).max(100).optional(),
    durationMinutes: z.coerce.number().positive().optional(),
    status: z.nativeEnum(ServiceStatus),
  });

  const { register, control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: service
      ? {
          // Edit mode
          name: service.name,
          categoryId: service.categoryId || "",
          price: service.price,
          discount: service.discount || undefined,
          status: service.status,
        }
      : {
          // Create mode
          name: "",
          categoryId: "",
          price: undefined,
          discount: undefined,
          status: ServiceStatus.ACTIVE,
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Category Dropdown */}
      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              {...field}
              label="Category"
              value={field.value || ""}
              disabled={categoriesLoading}
            >
              <MenuItem value="">
                <em>{categoriesLoading ? "Loading..." : "No Category"}</em>
              </MenuItem>
              {activeCategories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            {!categoriesLoading && activeCategories.length === 0 && (
              <FormHelperText>
                No categories available. Create one first.
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      {/* Status Enum Dropdown */}
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select {...field} label="Status">
              <MenuItem value={ServiceStatus.ACTIVE}>Active</MenuItem>
              <MenuItem value={ServiceStatus.INACTIVE}>Inactive</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      {/* Number fields with z.coerce */}
      <TextField
        {...register("price")}
        type="number"
        label="Price"
        required
        inputProps={{ step: "0.01", min: 0 }}
      />

      <TextField
        {...register("discount")}
        type="number"
        label="Discount %"
        inputProps={{ step: "0.1", min: 0, max: 100 }}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />
    </form>
  );
}
```

### Grid with Category Filter

```typescript
function ServicesGridWithControls({ services, onCategoryChange }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: categoriesRes } = useQuery({
    queryKey: ["service-categories-all"],
    queryFn: async () =>
      (await ServiceCategoryApi.list({ page: 1, perPage: 100 })).data,
  });

  const categories = categoriesRes?.list || [];

  return (
    <Box>
      <Box display="flex" gap={2} mb={3}>
        {/* Category Filter */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Filter by Category"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              onCategoryChange?.(e.target.value || undefined);
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CreateServiceButton />
      </Box>

      <ServicesGridUI services={services} />
    </Box>
  );
}
```

### Currency Formatting Hook

```typescript
// src/lib/hooks/use-current-currency.ts
export function useCurrentCurrency() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatPriceWithDiscount = (price: number, discount?: number) => {
    if (!discount) {
      return formatPrice(price);
    }

    const discountedPrice = price * (1 - discount / 100);
    return (
      <>
        <Box component="span" sx={{ textDecoration: "line-through", opacity: 0.6, mr: 1 }}>
          {formatPrice(price)}
        </Box>
        <Box component="span" sx={{ color: "success.main", fontWeight: 600 }}>
          {formatPrice(discountedPrice)}
        </Box>
      </>
    );
  };

  return { formatPrice, formatPriceWithDiscount, symbol: "ج.م" };
}
```

### Translation Structure

```json
// messages/en.json
{
  "services": {
    "pluralTitle": "Services",
    "create": "Create Service",
    "edit": "Edit Service",
    "name": "Service Name",
    "code": "Service Code",
    "category": "Category",
    "noCategory": "No Category",
    "price": "Price",
    "discount": "Discount",
    "durationMinutes": "Duration (minutes)",
    "status": "Status",
    "active": "Active",
    "inactive": "Inactive",
    "createdSuccess": "Service created successfully",
    "updatedSuccess": "Service updated successfully"
  },
  "serviceCategories": {
    "pluralTitle": "Service Categories",
    "create": "Create Category",
    "edit": "Edit Category",
    "name": "Category Name",
    "code": "Category Code",
    "color": "Color",
    "active": "Active",
    "inactive": "Inactive"
  }
}
```

---

## How to Implement Features

### Checklist: Creating a New Feature Module

Let's implement a **"Products"** feature as an example.

#### 1. Define Backend Entity Type

```typescript
// src/types/api/base/product/index.ts
export interface BE_Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}
```

#### 2. Create API Service

```typescript
// src/services/api/base/product/types/args.ts
export interface CreateProductArgs {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

export interface UpdateProductArgs extends Partial<CreateProductArgs> {}

// src/services/api/base/product/types/responses.ts
import { BE_Product } from "@/types/api/base/product";
import { BE_Pagination } from "@/types/api/common/pagination";

export type ListProductsResponse = BE_Pagination<BE_Product[]>;
export type ShowProductResponse = BE_Product;
export interface CreateProductResponse extends BE_Product {}

// src/services/api/base/product/index.ts
import { workspaceApi } from "@/lib/axios/instances/workspace";

export const ProductApi = {
  list: (params?: BE_ListParams) =>
    workspaceApi.get<ListProductsResponse>("products", { params }),
  show: (id: string) => workspaceApi.get<ShowProductResponse>(`products/${id}`),
  create: (args: CreateProductArgs) =>
    workspaceApi.post<CreateProductResponse>("products", args),
  update: (id: string, args: UpdateProductArgs) =>
    workspaceApi.put<CreateProductResponse>(`products/${id}`, args),
  delete: (id: string) => workspaceApi.delete(`products/${id}`),
};
```

#### 3. Create Module Structure

```
src/modules/product/
├── list/
│   └── view.tsx              # List view
├── show/
│   └── view.tsx              # Detail view
└── components/
    ├── product-card/         # Card component
    ├── products-grid/        # Layer 3: Data
    ├── products-grid-with-controls/  # Layer 2: Logic
    ├── products-grid-ui/     # Layer 1: UI
    └── create-product-dialog/
        ├── index.tsx
        └── button.tsx
```

#### 4. Create UI Layer (Layer 1)

```typescript
// src/modules/product/components/products-grid-ui/index.tsx
type Props = {
  products: BE_Product[];
};

function ProductsGridUI({ products }: Props) {
  if (products.length === 0) {
    return <Empty title="No products found" />;
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsGridUI;
```

#### 5. Create Logic Layer (Layer 2)

```typescript
// src/modules/product/components/products-grid-with-controls/index.tsx
type Props = {
  products: BE_Product[];
  pagination?: PaginationConfig;
  enableAdd?: boolean;
  onAddSuccess?: () => void;
};

function ProductsGridWithControls({
  products,
  pagination,
  enableAdd,
  onAddSuccess,
}: Props) {
  const t = useTranslations("products");

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h6">{t("pluralTitle")}</Typography>
        {enableAdd && <CreateProductButton onSuccess={onAddSuccess} />}
      </Box>

      <ProductsGridUI products={products} />

      {pagination && (
        <CenteredPagination {...pagination} />
      )}
    </Box>
  );
}

export default ProductsGridWithControls;
```

#### 6. Create Data Layer (Layer 3)

```typescript
// src/modules/product/components/products-grid/index.tsx
"use client";
import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "@/services/api/base/product";

type Props = {
  initialData?: ListProductsResponse;
  defaultParams?: BE_ListParams;
};

function ProductsGrid({ initialData, defaultParams }: Props) {
  const [page, setPage] = useState(defaultParams?.page || 1);

  const { data: res, refetch, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => (await ProductApi.list({ page, perPage: 9 })).data,
    placeholderData: page === defaultParams?.page ? initialData : undefined,
  });

  if (isLoading) {
    return <GridCardsSkeleton />;
  }

  return (
    <ProductsGridWithControls
      products={res?.list || []}
      pagination={{
        page,
        totalPages: res?.metadata?.pages || 1,
        onChange: setPage,
      }}
      enableAdd
      onAddSuccess={() => refetch()}
    />
  );
}

export default ProductsGrid;
```

#### 7. Create Dialog Component

```typescript
// src/modules/product/components/create-product-dialog/index.tsx
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().int().min(0, "Stock must be non-negative"),
  categoryId: z.string().min(1, "Category is required"),
});

type FormValues = z.infer<typeof schema>;

function CreateProductDialog({ open, onClose, onSuccess }: Props) {
  const { register, handleSubmit, formState, setError, reset } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
    });

  const onSubmit = async (data: FormValues) => {
    try {
      await ProductApi.create(data);
      reset();
      onClose();
      onSuccess?.();
    } catch (error) {
      handleValidationErrors(error, setError);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Dialog>
  );
}
```

#### 8. Create Page Route

```typescript
// src/app/[locale]/(dashboard)/products/page.tsx
import { ProductApi } from "@/services/api/base/product";
import ListProductsView from "@/modules/product/list/view";

async function ProductsPage() {
  const res = await ProductApi.list({ page: 1, perPage: 10 });
  return <ListProductsView data={res.data} />;
}

export default ProductsPage;
```

#### 9. Create View Component

```typescript
// src/modules/product/list/view.tsx
"use client";
import { createContextComponent } from "@/components/headless/create-context-component";
import PageContent from "@/layouts/dashboard/page-content";
import ProductsGrid from "../components/products-grid";

type Props = {
  data: ListProductsResponse;
};

const ListProductsView = createContextComponent<Props>(({ data }) => {
  const t = useTranslations("products");

  return (
    <PageContent title={t("pluralTitle")}>
      <ProductsGrid initialData={data} defaultParams={{ page: 1, perPage: 10 }} />
    </PageContent>
  );
});

export default ListProductsView;
```

#### 10. Add Translations

```json
// messages/en.json
{
  "products": {
    "pluralTitle": "Products",
    "create": "Create Product",
    "details": "Product Details",
    "name": "Product Name",
    "description": "Description",
    "price": "Price",
    "stock": "Stock"
  }
}
```

---

## Delete Operations Pattern

### Overview

The application uses a consistent, user-friendly pattern for all delete operations with proper confirmation dialogs, loading states, and error handling.

### Components

#### 1. ConfirmDeleteDialog

A generic confirmation dialog component that handles the entire delete flow.

**Location:** `src/components/ui/interactions/confirm-delete-dialog/index.tsx`

**Features:**

- Automatic loading states with `useMutation`
- Success/error notifications via `notistack`
- Translatable messages with `next-intl`
- Professional danger-themed UI
- Optional custom messages

**Props:**

```typescript
interface Props {
  open: boolean; // Dialog visibility
  onClose: () => void; // Close handler
  onDelete: () => Promise<void> | void; // Delete function
  onSuccess?: () => void; // Success callback
  moduleName?: string; // e.g., "service", "category"
  title?: string; // Custom title
  subtitle?: string; // Custom subtitle
  description?: string; // Custom description
}
```

**Default Messages:**

- Title: "Confirm Deletion" (`t('common.confirmDeletion')`)
- Subtitle: "Are you sure you want to delete this {moduleName}?" (`t('common.deleteConfirmSubtitle')`)
- Description: "This action cannot be undone." (`t('common.deleteWarning')`)

#### 2. DeleteIconButton

A pre-wired icon button that combines DialogTrigger with ConfirmDeleteDialog.

**Location:** `src/components/shared/buttons/delete-icon-button.tsx`

**Features:**

- One-line delete implementation
- Trash icon with error color
- Automatic dialog management

### Implementation Patterns

#### Pattern 1: State Management (Full Control)

Use when you need more control over the delete flow or when handling clicks from nested components.

```typescript
"use client";

import { useState } from "react";
import { ServiceApi } from "@/services/api/base/service";
import { BE_Service } from "@/types/api/base/service";
import ConfirmDeleteDialog from "@/components/ui/interactions/confirm-delete-dialog";

function ServicesGrid({ services, onRefetch }: Props) {
  const [deleteService, setDeleteService] = useState<BE_Service | undefined>();
  const t = useTranslations("services");

  const handleDeleteClick = (service: BE_Service) => {
    setDeleteService(service);
  };

  const handleDeleteConfirm = async () => {
    if (deleteService) {
      await ServiceApi.delete(deleteService.id);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid key={service.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ServiceCard
              service={service}
              onDelete={handleDeleteClick}  // Pass to card
            />
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={!!deleteService}
        onClose={() => setDeleteService(undefined)}
        onDelete={handleDeleteConfirm}
        moduleName={t("singularTitle")}
        title={t("delete")}
        subtitle={`${t("deleteConfirm")} "${deleteService?.name}"`}
        onSuccess={() => {
          setDeleteService(undefined);
          onRefetch?.();
        }}
      />
    </>
  );
}
```

**When to use:**

- Delete button is in a nested component (e.g., card, menu item)
- Need access to item data for custom messages
- Multiple delete sources for same dialog

#### Pattern 2: DialogTrigger (One-Liner)

Use for simple, direct delete buttons.

```typescript
import DialogTrigger from "@/components/headless/dialog-trigger";
import ConfirmDeleteDialog from "@/components/ui/interactions/confirm-delete-dialog";
import { ServiceApi } from "@/services/api/base/service";

function ServiceActions({ service, onRefetch }: Props) {
  return (
    <DialogTrigger
      component={ConfirmDeleteDialog}
      dialogProps={{
        moduleName: "service",
        onDelete: async () => await ServiceApi.delete(service.id),
        onSuccess: () => onRefetch?.(),
        subtitle: `Are you sure you want to delete "${service.name}"?`,
      }}
      render={({ onOpen }) => (
        <IconButton onClick={onOpen} color="error">
          <Trash size={20} />
        </IconButton>
      )}
    />
  );
}
```

#### Pattern 3: DeleteIconButton (Simplest)

Use for maximum simplicity with default styling.

```typescript
import { DeleteIconButton } from "@/components/shared/buttons";
import { ServiceApi } from "@/services/api/base/service";

function ServiceActions({ service, onRefetch }: Props) {
  return (
    <DeleteIconButton
      onDelete={async () => await ServiceApi.delete(service.id)}
      onSuccess={() => onRefetch?.()}
      moduleName="service"
      itemName={service.name}
    />
  );
}
```

### Complete Example: Service Card with Delete

```typescript
// service-card/index.tsx
"use client";

import { BE_Service } from "@/types/api/base/service";
import { Card, CardContent, IconButton, Menu, MenuItem } from "@mui/material";
import { More, Edit2, Trash } from "iconsax-reactjs";
import { useState } from "react";

type Props = {
  service: BE_Service;
  onEdit?: (service: BE_Service) => void;
  onDelete?: (service: BE_Service) => void;  // Delete callback
};

function ServiceCard({ service, onEdit, onDelete }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = () => {
    setAnchorEl(null);
    onDelete?.(service);  // Trigger parent handler
  };

  return (
    <Card>
      <CardContent>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <More size={20} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <Trash size={16} style={{ marginRight: 8 }} />
            Delete
          </MenuItem>
        </Menu>

        {/* Card content */}
      </CardContent>
    </Card>
  );
}
```

```typescript
// services-grid-with-controls/index.tsx
"use client";

import { useState } from "react";
import { ServiceApi } from "@/services/api/base/service";
import { BE_Service } from "@/types/api/base/service";
import ServicesGridUI from "../services-grid-ui";
import ConfirmDeleteDialog from "@/components/ui/interactions/confirm-delete-dialog";
import { useTranslations } from "next-intl";

function ServicesGridWithControls({ services, onRefetch }: Props) {
  const t = useTranslations("services");
  const [deleteService, setDeleteService] = useState<BE_Service | undefined>();

  return (
    <>
      <ServicesGridUI
        services={services}
        onDelete={setDeleteService}  // Pass state setter
      />

      <ConfirmDeleteDialog
        open={!!deleteService}
        onClose={() => setDeleteService(undefined)}
        onDelete={async () => {
          if (deleteService) {
            await ServiceApi.delete(deleteService.id);
          }
        }}
        moduleName={t("singularTitle")}
        subtitle={`${t("deleteConfirm")} "${deleteService?.name}"`}
        onSuccess={() => {
          setDeleteService(undefined);
          onRefetch?.();
        }}
      />
    </>
  );
}
```

### Delete Flow Lifecycle

1. **User clicks delete** → Triggers `onDelete` callback in card
2. **State updates** → `setDeleteService(service)` sets item to delete
3. **Dialog opens** → `open={!!deleteService}` evaluates to true
4. **User confirms** → `handleDeleteConfirm` executes
5. **useMutation starts** → Button shows loading spinner, disabled
6. **API call** → `await ServiceApi.delete(id)`
7. **Success handling:**
   - Success notification shown (`t('common.deleteSuccess')`)
   - `onSuccess` callback executed
   - Dialog closes
   - Parent component refetches data
8. **Error handling:**
   - Error notification shown (`t('common.deleteError')`)
   - Dialog remains open
   - User can retry or cancel

### Required Translations

Add these to `messages/en.json` and `messages/ar.json`:

```json
{
  "common": {
    "confirmDeletion": "Confirm Deletion",
    "deleteConfirmSubtitle": "Are you sure you want to delete this {item}?",
    "deleteWarning": "This action cannot be undone.",
    "deleteSuccess": "{item} deleted successfully",
    "deleteError": "Failed to delete {item}",
    "deleting": "Deleting..."
  },
  "services": {
    "singularTitle": "Service",
    "delete": "Delete Service",
    "deleteConfirm": "Are you sure you want to delete this service?"
  }
}
```

### Benefits of This Pattern

✅ **Consistent UX** - All delete operations look and behave the same
✅ **No boilerplate** - Handles loading, errors, notifications automatically
✅ **Type-safe** - Full TypeScript support
✅ **Accessible** - Proper dialog focus management
✅ **Translatable** - Full i18n support
✅ **Testable** - Clear separation of concerns
✅ **Flexible** - Three patterns for different use cases

### Anti-Patterns to Avoid

❌ **Don't use window.confirm()**

```typescript
// ❌ BAD
const handleDelete = () => {
  if (window.confirm("Delete this?")) {
    ServiceApi.delete(id);
  }
};
```

❌ **Don't manually handle loading states**

```typescript
// ❌ BAD
const [isDeleting, setIsDeleting] = useState(false);
const handleDelete = async () => {
  setIsDeleting(true);
  try {
    await ServiceApi.delete(id);
    setIsDeleting(false);
  } catch (error) {
    setIsDeleting(false);
  }
};
```

❌ **Don't forget success callbacks**

```typescript
// ❌ BAD - Data won't refresh
<ConfirmDeleteDialog
  onDelete={async () => await ServiceApi.delete(id)}
  // Missing onSuccess to refetch data!
/>
```

✅ **Do use ConfirmDeleteDialog**

```typescript
// ✅ GOOD
<ConfirmDeleteDialog
  open={!!deleteItem}
  onClose={() => setDeleteItem(undefined)}
  onDelete={async () => await ServiceApi.delete(deleteItem.id)}
  onSuccess={() => {
    setDeleteItem(undefined);
    refetch();
  }}
  moduleName="service"
/>
```

---

## Code Conventions

### File Naming

- **Components:** `kebab-case` for folders, `index.tsx` for main file

  ```
  create-branch-dialog/
  ├── index.tsx
  └── button.tsx
  ```

- **Types:** `kebab-case.ts`

  ```
  args.ts
  responses.ts
  ```

- **Pages:** Next.js conventions (`page.tsx`, `layout.tsx`)

### Component Naming

- **Components:** `PascalCase`

  ```typescript
  function CreateBranchDialog() {}
  export default CreateBranchDialog;
  ```

- **Exports:** Named or default (prefer default for main component)
  ```typescript
  export default CreateBranchDialog;
  export { CreateBranchButton };
  ```

### Import Order

```typescript
// 1. External libraries
import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";

// 2. Internal modules
import { BranchApi } from "@/services/api/base/branch";
import { BE_Branch } from "@/types/api/base/branch";

// 3. Relative imports
import BranchCard from "./branch-card";
```

### Props Types

```typescript
// Always define Props type locally
type Props = {
  branch: BE_Branch;
  onSuccess?: () => void;
};

function BranchCard({ branch, onSuccess }: Props) {
  // ...
}
```

### Client vs Server Components

**Default to Server Components**, mark as `"use client"` only when:

- Using hooks (useState, useEffect, etc.)
- Using event handlers
- Using browser APIs
- Using context

```typescript
// Client component
"use client";
import { useState } from "react";

function InteractiveComponent() {
  const [open, setOpen] = useState(false);
  // ...
}

// Server component (default)
async function DataComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### Async Server Components

```typescript
async function Page({ params }: PageProps) {
  const { id } = await params; // Await params in Next.js 15
  const data = await fetchData(id);
  return <View data={data} />;
}
```

### Error Handling

```typescript
try {
  await ProductApi.create(data);
  enqueueSnackbar("Product created", { variant: "success" });
} catch (error) {
  const handled = handleValidationErrors(error, setError);
  if (!handled) {
    enqueueSnackbar("Failed to create product", { variant: "error" });
  }
}
```

### TypeScript Best Practices

1. **Always define types** - No implicit `any`
2. **Use interfaces for objects** - `interface` over `type` for objects
3. **Use type for unions** - `type Status = "active" | "inactive"`
4. **Extract types from Zod** - `type FormValues = z.infer<typeof schema>`
5. **Use generics sparingly** - Only when truly reusable

---

## Summary & Quick Reference

### When Creating a New Feature

1. ✅ Define `BE_[Entity]` type in `src/types/api/base/[entity]/`
2. ✅ Create API service in `src/services/api/base/[entity]/`
3. ✅ Create module structure in `src/modules/[entity]/`
4. ✅ Implement 3-layer architecture if complex
5. ✅ Create routes in `src/app/[locale]/(dashboard)/[entity]/`
6. ✅ Add translations in `messages/en.json` and `messages/ar.json`

### Axios Instance Selection

- **baseApi** - General API calls (user, workspace list)
- **baseApiNoAuth** - Public endpoints (login, register)
- **workspaceApi** - Workspace-scoped (branches, patients)

### State Management

- **Server State** → React Query (`useQuery`, `useMutation`)
- **Client State** → Jotai atoms (`useAtomValue`, `useSetAtom`)
- **Form State** → React Hook Form

### Common Patterns

```typescript
// Data fetching with React Query
const { data, isLoading } = useQuery({
  queryKey: ["products"],
  queryFn: async () => (await ProductApi.list()).data,
});

// Form with validation
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(schema),
});

// Translation
const t = useTranslations("products");

// Auth
const user = useAtomValue(userAtom);

// Workspace
const workspace = useAtomValue(currentWorkspaceAtom);
```

---

## Additional Resources

- **MUI Documentation:** https://mui.com/material-ui/
- **Next.js App Router:** https://nextjs.org/docs/app
- **React Hook Form:** https://react-hook-form.com/
- **Zod:** https://zod.dev/
- **Jotai:** https://jotai.org/
- **TanStack Query:** https://tanstack.com/query/latest
- **next-intl:** https://next-intl-docs.vercel.app/

---

**Last Updated:** October 30, 2025
**Project:** Medaya - Medical Workspace Management
**Version:** 1.0.0

---

## Recent Updates & Lessons Learned

### October 2025 - Services Module Implementation

#### Key Lessons:

1. **Number Fields in Forms:**
   - Always use `z.coerce.number()` instead of `z.number()`
   - Use `undefined` for empty number fields, not `0`
   - Never use `valueAsNumber` - it creates non-deletable zeros
   - Always convert to Number in onSubmit handler

2. **Translation System:**
   - Translations must be imported from JSON files in `messages/index.ts`
   - MessagesGroup structure alone is not enough
   - Merge JSON translations with structure: `{ ...structure, ...jsonData }`

3. **Dependent Dropdowns:**
   - Fetch dropdown data with `enabled: open` to avoid unnecessary requests
   - Show loading state in dropdown with `disabled={isLoading}`
   - Display helpful message when no options available
   - Handle errors with React.useEffect and notifications

4. **Category Relationships:**
   - Optional foreign keys allow "No Category" option
   - Filter by status (ACTIVE/INACTIVE) when showing dropdowns
   - Provide "All Categories" filter option in grids

5. **Currency Formatting:**
   - Use `Intl.NumberFormat` for consistent formatting
   - Separate locale from currency (en-US + EGP = English numbers, Egyptian Pounds)
   - Create reusable hooks for price formatting

6. **Delete Confirmation Pattern:**
   - Use `ConfirmDeleteDialog` component instead of `window.confirm()`
   - Handles loading states automatically with `useMutation`
   - Two patterns available:
     - State management pattern: Control dialog with state
     - DialogTrigger pattern: Use with `DeleteIconButton` for cleaner code
   - Provides consistent UX across all delete operations
   - Automatic success/error notifications

#### Implementation Checklist for Features with Categories:

1. ✅ Create category entity types with status enum
2. ✅ Create main entity with optional `categoryId`
3. ✅ Implement both API services with count/findByCode methods
4. ✅ Create category management UI first
5. ✅ Add category dropdown to main entity forms with loading states
6. ✅ Implement category filter in grid views
7. ✅ Add both to navigation menu
8. ✅ Ensure translations are in JSON and properly loaded
