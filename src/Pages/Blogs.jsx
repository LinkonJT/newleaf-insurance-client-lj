import { useQuery } from "@tanstack/react-query";
import { Card, Badge, Button, Modal } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AppSpinner from "../component/AppSpinner";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();
  const [openBlog, setOpenBlog] = useState(null);

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });

  const handleReadMore = async (blog) => {
    // Update visit count
    await axiosPublic.patch(`/blogs/${blog._id}/visit`);
    setOpenBlog(blog);
  };

  if (isLoading) return <AppSpinner></AppSpinner>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Card key={blog._id} className="flex flex-col">
          <img src={blog.image} alt={blog.title} className="rounded-md h-48 object-cover" />
          <h5 className="text-xl font-semibold">{blog.title}</h5>
          <p className="text-gray-600">
            {blog.content.split(" ").slice(0, 25).join(" ")}...
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="text-sm">
              <Badge color="info">{blog.author}</Badge>
              <p className="text-xs text-gray-500">{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
            <span className="text-xs text-gray-500">{blog.totalVisit} visits</span>
          </div>
          <Button onClick={() => handleReadMore(blog)}>Read More</Button>
        </Card>
      ))}

      {/* Read More Modal */}
      <Modal show={!!openBlog} onClose={() => setOpenBlog(null)}>
        <Modal.Header>{openBlog?.title}</Modal.Header>
        <Modal.Body>
          <img src={openBlog?.image} alt="" className="rounded mb-4 max-h-60 object-cover" />
          <p>{openBlog?.content}</p>
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>By {openBlog?.author}</span>
            <span>Published: {new Date(openBlog?.publishedAt).toLocaleDateString()}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/blogs/${openBlog?._id}`}>
            <Button color="info">Go to Details</Button>
          </Link>
          <Button color="gray" onClick={() => setOpenBlog(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blogs;
