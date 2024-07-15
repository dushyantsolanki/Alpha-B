import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, ScrollToTop } from "../../components";

function HomeLayout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-layout" >
        <Navbar />

        <div className="item-blogs">
          <Outlet />
        </div>
        <img
          src="https://www.bighaat.com/_next/image?url=%2Fimages%2FloginIllustration.png&w=1920&q=75"
          alt=""
          width="100%"
          style={{ marginBottom: "-133px" }}
        />
        <div
          className="scroll-btn"
          style={{
            width: "50px",
            height: "50px",
            position: "sticky",
            left: "93vw",
            bottom: "50px",
          }}
        >
          <ScrollToTop />
        </div>
        {/* <div
          className="rights"
          style={{ textAlign: "center", backgroundColor: "green" }}
        >
          All Right Reserve By Alpha Bee
        </div> */}
      </div>
    </>
  );
}

export default HomeLayout;
