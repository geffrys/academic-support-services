import "../css/Footer.css";
function Footer() {
  const actualYear = new Date().getFullYear();

  return (
    <section className="footer">
      <p>© {actualYear} Academic Link / All rights reserved</p>
    </section>
  );
}

export default Footer;
