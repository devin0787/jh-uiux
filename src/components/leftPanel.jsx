import React from 'react'

const LeftPanel = ({ companyName, companyURL, questionCount, testDurationInMinute, roleName }) => {
  return (
    <div className="w-full lg:w-2/5 flex flex-col bg-white sticky top-4 h-[200px] lg:h-[500px] lg:h-screen">
      <div className="flex flex-col items-start justify-center lg:py-10 px-14">
        {/* Header Section */}
        <div className="mb-12 hidden lg:block">
          <h1 className="text-[20px] xl:text-3xl font-bold text-gray-800 underline">
            <a href={companyURL} target="_blank" rel="noopener noreferrer">
              {companyName}
            </a>
          </h1>
        </div>

        {/* Content Section */}
        <div className="space-y-6 mt-[10px] lg:mt-[140px]">
          <div>
            <h2 className="text-[30px] xl:text-5xl font-bold text-gray-800 leading-snug">
              Welcome to Your {companyName} Assessment Experience
            </h2>
            <p className="mt-4 text-base text-gray-500">
              You’ve been invited to complete the hiring assessment for the <span className="font-medium">{roleName}</span> position.
              This test is hosted via our secure platform and is designed to help us better understand your skills and potential fit.
              <br />
              Please take a moment to review the details below before you begin.
            </p>
          </div>

          <div className="flex space-x-12 text-gray-600 text-lg">
            <div>
              <p className="font-thin">Test duration:</p>
              <p className="font-medium">{testDurationInMinute} mins</p>
            </div>
            <div>
              <p className="font-thin">No. of questions:</p>
              <p className="font-medium">{questionCount} questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      {/* <div className="w-full lg:w-2/5 bg-white fixed py-4 px-14 bottom-0">
        <div className="space-x-4 text-gray-500 bottom-4 text-sm self-center md:self-start font-bold lg:left-20">
          <a
            href="#"
            className="underline decoration-dashed decoration-blue-900 text-blue-900"
          >
            Platform Help
          </a>
          <span>|</span>
          <a
            href="#"
            className="underline decoration-dashed decoration-blue-900  text-blue-900"
          >
            Execution Environment
          </a>
          <span>|</span>
          <a
            href="#"
            className="underline decoration-dashed decoration-blue-900  text-blue-900"
          >
            FAQ
          </a>
        </div>
      </div> */}
    </div>
  )
}

export default LeftPanel