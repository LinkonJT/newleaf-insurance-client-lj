import { useQuery } from "@tanstack/react-query";
import { Card, Badge, Button } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router";
import useAxiosPublic from "../hooks/useAxiosPublic";
import AppSpinner from "../component/AppSpinner";
import ReadMoreModal from "../Pages/Dashboard/Shared/ReadMoreModal";

const LatestBlog = () => {
  const axiosPublic = useAxiosPublic();
  const [openBlog, setOpenBlog] = useState(null);

  const { data: blogs = [], isLoading, refetch } = useQuery({
    queryKey: ["latest-blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      // Sort by publishedAt and take the latest 4
      return res.data.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 4);
    },
  });

  const handleReadMore = async (blog) => {
    await axiosPublic.patch(`/blogs/${blog._id}/visit`);
    await refetch();
    setOpenBlog(blog);
  };

  if (isLoading) return <AppSpinner />;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-6 ">Latest Blog / Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <Card key={blog._id} className="flex flex-col">
            <img src={blog.image} alt={blog.title} className="rounded-md h-40 object-cover" />
            <h3 className="text-md font-semibold text-gray-300">{blog.title}</h3>
            <p className="text-gray-600 text-sm">
              {blog.content.split(" ").slice(0, 30).join(" ")}...
            </p>
            <div className="flex items-center justify-between mt-auto text-xs">
              <Badge color="indigo">{blog.author}</Badge>
              <span className="text-gray-500">{new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>
            <Button onClick={() => handleReadMore(blog)} size="sm">
              Read More
            </Button>

                 {/* All Blogs Button */}
      <div className="mt-1 text-center">
        <Link to="/blogs">
          <Button color="blue" size="md" className="w-full">
            All Blogs
          </Button>
        </Link>
      </div>
          </Card>
        ))}
      </div>

      {/* Read More Modal */}
      <ReadMoreModal
        isOpen={!!openBlog}
        onClose={() => setOpenBlog(null)}
        blog={openBlog}
      />
    </section>
  );
};

export default LatestBlog;
