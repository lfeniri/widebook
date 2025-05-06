-- Description: Add JS field to blog content if missing

-- Run this script to add js field to all blog content entries that don't have it
UPDATE "Blog"
SET "content" = JSONB_SET(
  "content", 
  '{js}', 
  '""'::jsonb, 
  true
)
WHERE 
  "content" IS NOT NULL 
  AND NOT ("content" ? 'js');
