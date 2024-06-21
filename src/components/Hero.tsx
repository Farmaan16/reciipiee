import Search from "./Search";
// import Categories from "./Categories";

function Hero() {
  return (
    <div className="hero-section">
      {/* Overlay */}
      

      <div className="absolute w-full h-full z-10 text-white text-center top-[10%] md:top-[20%]">
        <Search />
        {/* <Categories /> */}
      </div>
    </div>
  );
}

export default Hero;
