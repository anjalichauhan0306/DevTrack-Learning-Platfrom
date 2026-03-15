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
  const verifyPayment = async () => {
    const sessionId = new URLSearchParams(location.search).get("session_id");

    if (!sessionId) return;

    try {
      const res = await axios.post(
        serverURL + "/api/payment/verifypayment",
        { sessionId },
        { withCredentials: true }
      );
      console.log(res.data); 
      dispatch(setUserData(res.data.user));

      toast.success("Enrollment Successful 🎉");
      navigate("/mylearning");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown error");
    }
  };

  verifyPayment();
}, []);

  return <h2 className="text-center mt-20">Processing Payment...</h2>;
};

export default PaymentSuccess;
