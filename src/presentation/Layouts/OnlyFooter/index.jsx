import Footer from "../../components/Footer/index";


function OnlyHeaderLayout({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}

export default OnlyHeaderLayout;
