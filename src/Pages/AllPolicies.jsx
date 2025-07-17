import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import AppSpinner from '../component/AppSpinner';
import useAxiosPublic from '../hooks/useAxiosPublic';
import PoliciesCard from './PoliciesCard';

const AllPolicies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 9;

  const { data = {}, isLoading } = useQuery({
    queryKey: ['policies', category, page, search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/policies`, {
        params: {
          category: category === 'all' ? undefined : category,
          page,
          limit,
          search: search || undefined,
        },
      });
      return res.data;
    },
  });

  const policies = data?.policies || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const categories = ['all', 'Term Life', 'Senior Plan', 'Child Plan','Accident Ins',
    'Home Ins',
    'Auto Ins',
    'Travel Ins',
    'Disability Ins',
    'Education Plan'
  ];

  const handleCategoryChange = (cat) => {
    setSearchParams({ category: cat, page: 1, search });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ category, page: newPage, search });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ category, page: 1, search });
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">All Insurance Policies</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
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


        

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="ml-auto">
          <input
            type="text"
            placeholder="Search policies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded"
          />
       <button
            type="submit"
            className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            🔍 Search
          </button>
        </form>
      </div>

      {/* Policies Grid */}
      {isLoading ? (
        <AppSpinner />
      ) : policies.length === 0 ? (
        <p className="text-gray-500">No policies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <PoliciesCard key={policy._id} policy={policy} />
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
