import React from 'react'

const TestParts = ({ handleScrollToSection, questionCount }) => {
  return (
    <div className="w-full max-w-[1000px] p-4 lg:p-8">
      <h1 className="text-4xl lg:text-5xl font-normal text-gray-700 mb-6">
        Sections
      </h1>
      <p className="text-gray-600 text-base"> There are 2 sections that are part of this assessment.</p>
      <div className="overflow-x-auto pt-4 shadow-xl">
        <table className="min-w-full text-base text-gray-600">
          <thead>
            <tr className="bg-white border-b">
              <th className="text-left p-3 font-normal py-5">NUMBER</th>
              <th className="text-left p-3 font-normal py-5">SECTION</th>
              <th className="text-left p-3 font-normal py-5">DETAIL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="text-left p-3">1</td>
              <td className="text-left p-3">Fundamentals</td>
              <td className="text-left p-3">Answer to {questionCount} questions</td>
            </tr>
            <tr className="border-b">
              <td className="text-left p-3">2</td>
              <td className="text-left p-3">Video Introduction</td>
              <td className="text-left p-3">Prepared Video Introduction</td>
            </tr>
            {/* <tr className="border-b">
              <td className="text-left p-3">3</td>
              <td className="text-left p-3">Interview Preparation</td>
              <td className="text-left p-3">Leave Feedback to help enhance and improve the quality of this assessment.</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-start mt-8 space-x-4 hidden lg:block">
        <button
          onClick={() => handleScrollToSection("step-4-section")}
          className="bg-green-600 font-medium text-white py-2 px-6 shadow-md shadow-green-700 hover:bg-green-700"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default TestParts;