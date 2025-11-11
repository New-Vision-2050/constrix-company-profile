"use client";
import { _posts } from "@/_mock";
import { BlogView } from "@/sections/blog/view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <BlogView posts={_posts} />
    </>
  );
}
