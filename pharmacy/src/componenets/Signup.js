import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [text, usetext] = useState(false);
  const navigate = useNavigate();
  const role_type = useRef(null);
  const username = useRef(null);
  const password = useRef(null);

  return (
    <div className="bg-[url('https://t3.ftcdn.net/jpg/06/41/93/88/360_F_641938894_rKGnLeNpwnaD4RkzKzVFNlTw4EI44NNm.jpg')] bg-cover bg-center  h-[100vh]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Harsha Managements
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const userid = username.current.value;
              const role = role_type.current.value;
              const pass = password.current.value;
              const data = {
                username: userid,
                password: pass,
              };

              if (role === "administrator") {
                navigate("/");
              } else {
                try {
                  const response = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });

                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }

                  const result = await response.json();

                  console.log('Success:', result);

                  console.log(result.employeeid);

                  navigate("/employee/" + result.employeeid);
                } catch (error) {
                  usetext(true);
                  console.error('Error:', error);
                }
              }
            }}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <div className="mt-2">
                <select
                  ref={role_type}
                  id="role"
                  name="role"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select a role</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="administrator">Administrator</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  ref={username}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  ref={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {text && <div className='text-red-500'>Invalid Password/Username</div>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
