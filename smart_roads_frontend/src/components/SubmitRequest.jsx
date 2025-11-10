import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const SubmitRequest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef();

  const onFile = (file) => {
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    onFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const removeImage = () => {
    if (previewUrl) URL.revokeObjectUrl(previewUrl);
    setPreviewUrl(null);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <div className="submitRequestDiv">
        <h1 className="submitTitleh1">Submit a New Road Request</h1>
        <p className="subitRequestp">
          Fill out the details below to help us improve our Neighbourhood roads.
        </p>
        <form action="submit" className="submitRequestForm">
          <p className="requestTItlep">Request Title</p>
          <div className="submitTitleInputHolder">
            <input
              type="text"
              placeholder="eg: Nyanza Road"
              className="submitTitleInput"
            />
          </div>
          <p className="requestTItlep1">Detailed description</p>
          <div className="submitTitleInputHolder">
            <textarea
              type="text"
              placeholder="Describe the issue and it's impact on the community, The  more detailed the better!"
              rows={10}
              className="submitTitleInput"
            />
          </div>
          <p className="requestTItlep12">Upload a Photo</p>
          <div className="submitTitleInputHolder1">
            <input
              ref={inputRef}
              type="file"
              className="browseFileInput"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Input"
                className="uploadedImagePreview"
              ></img>
            )}
            <div className="submitTitleInputHolder12">
              <Icon
                icon="material-symbols-light:add-photo-alternate-outline"
                width="30"
                height="30"
                className="addPhotoIcon"
              />
              <p className="dropImgp">
                Drop and drag a photo or Click to Browse
              </p>
              <p className="dropImgp1">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div className="requestTItlep12Holder">
            <p className="requestTItlep12">Pin the location</p>
            <Link className="locationLink">
              <Icon
                icon="material-symbols-light:my-location-outline"
                width="17"
                height="17"
              />
              <span>Find My Location</span>
            </Link>
          </div>

          <div className="submitTitleInputHolder1">
            <input
              type="file"
              accept="image/*"
              placeholder="Drop and drag a photo or Click to Browse"
              className="submitTitleInput1"
            />
          </div>
          <div className="submtitBtnsDiv">
            <button className="submitRequestBtn1">Cancel</button>
            <button className="submitRequestBtn">Submit Request</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmitRequest;
