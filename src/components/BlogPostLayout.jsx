import ShareButtons from "./ShareButtons";

const BlogPostLayout = ({ post }) => {
  const {
    title,
    author,
    date,
    readTime,
    category,
    tags = [],
    content,
    coverImage,
  } = post;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Category badge */}
      <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-purple-100 text-purple-700 rounded-full">
        {category}
      </span>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
        {title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
        <span>{author}</span>
        <span>·</span>
        <span>{formattedDate}</span>
        <span>·</span>
        <span>{readTime}</span>
      </div>

      {/* Cover image */}
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-64 object-cover rounded-xl mb-8"
        />
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Article body */}
      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
        <p>{content}</p>
      </div>

      {/* Share Buttons — placed at the bottom as per issue spec */}
      <ShareButtons title={title} url={window.location.href} />
    </article>
  );
};

export default BlogPostLayout;