import "./footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return(
        <footer className="footer" style={{ backgroundColor: '#5260C1' }}>
        <div className="contents">
            <h2 className="title">OpenMarket System ⓒ {currentYear}</h2>
        </div>
      </footer>
    )
}
export default Footer;