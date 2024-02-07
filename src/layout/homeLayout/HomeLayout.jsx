import { Outlet, useNavigate } from "react-router-dom";
import { SwiperCompo } from "../../pages";

function HomeLayout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-layout">
        <div className="swiper">
          <SwiperCompo />
        </div>
        <button
          onClick={() => {
            navigate("/dashboard/editor");
          }}
        >
          {" "}
          Go to Editor
        </button>
        <div className="item-blogs">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
