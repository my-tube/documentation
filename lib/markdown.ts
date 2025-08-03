import fs from 'fs';
import path from 'path';

import { h } from 'hastscript';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeFormat from 'rehype-format';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const CONTENT_PATH = path.join(process.cwd(), 'markdown');

const AUTOLINK_CONTENT = h(
  'svg',
  {
    width: 16,
    height: 16,
    fill: 'currentColor',
    viewBox: '0 0 16 16',
  },
  h('path', {
    d: 'm7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z'
  })
)

export async function loadMarkdown(fileName:string) {
  const fullPath = path.join(CONTENT_PATH, fileName);
  const markdown = fs.readFileSync(fullPath, 'utf8');

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      content: AUTOLINK_CONTENT,
    })
    .use(rehypeExternalLinks, {
      rel: 'noopener',
      target: '_blank',
    })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
