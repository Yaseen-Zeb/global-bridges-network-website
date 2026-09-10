/**
 * Sanity Image URL Builder
 *
 * Use urlFor() when you need fine-grained control over image dimensions,
 * quality, or format beyond what the GROQ projection provides.
 *
 * Basic usage:
 *   import { urlFor } from "@/lib/sanity/image";
 *   <img src={urlFor(item.image).width(400).height(300).url()} />
 *
 * Install the peer dependency if not already present:
 *   npm install @sanity/image-url --save (in the frontend folder)
 */

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
