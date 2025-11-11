# 3-Layer Architecture for Branches Grid

## Architecture Overview

The branches grid follows a clean **3-layer separation of concerns**:

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 3: DATA                            │
│                  BranchesGrid                               │
│  • Fetches data from API                                    │
│  • Manages loading states                                   │
│  • Handles query caching                                    │
│  • Manages pagination state                                 │
└─────────────────────────────────────────────────────────────┘
                          ↓ passes clean data
┌─────────────────────────────────────────────────────────────┐
│                   LAYER 2: LOGIC                            │
│            BranchesGridWithControls                         │
│  • Receives branches array                                  │
│  • Adds pagination controls                                 │
│  • Adds create button                                       │
│  • Adds optional title                                      │
│  • Handles user interactions                                │
└─────────────────────────────────────────────────────────────┘
                          ↓ passes branches
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 1: UI                              │
│                 BranchesGridUI                              │
│  • Pure presentational component                            │
│  • Only receives branches[]                                 │
│  • Renders grid layout                                      │
│  • Renders branch cards                                     │
│  • Handles empty state                                      │
└─────────────────────────────────────────────────────────────┘
```

## Layer 1: BranchesGridUI (Pure UI)

**Location:** `src/modules/branch/components/branches-grid-ui/index.tsx`

### Responsibility

- **ONLY** displays a grid of branches
- No logic, no state, no data fetching
- Pure presentational component

### Props

```typescript
{
  branches: BE_Branch[];  // Array of branches to display
}
```

### Features

- Responsive grid (12/6/4 columns)
- Empty state message
- Maps branches to BranchCard components

### Example Usage

```tsx
<BranchesGridUI
  branches={[
    { id: '1', name: 'Branch 1', ... },
    { id: '2', name: 'Branch 2', ... },
  ]}
/>
```

## Layer 2: BranchesGridWithControls (Logic Layer)

**Location:** `src/modules/branch/components/branches-grid-with-controls/index.tsx`

### Responsibility

- Composes UI layer with interactive controls
- Handles pagination logic
- Manages add button
- Shows optional title

### Props

```typescript
{
  branches: BE_Branch[];         // Data to display
  pagination?: {                 // Optional pagination
    page: number;
    totalPages: number;
    onChange: (newPage: number) => void;
  };
  enableAdd?: boolean;           // Show create button
  onAddSuccess?: () => void;     // Callback after create
  showTitle?: boolean;           // Show "Branches" title
}
```

### Features

- Conditional header with title
- Create button with success callback
- Pagination controls (only shows if > 1 page)
- Composes BranchesGridUI

### Example Usage

```tsx
<BranchesGridWithControls
  branches={branches}
  pagination={{
    page: 2,
    totalPages: 5,
    onChange: (newPage) => setPage(newPage),
  }}
  enableAdd={true}
  onAddSuccess={() => refetch()}
  showTitle={true}
/>
```

## Layer 3: BranchesGrid (Data Layer)

**Location:** `src/modules/branch/components/branches-grid/index.tsx`

### Responsibility

- Fetches data from API
- Manages React Query state
- Handles loading states
- Manages pagination state internally
- Passes clean data down to logic layer

### Props

```typescript
{
  workspaceId?: string;          // Filter by workspace
  initialData?: PaginatedData;   // SSR initial data
  defaultParams?: {              // Default pagination
    page?: number;
    perPage?: number;
  };
  queryKey?: string;             // Query cache key
  enableAdd?: boolean;           // Enable create button
  showTitle?: boolean;           // Show title
}
```

### Features

- React Query data fetching
- Loading spinner
- Query caching with custom keys
- Automatic refetch after create
- Workspace filtering support

### Example Usage

```tsx
// All branches
<BranchesGrid
  queryKey="all-branches"
  enableAdd={true}
  showTitle={true}
/>

// Workspace-specific branches
<BranchesGrid
  workspaceId={workspace.id}
  queryKey="workspace-branches"
  enableAdd={true}
  showTitle={true}
/>
```

## Benefits of This Architecture

### 1. Separation of Concerns

Each layer has a single responsibility:

- **UI**: Only rendering
- **Logic**: Only interactions
- **Data**: Only data fetching

### 2. Reusability

Each layer can be used independently:

```tsx
// Use just the UI with your own data
<BranchesGridUI branches={myBranches} />

// Use UI + Logic with external data source
<BranchesGridWithControls
  branches={fetchedFromElsewhere}
  pagination={customPagination}
/>

// Use full stack with API integration
<BranchesGrid workspaceId={id} />
```

### 3. Testability

Easy to test each layer in isolation:

- **UI Layer**: Test rendering with mock data
- **Logic Layer**: Test interactions with mock callbacks
- **Data Layer**: Test API integration with mock responses

### 4. Flexibility

Easy to swap implementations:

- Want different pagination? Replace logic layer
- Want different data source? Replace data layer
- Want different card design? Replace UI layer

### 5. Maintainability

Changes are isolated:

- UI changes don't affect data fetching
- Data fetching changes don't affect UI
- Logic changes are contained

## Usage in Different Contexts

### Context 1: Full Page View

```tsx
// src/modules/branch/list/view.tsx
<PageContent title="Branches">
  <BranchesGrid
    initialData={ssrData}
    queryKey="branches-list"
    showTitle={false} // PageContent has title
    enableAdd={true}
  />
</PageContent>
```

### Context 2: Workspace Tab

```tsx
// src/modules/workspace/show/views/branches/index.tsx
<BranchesGrid
  workspaceId={workspace.id}
  queryKey="workspace-branches"
  showTitle={true}
  enableAdd={true}
/>
```

### Context 3: Custom Widget (Example)

```tsx
// Future: Dashboard widget
<BranchesGridWithControls
  branches={recentBranches}
  enableAdd={false}
  showTitle={true}
  // No pagination for widget
/>
```

### Context 4: Read-Only Display (Example)

```tsx
// Future: Report or print view
<BranchesGridUI branches={selectedBranches} />
```

## Data Flow

### Full Stack Flow (Layer 3 → 2 → 1)

```
User Action
    ↓
BranchesGrid (Layer 3)
    ├─ Fetches from API
    ├─ Shows loading spinner
    └─ Receives data
    ↓
BranchesGridWithControls (Layer 2)
    ├─ Receives branches[]
    ├─ Adds pagination
    ├─ Adds create button
    └─ Passes to UI
    ↓
BranchesGridUI (Layer 1)
    ├─ Receives branches[]
    ├─ Maps to cards
    └─ Renders grid
```

### Custom Data Flow (Layer 2 → 1)

```
Custom Data Source
    ↓
BranchesGridWithControls (Layer 2)
    ├─ Receives branches[] from props
    ├─ Adds your custom pagination
    └─ Passes to UI
    ↓
BranchesGridUI (Layer 1)
    └─ Renders grid
```

## File Structure

```
src/modules/branch/components/
├── branches-grid-ui/          # Layer 1: Pure UI
│   └── index.tsx
├── branches-grid-with-controls/  # Layer 2: Logic
│   └── index.tsx
└── branches-grid/             # Layer 3: Data
    └── index.tsx
```

## Testing Strategy

### Layer 1 Tests (UI)

```typescript
// Test rendering with different data
it('renders empty state when no branches', () => {
  render(<BranchesGridUI branches={[]} />);
  expect(screen.getByText('No branches available')).toBeInTheDocument();
});

it('renders branch cards', () => {
  render(<BranchesGridUI branches={mockBranches} />);
  expect(screen.getAllByRole('article')).toHaveLength(3);
});
```

### Layer 2 Tests (Logic)

```typescript
// Test interactions
it('calls onChange when pagination clicked', () => {
  const onChange = jest.fn();
  render(<BranchesGridWithControls
    branches={mockBranches}
    pagination={{ page: 1, totalPages: 3, onChange }}
  />);
  fireEvent.click(screen.getByText('2'));
  expect(onChange).toHaveBeenCalledWith(2);
});
```

### Layer 3 Tests (Data)

```typescript
// Test API integration
it('fetches and displays branches', async () => {
  mockApi.list.mockResolvedValue({ data: { list: mockBranches } });
  render(<BranchesGrid />);
  await waitFor(() => {
    expect(screen.getByText('Branch 1')).toBeInTheDocument();
  });
});
```

## Best Practices

### ✅ Do's

- Keep Layer 1 pure (no side effects)
- Pass data down, callbacks up
- Use Layer 2 for custom logic
- Use Layer 3 for API integration
- Test each layer independently

### ❌ Don'ts

- Don't fetch data in Layer 1 or 2
- Don't put UI logic in Layer 3
- Don't skip layers unnecessarily
- Don't mix concerns across layers

## Future Extensions

This architecture makes it easy to add:

1. **Different Data Sources**

   ```tsx
   <BranchesGridWithControls branches={fromLocalStorage} />
   ```

2. **Different Pagination Styles**

   ```tsx
   <BranchesGridWithControls
     branches={branches}
     pagination={infiniteScrollPagination}
   />
   ```

3. **Different Layouts**

   ```tsx
   // Create BranchesListUI (list view)
   // Use same logic & data layers
   ```

4. **Advanced Filtering**
   ```tsx
   // Add filter layer between data and logic
   ```
