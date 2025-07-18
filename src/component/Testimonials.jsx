import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/reviews").then((res) => {
      setReviews(res.data);
    });
  }, [axiosPublic]);

  return (
    <section className="my-10 px-4 md:px-8">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Clients Say</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-1">{review.userName}</h3>
            <p className="text-sm text-gray-600 mb-2">{review.policyTitle}</p>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < review.rating ? "⭐" : "☆"}
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-sm">{review.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
