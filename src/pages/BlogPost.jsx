import { useParams } from "react-router-dom";
import BlogPostLayout from "../components/BlogPostLayout";
import blogs from "../data/blog";

export default function BlogPost() {
    const { slug } = useParams();
    const post = blogs.find((b) => b.slug === slug);

    if (!post) return <p className="text-center py-20">Post not found.</p>;

    return <BlogPostLayout post={post} />;
}