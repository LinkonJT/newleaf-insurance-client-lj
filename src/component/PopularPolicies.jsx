import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router";
import { Card } from "flowbite-react";
import AppSpinner from "./AppSpinner";



const PopularPolicies = () => {
  const axiosPublic = useAxiosPublic();

  const { data: policies = [], isLoading, isError } = useQuery({
    queryKey: ["popularPolicies"],
    queryFn: async () => {
      const res = await axiosPublic.get("/policies/popular?limit=6");
      return res.data;
    },
  });

  if (isLoading) return <AppSpinner></AppSpinner>
  if (isError) return <p className="text-red-500 text-center">Failed to load popular policies.</p>;

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Popular Policies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <Card key={policy._id} className="max-w-lg">
        <div className="w-full h-48 overflow-hidden rounded-t">
  <img
    src={policy.policyImage || 'https://images.unsplash.com/photo-1750668251415-bd40b8154f45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
    alt={policy.title}
    className="w-full h-full object-cover"
  />
</div>


            <h5 className="text-xl font-bold text-gray-900 dark:text-white">
              {policy.title}
            </h5>

            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Coverage:</strong> {policy.coverageRange}</p>
              <p><strong>Term:</strong> {policy.termLengthOptions}</p>
              <p><strong>Popularity:</strong> {policy.popularity} purchases</p>
            </div>

            <Link
              to={`/policy/${policy._id}`}
              className="mt-3 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PopularPolicies;
