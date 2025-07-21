import React from 'react';
import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import AppSpinner from '../component/AppSpinner';
import { Button, Card } from 'flowbite-react';

const PolicyDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: policy, isLoading, isError } = useQuery({
    queryKey: ['policy', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/policies/${id}`);
      return res.data;
    },
    enabled: !!id, // prevent firing query if id is missing
  });

  if (isLoading) return <AppSpinner />;
  if (isError || !policy) return <p className="text-center text-red-600">Policy not found or an error occurred.</p>;

  return (
   <section>
     <Card>

      <div className="max-w-3xl mx-auto p-2 space-y-4">
      <img
        src={policy.policyImage}
        alt={policy.title}
        className="rounded-xl w-full max-h-[400px] object-cover"
      />
      <h2 className=" text-2xl md:text-3xl font-bold text-white">{policy.title}</h2>
      <p className="text-gray-400">{policy.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="text-gray-400"><strong className="text-gray-300">Category:</strong> {policy.category}</div>
        <div className="text-gray-400"><strong className="text-gray-300">Eligibility:</strong> {policy.eligibility}</div>
        <div className="text-gray-400"><strong className="text-gray-300">Benefits:</strong> {policy.benefits}</div>
        <div className="text-gray-400"><strong className="text-gray-300">Coverage:</strong> {policy.coverageRange}</div>
        <div className="text-gray-400"><strong className="text-gray-300">Premium Logic:</strong> {policy.premiumCalculationLogic}</div>
        <div className="text-gray-400"><strong className="text-gray-300">Terms:</strong> {policy.termLengthOptions}</div>
        <div className="text-gray-400"><strong className="text-gray-300">Base Premium Rate:</strong> {policy.basePremiumRate}</div>
      </div>
         <Link to={`/quote/${id}`}>
        <Button className='mx-auto'>
          Quote
          <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Link>
    </div>
    </Card>
   </section>
  );
};

export default PolicyDetails;
