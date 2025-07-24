// src/pages/Dashboard/Shared/ReadMoreModal.jsx

import { Modal } from "flowbite-react";

const ReadMoreModal = ({ isOpen, onClose, blog }) => {
  if (!blog) return null;

  return (
    <Modal show={isOpen} onClose={onClose} >
      <div className="p-4 bg-blue-100 rounded-sm">
          <button
          onClick={onClose}
          className="absolute top-4 bg-blue-700 p-2 right-6 text-gray-100 hover:text-black"
        >
            X
        </button>
        <img src={blog.image} alt={blog.title} className="w-full rounded mb-4" />
         <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-700">{blog.content}</p>
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Author:</strong> {blog.author}</p>
          <p><strong>Published:</strong> {new Date(blog.publishedAt).toLocaleDateString()}</p>
          <p><strong>Total Visits:</strong> {blog.totalVisit}</p>
        </div>
                <button
          onClick={onClose}
          className=" bg-blue-700 ml-130 p-2 rounded-sm text-gray-100 hover:text-black"
        >
            Close
        </button>
      </div>
    </Modal>
  );
};

export default ReadMoreModal;
