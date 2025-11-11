import { z } from "zod";
import { UseFormSetError, FieldValues, Path } from "react-hook-form";
import { isAxiosError } from "axios";

// Define the Zod schema for validation error structure
const validationErrorSchema = z.object({
  errors: z.array(
    z.object({
      code: z.string(),
      expected: z.string().optional(),
      received: z.string().optional(),
      path: z.array(z.union([z.string(), z.number()])),
      message: z.string(),
    })
  ),
});

export const ensureValidation = (
  error: unknown
): Record<string, string[] | undefined> | null => {
  try {
    // Validate the error object structure using Zod
    const validatedError = validationErrorSchema.parse(error);

    // Transform the errors array to the desired format
    const transformedErrors: Record<string, string[]> = {};

    validatedError.errors.forEach((err) => {
      // Get the field name from the path array (use the first element as the field name)
      const fieldName = err.path[0]?.toString();

      if (fieldName) {
        // If the field already exists, append the message to the array
        if (transformedErrors[fieldName]) {
          transformedErrors[fieldName].push(err.message);
        } else {
          // Otherwise, create a new array with the message
          transformedErrors[fieldName] = [err.message];
        }
      }
    });

    return transformedErrors;
  } catch (zodError) {
    // If validation fails, return null or handle the error as needed
    console.warn("Invalid error object structure:", zodError);
    return null;
  }
};

/**
 * Helper function to handle validation errors and set them using react-hook-form's setError
 * Internally checks if the error is an Axios error and extracts response data
 * @param error - The error object (can be any error, Axios error will be handled internally)
 * @param setError - The setError function from useForm hook
 */
export const handleValidationErrors = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
): boolean => {
  // Extract the error data - handle Axios errors internally
  let errorData: unknown;

  if (isAxiosError(error)) {
    errorData = error.response?.data;
  } else {
    errorData = error;
  }

  const validationErrors = ensureValidation(errorData);

  if (!validationErrors) {
    return false;
  }

  Object.entries(validationErrors).forEach(([fieldName, messages]) => {
    if (messages && messages.length > 0) {
      setError(fieldName as Path<T>, {
        message: messages.join(", "),
      });
    }
  });

  return true;
};
