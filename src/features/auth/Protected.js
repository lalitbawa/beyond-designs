import { useSelector } from "react-redux";
import { Navigate,useNavigate } from "react-router-dom";
import { selectLoggedInUser } from "./authSlice";
import { useEffect } from "react";


function Protected({children}) {
    const user = useSelector(selectLoggedInUser)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
      }, [user, navigate]);

    return children;
}

export default Protected;