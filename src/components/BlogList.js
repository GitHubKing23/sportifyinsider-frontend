import { useState, useEffect } from "react";
import { fetchBlogs } from "../services/api";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const { data } = await fetchBlogs();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("❌ Failed to load blogs:", error);
      }
    };
    loadBlogs();
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            <p><strong>Category:</strong> {blog.category}</p>
            <Link to={`/blog/${blog._id}`}><button>Read More</button></Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
