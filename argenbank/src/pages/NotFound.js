import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NotFound() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleBack = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <button onClick={handleBack} className="not-found-link">
        {isAuthenticated ? "Retour au profil" : "Retour à l'accueil"}
      </button>
    </div>
  );
}

export default NotFound; 