import { getAllPostSlugs, getPostBySlug } from "@/lib/post";
import { formatPostDate } from "@/lib/utils";

export function generateStaticParams() {
  const posts: string[] = getAllPostSlugs();

  const slugs = posts.map((slug) => ({ slug }));

  return slugs;
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const Content = post.Content;
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{formatPostDate(post.date)}</div>
      <div>{post.slug}</div>
      <article>
        <Content />
      </article>
    </div>
  );
}

export const dynamicParams = false;
