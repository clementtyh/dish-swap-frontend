import { useState } from "react";
import { useQuery } from "react-query";

import recipesData from "../mock-data/recipes.json";

import ICard from "./types/CardInterface";

import Container from "./components/Container";
import NavBar from "./components/NavBar";
import CardsGrid from "./components/CardsGrid";
import PaginationButtons from "./components/PaginationButtons";

function Home() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", page],
    queryFn: () =>
      new Promise<ICard[]>((resolve) =>
        resolve(recipesData.slice((page - 1) * 9, page * 9))
      ),
  });

  return (
    <Container>
      <NavBar />
      <main className="mt-16">
        {!isLoading && !isError && data && <CardsGrid cards={data} />}
        <PaginationButtons
          pages={Math.ceil(recipesData.length / 9)}
          page={page}
          setPage={setPage}
        />
      </main>
    </Container>
  );
}

export default Home;
