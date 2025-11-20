import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";

const SubmitRequest = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const latitude = -1.3792473621;
  const longitude = 2.134879082134;
  const [showUser, setShowUser] = useState(false);
  const userBtnRef = React.useRef(null);
  const userNavRef = React.useRef(null);

  const navigate = useNavigate();

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

  // const removeImage = () => {
  //   if (previewUrl) URL.revokeObjectUrl(previewUrl);
  //   setPreviewUrl(null);
  //   setSelectedFile(null);
  //   if (inputRef.current) inputRef.current.value = "";
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("photo", selectedFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    fetch("http://localhost:8000/request", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((output) => {
        console.log(output);
        alert(output.msg);
        navigate("/view");
      });
  };

  const onLougout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userNavRef.current &&
        !userNavRef.current.contains(event.target) &&
        userBtnRef.current &&
        !userBtnRef.current.contains(event.target)
      ) {
        setShowUser(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="viewTitle">
        <div className="leftViewTitle">
          <span className="leftViewTitleSpan">Smart Roads </span>
          <span className="spna">Add Request</span>
          <div>
            <Link className="titleLink" to={"/view"}>
              All requests
            </Link>
          </div>
        </div>
        <div className="rightViewTitle1">
          <div className="rightViewTitleUserName1">
            <Icon icon="iconamoon:notification" width="20" height="20" />
          </div>
          <div className="rightViewTitleUserName2">
            <button
              ref={userBtnRef}
              className="viewProfile1"
              onClick={() => setShowUser((prev) => !prev)}
            ></button>
          </div>
          <div className="rightViewTitleUserName2">
            <p className="rightViewTitleSpan">{user.user_name}</p>
          </div>
        </div>
      </div>
      {showUser && <div className="pageOverlay"></div>}
      <div
        ref={userNavRef}
        className="userNavigationHolder"
        style={{ display: showUser ? "block" : "none" }}
      >
        <div className="userNavigation">
          <div className="rightViewTitleUserName1"></div>
          <h4 className="userNavigationh1">{user.user_name}</h4>
          <p className="userNavigationemail">{user.email}</p>
          <p className="userNavigationemail">{user.phone_number}</p>
          <p className="userNavigationemail">{user.user_type}</p>
          <button className="logout" onClick={onLougout}>
            Logout
          </button>
        </div>
      </div>
      <div className="submitRequestDiv">
        <h1 className="submitTitleh1">Submit a New Road Request</h1>
        <p className="subitRequestp">
          Fill out the details below to help us improve our Neighbourhood roads.
        </p>
        <form className="submitRequestForm">
          <p className="requestTItlep">Request Title</p>
          <div className="submitTitleInputHolder">
            <input
              type="text"
              placeholder="eg: Nyanza Road"
              className="submitTitleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <p className="requestTItlep1">Detailed description</p>
          <div className="submitTitleInputHolder">
            <textarea
              type="text"
              placeholder="Describe the issue and it's impact on the community, The  more detailed the better!"
              rows={10}
              className="submitTitleInput"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <p className="requestTItlep">Address</p>
          <div className="submitTitleInputHolder">
            <input
              type="text"
              placeholder="eg: Kicukiro"
              className="submitTitleInput"
              onChange={(e) => setAddress(e.target.value)}
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
          {/* <div className="requestTItlep12Holder">
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
          </div> */}
          <div className="submtitBtnsDiv">
            <Link to={"/view"} className="submitRequestBtn1Link">
              <button className="submitRequestBtn1">Cancel</button>
            </Link>
            <button
              type="submit"
              className="submitRequestBtn"
              onClick={onSubmit}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
      <p className="copyright">
        <Icon
          icon="la:copyright-solid"
          width="11"
          height="11"
          className="copyrightIcon"
        />
        <span>Copyrigt2025</span>
      </p>
    </>
  );
};

export default SubmitRequest;
