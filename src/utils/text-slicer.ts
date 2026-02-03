interface TextSlicerOptions {
  /**
   * Offset tolerance - if string length is within limit + offset, don't slice
   * @default 3
   */
  offset?: number;
  /**
   * If true, can break words. If false, only breaks at spaces
   * @default false
   */
  breakWord?: boolean;
}

interface TextSlicerResult {
  /**
   * The sliced text (without ellipsis)
   */
  sliced: string;
  /**
   * Whether the text was actually sliced
   */
  isSliced: boolean;
  /**
   * The original unmodified string
   */
  original: string;
  /**
   * Display text with ellipsis if sliced
   */
  showText: string;
}

/**
 * Slices text intelligently between words within a specified range
 * 
 * @param text - The text to slice
 * @param limit - Maximum character limit
 * @param options - Optional configuration
 * @returns Object containing sliced text, original, and metadata
 * 
 * @example
 * ```ts
 * const result = sliceText("Hello world this is a long text", 15);
 * // { sliced: "Hello world", isSliced: true, original: "...", showText: "Hello world..." }
 * 
 * const result2 = sliceText("Hello world this is a long text", 15, { breakWord: true });
 * // { sliced: "Hello world thi", isSliced: true, original: "...", showText: "Hello world thi..." }
 * ```
 */
export function sliceText(
  text: string,
  limit: number,
  options: TextSlicerOptions = {}
): TextSlicerResult {
  const { offset = 3, breakWord = false } = options;

  // If text is within limit + offset, don't slice
  if (text.length <= limit + offset) {
    return {
      sliced: text,
      isSliced: false,
      original: text,
      showText: text,
    };
  }

  let sliced: string;

  if (breakWord) {
    // Break at exact limit (ignore offset when breakWord is true)
    sliced = text.substring(0, limit);
  } else {
    // Find the last space before or at the limit
    const textUpToLimit = text.substring(0, limit);
    const lastSpaceIndex = textUpToLimit.lastIndexOf(" ");

    if (lastSpaceIndex === -1) {
      // No space found, break at limit
      sliced = textUpToLimit;
    } else {
      // Break at last space
      sliced = text.substring(0, lastSpaceIndex);
    }
  }

  return {
    sliced: sliced.trim(),
    isSliced: true,
    original: text,
    showText: sliced.trim() + "...",
  };
}
