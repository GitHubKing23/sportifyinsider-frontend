import axios from "axios";

// ✅ API Base URL (Now Using Localhost for Local Testing)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/analytics"; 

// ✅ Track Page Visit
export const trackVisit = async (page) => {
  try {
    const userAgent = navigator.userAgent;
    const referrer = document.referrer || "Direct";
    const ip = await getUserIP();
    const deviceType = trackDeviceType(); // ✅ Track device type

    await axios.post(`${API_URL}/track-visit`, { page, referrer, userAgent, ip, deviceType });
    console.log(`✅ Visit tracked: ${page}, Device: ${deviceType}`);
  } catch (error) {
    console.error("❌ Error tracking visit:", error);
  }
};

// ✅ Track Device Type (Mobile vs Desktop)
export const trackDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    return "Mobile";
  }
  return "Desktop";
};

// ✅ Track Time Spent
export const trackTimeSpent = async (page, timeSpent) => {
  try {
    await axios.post(`${API_URL}/track-time`, { page, timeSpent });
    console.log(`✅ Time spent tracked: ${timeSpent}s on ${page}`);
  } catch (error) {
    console.error("❌ Error tracking time spent:", error);
  }
};

// ✅ Track Clicks
export const trackClick = async (page, clickedElement) => {
  try {
    await axios.post(`${API_URL}/track-click`, { page, clickedElement });
    console.log(`✅ Click tracked: ${clickedElement} on ${page}`);
  } catch (error) {
    console.error("❌ Error tracking click:", error);
  }
};

// ✅ Track Scroll Depth
export const trackScrollDepth = async (page) => {
    let trackedDepth = 0;
    const thresholds = [25, 50, 75, 100];
  
    const checkScrollDepth = async () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPercentage = Math.round((scrollTop / scrollHeight) * 100);
  
      if (scrolledPercentage >= thresholds[trackedDepth]) {
        console.log(`Tracking scroll depth: ${thresholds[trackedDepth]}% on ${page}`);
        await axios.post(`${API_URL}/track-scroll`, { page, depth: thresholds[trackedDepth] }); // Send depth instead of scrollDepth
        console.log(`✅ Scroll Depth Tracked: ${thresholds[trackedDepth]}% on ${page}`);
        trackedDepth++;
      }
    };
  
    window.addEventListener("scroll", checkScrollDepth);
  };
  

// ✅ Track User IP (Used for Geolocation)
const getUserIP = async () => {
  try {
    const response = await axios.get("https://api64.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("❌ Error fetching user IP:", error);
    return "Unknown";
  }
};
