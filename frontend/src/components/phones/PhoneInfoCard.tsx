import { useAuthStore } from "../../context/authContext";
import { ProductBase } from "../../types/api-response";

const PhoneInfoCard = ({phoneData}:{phoneData:ProductBase}) => {
  const { isAuth } = useAuthStore();
  return (
    <div className="flex max-w-screen-md w-full gap-6 px-4 py-2 rounded-lg hover:bg-zinc-700/10 hover:shadow-sm transition-all">
      <img src="/cell_thumb.jpg" alt="" className="h-32 rounded-xl" />
      <section className="border border-primary-content p-4 rounded-lg shadow-xl flex-1 flex gap-2">
        <div className="content-center text-right">
          <h4 className="text-2xl font-bold">{phoneData.name}</h4>
          <h5 className="text-xl">{phoneData.Brand.name}</h5>
        </div>
        <div className="divider divider-horizontal m-0 w-2"></div>
        <div className="flex-1">Another info</div>
        { isAuth && 
          <div className="flex flex-col gap-1 justify-evenly">
            <button className="btn btn-outline btn-sm">Editar</button>
            <button className="btn btn-outline btn-sm btn-error">
              Eliminar
            </button>
          </div>
        }
      </section>
    </div>
  );
};

export default PhoneInfoCard;