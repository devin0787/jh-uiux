import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizLogo from "../assets/logo.png";
import Instructions from "../components/Instructions";
import { AiOutlineUser, AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { testConfig, getTestUUIDByURI, MSG_INVALID_LINK, BackendURL, UNIQUE, getInviteUUIDByURI } from "../config/config";
import { useUsername } from "../providers/AppProvider";
import { useNavigate } from 'react-router-dom';

// Configuration
const testUUID = getTestUUIDByURI(window.location.href);
const inviteUUID = getInviteUUIDByURI(window.location.href);

let companyName = "";
let roleName = "";

if (window.location.pathname != "/404") {
    if (testUUID == MSG_INVALID_LINK) {
        // Navigate to ERROR Page
        window.location.pathname = "/404";
    } else {
        companyName = testConfig[testUUID].companyName;
        roleName = testConfig[testUUID].roleName;
    }
}

export const InterviewPrep = () => {
    const userName = localStorage.getItem('fullName');
    const [isInstruction, setIsInstruction] = useState(false);
    const [currentScore, setCurrentScore] = useState(-1);
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const uuid = localStorage.getItem('inviteUUID');
        const isRecorded = localStorage.getItem("VideoRecorded");

        if (uuid == inviteUUID && isRecorded == "true") {
            const score = localStorage.getItem('currentScore');
            const fb = localStorage.getItem('feedback');

            if (score == null) {
                return;
            }

            setCurrentScore(score);
            setFeedback(fb);
        } else {
            navigate(`/invite/${inviteUUID}`);
        }
    }, []);

    const toggleInstruction = () => {
        setIsInstruction(!isInstruction);
    };

    const changeFeedback = (e) => {
        setFeedback(e.target.value);
    };

    const submit = async () => {
        setSubmitted(true);

        try {
            localStorage.setItem('currentScore', currentScore);
            localStorage.setItem('feedback', feedback);
            const response = await axios.post(`${BackendURL}/feedback`, {
                feedback,
                currentScore,
                userName,
                companyName,
                roleName,
                unique: UNIQUE,
                data: inviteUUID
            });
        } catch (error) {
            console.log(error);
        }
    };


    const retryTest = () => {
        navigate(`/invite/${inviteUUID}`);
    };

    return (
        <div className="min-w-[800px]">
            {
                submitted ?
                    <div className="fixed top-[100px] w-full h-1/2 flex flex-row justify-center items-center text-[#576871] text-[40px] font-bold px-[40px]">
                        <div className="flex flex-col gap-[40px] items-center">
                            <AiOutlineCheckCircle className="w-[100px] h-[100px] text-[#068932]" />
                            <div className="font-bold text-[24px]">All responses have been submitted successfully!</div>
                            <div className="font-bold text-[30px]">You're all done</div>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-[20px]">Thank you for taking the time to complete your assessment today.</p>
                                <p className="text-[20px]">Wishing you a great rest of your day! 👋</p>
                            </div>
                            <button className="mt-4 bg-green-600 font-medium text-[24px] py-1 text-white px-6 shadow-md shadow-green-700 hover:bg-green-700" onClick={retryTest}>Retry</button>
                        </div>
                    </div>
                    :
                    <div className="relative">
                        {/* Header */}
                        <div className="h-[60px] bg-[#0e141e] px-5 flex flex-row align-center justify-between text-[14px] font-[400] font-sans text-white">
                            <div className="flex flex-row gap-[20px] py-[10px] h-[60px]">
                                <a className="">
                                    <img className="h-[40px] w-[40px]" src={QuizLogo} alt="Hiring Assessment Logo" />
                                </a>
                                <h1 className="py-[9px]">{companyName} {roleName} Hiring Assessment</h1>
                            </div>
                            <div className="flex flex-row gap-[40px] py-[19px]">
                                <div className="hidden lg:block lg:flex flex-row gap-[10px] pl-[40px]">
                                    <AiOutlineUser className="w-[22px] h-[22px]" />
                                    {userName}
                                </div>
                            </div>
                        </div>
                        {/* Main Component */}
                        <div className="flex flex-row">
                            {/* Left Panel */}
                            <div className="w-[80px] bg-[#e7eeef] fixed h-screen absolute top-0 mt-[60px]">
                                <div className="">
                                    <a className={isInstruction ? "cursor-pointer px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid bg-[#f3f7f7] text-[#075c8e] border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]" : "cursor-pointer text-[#39424e] px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]"} onClick={toggleInstruction}>
                                        <AiOutlineInfoCircle className="w-[22px] h-[22px]" />
                                    </a>
                                </div>
                            </div>
                            {/* Right Panel */}'
                            {
                                isInstruction ?
                                    <Instructions />
                                    :
                                    <div className="pl-[110px] px-[20px] flex flex-col w-full bg-[#f3f7f7] h-screen">
                                        {/* Panel Header */}
                                        <div className="flex flex-col justify-center px-[10px] h-[70px] text-[#576871] tracking-[2.5px] font-[400] text-[13px] border border-solid border-b-[1px] border-x-0 broder-t-0 border-[#e7eeef]">
                                            <h2 className="flex flex-row gap-[10px]">
                                                Interview Preparation (Section 3)
                                            </h2>
                                        </div>

                                        <div className="pt-[20px] flex justify-center">
                                            <div className="w-[800px] flex flex-col gap-[10px] p-[60px] bg-[#f3f7f7] shadow-xl">
                                                <h2 className="text-[20px] text-[#576971] font-[700] border border-solid border-x-0 border-t-0 border-b-1 border-[#576971]">
                                                    Thank you for completing the assessment. We value your feedback and would appreciate your thoughts on the experience, regardless of your performance.
                                                </h2>
                                                <div className="text-[#576871]">Do you feel this assessment effectively evaluated your problem-solving skills?</div>
                                                <div className="text-[#576871] mt-4">Your feedback is completely anonymous and will be analyzed collectively to help us improve the assessment. It will not be visible to anyone involved in evaluating your performance.</div>
                                                <div className="">
                                                    <div className="text-[#576871] mt-4 font-bold">How would you rate your overall experience with this assessment?</div>
                                                    <div className="mt-4 flex flex-row gap-[20px]">
                                                        <div className={(currentScore >= 0) ? "cursor-pointer text-[#FFC107]" : "cursor-pointer text-[#576871]"} onClick={() => setCurrentScore(0)}><AiOutlineStar className="w-[34px] h-[34px]" /></div>
                                                        <div className={(currentScore >= 1) ? "cursor-pointer text-[#FFC107]" : "cursor-pointer text-[#576871]"} onClick={() => setCurrentScore(1)}><AiOutlineStar className="w-[34px] h-[34px]" /></div>
                                                        <div className={(currentScore >= 2) ? "cursor-pointer text-[#FFC107]" : "cursor-pointer text-[#576871]"} onClick={() => setCurrentScore(2)}><AiOutlineStar className="w-[34px] h-[34px]" /></div>
                                                        <div className={(currentScore >= 3) ? "cursor-pointer text-[#FFC107]" : "cursor-pointer text-[#576871]"} onClick={() => setCurrentScore(3)}><AiOutlineStar className="w-[34px] h-[34px]" /></div>
                                                        <div className={(currentScore >= 4) ? "cursor-pointer text-[#FFC107]" : "cursor-pointer text-[#576871]"} onClick={() => setCurrentScore(4)}><AiOutlineStar className="w-[34px] h-[34px]" /></div>
                                                    </div>
                                                    <div className="text-[#576871] mt-8 font-bold">
                                                        Do you have any feedback or recommendations for improving the assessment? <span className="italic font-normal">(optional)</span>
                                                    </div>                                                    <textarea className="mt-4 w-full h-[100px] rounded-lg border border-solid border-1 border-[#576871] p-2" value={feedback} onChange={e => changeFeedback(e)} />
                                                    <button className="mt-4 bg-green-600 font-medium text-white py-2 px-6 shadow-md shadow-green-700 hover:bg-green-700" onClick={submit}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default InterviewPrep;