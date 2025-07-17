import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import AppSpinner from '../component/AppSpinner';

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
    <div className="max-w-3xl mx-auto p-5 space-y-4">
      <img
        src={policy.policyImage}
        alt={policy.title}
        className="rounded-xl w-full max-h-[400px] object-cover"
      />
      <h2 className="text-3xl font-bold">{policy.title}</h2>
      <p className="text-gray-600">{policy.description}</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div><strong>Category:</strong> {policy.category}</div>
        <div><strong>Eligibility:</strong> {policy.eligibility}</div>
        <div><strong>Benefits:</strong> {policy.benefits}</div>
        <div><strong>Coverage:</strong> {policy.coverageRange}</div>
        <div><strong>Premium Logic:</strong> {policy.premiumCalculationLogic}</div>
        <div><strong>Terms:</strong> {policy.termLengthOptions}</div>
      </div>
      <button className="btn btn-primary mt-6">Get Quote</button>
    </div>
  );
};

export default PolicyDetails;
