import React from "react";
import { useState, useEffect } from "react";

const ConfirmationForm = ({ submitCallBack, testUUID, inviteUUID }) => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    workExperience: "",
    social: "",
    gender: "",
    declaration: false,
    term: false,
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const email = localStorage.getItem('email');
    const fullName = localStorage.getItem('fullName');
    const social = localStorage.getItem('social');
    const gender = localStorage.getItem('gender');
    const declaration = localStorage.getItem('declaration') === "true";
    const term = true;//Boolean(localStorage.getItem('term'));
    const workExperience = localStorage.getItem('workExperience');

    if (email == null) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      email: email,
      fullName: fullName,
      workExperience: workExperience,
      social: social,
      gender: gender,
      declaration: declaration,
      term: term,
    }));
  }, []);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Only validate the changed field if it's password or confirmPassword
    if (name === "password" || name === "confirmPassword") {
      setErrors(prevErrors => {
        let newErrors = { ...prevErrors };
        // Remove confirmPassword error if passwords now match
        if (
          (name === "password" || name === "confirmPassword") &&
          formData.password &&
          formData.confirmPassword &&
          (name === "password" ? value : formData.password) === (name === "confirmPassword" ? value : formData.confirmPassword)
        ) {
          delete newErrors.confirmPassword;
        }
        return newErrors;
      });
    }

    if (submitted) {
      validate();
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.workExperience)
      newErrors.workExperience = "Work Experience is required";
    if (!formData.social)
      newErrors.social = "Social Link is required";
    if (!formData.gender)
      newErrors.gender = "Your Gender is required";
    if (!formData.declaration)
      newErrors.declaration = "You must agree to the declaration statement";
    // Password validation
    if (!formData.password)
      newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (validate()) {
      setTimeout(() => {
        setSubmitted(false);

        localStorage.setItem('testUUID', testUUID);
        localStorage.setItem('inviteUUID', inviteUUID);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('fullName', formData.fullName);
        localStorage.setItem('social', formData.social);
        localStorage.setItem('gender', formData.gender);
        localStorage.setItem('declaration', formData.declaration);
        localStorage.setItem('term', formData.term);
        localStorage.setItem('workExperience', formData.workExperience);
        localStorage.setItem('startTime', new Date().getTime());
        localStorage.setItem('password', formData.password); // Store password in localStorage

        submitCallBack(formData);
      });
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="w-full max-w-[1000px] p-4 lg:p-8">
      <h2 className="text-4xl lg:text-5xl font-normal text-gray-700 mb-6">
        Confirmation Form
      </h2>
      <p className="text-base mb-6 text-gray-700">
        {" "}
        Before we start, here is some extra information we need to asses you
        better.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block text-base text-gray-600 mb-3">
            Email address <span className="text-red-500 ">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full p-3 shadow-md rounded focus:outline-none focus:border-b-2 focus:border-green-500"
          />
          {errors.email && (
            <p className="text-red-500  text-sm mt-2">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              {errors.email}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-base text-gray-600 mb-3">
            Password <span className="text-red-500 ">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 shadow-md rounded focus:outline-none focus:border-b-2 focus:border-green-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              {errors.password}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-base text-gray-600 mb-3">
            Confirm Password <span className="text-red-500 ">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full p-3 shadow-md rounded focus:outline-none focus:border-b-2 focus:border-green-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-2">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-base text-gray-600  mb-3">
            Full Name <span className="text-red-500 ">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 shadow-md rounded focus:outline-none focus:border-b-2 focus:border-green-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-2">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="mb-4 w-1/2">
          <label className="block text-base text-gray-600  mb-3">
            Work Experience (in years) <span className="text-red-500 ">*</span>
          </label>
          <div className="relative">
            <select
              name="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
              className="w-full p-3 shadow-md appearance-none rounded focus:outline-none text-gray-600 focus:border-b-2 focus:border-green-500"
            >
              <option value="">Select</option>
              <option value="1-3">1-3 Years</option>
              <option value="4-6">4-6 Years</option>
              <option value="7+">7+ Years</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <i className="fa fa-angle-down text-xl"></i>
            </span>
          </div>
          {errors.workExperience && (
            <p className="text-red-500 text-sm mt-2">
              {" "}
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              {errors.workExperience}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-base text-gray-600 mb-3">
            Social Links (Linkedin, Twitter, ...) <span className="text-red-500 ">*</span>
          </label>
          <input
            type="text"
            name="social"
            value={formData.social}
            onChange={handleChange}
            placeholder="Enter your social link"
            className="w-full p-3 shadow-md rounded focus:outline-none focus:border-b-2 focus:border-green-500"
          />
          {errors.social && (
            <p className="text-red-500 text-sm mt-2">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              {errors.social}
            </p>
          )}
        </div>
        <div className="mt-14 mb-4">
          <h4 className="text-md mb-2 tracking-widest font-normal font-sans text-slate-400 ">
            DEMOGRAPHIC INFORMATION (OPTIONAL)
          </h4>
          <p className="text-base text-gray-600  font-normal">
            The information you provide here is strictly confidential. It will not be shared with recruiters or hiring managers, nor will it be used in hiring decisions. When analyzed in aggregate, this data helps us foster a more diverse and inclusive developer community.{" "}
          </p>
        </div>
        <div className="mb-4 w-1/2">
          <label className="block text-base text-gray-600  mb-3">Gender</label>
          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 pr-2 appearance-none  shadow-md rounded text-base text-gray-600 focus:outline-none focus:border-b-2 focus:border-green-500"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <i className="fa fa-angle-down text-xl"></i>
            </span>
          </div>
          {errors.gender && (
            <p className="text-red-500  text-sm mt-2">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              {errors.gender}
            </p>
          )}
        </div>

        <div className="mt-14 mb-4">
          <h4 className="text-base text-gray-600 mb-6">
            {" "}
            Declaration Statement <span className="text-red-500 ">*</span>
          </h4>
          <div className="flex items-inline space-x-3">
            <input
              type="checkbox"
              id="declaration"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              className="w-4 h-4 min-w-[16px] min-h-[16px] mt-2 appearance-none bg-white border border-gray-500  checked:bg-green-500 checked:border-green-600 transition-all duration-300"
            />
            <label htmlFor="declaration" className="text-gray-700 text-lg">
              <span className="text-gray-600 text-base">
                I agree not to copy code from any source, including colleagues, and will refrain from accessing websites or AI tools for assistance. Additionally, I commit to maintaining the confidentiality of this assessment by not copying, sharing, or disclosing any content or questions through any medium or platform.
              </span>
            </label>
          </div>
          {errors.declaration && (
            <p className="text-red-500 text-sm mt-2">
              <i className="fa fa-exclamation-circle" aria-hidden="true"></i>{" "}
              {errors.declaration}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`mb-20 lg:mb-0 py-2 px-6 mt-12 shadow-md font-semibold flex items-center justify-center  focus:outline-none ${submitted
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-300"
            }`}
          disabled={submitted}
        >
          {submitted ? (
            <>
              <span className="mr-2">Agree & start</span>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </>
          ) : (
            "Agree & Start"
          )}
        </button>
      </form>
    </div>
  );
};

export default ConfirmationForm;
