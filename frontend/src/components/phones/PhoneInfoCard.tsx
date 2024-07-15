import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../context/authContext";
import { ProductBase } from "../../types/api-response";
import { SyntheticEvent } from "react";

const PhoneInfoCard = ({ phoneData, onDelete }: { phoneData: ProductBase, onDelete:(prodId:number)=>void }) => {
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleEditBtnClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    navigate(`/product/${phoneData.id}`);
  };

  const handleViewProdClik = (e: SyntheticEvent) => {
    e.stopPropagation();
    navigate(`/product/view/${phoneData.id}`);
  };

  const handleDeleteButton = async (e: SyntheticEvent) => {
    e.stopPropagation();
    await onDelete(phoneData.id); 
  };

  return (
    <div
      onClick={handleViewProdClik}
      className="flex max-w-screen-md w-full gap-6 px-4 py-2 rounded-lg hover:bg-zinc-700/10 hover:shadow-sm transition-all"
    >
      <img src={phoneData.image_url ? phoneData.image_url :"/cell_thumb.jpg"} alt="" className="h-32 rounded-xl" />
      <section className="border border-primary-content p-4 rounded-lg shadow-xl flex-1 flex gap-2">
        <div className="content-center text-right">
          <h4 className="text-2xl font-bold">{phoneData.name}</h4>
          <h5 className="text-xl">{phoneData.Brand.name}</h5>
        </div>
        <div className="divider divider-horizontal m-0 w-2"></div>
        <div className="flex-1">Another info</div>
        {isAuth && (
          <div className="flex flex-col gap-1 justify-evenly">
            <button
              onClick={handleEditBtnClick}
              className="btn btn-outline btn-sm"
            >
              Editar
            </button>
            <button onClick={handleDeleteButton} className="btn btn-outline btn-sm btn-error">
              Eliminar
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default PhoneInfoCard;
