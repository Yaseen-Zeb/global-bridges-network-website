/** One numbered section of a legal page, rendered in this order: paragraphs, intro, bullets, outro. */
export interface PolicySection {
  title: string;
  paragraphs?: string[];
  intro?: string;
  bullets?: string[];
  outro?: string;
}
