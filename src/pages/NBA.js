import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogsByCategory } from "../services/api";

const NBA = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const category = "NBA"; // Set category for this file

  useEffect(() => {
    const loadCategoryBlogs = async () => {
      try {
        console.log(`🔍 Fetching blogs for category: ${category}`);
        const { data } = await fetchBlogsByCategory(category);
        setBlogs(data.blogs);
      } catch (error) {
        console.error(`❌ Error loading ${category} blogs:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryBlogs();
  }, []);

  return (
    <div>
      <h2>{category} Blogs</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>⚠️ No blogs found for {category}</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              border: "1px solid black",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <button onClick={() => navigate(`/blog/${blog._id}`)}>Read More</button>
          </div>
        ))
      )}
    </div>
  );
};

export default NBA;
