import React, { useState } from 'react';

const AuthForm = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg flex">
        {/* Animated container */}
        <div 
          className="flex w-full transition-transform duration-500 ease-in-out" 
          style={{ transform: isLoginForm ? 'translateX(0)' : 'translateX(-50%)' }}
        >
          {/* Sign In Panel */}
          <div className="w-full flex flex-row">
            <div className="bg-emerald-500 text-white p-12 w-2/5 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-center">
                  <div className="p-2 bg-white bg-opacity-20 rounded">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <span className="ml-2 text-lg font-semibold">Diprella</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
              <p className="mb-8 opacity-80">To keep connected with us please login with your personal info</p>
              <button 
                onClick={toggleForm}
                className="border-2 border-white text-white py-2 px-8 rounded-full hover:bg-white hover:text-emerald-500 transition-colors duration-300 self-center"
              >
                SIGN UP
              </button>
            </div>
            
            <div className="bg-white p-12 w-3/5 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign in to Diprella</h2>
              <div className="flex justify-center space-x-4 mb-6">
                <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-gray-500 mb-6">or use your email account:</p>
              <form className="space-y-4">
                <div className="relative">
                  <input 
                    type="email" 
                    className="w-full bg-gray-100 border-0 rounded-md p-3 pl-10" 
                    placeholder="Email" 
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    className="w-full bg-gray-100 border-0 rounded-md p-3 pl-10" 
                    placeholder="Password" 
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input id="remember" type="checkbox" className="h-4 w-4 text-emerald-500 border-gray-300 rounded" />
                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-emerald-500 hover:underline">Forgot password?</a>
                </div>
                <button className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition-colors">
                  SIGN IN
                </button>
              </form>
            </div>
          </div>
          
          {/* Sign Up Panel */}
          <div className="w-full flex flex-row">
            <div className="bg-white p-12 w-3/5 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
              <div className="flex justify-center space-x-4 mb-6">
                <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-gray-500 mb-6">or use your email for registration:</p>
              <form className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-gray-100 border-0 rounded-md p-3 pl-10" 
                    placeholder="Name" 
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    className="w-full bg-gray-100 border-0 rounded-md p-3 pl-10" 
                    placeholder="Email" 
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    className="w-full bg-gray-100 border-0 rounded-md p-3 pl-10" 
                    placeholder="Password" 
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition-colors">
                  SIGN UP
                </button>
              </form>
            </div>
            
            <div className="bg-emerald-500 text-white p-12 w-2/5 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Hello, Friend!</h2>
              <p className="mb-8 opacity-80">Enter your personal details and start journey with us</p>
              <button 
                onClick={toggleForm}
                className="border-2 border-white text-white py-2 px-8 rounded-full hover:bg-white hover:text-emerald-500 transition-colors duration-300 self-center"
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-red-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-yellow-400 rounded-full opacity-20"></div>
      </div>
    </div>
  );
};

export default AuthForm;