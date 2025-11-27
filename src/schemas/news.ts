import { z } from "zod";

// Schema for highlight result items
const HighlightResultSchema = z.object({
  matchLevel: z.enum(["none", "partial", "full"]),
  matchedWords: z.array(z.string()),
  value: z.string(),
  fullyHighlighted: z.boolean().optional(),
});

// Schema for the _highlightResult object
const HighlightResultsSchema = z.object({
  author: HighlightResultSchema.optional(),
  title: HighlightResultSchema.optional(),
  url: HighlightResultSchema.optional(),
  story_text: HighlightResultSchema.optional(),
  comment_text: HighlightResultSchema.optional(),
});

export const DocumentSchema = z.object({
  author: z.string().nullable(),
  children: z.array(z.number()).optional(),
  comment_text: z.string().optional(),
  created_at: z.iso.datetime(),
  created_at_i: z.number(),
  num_comments: z.number(),
  objectID: z.string(),
  parent_id: z.number().optional(),
  points: z.number().nullable(),
  story_id: z.number().optional(),
  story_text: z.string().optional(),
  story_title: z.string().optional(),
  story_url: z.url().optional(),
  title: z.string().nullable(),
  updated_at: z.iso.datetime().optional(),
  url: z.url().optional(),
});

// Schema for the main document/hit
const HitSchema = DocumentSchema.extend({
  _highlightResult: HighlightResultsSchema.optional(),
  _tags: z.array(z.string()),
});

// Schema for the complete API response
export const HNApiResponseSchema = z.object({
  hits: z.array(HitSchema),
  nbHits: z.number(),
  page: z.number(),
  nbPages: z.number(),
  hitsPerPage: z.number(),
  processingTimeMS: z.number(),
  query: z.string(),
  params: z.string(),
});

export type HNApiResponse = z.infer<typeof HNApiResponseSchema>;
