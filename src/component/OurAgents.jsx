import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Card } from "flowbite-react";
import AppSpinner from "./AppSpinner";

const OurAgents = () => {
  const axiosPublic = useAxiosPublic();

  const { data: agents = [], isLoading, isError } = useQuery({
    queryKey: ["featuredAgents"],
    queryFn: async () => {
      const res = await axiosPublic.get("/agents/featured");
      return res.data;
    },
  });

  if (isLoading) return <AppSpinner />;
  if (isError) return <p className="text-center text-red-500">Failed to load agents.</p>;

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Meet Our Agents</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card
            key={agent.email}
            className="w-full h-full flex flex-col justify-between shadow-md"
          >
            {/* Fixed height image container */}
            <div className="h-60 w-full overflow-hidden rounded-t-lg">
              <img
                src={agent.photoURL}
                alt={agent.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                {agent.name}
              </h5>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                <strong>Email:</strong> {agent.email}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
                <strong>Experience:</strong> {agent.experience}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <strong>Specialties:</strong> {Array.isArray(agent.specialties) ? agent.specialties.join(', ') : agent.specialties}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OurAgents;
