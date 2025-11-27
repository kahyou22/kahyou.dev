import { getAllPostSlugs, getPostBySlug } from "@/lib/post";
import { formatPostDate } from "@/lib/utils";
import { Metadata } from "next";
import "@/styles/markdown.css";
import styles from "./page.module.css";

import { Tags } from "lucide-react";

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
    <div className={`${styles.post}`}>
      <div className="header">
        <h1>{post.title}</h1>
        <div className="list div">
          <span>정문주</span>
          <time dateTime={post.date.toISOString()}>
            {formatPostDate(post.date)}
          </time>
        </div>
        <ul className="list">
          <li>
            <Tags />
          </li>
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <article className="md-body">
        <Content />
      </article>
    </div>
  );
}

export const dynamicParams = false;
