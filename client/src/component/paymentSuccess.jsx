import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");

    if (sessionId) {

      const result = axios.post(
        serverURL + "/api/payment/verifypayment",
        { sessionId },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Enrollment Successful 🎉");
        navigate("/mylearning");
      })
      .catch((error) => {
        toast.error(` ${error}. || "Unknown error"}`);
      });
    }
  }, []);

  return <h2 className="text-center mt-20">Processing Payment...</h2>;
};

export default PaymentSuccess;