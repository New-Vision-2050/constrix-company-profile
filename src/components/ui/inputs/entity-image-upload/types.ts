export interface EntityImageUploadProps {
  /** The current file value */
  value?: File | null;

  /** Callback function called when file changes */
  onChange?: (file: File | null) => void;

  /** Whether the field has an error */
  error?: boolean;

  /** Helper text to display below the component */
  helperText?: string;

  /** Whether the component is disabled */
  disabled?: boolean;

  /** Size of the upload area in pixels */
  size?: number;

  /** Accepted file MIME types */
  acceptedTypes?: string[];

  /** Maximum file size in MB */
  maxSize?: number;

  /** Placeholder text displayed in upload area */
  placeholder?: string;

  /** Title text displayed above the component */
  title?: string;
}

export interface ImageUploadValidationError {
  type: "FILE_TYPE" | "FILE_SIZE" | "UNKNOWN";
  message: string;
}
