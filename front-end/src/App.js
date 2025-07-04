import React, { useState } from "react";
import axios from "axios";

const fadeIn = {
  animation: "fadeIn 0.8s ease forwards",
  opacity: 0,
};

const App = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first");

    const formData = new FormData();
    formData.append("image", image);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedUrl(response.data.imageUrl);
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* Add keyframes in a style tag */}
      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .app-container {
          background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
        }

        .card {
          background: white;
          padding: 30px 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          width: 100%;
          max-width: 420px;
          text-align: center;
          position: relative;
        }

        h2 {
          margin-bottom: 20px;
          color: #222;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        input[type="file"] {
          padding: 10px;
          border-radius: 10px;
          border: 2px solid #6b73ff;
          cursor: pointer;
          transition: border-color 0.3s ease;
          width: 100%;
        }
        input[type="file"]:hover {
          border-color: #000dff;
        }

        button {
          margin-top: 25px;
          padding: 12px 30px;
          background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
          border: none;
          color: white;
          font-weight: 600;
          font-size: 16px;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(107, 115, 255, 0.6);
          transition: all 0.3s ease;
          outline-offset: 4px;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          box-shadow: none;
        }

        button:not(:disabled):hover {
          animation: pulse 1s infinite;
          box-shadow: 0 6px 25px rgba(0, 13, 255, 0.9);
          transform: translateY(-3px);
        }

        .preview, .uploaded {
          margin-top: 25px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          animation: fadeIn 0.8s ease forwards;
          opacity: 0;
        }

        img {
          width: 100%;
          display: block;
          transition: transform 0.4s ease;
        }
        img:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 10px 10px rgba(0, 13, 255, 0.3));
        }

        .uploaded-url {
          margin-top: 10px;
          font-size: 14px;
          word-break: break-word;
          color: #333;
          font-weight: 600;
        }

        .uploaded-url a {
          color: #6b73ff;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .uploaded-url a:hover {
          color: #000dff;
          text-decoration: underline;
        }
      `}</style>

      <div className="app-container">
        <div className="card">
          <h2>Upload Image to Cloudinary</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <div className="preview">
              <img src={preview} alt="preview" />
            </div>
          )}
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {uploadedUrl && (
            <div className="uploaded">
              <p className="uploaded-url">
                Uploaded image URL:{" "}
                <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                  {uploadedUrl}
                </a>
              </p>
              <img src={uploadedUrl} alt="uploaded" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
