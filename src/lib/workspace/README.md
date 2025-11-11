# Workspace Module

## Usage

### For Client Components

```typescript
// ✅ Safe - only client-side utilities
import { useWorkspace, WorkspaceProvider } from "@/lib/workspace/client";
```

### For Server Components

```typescript
// ✅ Safe - only server-side utilities
import {
  withServerWorkspace,
  getServerWorkspaceId,
} from "@/lib/workspace/server";
```

### ⚠️ Avoid Main Index in Client Components

```typescript
// ❌ Dangerous - includes server utilities that break in client components
import { useWorkspace } from "@/lib/workspace"; // This will cause errors!
```

## Structure

- `/client/` - Client-side hooks, components, and utilities
- `/server/` - Server-side utilities (Next.js server functions)
- `/constants/` - Shared constants safe for both environments
- `/hooks/` - Client-side hooks implementation
