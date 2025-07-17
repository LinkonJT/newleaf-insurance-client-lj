import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import AppSpinner from '../../../component/AppSpinner';

const AddPolicy = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newPolicy) => {
      const res = await axiosSecure.post('/policies', newPolicy);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Policy added successfully!', 'success');
      reset();
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong. Try again.', 'error');
    },
  });


 
  const onSubmit = async (data) => {
    data.premium = parseFloat(data.premium);
    await mutateAsync(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Policy</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('title', { required: true })} placeholder="Title" className="input input-bordered w-full" />
        <textarea {...register('description', { required: true })} placeholder="Description" className="textarea textarea-bordered w-full" />
        <input {...register('category', { required: true })} placeholder="Category (e.g. Life, Health)" className="input input-bordered w-full" />
        <input type="number" step="0.01" {...register('premium', { required: true })} placeholder="Premium (USD)" className="input input-bordered w-full" />
        <input {...register('coverage', { required: true })} placeholder="Coverage Details" className="input input-bordered w-full" />
        <input {...register('duration', { required: true })} placeholder="Duration (e.g. 10 years)" className="input input-bordered w-full" />
        <input {...register('terms', { required: true })} placeholder="Terms & Conditions" className="input input-bordered w-full" />

        <button type="submit" className="btn btn-primary w-full">
          {isPending ? <AppSpinner /> : 'Add Policy'}
        </button>
      </form>
    </div>
  );
};

export default AddPolicy;
