//necessary imports
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectLoggedInUser } from "./authSlice";
import { useEffect } from "react";

// A component that wraps around other components in app.js router and protects them based on user authentication
function Protected({ children }) {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the login page if the user is not logged in
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return children;
}

export default Protected;
