import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");

    if (sessionId) {
      axios.post(
        serverURL + "/api/payment/verifypayment",
        { sessionId },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Enrollment Successful 🎉");
        navigate("/mylearning");
      })
      .catch(() => {
        toast.error("Verification Failed");
      });
    }
  }, []);

  return <h2 className="text-center mt-20">Processing Payment...</h2>;
};

export default PaymentSuccess;
