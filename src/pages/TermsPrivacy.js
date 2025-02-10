const TermsPrivacy = () => {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Terms & Privacy Policy</h1>
  
        {/* ✅ Terms Section */}
        <section>
          <h2>Terms & Conditions</h2>
          <p>
            Welcome to SportifyInsider. By accessing this website, you agree to the following terms...
          </p>
          <p>
            - Users must respect community guidelines and refrain from inappropriate behavior.
          </p>
          <p>
            - Content shared on SportifyInsider is for informational purposes only.
          </p>
          <p>
            - We reserve the right to modify or remove content at any time.
          </p>
        </section>
  
        {/* ✅ Privacy Section */}
        <section>
          <h2>Privacy Policy</h2>
          <p>
            Your privacy is important to us. We do not share your data with third parties. 
            Any information collected is solely for enhancing your experience on our website.
          </p>
          <p>
            - We collect basic analytics data to improve site performance.
          </p>
          <p>
            - Cookies may be used to enhance user experience.
          </p>
          <p>
            - Users have the right to request the deletion of their personal data.
          </p>
        </section>
      </div>
    );
  };
  
  export default TermsPrivacy;
  