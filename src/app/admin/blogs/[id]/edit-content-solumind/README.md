# SolumindEditor Integration for Blog Content Editing

This document explains how the SolumindEditor has been integrated into the blog content editing workflow.

## Overview

The project now provides two different visual editors for blog content:

1. **GrapesJSEditor** (original editor)
   - Path: `/admin/blogs/[id]/edit-content`
   - Outputs: `{ html, css }`

2. **SolumindEditor** (new editor)
   - Path: `/admin/blogs/[id]/edit-content-solumind`
   - Outputs: `{ html, css, js }`

Both editors can be used interchangeably, with navigation buttons to switch between them.

## Technical Implementation

### Database Schema

The `content` field in the `Blog` model is a JSON object that now supports three fields:
- `html`: HTML content
- `css`: CSS styling
- `js`: JavaScript code (new with SolumindEditor)

### Type Definitions

The `Blog` type has been updated to include the optional `js` field in the content property:

```typescript
export interface Blog {
  // ...other fields
  content?: { html?: string; css?: string; js?: string };
  // ...other fields
}
```

### Components

1. **SolumindEditor** (`@/lib/solumindEditorJs/react/SolumindEditor`)
   - React component that wraps the SolumindEditor library
   - Props: `value`, `onChange`, `height`, `config`

2. **BlogContentPreview** (`@/components/BlogContentPreview`)
   - Renders blog content with HTML, CSS, and JavaScript support
   - Used on the client-facing blog view

### Migration

A migration script has been created to add the `js` field to existing blog content entries:
- Location: `prisma/migrations/20250506000000_add_js_to_blog_content/migration.sql`

## Usage

1. Navigate to the blog edit page (`/admin/blogs/[id]`)
2. Click "Nouvel éditeur Solumind" to use the SolumindEditor
3. Edit content with HTML, CSS, and JavaScript capabilities
4. Save changes

## Compatibility

The changes maintain backward compatibility with the existing GrapesJSEditor. When using the GrapesJSEditor, the `js` field will be preserved but not editable.

## API Endpoints

The existing content API endpoint at `/admin/api/blogs/[id]/content` has been updated to handle the new content structure including JavaScript.
