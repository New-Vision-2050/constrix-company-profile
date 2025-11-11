# Branches Grid - Practical Examples

## Real Usage Examples

### Example 1: Full Page View (Production)

**File:** `src/modules/branch/list/view.tsx`

```tsx
import BranchesGrid from "../components/branches-grid";

function ListBranchesView({ data, defaultState }) {
  return (
    <PageContent title="Branches">
      <BranchesGrid
        initialData={data} // SSR data
        defaultParams={defaultState} // { page: 1, perPage: 12 }
        queryKey="branches-list-view"
        showTitle={false} // PageContent has title
        enableAdd={true} // Show create button
      />
    </PageContent>
  );
}
```

**Result:**

- Fetches all branches from API
- Shows 12 per page
- Create button visible
- No duplicate title

---

### Example 2: Workspace Tab (Production)

**File:** `src/modules/workspace/show/views/branches/index.tsx`

```tsx
import BranchesGrid from "@/modules/branch/components/branches-grid";

function WorkspaceBranchesTab({ workspace }) {
  return (
    <BranchesGrid
      workspaceId={workspace.id} // Filter by workspace
      queryKey="workspace-branches"
      showTitle={true} // Show "Branches" title
      enableAdd={true} // Show create button
      defaultParams={{ page: 1, perPage: 9 }}
    />
  );
}
```

**Result:**

- Fetches only this workspace's branches
- Shows 9 per page
- Shows title and create button
- Separate query cache from main list

---

### Example 3: Dashboard Widget (Future)

**File:** `src/sections/overview/recent-branches.tsx`

```tsx
import BranchesGridWithControls from "@/modules/branch/components/branches-grid-with-controls";

function RecentBranchesWidget() {
  const { data } = useQuery({
    queryKey: ["recent-branches"],
    queryFn: () => fetchRecentBranches(5),
  });

  return (
    <Card>
      <CardHeader title="Recent Branches" />
      <CardContent>
        <BranchesGridWithControls
          branches={data?.branches || []}
          enableAdd={false} // No create button in widget
          showTitle={false} // Card header has title
          // No pagination in widget
        />
      </CardContent>
    </Card>
  );
}
```

**Result:**

- Shows last 5 branches
- No pagination needed
- No create button
- Uses external data source

---

### Example 4: Search Results (Future)

**File:** `src/modules/branch/search/results.tsx`

```tsx
import BranchesGridWithControls from "@/modules/branch/components/branches-grid-with-controls";

function BranchSearchResults({ searchTerm }) {
  const [page, setPage] = useState(1);
  const { data } = useSearchBranches(searchTerm, page);

  return (
    <Box>
      <Typography variant="h6">Search results for "{searchTerm}"</Typography>

      <BranchesGridWithControls
        branches={data?.results || []}
        pagination={{
          page,
          totalPages: data?.totalPages || 1,
          onChange: setPage,
        }}
        enableAdd={false}
        showTitle={false}
      />
    </Box>
  );
}
```

**Result:**

- Custom search data source
- Custom pagination logic
- No create button in search results
- Uses layer 2 directly

---

### Example 5: Static Report (Future)

**File:** `src/sections/reports/branch-report.tsx`

```tsx
import BranchesGridUI from "@/modules/branch/components/branches-grid-ui";

function BranchReport({ reportData }) {
  return (
    <Paper>
      <Typography variant="h4">Monthly Report</Typography>
      <Typography variant="subtitle1">Top Performing Branches</Typography>

      <BranchesGridUI branches={reportData.topBranches} />

      <Typography variant="h6" mt={4}>
        Branches Needing Attention
      </Typography>

      <BranchesGridUI branches={reportData.underperformingBranches} />
    </Paper>
  );
}
```

**Result:**

- Pure display, no interactions
- Multiple grids on same page
- Static data
- Uses layer 1 only

---

### Example 6: Branch Selector (Future)

**File:** `src/components/selectors/branch-selector.tsx`

```tsx
import BranchesGridUI from "@/modules/branch/components/branches-grid-ui";

function BranchSelector({ onSelect, selectedIds }) {
  const [page, setPage] = useState(1);
  const { data } = useBranches({ page, perPage: 6 });

  return (
    <Dialog open={true}>
      <DialogTitle>Select Branches</DialogTitle>
      <DialogContent>
        {/* Custom selection UI wrapper */}
        <SelectionWrapper selectedIds={selectedIds} onSelect={onSelect}>
          <BranchesGridUI branches={data?.list || []} />
        </SelectionWrapper>

        <Pagination
          page={page}
          count={data?.totalPages}
          onChange={(_, p) => setPage(p)}
        />
      </DialogContent>
    </Dialog>
  );
}
```

**Result:**

- Custom selection logic
- Uses pure UI layer
- Custom pagination component
- External data management

---

### Example 7: Comparison View (Future)

**File:** `src/modules/branch/compare/view.tsx`

```tsx
import BranchesGridUI from "@/modules/branch/components/branches-grid-ui";

function CompareBranchesView({ branchIds }) {
  const { data } = useBranches({ ids: branchIds });

  return (
    <Box>
      <Typography variant="h5">Branch Comparison</Typography>

      <BranchesGridUI branches={data?.branches || []} />

      <ComparisonMetrics branches={data?.branches} />
      <ComparisonCharts branches={data?.branches} />
    </Box>
  );
}
```

**Result:**

- Shows specific branches for comparison
- Pure display
- Combined with other comparison components

---

### Example 8: Filtered View (Future)

**File:** `src/modules/branch/filtered-list/view.tsx`

```tsx
import BranchesGridWithControls from "@/modules/branch/components/branches-grid-with-controls";

function FilteredBranchesView() {
  const [filters, setFilters] = useState({
    city: null,
    status: "active",
  });
  const [page, setPage] = useState(1);

  const { data } = useFilteredBranches(filters, page);

  return (
    <Box>
      <BranchFilters filters={filters} onChange={setFilters} />

      <BranchesGridWithControls
        branches={data?.branches || []}
        pagination={{
          page,
          totalPages: data?.totalPages || 1,
          onChange: setPage,
        }}
        enableAdd={true}
        showTitle={true}
      />
    </Box>
  );
}
```

**Result:**

- Custom filtering logic
- Custom data source
- Full controls (pagination + create)

---

### Example 9: Mobile-Optimized View (Future)

**File:** `src/modules/branch/mobile-list/view.tsx`

```tsx
import { BE_Branch } from "@/types/api/base/branch";

// Custom mobile UI using the same data
function MobileBranchList({ branches }: { branches: BE_Branch[] }) {
  return (
    <List>
      {branches.map((branch) => (
        <ListItem key={branch.id}>
          <ListItemAvatar>
            <Avatar src={branch.logoUrl} />
          </ListItemAvatar>
          <ListItemText primary={branch.name} secondary={branch.city} />
        </ListItem>
      ))}
    </List>
  );
}

// Use with data layer
function MobileBranchesView() {
  return (
    <BranchesGrid
      queryKey="mobile-branches"
      enableAdd={true}
      showTitle={true}
      // Override the UI rendering
      renderCustomUI={(branches) => <MobileBranchList branches={branches} />}
    />
  );
}
```

**Result:**

- Different UI for mobile
- Same data layer
- Same logic layer

---

## Quick Reference Table

| Use Case                  | Layer to Use           | Why?                            |
| ------------------------- | ---------------------- | ------------------------------- |
| Full page with API        | Layer 3 (BranchesGrid) | Need data fetching              |
| Custom data source        | Layer 2 (WithControls) | Have data, need controls        |
| Pure display              | Layer 1 (GridUI)       | Just rendering                  |
| Widget with external data | Layer 2                | Custom data, need some controls |
| Report/Print view         | Layer 1                | Static display only             |
| Search results            | Layer 2                | Custom data source              |
| Selection dialog          | Layer 1                | Custom interaction logic        |

## Props Quick Reference

### Layer 3: BranchesGrid

```typescript
workspaceId?: string;       // Filter by workspace
initialData?: Data;         // SSR data
defaultParams?: ListParams; // Pagination defaults
queryKey?: string;          // Cache key
enableAdd?: boolean;        // Show create button (default: true)
showTitle?: boolean;        // Show title (default: true)
```

### Layer 2: BranchesGridWithControls

```typescript
branches: BE_Branch[];      // REQUIRED
pagination?: {              // Optional pagination
  page: number;
  totalPages: number;
  onChange: (page) => void;
};
enableAdd?: boolean;        // Show create button (default: false)
onAddSuccess?: () => void;  // Callback after create
showTitle?: boolean;        // Show title (default: false)
```

### Layer 1: BranchesGridUI

```typescript
branches: BE_Branch[];      // REQUIRED - that's it!
```

## Common Patterns

### Pattern 1: Page with SSR

```tsx
// Server component
async function BranchesPage() {
  const data = await BranchApi.list();
  return <ListBranchesView data={data.data} />;
}

// Client component
function ListBranchesView({ data }) {
  return <BranchesGrid initialData={data} queryKey="branches-page" />;
}
```

### Pattern 2: Tab with Filtering

```tsx
function WorkspaceTab({ workspaceId }) {
  return (
    <BranchesGrid
      workspaceId={workspaceId}
      queryKey={`workspace-${workspaceId}-branches`}
    />
  );
}
```

### Pattern 3: Widget with Limit

```tsx
function Widget() {
  const { data } = useQuery({
    queryKey: ["widget-branches"],
    queryFn: () => BranchApi.list({ page: 1, perPage: 3 }),
  });

  return (
    <BranchesGridWithControls
      branches={data?.data?.list || []}
      enableAdd={false}
    />
  );
}
```

### Pattern 4: Pure Display

```tsx
function Report({ branches }) {
  return <BranchesGridUI branches={branches} />;
}
```
