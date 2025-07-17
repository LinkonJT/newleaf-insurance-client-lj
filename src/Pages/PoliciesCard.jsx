import React from 'react';
import { Button, Card } from "flowbite-react";
import { Link } from 'react-router';

const PoliciesCard = ({ policy }) => {
  const { _id, image, title, category, description } = policy;

  return (
    <Card
      className="max-w-sm"
      imgAlt={title}
      imgSrc={image || 'https://source.unsplash.com/400x200/?insurance'}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>

      <h6 className="text-lg font-medium bg-amber-200 rounded-3xl w-fit px-3 py-1 tracking-tight text-gray-900 dark:text-white">
        {category}
      </h6>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description?.length > 80 ? description.slice(0, 80) + '...' : description}
      </p>

      <Link to={`/policy/${_id}`}>
        <Button>
          View Details
          <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Link>
    </Card>
  );
};

export default PoliciesCard;
