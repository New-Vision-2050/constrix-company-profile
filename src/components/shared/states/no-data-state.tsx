import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";

export interface NoDataStateProps {
  /** Main title shown in the no data state */
  title?: React.ReactNode;
  /** Secondary text/subtitle shown below the title */
  subtitle?: React.ReactNode;
  /** Optional action nodes (buttons, links) rendered below the subtitle */
  actions?: React.ReactNode;
  /** Optional image url. If omitted, a default illustration will be used */
  image?: string;
  /** sx for the root wrapper */
  sx?: SxProps<Theme>;
}

const DEFAULT_IMAGE = "/assets/illustrations/not-found.webp";

/**
 * No data state component with beautiful design.
 *
 * Displays empty state messages when no data is available.
 */
export const NoDataState: React.FC<NoDataStateProps> = ({
  title = "No data available",
  subtitle = "There is no data to display here at the moment.",
  actions,
  image,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: { xs: 8, md: 12 },
        px: 2,
        minHeight: 400,
        ...((sx as any) || {}),
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image || DEFAULT_IMAGE}
        alt="no data"
        sx={{
          width: 320,
          maxWidth: "80%",
          height: "auto",
          mb: 4,
          pointerEvents: "none",
          userSelect: "none",
          opacity: 0.9,
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.08))",
        }}
      />

      {/* Content */}
      <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
        {title && (
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 480,
              lineHeight: 1.8,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Actions */}
        {actions && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 3 }}
          >
            {actions}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default NoDataState;

/*
Usage examples:

// Basic no data state
<NoDataState />

// Custom no data state with action
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

// No data state with custom image
<NoDataState
  image="/assets/illustrations/empty-content.svg"
  title="No results found"
  subtitle="Try adjusting your search or filter criteria."
/>

// No data for filters/search
<NoDataState
  title="No results found"
  subtitle="We couldn't find any projects matching your search criteria. Try different keywords or filters."
  actions={
    <Button variant="soft" onClick={() => clearFilters()}>
      Clear Filters
    </Button>
  }
/>

// Simple empty state
<NoDataState
  title="Your inbox is empty"
  subtitle="You don't have any messages yet."
/>
*/

