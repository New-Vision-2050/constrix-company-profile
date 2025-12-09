"use client";

import { useBE_Theme } from "@/lib/theme/client/theme-provider";

function ThemePage() {
  const { data: theme } = useBE_Theme();
  return (
    <div>
      <h1>Theme</h1>
      <pre>{JSON.stringify(theme, null, 2)}</pre>
    </div>
  );
}

export default ThemePage;
