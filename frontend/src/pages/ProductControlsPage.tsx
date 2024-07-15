import { Navigate } from "react-router-dom";
import { useAuthStore } from "../context/authContext";
import SumbitButtonComponent from "../components/general/SubmitButtonComponent";
import { useState } from "react";
import { deleteAllProdData, generateProdData } from "../api/productsApi";
import SuccessAlertComponent from "../components/general/SuccessAlertComponent";

const ProductControlsPage = () => {
  const { isAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: "", success: "" });
  if (!isAuth) {
    return <Navigate to={"/"} replace />;
  }

  const handleGenerateData = async () => {
    setMessage({ error: "", success: "" });
    setLoading(true);
    try {
      await generateProdData();
      setMessage({ error: "", success: "Generated" });
    } catch (error) {
      setMessage({ error: "Error", success: "" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async () => {
    setMessage({ error: "", success: "" });
    setLoading(true);
    try {
      await deleteAllProdData();
      setMessage({ error: "", success: "Deleted" });
    } catch (error) {
      setMessage({ error: "Error", success: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <SuccessAlertComponent message={message.success} />
      <SumbitButtonComponent
        message="Delete all"
        disabled={loading}
        loading={loading}
        onClick={handleDeleteData}
      />
      <SumbitButtonComponent
        message="Generate"
        loading={loading}
        disabled={loading}
        onClick={handleGenerateData}
      />
    </section>
  );
};

export default ProductControlsPage;
