import React from 'react';

interface GetSummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "pre-interview" | "create-interview";
}

const GetSummaryModal: React.FC<GetSummaryModalProps> = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    const title = type === "pre-interview" ? "Pre-Interview Summary" : "Create Interview Summary";
    const description = type === "pre-interview" 
        ? "Review the candidate's background and key information before the interview."
        : "Generate a comprehensive summary of the interview session.";

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-600 mb-6">
                        {description}
                    </p>

                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                                        Summary Details
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        The summary will include key insights, highlights, and important notes from the {type === "pre-interview" ? "candidate profile" : "interview session"}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            // Handle summary generation
                            console.log('Generate summary for:', type);
                            onClose();
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Generate Summary
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GetSummaryModal;