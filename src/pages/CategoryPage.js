import { useState, useEffect } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogsByCategory } from "../services/api";

const CategoryPage = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Handle specific cases for "Footy" and "Esport"
  let formattedCategory = "";
  if (category) {
    if (category.toUpperCase() === "FOOTY") {
      formattedCategory = "Footy";
    } else if (category.toUpperCase() === "ESPORT") {
      formattedCategory = "Esport";
    } else {
      formattedCategory = category.toUpperCase();
    }
  }

  useEffect(() => {
    if (!formattedCategory) {
      console.warn("⚠️ No category provided in URL!");
      setLoading(false);
      return;
    }

    const loadCategoryBlogs = async () => {
      try {
        console.log(`🔍 Fetching blogs for category: ${formattedCategory}`);
        const { data } = await fetchBlogsByCategory(formattedCategory);

        if (!data || !data.blogs) {
          console.error(`❌ No data returned from API for ${formattedCategory}`);
          setBlogs([]);
          return;
        }

        console.log("✅ Blogs fetched successfully:", data.blogs);
        setBlogs(data.blogs);
      } catch (error) {
        console.error(`❌ Error loading ${formattedCategory} blogs:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryBlogs();
  }, [formattedCategory]);

  return (
    <div>
      <h2>{formattedCategory} Blogs</h2>
      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>⚠️ No blogs found for {formattedCategory}</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="blog-card"
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

export default CategoryPage;
