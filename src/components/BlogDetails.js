import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ✅ Import Helmet for SEO
import { fetchBlogById } from "../services/api"; // ✅ Ensure API function exists
import "../assets/style/BlogDetails.css"; // ✅ Ensure CSS path is correct

const BlogDetails = () => {
  const { id } = useParams(); // ✅ Get the Blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        console.log(`🔍 Fetching blog with ID: ${id}`); // ✅ Debugging Log
        const response = await fetchBlogById(id);
        console.log("✅ Blog fetched successfully:", response.data); // ✅ Debugging Log
        setBlog(response.data);
      } catch (error) {
        console.error("❌ Error fetching blog:", error.response || error.message);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [id]);

  return (
    <div className="blog-details">
      {/* ✅ Dynamic SEO Meta Tags */}
      {blog && (
        <Helmet>
          <title>{`${blog.title} | SportifyInsider`}</title>
          <meta name="description" content={blog.content.substring(0, 150) + "..."} />
          {/* ✅ Open Graph Meta Tags (for Social Media) */}
          <meta property="og:title" content={blog.title} />
          <meta property="og:description" content={blog.content.substring(0, 150) + "..."} />
          <meta property="og:image" content={`http://sportifyinsider.com{blog.mainPicture}`} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`http://15.235.185.142:5000/blog/${id}`} />
        </Helmet>
      )}

      {loading ? (
        <h2>Loading...</h2>
      ) : blog ? (
        <>
          <h1>{blog.title}</h1>
          <img
            src={`http://localhost:5000${blog.mainPicture}`}
            alt={blog.title}
            className="blog-image"
            onError={(e) => {
              console.error("❌ Image failed to load:", e.target.src);
              e.target.src = "/default-image.jpg"; // Display a default image if loading fails
            }}
          />
          <p>{blog.content}</p>
        </>
      ) : (
        <h2>❌ Blog not found</h2>
      )}
    </div>
  );
};

export default BlogDetails;
