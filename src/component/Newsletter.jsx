import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Newsletter = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = formData;
    if (!name || !email) return toast.error("Both fields are required");

    try {
      setLoading(true);
      const res = await axiosPublic.post("/newsletter", formData);
      if (res.data.insertedId) {
        toast.success("Subscribed successfully!");
        setFormData({ name: "", email: "" });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Already subscribed or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 py-10 px-4 rounded-lg shadow max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Subscribe to our Newsletter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full px-4 py-2 border rounded focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
