# Branches Module Architecture

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                      BRANCHES MODULE                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      PAGES (Routes)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  /branches                    /branches/[id]                      │
│  ├─ page.tsx                  ├─ page.tsx                         │
│  │  └─ ListBranchesView       │  └─ ShowBranchView               │
│                                                                   │
│  /workspace/[id] (Branches Tab)                                   │
│  └─ WorkspaceBranchesTab                                          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                        │
                        │ uses
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                   REUSABLE COMPONENTS                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │           BranchesGrid (CORE REUSABLE)                  │     │
│  │  ✓ Handles data fetching & pagination                   │     │
│  │  ✓ Renders grid of branch cards                         │     │
│  │  ✓ Optional workspace filtering                         │     │
│  │  ✓ Configurable header & buttons                        │     │
│  │  ✓ Loading & empty states                               │     │
│  └────────────────────────────────────────────────────────┘     │
│                        │                                          │
│                        │ uses                                     │
│                        ▼                                          │
│  ┌────────────────────────────────────────────────────────┐     │
│  │                  BranchCard                             │     │
│  │  ✓ Displays single branch info                          │     │
│  │  ✓ Avatar with logo/initials                            │     │
│  │  ✓ Location & contact details                           │     │
│  │  ✓ Links to branch details                              │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │         CreateBranchDialog + Button                     │     │
│  │  ✓ Form with validation                                 │     │
│  │  ✓ Create & Edit modes                                  │     │
│  │  ✓ Success callbacks                                    │     │
│  └────────────────────────────────────────────────────────┘     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                        │
                        │ calls
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  BranchApi                                                        │
│  ├─ list(params?)      // GET /branches                          │
│  ├─ show(id)           // GET /branches/:id                      │
│  ├─ showBySlug(slug)   // GET /branches/slug/:slug               │
│  ├─ create(data)       // POST /branches                         │
│  ├─ update(id, data)   // PUT /branches/:id                      │
│  ├─ delete(id)         // DELETE /branches/:id                   │
│  └─ count()            // GET /branches/count                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Standalone Branches Page

```
User visits /branches
    ↓
page.tsx fetches initial data (SSR)
    ↓
ListBranchesView renders
    ↓
BranchesGrid (no workspaceId filter)
    ↓
Fetches ALL branches with pagination
    ↓
Renders BranchCards in grid
```

### Workspace Branches Tab

```
User clicks "Branches" tab in workspace
    ↓
WorkspaceBranchesTab renders
    ↓
BranchesGrid (with workspaceId filter)
    ↓
Fetches branches for specific workspace
    ↓
Renders BranchCards in grid
```

## Key Benefits of This Architecture

1. **DRY (Don't Repeat Yourself)**
   - Single source of truth for branches grid logic
   - Reduced code duplication

2. **Flexible & Configurable**
   - BranchesGrid can be used in multiple contexts
   - Props control behavior and appearance

3. **Performance Optimized**
   - React Query caching with unique query keys
   - Pagination support
   - Initial data from SSR

4. **Maintainable**
   - Changes to grid logic only need to be made once
   - Clear separation of concerns
   - Easy to add new filtered views

5. **Type Safe**
   - Full TypeScript support
   - Proper type inference from API responses

## Usage Examples

### Example 1: Full Page View

```tsx
<BranchesGrid
  queryKey="branches-list-view"
  showHeader={false}
  showCreateButton={true}
  defaultParams={{ page: 1, perPage: 12 }}
/>
```

### Example 2: Workspace Filtered View

```tsx
<BranchesGrid
  workspaceId={workspace.id}
  queryKey="workspace-branches"
  showHeader={true}
  showCreateButton={true}
  defaultParams={{ page: 1, perPage: 9 }}
/>
```

### Example 3: Read-Only Widget

```tsx
<BranchesGrid
  workspaceId={workspace.id}
  queryKey="widget-branches"
  showHeader={false}
  showCreateButton={false}
  defaultParams={{ page: 1, perPage: 3 }}
/>
```

## Future Extensions

This architecture makes it easy to add:

- Branch search/filter widgets
- Branch selection dropdowns
- Branch comparison views
- Branch analytics dashboards
- Any other branch list variations
