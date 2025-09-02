export const ErrorMSG = ({ errorMSG }) => {
    return (
        <div className="bg-white border-t-4 border-red-500 p-4 rounded-sm shadow-lg w-full mb-12">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg
                        className="h-5 w-5 text-red-500 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.717-1.36 3.482 0l5.516 9.799c.746 1.326-.187 2.953-1.742 2.953H4.483c-1.555 0-2.488-1.627-1.742-2.953l5.516-9.799zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-3a1 1 0 01-.883-.993l.25-2.5a1 1 0 011.966 0l.25 2.5A1 1 0 0110 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-red-500">{errorMSG}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorMSG;