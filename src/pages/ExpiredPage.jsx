import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

export const ExpiredPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-[800px] p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="flex flex-col gap-[30px] items-center">
                    <AiOutlineWarning className="w-[80px] h-[80px] text-[#FFA500]" />
                    <div className="font-bold text-[50px] text-[#FFA500]">Link Expired</div>
                    <p className="text-lg text-[#576871]">
                        This invitation link is no longer valid. It may have expired or been revoked by the administrator.
                        <br />
                        Please contact support or request a new link if needed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExpiredPage;
