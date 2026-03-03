import React, { useRef, useState } from "react";
import "../styles/createpost.scss"

const CreatePost = () => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="create-post">
      <div className="create-post__card">
        {/* Hidden Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleInputChange}
          hidden
        />

        {/* Upload Area */}
        <div
          className={`create-post__upload ${
            isDragging ? "dragging" : ""
          }`}
          onClick={() => fileInputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="create-post__preview">
              <img src={preview} alt="preview" />
              <button
                type="button"
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <span>Click or drag image to upload</span>
          )}
        </div>

        {/* Caption */}
        <input
          type="text"
          placeholder="Caption"
          className="create-post__input"
        />

        <button className="create-post__button">Post</button>
      </div>
    </div>
  );
};

export default CreatePost;