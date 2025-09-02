import React, { useState, useRef, useEffect } from "react";

import { AiOutlineVideoCamera } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export const RecordVideo = ({ cameraConnected, stream, redirectURL, recordTimeInSeconds }) => {
    const videoRef = useRef(null);

    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [seconds, setSeconds] = useState(0);

    // Handle attaching the stream to the video element once cameraConnected is true
    useEffect(() => {
        if (cameraConnected && videoRef.current && stream) {
            videoRef.current.srcObject = stream; // Attach stream to video element
        }
    }, [cameraConnected, stream]);

    useEffect(() => {
        if (seconds < recordTimeInSeconds) {
            const intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [seconds]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(1, '0')} mins ${seconds.toString().padStart(1, '0')} seconds`;
    };

    const recordVideo = () => {
        if (isRecording) {
            setIsRecording(false);
            setIsRecorded(true);
        } else {
            setIsRecording(true);
            setSeconds(0);
        }
    };

    const submit = () => {
        localStorage.setItem("VideoRecorded", true);
        navigate(redirectURL);
    };

    return (
        <div className="px-[40px] py-[20px] xl:p-[40px] flex justify-center">
            <div className="w-[1400px] flex flex-col lg:flex-row gap-[20px] p-[30px] xl:p-[60px] bg-[#f3f7f7] shadow-xl">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div className="min-h-[450px] lg:min-h-[550px] min-w-[350px] xl:min-w-[400px] max-w-[500px] flex flex-col gap-[15px]">
                        <div className="pb-[10px] text-[20px] xl:text-[30px] text-[#576971] font-[700] border border-solid border-x-0 border-t-0 border-b-1 border-[#000000]">Question</div>
                        <div className="pb-[10px] text-[14px] xl:text-[16px] text-[#576871]">Describe a time when you worked collaboratively as past of a team to achieve a common goal at work.</div>
                        <div className="text-[#576871] h-[30px] text-[16px] flex flex-col gap-[5px]">
                            <div className="font-bold text-[14px] xl:text-[16px]">In your response, consider discussing the following:</div>
                            <div className="ml-4 text-[14px] xl:text-[16px]">- What was the goal of the team?</div>
                            <div className="ml-4 text-[14px] xl:text-[16px]">- What were the challenges you faced as a team?</div>
                            <div className="ml-4 text-[14px] xl:text-[16px]">- How did you overcome these challenges?</div>
                            <div className="ml-4 text-[14px] xl:text-[16px]">- What were the results of your collaboration?</div>

                            <div className="mt-0 xl:mt-4 font-bold text-[14px] xl:text-[16px]">Pro tips:</div>
                            <div className="ml-4 text-[14px] xl:text-[16px]">- You likely have many examples you can draw from! Choose an example that is most relevant to the job you're applying for and talk about an actual situation that you faced in the past.</div>
                            <div className="ml-4 text-[14px] xl:text-[16px]">- Be specific and concise.</div>
                            <div className="ml-4 text-[14px] xl:text-[16px]">- Emphasize your role in the situation you're describing.</div>
                            <div className="ml-4 text-[14px] xl:text-[16px]">- Even if you were part of a team, make sure to clarify your specific contributions.</div>
                        </div>
                    </div>
                </div>
                {/* Right Section */}
                <div className="flex-1 flex flex-col gap-[20px]">
                    <div className="flex justify-center">
                        <div className="w-[350px] h-[300px] 2xl:w-[600px] 2xl:h-[500px] px-6 py-6 rounded-lg flex flex-row justify-center bg-[#e7eeef] text-[14px] text-[#576871] border border-solid border-black border-1">
                            {
                                !cameraConnected ?
                                    <AiOutlineVideoCamera className="w-[350px] h-[250px] 2xl:w-[600px] 2xl:h-[450px]" />
                                    :
                                    <video ref={videoRef} autoPlay playsInline className="h-auto rounded-lg" style={{ width: "100%" }}></video>
                            }
                        </div>
                    </div>
                    {
                        isRecording ?
                            <div className="underline text-[#576871] text-[14px] font-bold w-full flex flex-row items-center gap-[5px] justify-end text-end px-[20px] leading-[1.2]">
                                <AiOutlineClockCircle className="w-[16px] h-[16px]" />
                                {formatTime(seconds)}
                            </div>
                            :
                            ""
                    }
                    <div className={isRecording ? "px-[10px] w-full flex justify-center gap-[20px]" : "mt-9 px-[10px] w-full flex justify-center gap-[20px]"}>
                        {
                            !isRecorded ?
                                <button className={isRecording ? "bg-red-500 text-white px-12 py-3 rounded-lg flex items-center justify-center w-full" : "bg-[#068932] text-white px-12 py-3 rounded-lg flex items-center justify-center w-full"} onClick={recordVideo}>
                                    {
                                        isRecording ?
                                            <AiOutlinePauseCircle className="w-[24px] h-[24px]" />
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                            </svg>
                                    }

                                    {
                                        !isRecording ?
                                            <span className="ml-2 font-semibold ">Record</span>
                                            :
                                            <span className="ml-2 font-semibold ">Recording</span>
                                    }
                                </button>
                                :
                                <button className={isRecording ? "bg-red-500 text-white px-12 py-3 rounded-lg flex items-center justify-center w-full" : "bg-[#068932] text-white px-12 py-3 rounded-lg flex items-center justify-center w-full"} onClick={recordVideo}>
                                    {
                                        isRecording ?
                                            <AiOutlinePauseCircle className="w-[24px] h-[24px]" />
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                            </svg>
                                    }

                                    {
                                        !isRecording ?
                                            <span className="ml-2 font-semibold ">Retry</span>
                                            :
                                            <span className="ml-2 font-semibold ">Recording . . .</span>
                                    }
                                </button>
                        }
                        <a className={isRecorded && !isRecording ? "cursor-pointer bg-[#068932] text-white px-12 py-3 rounded-lg flex items-center justify-center w-full" : "bg-gray-300 text-gray-500 px-12 py-3 rounded-lg flex items-center justify-center w-full"} onClick={submit} >
                            <AiOutlineUpload className="w-[24px] h-[24px]" />
                            <span className="ml-2 font-semibold ">Submit</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecordVideo;