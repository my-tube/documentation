import { cn } from '@/lib/utils';

import { loadMarkdown } from '@/lib/markdown';

import StructuredDocument from '@/components/StructuredDocument';

export default async function IndexPage() {
  const html = await loadMarkdown('intro.md');

  return (
    <main className="prose dark:prose-invert lg:prose-xl max-w-none">
      <StructuredDocument html={html} />
    </main>
  );
}
