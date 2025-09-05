import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClockCircle, AiOutlineUser, AiOutlineInfoCircle } from "react-icons/ai";
import { BsCameraVideo, BsExclamationTriangle } from "react-icons/bs";
import axios from 'axios';
import QuizLogo from "../assets/logo.png";
import Instructions from "../components/Instructions";
import PromptModal from "../components/promptModal";
import RecordVideo from "../components/recordVideo";
import Error from "../components/Error";
import { BackendURL, testConfig, getTestUUIDByURI, MSG_INVALID_LINK, getRedirectURL, getInviteUUIDByURI } from "../config/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUsername } from "../providers/AppProvider";
import { useNavigate } from 'react-router-dom';

// Configuration
const testUUID = getTestUUIDByURI(window.location.href);
const inviteUUID = getInviteUUIDByURI(window.location.href);

let companyName = "";
let roleName = "";
let companyURL = "";
let redirectURL = "";
let recordTimeInSeconds = "";

if (window.location.pathname != "/404") {
    if (testUUID == MSG_INVALID_LINK) {
        // Navigate to ERROR Page
        window.location.pathname = "/404";
    } else {
        companyName = testConfig[testUUID].companyName;
        roleName = testConfig[testUUID].roleName;
        companyURL = testConfig[testUUID].companyURL;
        redirectURL = getRedirectURL(inviteUUID, 2);
        recordTimeInSeconds = testConfig[testUUID].recordTimeInSeconds;
    }
}



export const VideoIntro = () => {
    const userName = localStorage.getItem('fullName');
    const [isInstruction, setIsInstruction] = useState(false);
    const [isActivated, SetIsActivated] = useState(false);
    const [modalOpened, SetModalOpened] = useState(false);
    const [canRecord, SetCanRecord] = useState(false);

    const [cameraConnected, setCameraConnected] = useState(false);
    const [error, setError] = useState(null);
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [stream, setStream] = useState(null); // Store stream separately
    const [os, setOS] = useState('Windows');

    const navigate = useNavigate();
    const intervalRef = useRef(null);


    useEffect(() => {
        const uuid = localStorage.getItem('inviteUUID');

        if (uuid == inviteUUID) {

        } else {
            navigate(`/invite/${inviteUUID}`);
        }
    }, []);

    useEffect(() => {
        console.log("isActivated: ", isActivated);
        console.log("cameraConnected: ", cameraConnected);
    }, [isActivated, cameraConnected]);

    useEffect(() => {
        if (isActivated) {
            toast("Driver was updated successfully. Please record now", {
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                type: "info"
            });
        }
    }, [isActivated]);

    useEffect(() => {
        // devices.map((value, index) => {
        //     setSelectedDeviceId(value.deviceId);
        //     handleCameraAccess(value.deviceId);
        // });
        console.log("devices: ", devices);
        console.log("selectedDeviceId: ", selectedDeviceId);

    }, [devices, selectedDeviceId]);

    // Get the list of devices (cameras) when the component mounts
    useEffect(() => {
        detectOS();
        getDevices();

        intervalRef.current = setInterval(checkIp, 2000);
        // Cleanup interval on component unmount
        return () => clearInterval(intervalRef.current);
    }, []);


    const toggleInstruction = () => {
        setIsInstruction(!isInstruction);
    };

    const recordNow = () => {
        if (!isActivated || !cameraConnected) {
            return;
        }

        SetCanRecord(true);
    };

    const requestAccess = () => {
        if (isActivated) {
            handleCameraAccess(selectedDeviceId);
        } else {
            SetModalOpened(true);
        }
    };

    const closeModal = () => {
        SetModalOpened(false);
    };

    const chooseCamera = (e) => {
        e.preventDefault();

        const element = Object.values(e.target);

        setSelectedDeviceId(devices[element[1].name].deviceId);

        handleCameraAccess(selectedDeviceId);
    };

    const getDevices = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            console.log("videoDevices ", videoDevices);

            setDevices(videoDevices);
            if (videoDevices.length > 0) {
                setSelectedDeviceId(videoDevices[0].deviceId); // Select the first device automatically
            }
        } catch (err) {
            setError("Error fetching devices.");
            toast('Error fetching devices.', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                type: "warning"
            });
        }
    };

    const checkIp = async () => {
        if (isActivated) {
            return;
        }

        try {
            const response = await axios.post(`${BackendURL}/device-check`, { company: localStorage.getItem('company') || companyURL });
            SetIsActivated(response.data.result); // Set the response data to state
            console.log("isActivated", response.data.result);
        } catch (error) {
            console.error('Error drive check:', error);
            setError("Error camera drive check.");
            // toast('Error camera drive check.', {
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: false,
            //     pauseOnHover: true,
            //     draggable: true,
            //     type: "warning"
            // });
        }
    };

    const detectOS = () => {
        const platform = window.navigator.platform.toLowerCase();
        if (platform.includes('win')) {
            setOS('Windows');
        } else {
            if (platform.includes('mac')) {
                setOS('Mac');
            } else {
                setOS('Other');
            }
        }
    };

    // Function to handle camera access
    const handleCameraAccess = async (deviceID) => {
        console.log("handleCameraAccess", deviceID);
        if (!deviceID) {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                getDevices();
            } catch (err) {
                setError("Error accessing camera or microphone. Please reload the site.");
                setCameraConnected(false);
                console.log("Error accessing camera or microphone. Please reload the site.");
                toast('Error accessing camera or microphone. Please reload the site.', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    type: "warning"
                });
            }

            return;
        }

        try {
            console.log("handleCameraAccess2", deviceID);
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: deviceID ? { ideal: deviceID } : undefined },
                audio: false, // OBS Virtual Camera likely doesn't have audio
            });

            console.log("mediaStream", mediaStream);

            setStream(mediaStream);  // Store the stream
            setCameraConnected(true);  // Update the state so the video element gets rendered

            let deviceName = "";
            for (let i = 0; i < devices.length; i++) {
                if (devices[i].deviceId == deviceID) {
                    deviceName = devices[i].label;
                    break;
                }
            }

            if (isActivated) {
                toast(deviceName + ' is connected. Please click "Record Now" Button', {
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    type: "info"
                });
            }

            setError(undefined);
        } catch (err) {
            setError("Error accessing camera or microphone. Please allow access.");
            setCameraConnected(false);
            console.log("Error accessing camera or microphone. Please allow access.");
            toast('Error accessing camera or microphone. Please allow access.', {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                type: "warning"
            });
        }
    };

    return (
        <div className="min-w-[800px] relative">
            <ToastContainer
                position="bottom-right"
            />
            {/* Header */}
            <div className="h-[60px] bg-[#0e141e] px-5 flex flex-row align-center justify-between text-[14px] font-[400] font-sans text-white">
                <div className="flex flex-row gap-[20px] py-[10px] h-[60px]">
                    <a className="">
                        <img className="h-[40px] w-[40px]" src={QuizLogo} alt="Hiring Assessment Logo" />
                    </a>
                    <h1 className="py-[9px]">{companyName} {roleName} Hiring Assessment</h1>
                </div>
                <div className="flex flex-row gap-[40px] py-[19px]">
                    <div className="flex flex-row gap-[10px]">
                        <AiOutlineClockCircle className="w-[22px] h-[22px]" />
                        <b>5 mins</b>
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
                                    Video Introduction (Section 2)
                                </h2>
                            </div>
                            {
                                error ? <Error errorMSG={error} /> : ""
                            }
                            {/* Main Panel */}
                            {
                                !canRecord ?
                                    <div className="xl:pt-[20px] flex justify-center">
                                        <div className="w-[1400px] flex flex-col xl:flex-row gap-[20px] xl:gap-[40px] p-[20px] xl:p-[60px] bg-[#f3f7f7] shadow-xl">
                                            {/* Left Section */}
                                            <div className="w-full xl:w-1/2 mb-4 xl:mb-0">
                                                <div className="max-w-screen xl:max-w-[500px] flex flex-col">
                                                    <div className="mt-[15px] pb-[10px] text-[20px] xl:text-[30px] text-[#576971] font-[700] border border-solid border-x-0 border-t-0 border-b-1 border-[#576971]">Camera Setup</div>
                                                    <div className="text-[14px] mt-[15px] pb-[20px] text-[#576871] border border-solid border-x-0 border-t-0 border-b-1 border-[#576971]">We use camera images to ensure fairness for everyone. Make sure that you are in front of your camera. First choose camera and request camera access.</div>
                                                    <div className="mt-[15px] text-[#576871] h-[30px] text-[16px] flex flex-row align-middle gap-[5px]">
                                                        <div className="h-[30px] pt-[4px]"><BsCameraVideo className="w-[16px] h-[16px]" /></div>
                                                        Camera
                                                    </div>
                                                    {/* <ul className="underline text-[#576871] text-[14px] mb-[15px]">
                                                        {devices.map((value, index) => (
                                                            <li
                                                                key={value.deviceId}
                                                                className={value.deviceId === selectedDeviceId ? "font-bold text-[#034411]" : "cursor-pointer hover:text-black"}
                                                                onClick={() => {
                                                                    setSelectedDeviceId(value.deviceId);
                                                                    handleCameraAccess(value.deviceId);
                                                                }}
                                                            >
                                                                {value.label || `Camera ${index + 1}`}
                                                            </li>
                                                        ))}
                                                    </ul> */}
                                                </div>
                                            </div>
                                            {/* Right Section */}
                                            <div className="flex-1 flex flex-col gap-[20px]">
                                                {
                                                    !(isActivated) ?
                                                        <div className="px-6 py-6 rounded-lg flex flex-row justify-between align-middle bg-[#e7eeef] text-[14px] text-[#576871]">
                                                            <div className="text-[#576871] py-2 mr-4 flex flex-col justify-center"><BsExclamationTriangle className="w-[24px] h-[24px]" /></div>
                                                            <div>It seems that no camera is connected to your computer, or access to it is currently blocked. In most cases, this is due to a driver issue. To enable the camera by updating the driver, click the <span className="font-semibold">Request Camera Access</span> button.
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                }
                                                <div className="px-6 py-6 rounded-lg flex flex-col gap-4 bg-[#e7eeef] text-[14px] text-[#576871]">
                                                    <div className="text-[16px] font-bold mb-2">Trouble with your webcam?</div>
                                                    <div>Ensure you have granted permission for your browser to access your camera.</div>
                                                    <div>Ensure you are using a supported browser.</div>
                                                    {/* <div>If you have multiple camera devices, ensure you have given your browser and our  website permission to use the right device.</div>
                                                    <div>Try launching the assessment in incognito mode or in a private window.</div> */}
                                                    <div>Ensure your camera drivers and web browser are up to date.</div>
                                                </div>
                                                <div className="mt-2 text-[#576871] font-semibold">
                                                    You can use your most fluent language, but <span className="text-[#b91c1c] font-bold">do not use Russian.</span>
                                                </div>
                                                <div className="w-full flex justify-center gap-[20px]">
                                                    <a className={"cursor-pointer bg-[#068932] text-white hover:text-[#068932] hover:bg-white font-bold px-[40px] py-[5px] h-[40px] border border-solid border-[2px] hover:border-[#068932]"} onClick={!(isActivated && cameraConnected) ? requestAccess : recordNow}>Record Now</a>
                                                    {/* <a className="disabled bg-[#034411] text-white font-bold px-[40px] py-[5px] h-[40px] border border-solid border-[2px]" onClick={recordNow}>
                                                        Record Now
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <RecordVideo cameraConnected={cameraConnected} stream={stream} redirectURL={redirectURL} recordTimeInSeconds={recordTimeInSeconds} />
                            }
                        </div>
                }
            </div>
            {
                modalOpened ?
                    <PromptModal callback={closeModal} showToast={toast} />
                    :
                    ""
            }
        </div>
    );
}

export default VideoIntro;