import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"; // ✅ Import Helmet for SEO
import HeroSection from "../components/HeroSection/HeroSection";
import { fetchBlogs } from "../services/api";
import { trackVisit, trackTimeSpent, trackScrollDepth, trackDeviceType } from "../services/analytics"; // ✅ Import new tracking functions
import Footer from "../components/Footer/Footer"; // ✅ Import Footer

const HomePage = () => {
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    const loadFeaturedBlog = async () => {
      try {
        const response = await fetchBlogs();
        const blogs = response.data.blogs || response.data; // Handle different data structures
        const featured = blogs.find((blog) => blog.featured); // Find a featured blog
        setFeaturedBlog(featured || null);
      } catch (error) {
        console.error("Error loading featured blog:", error);
      }
    };
    loadFeaturedBlog();
  }, []);

  // ✅ Track page visit, time spent, scroll depth, and device type
  useEffect(() => {
    trackVisit("/"); // Log visit
    trackDeviceType(); // Log whether user is on mobile or desktop

    let startTime = Date.now();
    trackScrollDepth("/"); // Track how far the user scrolls

    return () => {
      let timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackTimeSpent("/", timeSpent);
    };
  }, []);

  return (
    <div>
      {/* ✅ Dynamic SEO Meta Tags */}
      <Helmet>
        <title>
          {featuredBlog
            ? `${featuredBlog.title} | SportifyInsider`
            : "SportifyInsider - Your Hub for Sports Blogs"}
        </title>
        <meta
          name="description"
          content={
            featuredBlog
              ? featuredBlog.content.substring(0, 150) + "..."
              : "Get the latest insights, news, and articles on your favorite sports leagues including NFL, NBA, NHL, Footy, and Esports."
          }
        />
        {/* ✅ Open Graph for Social Media */}
        <meta
          property="og:title"
          content={
            featuredBlog
              ? `${featuredBlog.title} | SportifyInsider`
              : "SportifyInsider - Your Hub for Sports Blogs"
          }
        />
        <meta
          property="og:description"
          content={
            featuredBlog
              ? featuredBlog.content.substring(0, 150) + "..."
              : "Stay updated with the latest sports news and articles from SportifyInsider."
          }
        />
        <meta
          property="og:image"
          content={
            featuredBlog
              ? `http://localhost:5000${featuredBlog.mainPicture}`
              : "https://example.com/default-image.jpg"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/" />
      </Helmet>

      {/* ✅ Featured Blog Section */}
      <HeroSection featuredBlog={featuredBlog} />

      {/* ✅ Welcome Letter Section */}
      <div className="welcome-section">
        <h1>Welcome to SportifyInsider</h1>
        <p>
          Your go-to destination for the latest insights, news, and articles on your favorite sports leagues, 
          including <strong>NFL, NBA, NHL, Footy, and Esports</strong>. Whether you're a passionate fan or 
          looking for expert analysis, we've got you covered with in-depth articles and updates.
        </p>
        <p>
          At SportifyInsider, we believe in delivering high-quality sports content that keeps you engaged 
          and informed. Stay tuned for exclusive stories, match breakdowns, player insights, and much more!
        </p>
        <p>
          Enjoy reading, and feel free to explore different categories for your favorite sports!
        </p>
      </div>

      {/* ✅ Footer (Ensures it's not duplicated) */}
      <Footer />
    </div>
  );
};

export default HomePage;
