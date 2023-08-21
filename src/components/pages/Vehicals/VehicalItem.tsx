import { VehicleData } from "./interface";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, setMessage, setSelectedVehicle } from "./Vehicals.slice";

export const VehicalItem = ({ data }: { data: VehicleData }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSelectVehicle = () => {
    dispatch(setSelectedVehicle(data));
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (Number(value) < data.details.price) {
      dispatch(setMessage("Bid Amount should greater than value"));
      return;
    }
    dispatch(addToCart({ ...data, bidAmount: Number(value) }));
    dispatch(setMessage("Added to cart"));
  };

  return (
    <div key={data.id} className="vehical-card transition-all">
      <div onClick={handleSelectVehicle}>
        <img src={data.details.image} alt={data.name} />
        <p>{`${data.details.currency} ${data.details.price}`}</p>
        <h3>{data.name}</h3>
        <div>
          {"Color : "}
          <div style={{ background: data.details.color }} className="circle" />
        </div>
        <p>{`${data.details.brand}`}</p>
      </div>

      <form>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
          min={data.details.price + 1}
          placeholder="Bid Price"
        />
        <button onClick={handleAdd} disabled={value === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};
