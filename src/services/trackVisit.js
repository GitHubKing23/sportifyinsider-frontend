import axios from 'axios';

export const trackVisit = async (page) => {
    try {
        await axios.post('http://localhost:5000/api/analytics/track-visit', {
            page,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            ip: await getIpAddress()
        });
    } catch (error) {
        console.error('Error tracking visit:', error);
    }
};

export const trackTimeSpent = async (page, timeSpent) => {
    try {
        await axios.post('http://localhost:5000/api/analytics/track-time', { page, timeSpent });
    } catch (error) {
        console.error('Error tracking time spent:', error);
    }
};

export const trackClick = async (page, clickedElement) => {
    try {
        await axios.post('http://localhost:5000/api/analytics/track-click', { page, clickedElement });
    } catch (error) {
        console.error('Error tracking click:', error);
    }
};

// ✅ Function to get user IP Address
const getIpAddress = async () => {
    try {
        const response = await axios.get('https://api64.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'Unknown';
    }
};
