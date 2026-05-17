import { Routes, Route } from "react-router-dom";
import BlogPostLayout from "./components/BlogPostLayout";
import blogs from "./data/blog";

const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((post) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition border border-gray-100"
          >
            <span className="text-xs font-semibold uppercase text-purple-600">
              {post.category}
            </span>
            <h2 className="mt-2 text-lg font-bold text-gray-800">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{post.excerpt}</p>
            <p className="mt-3 text-xs text-gray-400">
              {post.date} · {post.readTime}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const slug = window.location.pathname.split("/blog/")[1];
  const post = blogs.find((b) => b.slug === slug);
  if (!post) return <p className="text-center py-20">Post not found.</p>;
  return <BlogPostLayout post={post} />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
    </Routes>
  );
}

export default App;