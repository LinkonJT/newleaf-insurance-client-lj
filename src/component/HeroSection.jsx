import { Carousel } from "flowbite-react";
import { Link } from "react-router";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

const HeroSection = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-[500px]">
      <Carousel>
        {/* Slide 1 */}
        <div className="relative h-full w-full">
          <img src={img1} alt="Slide 1" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow">
              Secure Your Tomorrow Today
            </h2>
            <Link
              to="/quote"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-full w-full">
          <img src={img2} alt="Slide 2" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow">
              Your Future is Worth Protecting
            </h2>
            <Link
              to="/quote"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-full w-full">
          <img src={img3} alt="Slide 3" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow">
              Peace of Mind Starts Here
            </h2>
            <Link
              to="/quote"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSection;
