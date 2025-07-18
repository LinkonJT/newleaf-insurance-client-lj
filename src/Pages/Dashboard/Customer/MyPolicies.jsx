import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import ClientReviewModal from '../../ClientReviewModal';

const MyPolicies = () => {
    return (
        <div className="overflow-x-auto">
      <Table striped>
        <TableHead>
          <TableHeadCell>Policy Title</TableHeadCell>
          <TableHeadCell>Coverage</TableHeadCell>
          <TableHeadCell>Duration</TableHeadCell>
          <TableHeadCell>Premium</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Action</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Policy name
            </TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className='flex'>
              <Button className="mr-2 text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</Button>
               
           <div className='mr-2'><ClientReviewModal></ClientReviewModal></div>
              
              <Button className="px-2 text-xs py-1 bg-gray-500 text-white rounded hover:bg-gray-600">Download Policy</Button>
            </TableCell>
          </TableRow>
         
        </TableBody>
      </Table>
    </div>
    );
};

export default MyPolicies;