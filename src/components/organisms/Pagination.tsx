export const Pagination = ({
  onClick,
  pageSize,
  totalElements,
  currentPage,
  onPagesizeChange,
}: {
  totalElements: number;
  onClick: (currentPage: number) => void;
  pageSize: number;
  currentPage: number;
  onPagesizeChange: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const getButton = () => {
    const arr: JSX.Element[] = [];

    for (let index = 0; index < totalElements / pageSize; index++) {
      arr.push(
        <div
          className={
            currentPage === index
              ? "pagination-item selected"
              : "pagination-item"
          }
          key={index}
          onClick={() => onClick(index)}
        >
          {index + 1}
        </div>
      );
    }
    return arr;
  };

  return (
    <div className="flex-end">
      <div className="pagination">
        **API response is not retuning pagination details. The response contains
        only contents
        <div className="pagination-settings">
          <select
            value={pageSize}
            onChange={(e) => onPagesizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
        </div>
        {getButton()}
      </div>
    </div>
  );
};
