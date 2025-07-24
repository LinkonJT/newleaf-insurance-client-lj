import { useQuery } from "@tanstack/react-query";
import { Card, Badge, Button, Modal } from "flowbite-react";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AppSpinner from "../component/AppSpinner";
import ReadMoreModal from "./Dashboard/Shared/ReadMoreModal";

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
   <div>
<h1 className="text-3xl text-center font-bold underline my-2">Our Blogs</h1>
     <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <Card key={blog._id} className="flex flex-col">
          <img src={blog.image} alt={blog.title} className="rounded-md h-48 object-cover" />
          <h5 className="text-lg text-gray-100 font-semibold">{blog.title}</h5>
          <p className="text-gray-600">
            {blog.content.split(" ").slice(0, 25).join(" ")}...
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="text-sm">
              <Badge color="info">{blog.author}</Badge>
              <p className="text-xs mt-2 bg-purple-500 rounded-md px-2 text-white">{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
            <span className="text-xs bg-green-500 p-2 rounded-md text-gray-100">{blog.totalVisit} visits</span>
          </div>
          <Button onClick={() => handleReadMore(blog)}>Read More</Button>
        </Card>
      ))}

      {/* Read More Modal */}

      <ReadMoreModal
        isOpen={!!openBlog}
        onClose={() => setOpenBlog(null)}
        blog={openBlog}
      />
    </div>
   </div>
  );
};

export default Blogs;
