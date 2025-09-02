import React from "react";
import Responsibilities from "./responsibilities";
import KeyRequirements from "./keyrequirements";
import TestParts from "./testParts";
import ConfirmationForm from "./confirmationForm";

const RightPanel = ({ questionCount, responsibilities, keyrequirements, submitCallBack, testUUID, inviteUUID }) => {
  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="lg:w-3/5 sm:w-full bg-stone-100 overflow-y-scroll h-screen py-4 lg:py-8 px-6 space-y-6 lg:space-y-12">
      <div
        className="max-h-[600px] lg:max-h-screen lg:h-screen p-4 lg:p-8 flex flex-col justify-start lg:justify-center"
        id="step-1-section"
      >
        <Responsibilities slideSection={handleScrollToSection} responsibilities={responsibilities} />
      </div>
      <div
        className="max-h-[600px] lg:max-h-screen lg:h-screen p-4 lg:p-8 flex flex-col justify-start lg:justify-center"
        id="step-2-section"
      >
        <KeyRequirements slideSection={handleScrollToSection} keyrequirements={keyrequirements} />
      </div>
      <div
        id="step-3-section"
        className="max-h-[600px] lg:max-h-screen lg:h-screen p-4 lg:p-8 flex flex-col justify-start lg:justify-center "
      >
        <TestParts handleScrollToSection={handleScrollToSection} questionCount={questionCount} />
      </div>
      <div id="step-4-section" className="max-h-[600px] lg:max-h-screen lg:h-screen p-4 lg:p-6 h-full">
        <ConfirmationForm submitCallBack={submitCallBack} testUUID={testUUID} inviteUUID={inviteUUID} />
      </div>
    </div>
  );
};

export default RightPanel;
