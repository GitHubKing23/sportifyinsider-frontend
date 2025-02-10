import axios from "axios";

// ✅ API Base URL (Now Using Localhost for Local Testing)
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ Fetch all blogs
export const fetchBlogs = async () => {
  try {
    console.log("🔍 Fetching all blogs...");
    const response = await API.get("/blogs");
    console.log("✅ Blogs fetched successfully:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error fetching all blogs:", error);
    throw error;
  }
};

// ✅ Fetch a single blog by ID
export const fetchBlogById = async (id) => {
  try {
    console.log(`🔍 Fetching blog with ID: ${id}`);
    const response = await API.get(`/blogs/${id}`);
    console.log("✅ Blog fetched successfully:", response.data);
    return response;
  } catch (error) {
    console.error(`❌ Error fetching blog with ID ${id}:`, error);
    throw error;
  }
};

// ✅ Fetch featured blogs (For Hero Section)
export const getFeaturedBlogs = async () => {
  try {
    console.log("🔍 Fetching featured blogs...");
    const response = await API.get("/blogs/featured");
    console.log("✅ Featured blogs fetched successfully:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error fetching featured blogs:", error);
    throw error;
  }
};

// ✅ Fetch blogs by category (Handles "Footy" and "Esport" correctly)
export const fetchBlogsByCategory = async (category) => {
  try {
    if (!category) {
      console.warn("⚠️ No category provided for API call.");
      return { data: { blogs: [] } }; // Prevent API call when category is missing
    }

    // ✅ Normalize categories (Fix "Esport" and "Footy" casing issues)
    const categoryMap = {
      FOOTY: "Footy",
      ESPORT: "Esport",
      ESPORTS: "Esport", // Ensures both "Esport" and "ESPORTS" work
    };

    const formattedCategory = categoryMap[category.toUpperCase()] || category.toUpperCase();

    console.log(`🔍 Fetching blogs for category: ${formattedCategory}`);
    const response = await API.get(`/blogs/category/${formattedCategory}`);
    console.log(`✅ Blogs fetched for category ${formattedCategory}:`, response.data);

    return response;
  } catch (error) {
    console.error(`❌ Error fetching blogs for category ${category}:`, error);
    throw error;
  }
};
