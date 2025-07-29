import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/reviews").then((res) => {
      setReviews(res.data);
    });
  }, [axiosPublic]);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <section className="my-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Clients Say</h2>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={3}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        slideToClickedSlide={true}
        className="pb-6"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={review._id}>
            <div
              className={`transition-all duration-300 p-6 rounded-xl shadow-lg h-full text-center max-w-sm mx-auto ${
                index === activeIndex
                  ? "bg-white scale-100 opacity-100"
                  : "bg-gray-100 scale-90 opacity-60"
              }`}
            >
              <FaQuoteLeft className="text-2xl text-green-500 mb-4" />
              <p className="text-gray-700 mb-4">{review.feedback}</p>
              <div className="flex flex-col items-center gap-2 mt-4">
                <img
                  src={review.userPhoto || "https://i.ibb.co/DP5R8rdF/Logo-n-Leaf.png"}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{review.userName}</h4>
                  <p className="text-sm text-gray-500">{review.policyTitle}</p>
                  <div className="text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        
        ))}
        
      </Swiper>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-6 mt-2">
        <button onClick={handlePrev} className="btn btn-sm btn-outline rounded-full">
          <FaArrowLeft />
        </button>
        <button onClick={handleNext} className="btn btn-sm btn-outline rounded-full">
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
