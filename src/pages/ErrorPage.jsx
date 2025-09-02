import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

export const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-[800px] p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="flex flex-col gap-[30px] items-center">
                    <AiOutlineWarning className="w-[80px] h-[80px] text-[#FF0000]" />
                    <div className="font-bold text-[50px] text-[#FF0000]">Page Not Found</div>
                    <p className="text-lg text-[#576871]">
                        The page you're seeking is either unavailable or has been moved. Kindly ensure you are using the full invitation link.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
