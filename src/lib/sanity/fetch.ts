import type { QueryParams } from "next-sanity";
import { client } from "./client";

/** How often (seconds) a page re-checks Sanity, so CMS edits go live without a rebuild. */
export const REVALIDATE_SECONDS = 60;

/** Server-side Sanity fetch with incremental revalidation. */
export function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate: REVALIDATE_SECONDS } });
}
