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
        console.log(output);
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
      {/* <p className="path">All requests{'  > '} <strong>request.title</strong> </p> */}
      <div className="singleTitle">
        <div className="singleTitleH1Holer">
          <h1 className="singleTitleH1">{request.title}</h1>
        </div>
        <p
          style={{
            color:
              request.status === "Pending"
                ? "rgb(136, 67, 3)"
                : request.status === "Approved"
                ? "rgb(50, 116, 83)"
                : request.status === "Rejected"
                ? "rgba(151, 43, 43, 1)"
                : request.status === "In_progress"
                ? "rgba(89, 44, 119, 1)"
                : "black",
            backgroundColor:
              request.status === "Pending"
                ? "rgb(243, 193, 146)"
                : request.status === "Approved"
                ? "rgba(91, 206, 149, 1)"
                : request.status === "Rejected"
                ? "rgba(221, 89, 89, 1)"
                : request.status === "In_progress"
                ? "rgba(161, 84, 212, 1)"
                : "black",
          }}
          className="singlerequestsIconp"
        >
          {request.status}
        </p>
      </div>
      <div className="singleDescription">
        <div className="singleDescriptionLeft">
          <div className="singleDescriptionLeftTop">
            <img
              src={request.photo}
              alt="Request image"
              className="singleRequestimg"
            />
          </div>
          <div className="singleDescriptionLeftBottom">
            <h4>Other Details</h4>
            <p className="locatinp1">
              {request.status === "Approved" && Approved} by Local_leader :{" "}
              <strong>{request.user_name}</strong>
            </p>
            <p className="locatinp1">
              Note appended : <strong>{request.note}</strong>
            </p>
            <div className="locationpHOlder">
              <p className="locationp">
                <Icon icon="bi:pin" width="16" height="16" />
                <span>{request.address}</span>
              </p>
              <p></p>
            </div>

            <p className="locatinp2">
              Submitted at {new Date(request.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="singleDescriptionRight">
          <div className="singleDescriptionSubmittedBY">
            <h3>Submitted By</h3>
            <p className="singleRequestuserp">
              <Icon icon="mdi:user-outline" width="24" height="24" />
              <span>{request.user_name}</span>
            </p>
            <p className="singleRequestuserp">
              <Icon icon="ic:outline-email" width="24" height="24" />
              <span>{request.email}</span>
            </p>
            <p className="singleRequestuserp">
              <Icon icon="ic:outline-phone" width="24" height="24" />
              <span>{request.phone_number}</span>
            </p>
          </div>
          <div className="singleDescriptionSubmittedBY1">
            <h3>Description</h3>
            <p>{request.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRequest;
