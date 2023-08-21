import { useDispatch } from "react-redux";
import { VehicleData } from "./interface";
import { useState } from "react";
import { addToCart, setMessage, setSelectedVehicle } from "./Vehicals.slice";

export const VehicaleDetails = ({
  selectedVehicle,
}: {
  selectedVehicle: VehicleData;
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (Number(value) < selectedVehicle.details.price) {
      dispatch(setMessage("Bid Amount should greater than value"));
      return;
    }
    dispatch(addToCart({ ...selectedVehicle, bidAmount: Number(value) }));
    dispatch(setMessage("Added to cart"));
  };

  return (
    <div className="p-10">
      <div>
        <button onClick={() => dispatch(setSelectedVehicle(null))}>Back</button>
      </div>
      <div>
        <div className="flex">
          <div className="int">
            <img
              src={selectedVehicle.details.image}
              alt={selectedVehicle.name}
            />
          </div>
          <div className="int vehicle-details">
            <div className="inner-container">
              <div>
                <h2>{selectedVehicle.name}</h2>
                <h4>Description</h4>
                <p>{selectedVehicle.details.description}</p>
              </div>
              <div>
                {"Color : "}{" "}
                <div
                  style={{ background: selectedVehicle.details.color }}
                  className="circle"
                />
              </div>

              <div className="just-end">
                <form>
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="number"
                    min={selectedVehicle.details.price + 1}
                    placeholder="Bid Price"
                  />
                  <button onClick={handleAdd} disabled={value === ""}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
