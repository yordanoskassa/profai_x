
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer-container">
        <div className="Footer-links">
          <a href="/about-us">About Us</a>
          <a href="/blog">Blog</a>
          <a href="/support">Support</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <div className="Footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin" aria-hidden="true"></i>
          </a>
        </div>
        <div className="Footer-newsletter">
          <h4>Stay Updated</h4>
          <form action="#">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="Footer-login">
          <a href="/login">Login</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
