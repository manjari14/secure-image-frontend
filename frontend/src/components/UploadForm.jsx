import { useState } from "react";
import { uploadImage } from "../api/images";

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    console.log("Uploading file:", file.name);
    try {
      await uploadImage(file);
      alert("Upload successful!");
      onUploadSuccess();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
