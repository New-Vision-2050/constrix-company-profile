// Generic page component interfaces for Next.js App Router

/**
 * Generic page props interface for pages with dynamic parameters
 * @example
 * ```tsx
 * // For a page with single id parameter
 * function MyPage({ params }: PageWithParams<{ id: string }>) {
 *   const { id } = await params;
 *   return <div>ID: {id}</div>;
 * }
 * 
 * // For a page with multiple parameters
 * function MyPage({ params }: PageWithParams<{ id: string; slug: string }>) {
 *   const { id, slug } = await params;
 *   return <div>ID: {id}, Slug: {slug}</div>;
 * }
 * ```
 */
export interface PageWithParams<T = Record<string, string>> {
  params: Promise<T>;
}

/**
 * Generic page props interface for pages with dynamic parameters and search params
 * @example
 * ```tsx
 * function MyPage({ params, searchParams }: PageWithParamsAndSearch<{ id: string }>) {
 *   const { id } = await params;
 *   const search = await searchParams;
 *   return <div>ID: {id}, Search: {JSON.stringify(search)}</div>;
 * }
 * ```
 */
export interface PageWithParamsAndSearch<T = Record<string, string>> {
  params: Promise<T>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Layout component props interface
 * @example
 * ```tsx
 * function MyLayout({ children, params }: LayoutWithParams<{ locale: string }>) {
 *   const { locale } = await params;
 *   return <div lang={locale}>{children}</div>;
 * }
 * ```
 */
export interface LayoutWithParams<T = Record<string, string>> {
  children: React.ReactNode;
  params: Promise<T>;
}

// Commonly used parameter types
export type IdParam = { id: string };
export type SlugParam = { slug: string };
export type LocaleParam = { locale: string };
export type IdWithLocaleParam = { id: string; locale: string };
export type SlugWithLocaleParam = { slug: string; locale: string };
