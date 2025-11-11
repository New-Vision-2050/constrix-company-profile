"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  Alert,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Iconify } from "@/components/iconify";
import type { EntityImageUploadProps } from "./types";
import { useTranslations } from "next-intl";

// ----------------------------------------------------------------------

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadBox = styled(Box)(({ theme }) => ({
  width: 144,
  height: 144,
  borderRadius: "50%",
  border: `2px dashed ${theme.palette.grey[300]}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  position: "relative",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
  "&.drag-active": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main + "10",
  },
}));

const DEFAULT_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const DEFAULT_MAX_SIZE = 5; // 5MB

function EntityImageUpload({
  value,
  onChange,
  error = false,
  helperText,
  disabled = false,
  size = 144,
  acceptedTypes = DEFAULT_ACCEPTED_TYPES,
  maxSize = DEFAULT_MAX_SIZE,
  placeholder = "Upload Image",
  title,
}: EntityImageUploadProps) {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Generate preview URL when value changes
  React.useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file type
      if (!acceptedTypes.includes(file.type)) {
        return `Invalid file type. Accepted types: ${acceptedTypes.join(", ")}`;
      }

      // Check file size
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxSize) {
        return `File size too large. Maximum size: ${maxSize}MB`;
      }

      return null;
    },
    [acceptedTypes, maxSize]
  );

  const handleFileSelect = useCallback(
    (file: File) => {
      const validationError = validateFile(file);

      if (validationError) {
        setUploadError(validationError);
        return;
      }

      setUploadError(null);
      onChange?.(file);
    },
    [validateFile, onChange]
  );

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
      // Reset input value to allow same file selection
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFileSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [disabled, handleFileSelect]
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setUploadError(null);
      onChange?.(null);
    },
    [onChange]
  );

  const boxStyle = {
    width: size,
    height: size,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  const t = useTranslations("form");

  return (
    <Stack spacing={2} alignItems="center">
      {title && (
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
      )}
      <UploadBox
        sx={boxStyle}
        className={dragActive ? "drag-active" : ""}
        onClick={handleClick}
        onDrag={handleDrag}
        onDragStart={handleDrag}
        onDragEnd={handleDrag}
        onDragOver={handleDrag}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
      >
        {preview ? (
          <>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <Avatar
                src={preview}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: error
                    ? `2px solid ${theme.palette.error.main}`
                    : "none",
                }}
              />
              {!disabled && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    ".MuiBox-root:hover &": {
                      opacity: 1,
                    },
                  }}
                >
                  <Iconify icon="solar:pen-bold" width={20} />
                </Box>
              )}
            </Box>
            {!disabled && (
              <IconButton
                size="small"
                onClick={handleRemove}
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  width: 28,
                  height: 28,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                  },
                  zIndex: 2,
                }}
              >
                <Iconify icon="mingcute:close-line" width={14} />
              </IconButton>
            )}
          </>
        ) : (
          <Stack alignItems="center" spacing={1}>
            <Iconify
              icon="solar:eye-bold"
              width={32}
              sx={{
                color: error ? "error.main" : "text.secondary",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: error ? "error.main" : "text.secondary",
                textAlign: "center",
                maxWidth: 100,
              }}
            >
              {t("uploadImage") || placeholder}
            </Typography>
          </Stack>
        )}

        <VisuallyHiddenInput
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleFileInputChange}
          disabled={disabled}
        />
      </UploadBox>

      {!disabled && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleClick}
        >
          {t("chooseFile")}
        </Button>
      )}

      {(uploadError || helperText) && (
        <Alert
          severity={uploadError ? "error" : error ? "error" : "info"}
          sx={{ width: "100%", maxWidth: 300 }}
        >
          {uploadError || helperText}
        </Alert>
      )}

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textAlign: "center", maxWidth: 300 }}
      >
        {t("supportedFormats", {
          formats: acceptedTypes
            .map((type) => type.split("/")[1])
            .join(", ")
            .toUpperCase(),
        })}
        <br />
        {t("maxSize", { size: maxSize })}
      </Typography>
    </Stack>
  );
}

export default EntityImageUpload;
export type { EntityImageUploadProps } from "./types";
