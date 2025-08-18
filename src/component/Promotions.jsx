import { Carousel } from "flowbite-react";
import promo1 from "../assets/promo1.png";
import promo2 from "../assets/promo2.png";
import promo3 from "../assets/promo3.png";

const Promotions = () => {
  return (
    <div className="h-72 sm:h-80 xl:h-[400px] 2xl:h-[500px] mt-10 mb-18">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Promotions</h2>

      <Carousel slideInterval={5000}>
        {/* Slide 1 */}
        <div className="relative h-full w-full">
          <img src={promo1} alt="Discounts Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow">
              Highlight Discounts
            </h2>
            <p className="text-sm md:text-lg max-w-xl">
              Save up to <span className="font-semibold text-yellow-300">30%</span> on family health insurance plans this month only.
            </p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-full w-full">
          <img src={promo2} alt="Special Plans Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow">
              Special Plans
            </h2>
            <p className="text-sm md:text-lg max-w-xl">
              Get exclusive <span className="font-semibold text-yellow-300">“NewLeaf Starter Pack”</span> with added travel coverage benefits.
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-full w-full">
          <img src={promo3} alt="Seasonal Offer Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow">
              Seasonal Offers
            </h2>
            <p className="text-sm md:text-lg max-w-xl">
              This winter, enjoy <span className="font-semibold text-yellow-300">free dental checkups</span> with every premium health policy.
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Promotions;
