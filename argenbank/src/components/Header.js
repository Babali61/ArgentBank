import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    // Redirige vers le profil si l'utilisateur est connecté et tente d'accéder à la page de connexion
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/profile");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={isAuthenticated ? "/profile" : "/"}>
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
      </Link>
      <div className="main-nav-item-container">
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <svg
                className="svg-icon"
                fill="#dcdcdc"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M512 85.333333c-235.733333 0-426.666667 190.933333-426.666667 426.666667s190.933333 426.666667 426.666667 426.666667 426.666667-190.933333 426.666667-426.666667-190.933333-426.666667-426.666667-426.666667zM512 213.333333c70.613333 0 128 57.386667 128 128 0 70.826667-57.386667 128-128 128s-128-57.173333-128-128c0-70.613333 57.386667-128 128-128zM512 819.2c-106.88 0-200.746667-54.613333-256-137.386667 1.066667-84.693333 170.88-131.413333 256-131.413333s254.72 46.72 256 131.413333c-55.253333 82.773333-149.12 137.386667-256 137.386667z" />
              </svg>
              <span className="main-nav-item-profil">{profile?.firstName || user?.firstName || "Profil"}</span>
            </Link>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <svg width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#b3b3b3"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#7d7d7d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9-4-4m4 4-4 4m4-4H9"></path></g></svg>
              <span className="main-nav-item-logout">Sign Out</span>
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
