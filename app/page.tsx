import Intro from './intro.mdx';


export default async function IndexPage() {
  return (
    <main className="prose dark:prose-invert lg:prose-xl max-w-none py-12">
      <Intro />
    </main>
  );
}
