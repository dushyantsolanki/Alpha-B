import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <div className="auth-layout-main">
        <div className="right-auth-layout">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
