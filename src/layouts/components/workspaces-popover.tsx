"use client";
import type { ButtonBaseProps } from "@mui/material/ButtonBase";

import { useState, useCallback } from "react";
import { varAlpha } from "minimal-shared/utils";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import MenuList from "@mui/material/MenuList";
import ButtonBase from "@mui/material/ButtonBase";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { Label } from "@/components/label";
import { Iconify } from "@/components/iconify";
import { WorkspaceApi } from "@/services/api/base/workspace";
import { useWorkspace } from "@/lib/workspace/client";

// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = ButtonBaseProps;

export function WorkspacesPopover({ sx, ...other }: WorkspacesPopoverProps) {
  const {
    currentWorkspace,
    switchWorkspace,
    isLoading: isWorkspaceSwitching,
  } = useWorkspace();

  console.log("currentWorkspace: ", currentWorkspace);

  const { data: workspaces = [], isLoading } = useQuery({
    queryKey: ["workspaces", "mine"],
    queryFn: () => WorkspaceApi.listMine(),
    select: (response) => response.data.list, // Extract the list from pagination response
  });

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleChangeWorkspace = useCallback(
    async (workspaceId: string) => {
      handleClosePopover();
      await switchWorkspace(workspaceId);
    },
    [handleClosePopover, switchWorkspace]
  );

  const renderAvatar = (alt: string, src: string) => (
    <Box
      component="img"
      alt={alt}
      src={src}
      sx={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }}
    />
  );

  const renderLabel = (plan?: string) => {
    if (!plan) return null;
    return <Label color={plan === "Free" ? "default" : "info"}>{plan}</Label>;
  };

  // Loading state
  if (isLoading) {
    return (
      <ButtonBase
        disabled
        sx={{
          pl: 2,
          py: 3,
          gap: 1.5,
          pr: 1.5,
          width: 1,
          borderRadius: 1.5,
          textAlign: "left",
          justifyContent: "center",
          bgcolor: (theme) =>
            varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
          ...sx,
        }}
        {...other}
      >
        <CircularProgress size={16} />
        <Typography variant="body2">Loading workspaces...</Typography>
      </ButtonBase>
    );
  }

  return (
    <>
      <ButtonBase
        disableRipple
        onClick={handleOpenPopover}
        sx={{
          pl: 2,
          py: 3,
          gap: 1.5,
          pr: 1.5,
          width: 1,
          borderRadius: 1.5,
          textAlign: "left",
          justifyContent: "flex-start",
          bgcolor: (theme) =>
            varAlpha(theme.vars.palette.grey["500Channel"], 0.08),
          ...sx,
        }}
        {...other}
      >
        {renderAvatar(
          currentWorkspace?.name || "Workspace",
          currentWorkspace?.logo?.original_url || "/assets/logos/base.png"
        )}

        <Box
          sx={{
            gap: 1,
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            typography: "body2",
            fontWeight: "fontWeightSemiBold",
          }}
        >
          {currentWorkspace?.name || "Select workspace"}
          {renderLabel()}
        </Box>

        <Iconify
          width={16}
          icon="carbon:chevron-sort"
          sx={{ color: "text.disabled" }}
        />
      </ButtonBase>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 260,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              p: 1.5,
              gap: 1.5,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: "action.selected",
                fontWeight: "fontWeightSemiBold",
              },
            },
          }}
        >
          {workspaces.length === 0 ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                No workspaces available
              </Typography>
            </Box>
          ) : (
            workspaces.map((option) => (
              <MenuItem
                key={option.id}
                selected={option.id === currentWorkspace?.id}
                onClick={() => handleChangeWorkspace(option.id)}
                disabled={isWorkspaceSwitching}
              >
                {renderAvatar(
                  option.name,
                  option.logo?.original_url || "/assets/logos/base.png"
                )}

                <Box component="span" sx={{ flexGrow: 1 }}>
                  {option.name}
                </Box>

                {renderLabel()}
              </MenuItem>
            ))
          )}
        </MenuList>
      </Popover>
    </>
  );
}
