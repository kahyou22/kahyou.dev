import { getAllPostMetas, PostMeta } from "@/lib/post";
import { formatPostDate } from "@/lib/utils";

import Link from "next/link";

export default function BlogContent() {
  const posts: PostMeta[] = getAllPostMetas();
  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={"blog/" + post.slug}>
              <div>{post.title}</div>
              <time dateTime={post.date.toISOString()}>
                {formatPostDate(post.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
