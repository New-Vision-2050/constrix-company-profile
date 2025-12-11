# State Components

Beautiful, reusable state components for displaying error and empty states throughout your application.

## Components

### ErrorState

Displays error messages with optional retry functionality. Perfect for showing when data fetching fails or when an error occurs.

**Features:**
- Beautiful default illustration
- Customizable title and subtitle
- Optional retry button with callback
- Support for custom actions
- Custom image support
- Responsive design
- Smooth animations and shadows

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | `"Something went wrong"` | Main title shown in the error state |
| `subtitle` | `React.ReactNode` | `"We encountered an error..."` | Secondary text shown below the title |
| `actions` | `React.ReactNode` | `undefined` | Optional action nodes (buttons, links) |
| `image` | `string` | `"/assets/illustrations/illustration-404.svg"` | Optional custom image URL |
| `showRetry` | `boolean` | `true` | Show/hide the retry button |
| `onRetry` | `() => void` | `undefined` | Callback function when retry is clicked |
| `sx` | `SxProps<Theme>` | `{}` | MUI sx prop for custom styling |

**Example Usage:**

```tsx
import { ErrorState } from "@/components/shared/states";

// Basic usage
<ErrorState />

// With retry functionality
<ErrorState
  title="Failed to load projects"
  subtitle="Unable to fetch projects from the server."
  onRetry={() => refetch()}
/>

// Custom error with actions
<ErrorState
  title="Access Denied"
  subtitle="You don't have permission to view this content."
  showRetry={false}
  actions={
    <Button variant="outlined" onClick={() => router.push('/')}>
      Go Home
    </Button>
  }
/>
```

---

### NoDataState

Displays empty state messages when no data is available. Perfect for empty lists, search results, or initial states.

**Features:**
- Elegant default illustration
- Customizable title and subtitle
- Support for custom actions (e.g., "Create New" button)
- Custom image support
- Responsive design
- Subtle animations

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | `"No data available"` | Main title shown in the no data state |
| `subtitle` | `React.ReactNode` | `"There is no data to display..."` | Secondary text shown below the title |
| `actions` | `React.ReactNode` | `undefined` | Optional action nodes (buttons, links) |
| `image` | `string` | `"/assets/illustrations/not-found.webp"` | Optional custom image URL |
| `sx` | `SxProps<Theme>` | `{}` | MUI sx prop for custom styling |

**Example Usage:**

```tsx
import { NoDataState } from "@/components/shared/states";
import { Iconify } from "@/components/iconify";

// Basic usage
<NoDataState />

// Empty list with create action
<NoDataState
  title="No projects found"
  subtitle="Start by creating your first project to see it here."
  actions={
    <Button
      variant="contained"
      startIcon={<Iconify icon="mingcute:add-line" />}
      onClick={() => handleCreate()}
    >
      Create Project
    </Button>
  }
/>

// Search/filter results
<NoDataState
  title="No results found"
  subtitle="We couldn't find any projects matching your search criteria."
  actions={
    <Button variant="soft" onClick={() => clearFilters()}>
      Clear Filters
    </Button>
  }
/>
```

---

## Design Philosophy

These components follow modern UX best practices:

1. **Clear Communication**: Tell users exactly what happened and why
2. **Actionable**: Provide clear next steps (retry, go back, create new)
3. **Visually Appealing**: Use beautiful illustrations and animations
4. **Consistent**: Maintain design consistency across your app
5. **Accessible**: Proper semantic HTML and ARIA attributes

## Integration Example

Here's how to integrate these components into a typical data-fetching component:

```tsx
import { ErrorState, NoDataState } from "@/components/shared/states";
import { GridCardsSkeleton } from "@/components/ui/interactions";

export default function ProjectsGrid({ projects, isLoading, isError, refetch }) {
  // Loading state
  if (isLoading) {
    return <GridCardsSkeleton items={8} size={{ xs: 12, sm: 6 }} />
  }

  // Error state
  if (isError) {
    return (
      <ErrorState 
        title="Failed to load projects"
        subtitle="We encountered an error while loading the projects."
        onRetry={refetch}
      />
    );
  }

  // Empty state
  if (!projects || projects.length === 0) {
    return (
      <NoDataState 
        title="No projects found"
        subtitle="There are no projects available at the moment."
      />
    );
  }

  // Success state - render data
  return (
    <Grid container spacing={6}>
      {projects.map((project) => (
        <Grid key={project.id} size={{ xs: 12, sm: 6 }}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
}
```

## Customization

Both components support custom styling via the `sx` prop:

```tsx
<ErrorState
  title="Custom Error"
  sx={{
    minHeight: 600,
    backgroundColor: 'background.paper',
    borderRadius: 2,
  }}
/>
```

You can also provide custom images to match your brand:

```tsx
<NoDataState
  image="/custom/empty-state.svg"
  title="No items yet"
/>
```

## Best Practices

1. **Be Specific**: Provide context-specific titles and subtitles
2. **Offer Solutions**: Always provide actionable next steps
3. **Stay Positive**: Use encouraging language in empty states
4. **Be Honest**: Clearly communicate errors without being alarming
5. **Test Edge Cases**: Ensure states work well with long text or small screens

