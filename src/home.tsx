import Container from "./components/Container";
import NavBar from "./components/NavBar";
import CardsGrid from "./components/CardsGrid";

function Home() {
  return (
    <Container>
      <NavBar />
      <main className="mt-16">
        <CardsGrid />
      </main>
    </Container>
  );
}

export default Home;
