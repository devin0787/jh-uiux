import React from "react";

const Responsibilities = ({ slideSection, responsibilities }) => {
  return (
    <div className="w-full max-w-[1000px] p-4 lg:p-8">
      <h1 className="text-4xl lg:text-5xl font-normal text-gray-700 mb-6">
        Responsibilities
      </h1>
      <ol className="list-decimal pl-4 space-y-4 text-gray-600 text-base">
        {
          responsibilities.length > 0 ? responsibilities.map((value, index) => {
            return <li key={index}>{value}</li>
          }) : ""
        }
      </ol>
      <div className="flex items-center justify-start mt-8 space-x-4 hidden lg:block">
        <button
          onClick={() => slideSection("step-2-section")}
          className="bg-green-600 font-medium text-white py-2 px-6 shadow-md shadow-green-700 hover:bg-green-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Responsibilities;
