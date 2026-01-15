import Header from "../../components/Header/Header";


function OnlyHeaderLayout({ children }) {
  return (
    <div>
      {/* <Header /> */}
      {children}
    </div>
  );
}

export default OnlyHeaderLayout;
