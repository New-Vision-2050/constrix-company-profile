# Branches Grid - 3-Layer Architecture Visual Guide

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                         BRANCHES GRID ARCHITECTURE                         ║
╚═══════════════════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────────────────┐
│                            USAGE CONTEXTS                                  │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────────────┐      ┌─────────────────────┐                    │
│  │  List Page          │      │  Workspace Tab      │                    │
│  │  /branches          │      │  /workspace/[id]    │                    │
│  └─────────┬───────────┘      └─────────┬───────────┘                    │
│            │                             │                                 │
│            └──────────────┬──────────────┘                                 │
│                           │                                                │
│                           ▼                                                │
└───────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────┐
│                          LAYER 3: DATA LAYER                               │
│                           BranchesGrid                                     │
├───────────────────────────────────────────────────────────────────────────┤
│  Props:                                                                    │
│    • workspaceId?: string                                                  │
│    • initialData?: Data                                                    │
│    • defaultParams?: { page, perPage }                                     │
│    • queryKey?: string                                                     │
│    • enableAdd?: boolean                                                   │
│    • showTitle?: boolean                                                   │
│                                                                            │
│  Responsibilities:                                                         │
│    ✓ API calls (BranchApi.list)                                           │
│    ✓ React Query state management                                         │
│    ✓ Loading spinner                                                      │
│    ✓ Query caching                                                        │
│    ✓ Pagination state (page)                                              │
│    ✓ Refetch after create                                                 │
│                                                                            │
│  Outputs: { branches[], page, totalPages, onChange, onAddSuccess }        │
└───────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ passes
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         LAYER 2: LOGIC LAYER                               │
│                    BranchesGridWithControls                                │
├───────────────────────────────────────────────────────────────────────────┤
│  Props:                                                                    │
│    • branches: BE_Branch[]                                                 │
│    • pagination?: { page, totalPages, onChange }                           │
│    • enableAdd?: boolean                                                   │
│    • onAddSuccess?: () => void                                             │
│    • showTitle?: boolean                                                   │
│                                                                            │
│  Responsibilities:                                                         │
│    ✓ Conditional header rendering                                         │
│    ✓ Title display                                                        │
│    ✓ Create button + callbacks                                            │
│    ✓ Pagination controls                                                  │
│    ✓ Layout composition                                                   │
│                                                                            │
│  Outputs: { branches[] } → to UI Layer                                    │
└───────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ passes
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                          LAYER 1: UI LAYER                                 │
│                         BranchesGridUI                                     │
├───────────────────────────────────────────────────────────────────────────┤
│  Props:                                                                    │
│    • branches: BE_Branch[]                                                 │
│                                                                            │
│  Responsibilities:                                                         │
│    ✓ Grid layout (responsive)                                             │
│    ✓ Empty state message                                                  │
│    ✓ Map branches → BranchCards                                           │
│    ✓ Pure presentation (NO logic)                                         │
│                                                                            │
│  Output: Rendered Grid                                                    │
└───────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ renders
                                    ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         VISUAL OUTPUT                                      │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─────────────────────────────────────────────────────────────┐         │
│  │  Branches                                       [+ Add Branch]│         │
│  └─────────────────────────────────────────────────────────────┘         │
│                                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                       │
│  │   Branch 1  │  │   Branch 2  │  │   Branch 3  │                       │
│  │   [Logo]    │  │   [Logo]    │  │   [Logo]    │                       │
│  │   Location  │  │   Location  │  │   Location  │                       │
│  │   Phone     │  │   Phone     │  │   Phone     │                       │
│  └─────────────┘  └─────────────┘  └─────────────┘                       │
│                                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                       │
│  │   Branch 4  │  │   Branch 5  │  │   Branch 6  │                       │
│  └─────────────┘  └─────────────┘  └─────────────┘                       │
│                                                                            │
│              [1] [2] [3] [4] [5] → Next                                    │
│                                                                            │
└───────────────────────────────────────────────────────────────────────────┘


╔═══════════════════════════════════════════════════════════════════════════╗
║                        COMPONENT COMPOSITION                               ║
╚═══════════════════════════════════════════════════════════════════════════╝

BranchesGrid (Layer 3)
  │
  ├─ useQuery() ────────► API: BranchApi.list()
  │   ├─ Loading ────────► <CircularProgress />
  │   └─ Success ────────► data
  │
  └─ <BranchesGridWithControls>  (Layer 2)
      │
      ├─ Header
      │   ├─ Title: "Branches"
      │   └─ <CreateBranchButton />
      │
      ├─ <BranchesGridUI>  (Layer 1)
      │   │
      │   └─ <Grid>
      │       ├─ <BranchCard /> × N
      │       ├─ <BranchCard />
      │       └─ <BranchCard />
      │
      └─ Footer
          └─ <CenteredPagination />


╔═══════════════════════════════════════════════════════════════════════════╗
║                           DATA FLOW                                        ║
╚═══════════════════════════════════════════════════════════════════════════╝

                 User Action (e.g., page change)
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │  Layer 3: BranchesGrid               │
        │  • Calls API                         │
        │  • Updates React Query cache         │
        │  • Shows loading                     │
        │  • Receives data                     │
        └──────────────────┬───────────────────┘
                           │ branches[], pagination
                           ▼
        ┌──────────────────────────────────────┐
        │  Layer 2: BranchesGridWithControls   │
        │  • Receives clean data               │
        │  • Renders header if needed          │
        │  • Renders pagination if needed      │
        │  • Handles button clicks             │
        └──────────────────┬───────────────────┘
                           │ branches[]
                           ▼
        ┌──────────────────────────────────────┐
        │  Layer 1: BranchesGridUI             │
        │  • Maps branches to cards            │
        │  • Renders grid                      │
        │  • Shows empty state                 │
        └──────────────────┬───────────────────┘
                           │
                           ▼
                    Rendered Output


╔═══════════════════════════════════════════════════════════════════════════╗
║                    FLEXIBILITY & REUSABILITY                               ║
╚═══════════════════════════════════════════════════════════════════════════╝

Use Full Stack (All 3 Layers):
┌─────────────────────────────────────────┐
│ <BranchesGrid                           │
│   workspaceId={id}                      │
│   enableAdd={true}                      │
│   showTitle={true}                      │
│ />                                      │
│                                         │
│ ✓ Handles everything automatically     │
└─────────────────────────────────────────┘

Use Logic + UI (Skip Data Layer):
┌─────────────────────────────────────────┐
│ const { data, page, onChange } =        │
│   useCustomDataSource();                │
│                                         │
│ <BranchesGridWithControls               │
│   branches={data}                       │
│   pagination={{ page, onChange }}       │
│   enableAdd={false}                     │
│ />                                      │
│                                         │
│ ✓ Use your own data source              │
└─────────────────────────────────────────┘

Use Only UI (Skip Logic & Data):
┌─────────────────────────────────────────┐
│ <BranchesGridUI                         │
│   branches={staticData}                 │
│ />                                      │
│                                         │
│ ✓ Pure display, no controls             │
└─────────────────────────────────────────┘


╔═══════════════════════════════════════════════════════════════════════════╗
║                         COMPARISON                                         ║
╚═══════════════════════════════════════════════════════════════════════════╝

┌─────────────────────┬──────────────────┬──────────────────┬──────────────┐
│ Component           │ Has Data Fetch?  │ Has Logic?       │ Has UI?      │
├─────────────────────┼──────────────────┼──────────────────┼──────────────┤
│ BranchesGrid        │       ✓          │        ✓         │      ✓       │
│ (Layer 3)           │                  │                  │              │
├─────────────────────┼──────────────────┼──────────────────┼──────────────┤
│ WithControls        │       ✗          │        ✓         │      ✓       │
│ (Layer 2)           │                  │                  │              │
├─────────────────────┼──────────────────┼──────────────────┼──────────────┤
│ GridUI              │       ✗          │        ✗         │      ✓       │
│ (Layer 1)           │                  │                  │              │
└─────────────────────┴──────────────────┴──────────────────┴──────────────┘
```
