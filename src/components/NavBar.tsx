function NavBar() {
  return (
    <nav>
      <div className="flex justify-between items-center bg-[#7f8b6d] rounded-full w-full h-16 px-8">
        <h1 className="uppercase text-white font-bold">Dishswap</h1>
        <div className="flex gap-16">
          <a className="uppercase text-white font-bold">Recipes</a>
          <a className="uppercase text-white font-bold">Flavourmark</a>
          <a className="uppercase text-white font-bold">Profile</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
