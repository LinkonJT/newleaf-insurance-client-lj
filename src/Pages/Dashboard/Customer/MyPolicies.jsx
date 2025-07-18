import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const MyPolicies = () => {
    return (
        <div className="overflow-x-auto">
      <Table striped>
        <TableHead>
          <TableHeadCell>Policy Title</TableHeadCell>
          <TableHeadCell>COverage</TableHeadCell>
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
              Apple MacBook Pro 17"
            </TableCell>
            <TableCell>Sliver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className='flex'>
              <Button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</Button>
              <Button className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Give Review</Button>
              <Button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">Download Policy</Button>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </TableCell>
            <TableCell>White</TableCell>
            <TableCell>Laptop PC</TableCell>
            <TableCell>$1999</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className='flex'>
              <Button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</Button>
              <Button className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Give Review</Button>
              <Button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">Download Policy</Button>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Magic Mouse 2</TableCell>
            <TableCell>Black</TableCell>
            <TableCell>Accessories</TableCell>
            <TableCell>$99</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className='flex'>
              <Button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</Button>
              <Button className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Give Review</Button>
              <Button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">Download Policy</Button>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Google Pixel Phone
            </TableCell>
            <TableCell>Gray</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>$799</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className='flex'>
              <Button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</Button>
              <Button className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Give Review</Button>
              <Button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">Download Policy</Button>
            </TableCell>
          </TableRow>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Apple Watch 5</TableCell>
            <TableCell>Red</TableCell>
            <TableCell>Wearables</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>Active</TableCell>
            <TableCell className='flex'>
              <Button className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</Button>
              <Button className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Give Review</Button>
              <Button className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">Download Policy</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    );
};

export default MyPolicies;