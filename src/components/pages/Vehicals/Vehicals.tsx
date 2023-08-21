import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import { VehicalItem } from "./VehicalItem";
import { VehicaleDetails } from "./VehicaleDetails";
import {
  setOpenDrawer,
  setVehicals,
  setVehicalsLoading,
} from "./Vehicals.slice";
import { Pagination } from "../../organisms/Pagination";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Vehicals = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const { allVehicals, loading, selectedVehicle } = useSelector(
    (state: RootState) => state.vehicals
  );

  const getURL = () => {
    if (filterValue === undefined || filterValue === "ALL") {
      return `vehicles?_page=${currentPage}&_limit=${pageSize}`;
    } else {
      return `vehicles?details.brand=${filterValue}&_page=${currentPage}&_limit=${pageSize}`;
    }
  };

  const fetchVehicalsData = async () => {
    dispatch(setVehicalsLoading(true));
    try {
      const response = await fetch(BASE_URL + getURL()).then((res) =>
        res.json()
      );
      dispatch(setVehicals(response));
      dispatch(setVehicalsLoading(false));

      // Setting undifine if the response is empty
      if (Array.isArray(response) && response.length === 0)
        setFilterValue(undefined);
    } catch (error) {
      console.error(error);
      dispatch(setVehicalsLoading(false));
    }
  };

  useEffect(() => {
    fetchVehicalsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue, currentPage, pageSize]);

  return (
    <React.Fragment>
      {!selectedVehicle ? (
        <>
          <div className="flex-row container">
            <div className="align-self-end">
              <div>Brand</div>
              <div>
                <select
                  value={filterValue}
                  onChange={(value) => setFilterValue(value.target.value)}
                >
                  {[
                    <option key={-1} value="-">
                      -
                    </option>,
                    <option key={0} value="ALLF">
                      All
                    </option>,
                    ...allVehicals.map((ele) => (
                      <option key={ele.id} value={ele.name}>
                        {ele.name}
                      </option>
                    )),
                  ]}
                </select>
              </div>
            </div>

            <div className="just-end">
              <div>
                <svg
                  onClick={() => dispatch(setOpenDrawer(true))}
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                >
                  <path
                    d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <div className="columns-3">
                {allVehicals.map((ele) => (
                  <VehicalItem key={ele.id} data={ele} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalElements={allVehicals.length}
                pageSize={pageSize}
                onClick={(current) => {
                  setCurrentPage(current);
                }}
                onPagesizeChange={setPageSize}
              />
            </>
          )}
        </>
      ) : (
        <VehicaleDetails selectedVehicle={selectedVehicle} />
      )}
    </React.Fragment>
  );
};
