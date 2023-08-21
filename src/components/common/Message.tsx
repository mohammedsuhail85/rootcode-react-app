import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { setMessage } from "../pages/Vehicals/Vehicals.slice";

// Need to implement Message box properly
export const MessageBox = () => {
  const { message } = useSelector((state: RootState) => state.vehicals);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessage(""));
    }, 3000);
  }, [dispatch, message]);

  return <>{message !== "" && <div className="message">{message}</div>}</>;
};
