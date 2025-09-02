import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AiOutlineClockCircle, AiOutlineUser, AiOutlineInfoCircle } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { useUsername } from "../providers/AppProvider";
import QuizLogo from "../assets/logo.png";
import RichTextEditor from '../components/RichTextEditor';
import Instructions from "../components/Instructions";
import { UNIQUE, testConfig, BackendURL, getTestUUIDByURI, MSG_INVALID_LINK, getRedirectURL, getInviteUUIDByURI } from "../config/config";

// Configuration
const testUUID = getTestUUIDByURI(window.location.href);
const inviteUUID = getInviteUUIDByURI(window.location.href);

let companyName = "";
let roleName = "";
let questionCount = "";
let timeLimitInMinute = "";
let redirectURL = "";
let questions = [];

if (window.location.pathname != "/404") {
    if (testUUID == MSG_INVALID_LINK) {
        // Navigate to ERROR Page
        window.location.pathname = "/404";
    } else {
        questionCount = testConfig[testUUID].questionCount;
        timeLimitInMinute = testConfig[testUUID].testDurationInMinute;
        redirectURL = getRedirectURL(inviteUUID, 1);
        questions = testConfig[testUUID].questions;
        companyName = testConfig[testUUID].companyName;
        roleName = testConfig[testUUID].roleName;
    }
}

export const Quiz = () => {
    const userName = localStorage.getItem('fullName');
    const [currentQuestion, setCurrentQuestion] = useState(-2);
    const [answers, setAnswers] = useState(["", "", ""]);
    const [isInstruction, setIsInstruction] = useState(false);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [solvedQuestions, setSolvedQuestions] = useState({});

    const handleSolveClick = (index) => {
        setSolvedQuestions(prevState => ({ ...prevState, [index]: true }));
        selectQuestion(index);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const uuid = localStorage.getItem('inviteUUID');

        if (uuid == inviteUUID) {
            const ans = localStorage.getItem('answers');
            if (ans != null) {
                // console.log(JSON.parse(ans));
                setAnswers(JSON.parse(ans));
            }
        } else {
            navigate(`/invite/${inviteUUID}`);
        }
    }, []);

    const selectQuestion = (questionID) => {
        setCurrentQuestion(questionID);
    };

    const selectAll = () => {
        setCurrentQuestion(-2);
    };

    const showInstruction = () => {
        setCurrentQuestion(-1);
    };

    const nextQuestion = () => {
        const newQuestion = currentQuestion + 1;

        // Check if we're on the last question
        if (newQuestion >= questionCount) {
            setCurrentQuestion(-2); // or any other value to indicate end, like -1 or null
            // Mark the last question as solved
            setSolvedQuestions((prev) => ({
                ...prev,
                [currentQuestion]: true, // Mark the last question as solved
            }));
            return;
        }

        // Mark the current question as solved before moving to the next
        setSolvedQuestions((prev) => ({
            ...prev,
            [currentQuestion]: true, // Mark the current question as solved
        }));

        // Move to the next question
        setCurrentQuestion(newQuestion);

        // Optionally, reset the next question's solved state (if not solved yet)
        if (!solvedQuestions[newQuestion]) {
            setSolvedQuestions((prev) => ({
                ...prev,
                [newQuestion]: false, // Ensure the next question starts unsolved
            }));
        }
    };


    const sendMail = async () => {
        try {
            const response = await axios.post(`${BackendURL}/video-just`, {
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

    const completeSection = async () => {
        localStorage.setItem('answers', JSON.stringify(answers));


        sendMail();
        navigate(redirectURL);
    };

    useEffect(() => {
        const savedAnswers = localStorage.getItem("answers");
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);

    useEffect(() => {
        if (answers.length > 0) {
            localStorage.setItem("answers", JSON.stringify(answers));
        }
        let iCount = 0;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] != "" && answers[i] != "<p><br></p>") {
                iCount++;
            }
        }

        setAnsweredCount(iCount);
    }, [answers]);

    return (
        <div className="min-w-[800px] ">
            {/* Header */}
            <div className="h-[60px] bg-[#0e141e] px-5 flex flex-row align-center justify-between text-[14px] font-[400] font-sans text-white">
                <div className="flex flex-row gap-[20px] py-[10px] h-[60px]">
                    <a className="">
                        <img className="h-[40px] w-[40px]" src={QuizLogo} alt="Hiring Assessment Logo" />
                    </a>
                    <h1 className="py-[9px]">{companyName} {roleName} Hiring Assessment</h1>
                </div>
                <div className="flex flex-row gap-[40px] py-[19px]">
                    <div>Answered: <b>{answeredCount} / {questionCount}</b></div>
                    <div className="flex flex-row gap-[10px]">
                        <AiOutlineClockCircle className="w-[22px] h-[22px]" />
                        <b>{timeLimitInMinute} mins</b>
                    </div>
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
                        <a className={currentQuestion == -2 ? "cursor-pointer px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid bg-[#f3f7f7] text-[#075c8e] border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]" : "cursor-pointer text-[#39424e] px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid border-y-[1px] border-x-0 border-[#dfdfe2]"} onClick={selectAll}>
                            ALL
                        </a>
                        <a className={currentQuestion == -1 ? "cursor-pointer px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid bg-[#f3f7f7] text-[#075c8e] border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]" : "cursor-pointer text-[#39424e] px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]"} onClick={showInstruction}>
                            <AiOutlineInfoCircle className="w-[22px] h-[22px]" />
                        </a>
                        <a className={currentQuestion == 0 ? "cursor-pointer px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid bg-[#f3f7f7] text-[#075c8e] border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]" : "cursor-pointer text-[#39424e] px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]"} onClick={() => selectQuestion(0)}>
                            1
                        </a>
                        <a className={currentQuestion == 1 ? "cursor-pointer px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid bg-[#f3f7f7] text-[#075c8e] border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]" : "cursor-pointer text-[#39424e] px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]"} onClick={() => selectQuestion(1)}>
                            2
                        </a>
                        <a className={currentQuestion == 2 ? "cursor-pointer px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid bg-[#f3f7f7] text-[#075c8e] border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]" : "cursor-pointer text-[#39424e] px-[20px] h-[60px] flex align-center justify-center font-bold py-[20px] border border-solid border-t-0 border-b-[1px] border-x-0 border-[#dfdfe2]"} onClick={() => selectQuestion(2)}>
                            3
                        </a>
                    </div>
                </div>
                {/* Right Panel */}'
                {
                    currentQuestion == -1 ?
                        <Instructions />
                        :
                        <div className="pl-[110px] px-[20px] flex flex-col w-full bg-[#f3f7f7] h-screen">
                            {/* Panel Header */}
                            <div className="flex flex-col justify-center px-[10px] h-[70px] text-[#576871] tracking-[2.5px] font-[400] text-[13px] border border-solid border-b-[1px] border-x-0 broder-t-0 border-[#e7eeef]">
                                <h2 className="flex flex-row gap-[10px]">
                                    Fundamentals (Section 1)
                                    {
                                        (currentQuestion >= 0) ? <BsArrowRightShort className="w-5 h-5" /> : ""
                                    }
                                    {currentQuestion >= 0 ? "Question " + (currentQuestion + 1) : ""}
                                </h2>
                            </div>
                            {/* Main Panel */}
                            {
                                currentQuestion < 0 ?
                                    <div className="w-full pt-[50px]">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="h-[60px] py-[20px] font-[700] text-[12px] text-[#576871]">
                                                    <td className="px-[15px]">QUESTIONS</td>
                                                    <td className="px-[15px]">ACTION</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {questions.map((value, index) => (
                                                    <tr key={index} className="h-[80px] py-[20px] break-words text-[#0e141e] bg-white font-bold">
                                                        <td className="px-[15px] underline">
                                                            <a className="cursor-pointer hover:text-[#068932]" onClick={() => selectQuestion(index)}>
                                                                {value[0]}
                                                            </a>
                                                        </td>
                                                        <td className="px-[15px]">
                                                            <a
                                                                className={`cursor-pointer font-bold px-[40px] py-[10px] h-[40px] border border-solid border-[2px] ${solvedQuestions[index] ? 'bg-gray-500 text-white border-gray-500' : 'bg-[#068932] text-white hover:text-[#068932] hover:bg-white hover:border-[#068932]'}`}
                                                                onClick={() => handleSolveClick(index)}
                                                            >
                                                                Solve
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="h-[160px] py-[30px] break-words text-[#0e141e] font-bold">
                                                    <td className="px-[15px]"></td>
                                                    <td className="px-[15px]">
                                                        <a className="cursor-pointer text-[#068932] bg-white hover:bg-[#068932] hover:text-white font-bold px-[40px] py-[10px] h-[40px] border border-solid border-[2px] border-[#068932]" onClick={completeSection}>
                                                            Complete
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <div className="w-full mt-[20px] lg:mt-[50px] flex flex-col justify-start">
                                        <div className="font-[700] text-[16px] lg:text-[20px] text-[#576871] flex my-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2 mt-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                            </svg>
                                            Question {currentQuestion + 1}
                                        </div>

                                        {/* Question Prompt */}
                                        <div className="mb-6 font-[400] text-[16px] lg:text-[20px] text-[#576871] flex flex-col gap-[5px]">
                                            {questions[currentQuestion].map((value, index) => (
                                                <p key={index} className="font-san">{value}</p>
                                            ))}
                                        </div>

                                        <div className="font-[700] text-[16px] lg:text-[20px] text-[#576871] flex mt-5 lg:mt-12 text-left mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-2 mt-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                            </svg>
                                            Answer
                                        </div>

                                        <RichTextEditor className="" setAnswers={setAnswers} answers={answers} currentQuestion={currentQuestion} />

                                        <div className="mt-10">
                                            <a className="cursor-pointer text-[#068932] bg-white hover:bg-[#068932] hover:text-white font-bold px-[40px] py-[10px] h-[40px] border border-solid border-[2px] border-[#068932]" onClick={nextQuestion}>
                                                Continue
                                            </a>
                                        </div>
                                    </div>
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export default Quiz;