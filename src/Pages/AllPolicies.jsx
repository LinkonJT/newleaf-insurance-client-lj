import React from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import AppSpinner from '../component/AppSpinner';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Test from './PoliciesCard';

const AllPolicies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 9;

  const { data = {}, isLoading } = useQuery({
    queryKey: ['policies', category, page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/policies`, {
        params: {
          category: category === 'all' ? undefined : category,
          page,
          limit,
        },
      });
      return res.data;
    },
  });

  const policies = data?.policies || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleCategoryChange = (cat) => {
    setSearchParams({ category: cat, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ category, page: newPage });
  };

  const handleCardClick = (id) => {
    navigate(`/policy-details/${id}`);
  };

  const categories = ['all', 'Term Life', 'Senior Plan', 'Child Plan'];

  if (isLoading) return <AppSpinner />;

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Insurance Policies</h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1 rounded-full border ${
              cat === category ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Policies Grid */}
      {policies.length === 0 ? (
        <p className="text-gray-500">No policies found for selected category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div
              key={policy._id}
              onClick={() => handleCardClick(policy._id)}
              className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-lg"
            >
              <img src={policy.image} alt={policy.title} className="w-full h-40 object-cover rounded" />
              <h3 className="text-lg font-semibold mt-3">{policy.title}</h3>
              <p className="text-sm text-gray-500">{policy.category}</p>
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">{policy.short_description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              i + 1 === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

   
    </div>
  );
};

export default AllPolicies;
