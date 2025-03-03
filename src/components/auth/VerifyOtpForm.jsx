import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://stem-api.istad.co/api/verify-otp/', { otp });
      // Handle successful OTP verification
    } catch (error) {
      // Handle OTP verification error
      console.error('OTP verification error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <div className="mb-4">
        <label className="block text-gray-700">OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-all">
        Verify OTP
      </button>
    </form>
  );
};

export default VerifyOtpForm;
