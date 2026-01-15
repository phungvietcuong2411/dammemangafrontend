import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/index";
import "../../../styles/font.css"

function DefaultLayout({ children }) {
  return (
    <div className="quicksand-uniquifier">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
