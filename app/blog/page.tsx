import { getAllPostMetas, PostMeta } from "@/lib/post";
import { formatPostDate } from "@/lib/utils";

export default function BlogPage() {
  const posts: PostMeta[] = getAllPostMetas();
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <div>{post.title}</div>
            <div>{formatPostDate(post.date)}</div>
            <div>{post.slug}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
