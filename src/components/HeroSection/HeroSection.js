import { useState, useEffect } from "react";
import { getFeaturedBlogs } from "../../services/api";
import { Link } from "react-router-dom";
import "../../assets/style/HeroSection.css";

const HeroSection = () => {
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await getFeaturedBlogs();
        if (data.length > 0) {
          setFeaturedBlog(data[0]);
        }
        console.log("✅ Fetched Featured Blog:", data[0]); // ✅ Debugging Log
      } catch (error) {
        console.error("❌ Error fetching featured blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="hero-section">
      {loading ? (
        <h2>Loading featured blog...</h2>
      ) : featuredBlog ? (
        <div className="hero-content">
          <Link to={`/blog/${featuredBlog._id}`} className="hero-image-wrapper">
            <img
              src={`http://localhost:5000${featuredBlog.mainPicture}`}
              alt={featuredBlog.title}
              className="hero-image"
              onError={(e) => {
                console.error("❌ Image failed to load:", e.target.src);
                e.target.style.display = "none";
              }}
            />
          </Link>

          <div className="hero-text">
            <Link to={`/blog/${featuredBlog._id}`} className="hero-title-link">
              <h1>{featuredBlog.title}</h1>
            </Link>
          </div>
        </div>
      ) : (
        <h2>No featured blogs available</h2>
      )}
    </section>
  );
};

export default HeroSection;
