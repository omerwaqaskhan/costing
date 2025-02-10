// ImageUploadModal.js
import React, { useState } from "react"
import api from "../api.js"

const ImageUploadModal = ({ isOpen, onClose, uploadType, onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imageUrl, setImageUrl] = useState(null)

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > MAX_FILE_SIZE) {
      setErrorMessage('File size exceeds 5MB. Please choose a smaller file.');
      setSelectedFile(null); // clear selected file if too large
    } else {
      setErrorMessage('');
      setSelectedFile(file)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = import.meta.env.VITE_API_URL

    const formData = new FormData();
    formData.append("file", selectedFile)
    formData.append("folder", uploadType)

    try {
      const response = await api.post(`${url}upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted)
        },
      })

      console.log("File uploaded successfully:", response.data.file_url)

      setImageUrl(response.data.file_url)
      const uploadedImageUrl = response.data.file_url
      onImageUpload(uploadedImageUrl)
      setUploadProgress(0)
      // onClose(); // Close the modal after upload
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal pt-10 ps-5">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {uploadProgress > 0 && (
            <progress value={uploadProgress} max="100">
              {uploadProgress}%
            </progress>
          )}
          <div className="flex justify-between mt-5">
            <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit">Upload</button>
            <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUploadModal;






// // ImageUploadModal.js
// import React, { useState } from "react";
// import api from "../api.js";
//
// const ImageUploadModal = ({ isOpen, onClose, uploadType, onImageUpload }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [imageUrl, setImageUrl] = useState(null);
//
//   const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
//
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//
//     if (file && file.size > MAX_FILE_SIZE) {
//       setErrorMessage('File size exceeds 5MB. Please choose a smaller file.');
//       setSelectedFile(null); // clear selected file if too large
//     } else {
//       setErrorMessage('');
//       setSelectedFile(file);
//     }
//   };
//
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//
//     const url = import.meta.env.VITE_API_URL
//
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//
//     try {
//       const response = await api.post(`${url}upload/${uploadType}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(percentCompleted); // Update the progress bar
//           },
//         }
//       );
//
//       console.log("File uploaded successfully:", response.data.imageUrl);
//
//       setImageUrl(response.data.imageUrl)
//       const uploadedImageUrl = response.data.imageUrl
//       onImageUpload(uploadedImageUrl)
//       // onClose(); // Close the modal after upload
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };
//
//   if (!isOpen) return null; // Don't render the modal if it's not open
//
//   return (
//     <div className="modal pt-10 ps-5">
//       <div className="modal-content">
//         <form onSubmit={handleSubmit}>
//           <input type="file" onChange={handleFileChange} accept="image/*" />
//           {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//           {uploadProgress > 0 && (
//             <progress value={uploadProgress} max="100">
//               {uploadProgress}%
//             </progress>
//           )}
//           <div className="flex justify-between">
//             <button type="submit">Upload</button>
//             <button onClick={onClose}>Cancel</button>
//           </div>
//
//         </form>
//
//       </div>
//     </div>
//   );
// };
//
// export default ImageUploadModal;
