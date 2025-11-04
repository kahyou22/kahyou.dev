import { readFileSync } from "fs";
import { sync } from "glob";
import matter from "gray-matter";

export interface PostMeta {
  title: string;
  description?: string;
  date: Date;
  slug: string;
}

export function getAllPostSlugs(): string[] {
  const posts = sync("**/*.mdx", { cwd: "contents" });

  return posts.map((post) => {
    const slug = post.replace(/\.mdx$/, "");
    return slug;
  });
}

export function getPostMetaBySlug(slug: string): PostMeta {
  const path = `./contents/${slug}.mdx`;
  const fileContent = readFileSync(path, "utf-8");

  const { data } = matter(fileContent);

  return {
    title: data.title,
    date: data.date,
    slug: slug,
  };
}

export function getAllPostMetas(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const metas = slugs.map((slug) => getPostMetaBySlug(slug));

  metas.sort((a, b) => (a.date < b.date ? 1 : -1));

  return metas;
}
