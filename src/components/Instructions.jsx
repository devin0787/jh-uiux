export const Instructions = () => {
    return (
        <div className="pl-[110px] px-[20px] py-[60px] gap-[60px] flex flex-col w-full bg-[#f3f7f7] h-screen">
            <div className="flex flex-col p-[60px] bg-[#f3f7f7] shadow-xl">
                <h2 className="text-[40px] font-[400] break-words pb-[30px] text-[#39424e]">General Instructions</h2>
                <ol className="pl-[30px] text-[#39424e] break-words text-[15px] font-sans font-[400]">
                    <li className="mb-[15px]">1. This is a timed assessment. Please ensure you are in a distraction-free environment, as the timer cannot be paused once the assessment begins.</li>
                    <li className="mb-[15px]">2. Please ensure that you have a stable and reliable internet connection throughout the assessment.</li>
                    {/* <li className="mb-[15px]">3. Before taking the test, please go through the <u>FAQs</u> to resolve your queries related to the test.</li> */}
                </ol>
            </div>
            <div className="flex flex-col p-[60px] bg-[#f3f7f7] shadow-xl">
                <h2 className="text-[40px] font-[400] break-words pb-[30px] text-[#39424e]">Proctoring Instructions</h2>
                <ol className="pl-[30px] text-[#39424e] break-words text-[15px] font-sans font-[400]">
                    <li className="mb-[15px]">Proctoring is enabled for this assessment. Please adhere to all guidelines and maintain the integrity of the evaluation process.</li>
                </ol>
            </div>
        </div>
    );
};

export default Instructions;