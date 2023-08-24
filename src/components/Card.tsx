interface CardProps {
  isBookmarked?: boolean;
}

function Card({ isBookmarked }: CardProps) {
  return (
    <div className="flex flex-col">
      <img
        className="h-64 w-full object-cover"
        src="/ds-img-1.jpg"
        alt="Chicken Pesto Wrap"
      />
      <div className="flex justify-between mt-6">
        <h2 className="text-xl text-green-800">Chicken Pesto Wrap</h2>
        <button>
          {isBookmarked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6 stroke-yellow-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          )}
        </button>
      </div>
      <p className="text-md mt-2">
        Chicken, pesto, spinach and sun-dried tomatoes in a tortilla.
      </p>
    </div>
  );
}

export default Card;
