import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const SingleRequest = () => {
  const API_BASE = (
    import.meta.env.VITE_API_BASE_URL || "https://smart-roads-ozka.onrender.com"
  ).trim();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [showUser, setShowUser] = useState(false);
  const userBtnRef = React.useRef(null);
  const userNavRef = React.useRef(null);

  const navigate = useNavigate();

  const inputRef = useRef();

  // load a single request by id (on mount or when id changes)
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

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/request/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((output) => {
        console.log("Single request:", output);
        setRequest(output);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id, token]);

  if (!request) {
    return (
      <div className="singleRequestsLoad">
        <Icon
          icon={"line-md:loading-twotone-loop"}
          color="rgb(50, 116, 83)"
          fontSize={100}
        />
      </div>
    );
  }

  // Destructure from backend response
  const info = request.requestInfo;
  const latest = request.latestApproval;
  const previous = request.previousApproval || null;

  // const usedStatus = latest || previous;
  let usedStatus;

  if (!previous) {
    usedStatus = latest;
  } else {
    if (latest.status === "Pending") {
      usedStatus = previous;
    } else {
      usedStatus = latest;
    }
  }

  // Determine status text color & background
  const statusColor =
    {
      Pending: "rgb(136, 67, 3)",
      Approved: "rgb(50, 116, 83)",
      Rejected: "rgba(151, 43, 43, 1)",
      In_progress: "rgba(89, 44, 119, 1)",
    }[usedStatus.status] || "white";

  const statusBg =
    {
      Pending: "rgb(243, 193, 146)",
      Approved: "rgba(91, 206, 149, 1)",
      Rejected: "rgba(221, 89, 89, 1)",
      In_progress: "rgba(161, 84, 212, 1)",
    }[usedStatus.status] || "black";

  const onLougout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="viewTitle">
        <div className="leftViewTitle">
          <span className="leftViewTitleSpan">Smart Roads </span>
        </div>
        <div>
          <span className="spna">Dashboard</span>
          <Link className="titleLink" to={"/view"}>
            All requests
          </Link>
        </div>
        <div className="rightViewTitle12">
          <Link className="RequestButtonLink" to={"/request"}>
            <button className="RequestButton">
              <span>Submit Request</span>
            </button>
          </Link>
          <button
            className="viewProfile1"
            ref={userBtnRef}
            onClick={() => setShowUser((prev) => !prev)}
          ></button>
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

      <div className="singleTitle">
        <div className="singleTitleH1Holer">
          <h1 className="singleTitleH1">{info.title}</h1>
        </div>

        <p
          className="singlerequestsIconp"
          style={{ color: statusColor, backgroundColor: statusBg }}
        >
          {usedStatus.status}
        </p>
      </div>

      <div className="singleDescription">
        <div className="singleDescriptionLeft">
          <div className="singleDescriptionLeftTop">
            <img src={info.photo} alt="Request" className="singleRequestimg" />
          </div>

          <div className="singleDescriptionLeftBottom">
            <h4>Other Details</h4>

            {/* STATUS MESSAGE */}
            <p className="locatinp1">
              {usedStatus.status === "Pending" &&
              usedStatus.approver_type === "Local_leader" ? (
                `Waiting for ${latest.approver_type}'s approval`
              ) : (
                <>
                  {usedStatus.status === "Approved" &&
                  usedStatus.approver_type === "Government"
                    ? "Approved by "
                    : usedStatus.status === "Rejected"
                    ? "Rejected by "
                    : "Updated by "}
                  {usedStatus.approver_type} :{" "}
                  <strong>{usedStatus.approver_name}</strong>
                </>
              )}
            </p>

            <p className="locatinp1">
              Note appended:{" "}
              <span>
                {usedStatus.notes ? usedStatus.notes : "No notes added"}
              </span>
            </p>

            {/* LOCATION */}
            <div className="locationpHOlder">
              <p className="locationp">
                <Icon icon="bi:pin" width="16" height="16" />
                <span>{info.address}</span>
              </p>
            </div>

            <p className="locatinp2">
              Submitted at {new Date(info.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="singleDescriptionRight">
          <div className="singleDescriptionSubmittedBY">
            <h3>Submitted By</h3>

            <p className="singleRequestuserp">
              <Icon icon="mdi:user-outline" width="24" height="24" />
              <span>{info.requester_name}</span>
            </p>

            <p className="singleRequestuserp">
              <Icon icon="ic:outline-email" width="24" height="24" />
              <span>{info.requester_email}</span>
            </p>

            <p className="singleRequestuserp">
              <Icon icon="ic:outline-phone" width="24" height="24" />
              <span>{info.requester_phone}</span>
            </p>
          </div>

          <div className="singleDescriptionSubmittedBY1">
            <h3>Description</h3>
            <p>{info.description}</p>
          </div>
        </div>
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

export default SingleRequest;
