// import React, { useState } from 'react';
// import axios from 'axios';
// import './FileUpload.css'; // Import the external stylesheet

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [showToast, setShowToast] = useState(false);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//       setMessage('');
//     }
//   };

//   const handleFileUpload = async () => {
//     if (!file) {
//       setMessage('Please select a file to upload.');
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000); // Auto-hide toast after 3 seconds
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       await axios.post('http://localhost:5000/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setMessage('File uploaded and data stored successfully!');
//     } catch (error) {
//       setMessage('Error uploading file. Please try again.');
//     }

//     setShowToast(true);

//     // Reset input field and state after toast disappears
//     setTimeout(() => {
//       setShowToast(false);
//       setFile(null); // Clear the file state
//       document.getElementById('fileInput').value = ''; // Reset input field
//     }, 3000); // Auto-hide toast after 3 seconds
//   };

//   return (
//     <div className="container">
//       <h2 className="heading">Choose File To Upload</h2>
//       <div className="uploadContainer">
//         <input
//           id="fileInput" // Add ID for resetting the field
//           type="file"
//           onChange={handleFileChange}
//           accept=".xlsx, .xls, .csv"
//           className="fileInput"
//         />
//         <button
//           onClick={handleFileUpload}
//           className="uploadButton"
//         >
//           Upload
//         </button>
//       </div>

//       {showToast && (
//         <div className="toast">
//           <p className="toastMessage">{message}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Import the external stylesheet

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // New state to track upload status

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage('');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Auto-hide toast after 3 seconds
      return;
    }

    setIsUploading(true); // Set upload state to true
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://barath-wv9h.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded and data stored successfully!');
    } catch (error) {
      setMessage('Error uploading file. Please try again.');
    }

    setShowToast(true);

    // Reset input field and state after toast disappears
    setTimeout(() => {
      setShowToast(false);
      setFile(null); // Clear the file state
      document.getElementById('fileInput').value = ''; // Reset input field
      setIsUploading(false); // Reset upload state
    }, 3000); // Auto-hide toast after 3 seconds
  };

  return (
    <div className="container">
      <h2 className="heading">Choose File To Upload</h2>
      <div className="uploadContainer">
        <input
          id="fileInput" // Add ID for resetting the field
          type="file"
          onChange={handleFileChange}
          accept=".xlsx, .xls, .csv"
          className="fileInput"
        />
        <button
          onClick={handleFileUpload}
          className="uploadButton"
          disabled={isUploading} // Disable button during upload
        >
          {isUploading ? 'Uploading...' : 'Upload'} {/* Show different text during upload */}
        </button>
      </div>

      {showToast && (
        <div className="toast">
          <p className="toastMessage">{message}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
