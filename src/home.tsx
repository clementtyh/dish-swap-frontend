import { useState } from "react";
import { useQuery } from "react-query";

import recipesData from "../mock-data/recipes.json";
import Container from "./components/Container";
import NavBar from "./components/NavBar";
import CardsGrid from "./components/CardsGrid";

function Home() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipes", page],
    queryFn: () =>
      new Promise((resolve) =>
        resolve(recipesData.slice((page - 1) * 9, page * 9))
      ),
  });

  return (
    <Container>
      <NavBar />
      <main className="mt-16">
        {!isLoading && !isError && <CardsGrid cards={data} />}
      </main>
    </Container>
  );
}

export default Home;
