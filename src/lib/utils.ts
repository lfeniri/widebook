import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export async function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.replace('Bearer ', '');
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}
export function cn(...inputs: (string | undefined | false | null)[]) {
  return inputs.filter(Boolean).join(" ");
}
export function convertContentConfigToHTML(contentConfig: any): string {
  if (!contentConfig || !Array.isArray(contentConfig)) return "";

  return contentConfig
    .map((block: any) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${block.content}</p>`;
        case "heading":
          return `<h${block.level}>${block.content}</h${block.level}>`;
        case "image":
          return `<img src="${block.src}" alt="${block.alt}" />`;
        default:
          return "";
      }
    })
    .join("");
}
import { BlogContentBlock } from '@/types/blog';
import { BlogGrid } from '../../visual-blog-builder-lib/types/blogBuilderTypes';

export function convertContentConfigToGrid(contentConfig: BlogContentBlock[]): BlogGrid {
  return {
    rows: [
      {
        id: 'row_1',
        columns: [
          {
            id: 'col_1',
            components: contentConfig as any,
          },
        ],
      },
    ],
  };
}