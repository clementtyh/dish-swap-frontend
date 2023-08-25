import Container from "./components/Container";
import NavBar from "./components/NavBar";
import { useParams } from "react-router-dom";

function Recipe() {
  const { recipeId } = useParams();

  return (
    <Container>
      <NavBar />
      <main className="mt-16">
        <h1>Recipe {recipeId}</h1>
      </main>
    </Container>
  );
}

export default Recipe;
