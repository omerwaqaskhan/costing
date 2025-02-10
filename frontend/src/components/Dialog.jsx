import React from 'react';

const Dialog = ({ isOpen, heading, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">{heading}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
          onClick={onConfirm}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Dialog;
