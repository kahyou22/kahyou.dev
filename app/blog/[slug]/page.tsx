import { getAllPostSlugs, getPostBySlug } from "@/lib/post";
import { formatPostDate } from "@/lib/utils";
import { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없음",
    };
  }

  return {
    title: post.title,
    description: post.description || post.title,
  };
}

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
