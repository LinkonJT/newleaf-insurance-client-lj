import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Select, TextInput, Radio } from 'flowbite-react';

const Quote = () => {
  const { id } = useParams(); // policy ID
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    coverageAmount: '',
    duration: '',
    smoker: 'no',
  });
  const [premium, setPremium] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePremium = () => {
    const { age, coverageAmount, duration, smoker } = formData;
    const ageNum = parseInt(age);
    const coverage = parseFloat(coverageAmount);
    const years = parseInt(duration);

    // Factors
    const baseRate = 0.0006;
    const ageFactor = ageNum > 50 ? 1.8 : ageNum > 40 ? 1.5 : ageNum > 30 ? 1.2 : 1.0;
    const durationFactor = years > 20 ? 1.2 : years < 15 ? 0.9 : 1;
    const smokerFactor = smoker === 'yes' ? 1.5 : 1.0;

    const monthly = (coverage * baseRate * ageFactor * durationFactor * smokerFactor).toFixed(2);
    const annual = (monthly * 12).toFixed(2);
    setPremium({ monthly, annual });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePremium();
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-200 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Get Your Insurance Quote</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="age" className="text-black">Age</label>
          <TextInput id="age" type="number" name="age" required onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="gender" className="text-black">Gender</label>
          <Select name="gender" required onChange={handleChange}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
        </div>

        <div>
          <label htmlFor="coverageAmount" value="Coverage Amount (BDT)" className="text-black"> Coverage Amount (BDT)</label>
          <TextInput id="coverageAmount" type="number" name="coverageAmount" required onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="duration" value="Policy Duration (Years)" className="text-black">Policy Duration (years)</label>
          <Select name="duration" required onChange={handleChange}>
            <option value="">Select</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
            <option>30</option>
          </Select>
        </div>

        <div>
          <label value="Are you a smoker?" className="text-black">Are you smoker</label>
          <div className="flex items-center gap-4 mt-1">
            <Radio id="smoker-no" name="smoker" value="no" defaultChecked onChange={handleChange} />
            <label htmlFor="smoker-no">No</label>
            <Radio id="smoker-yes" name="smoker" value="yes" onChange={handleChange} />
            <label htmlFor="smoker-yes">Yes</label>
          </div>
        </div>

        <Button type="submit" className="w-full">Get Estimated Premium</Button>
      </form>

      {premium && (
        <div className="text-center mt-4 space-y-2">
          <p className="text-lg font-semibold text-green-700">Estimated Monthly Premium: ৳{premium.monthly}</p>
          <p className="text-md text-gray-700">Estimated Annual Premium: ৳{premium.annual}</p>
          <Button onClick={() => navigate(`/apply/${id}`,  { state: { premium: premium.monthly } })} color="purple">Apply for Policy</Button>
        </div>
      )}
    </div>
  );
};

export default Quote;
