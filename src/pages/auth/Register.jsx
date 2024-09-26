import React from "react";

const Register = () => {
  return (
    <section className="bg-transparent">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-zinc-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Full Name"
                  className="border border-gray-400 text-zinc-900 text-sm rounded-lg block w-full p-2.5"
                  required=""
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-zinc-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="border border-gray-400 text-zinc-900 text-sm rounded-lg block w-full p-2.5"
                  required=""
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-zinc-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-400 text-zinc-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-zinc-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border border-gray-400 text-zinc-900 text-sm rounded-lg block w-full p-2.5"
                  required=""
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-zinc-800 text-white focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>

              {/* Already have an account? */}
              <p className="text-sm font-light">
                Already have an account?{" "}
                <a href="#" className="font-medium hover:underline">
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
