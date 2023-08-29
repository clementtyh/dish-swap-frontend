interface PaginationButtonsProps {
  pages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function PaginationButtons({ pages, page, setPage }: PaginationButtonsProps) {
  return (
    <div className="flex w-max mt-16 mx-auto border border-[#8eb44f] rounded-lg">
      {[...Array(pages).keys()].map((idx) => {
        return (
          <button
            className={`px-6 py-2 text-[#8eb44f] border-l border-[#8eb44f] first:rounded-l-lg first:border-l-0 last:rounded-r-lg hover:bg-[#e4e7ca] ${
              idx + 1 === page
                ? "bg-[#e4e7ca] cursor-default"
                : "bg-[#dce0ba] cursor-pointer"
            }`}
            key={idx}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
}

export default PaginationButtons;
