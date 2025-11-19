import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const SingleRequest = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/request/${id}`, {
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

  // If latest is from Architect, DISPLAY latest (your updated logic)
  const usedStatus = latest || previous;

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
          <button className="viewProfile1"></button>
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
              {usedStatus.status === "Pending" ? (
                `Waiting for ${latest.approver_type}'s approval`
              ) : (
                <>
                  {usedStatus.status === "Approved"
                    ? "Approved by "
                    : usedStatus.status === "Rejected"
                    ? "Rejected by "
                    : "Updated by "}
                  {usedStatus.approver_type} :{" "}
                  <strong>{usedStatus.approver_name}</strong>
                </>
              )}
            </p>

            {/* NOTES */}
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

        {/* RIGHT SIDE */}
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
    </>
  );
};

export default SingleRequest;
