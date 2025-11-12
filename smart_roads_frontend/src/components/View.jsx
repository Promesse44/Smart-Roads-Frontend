import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const View = () => {
  const token = localStorage.getItem("token");
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  // const location = useLocation();

  // const { user } = location.state;

  useEffect(() => {
    try {
      fetch("http://localhost:8000/request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((output) => {
          console.log("Fecthed requests: ", output);
          setRequests(output);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="viewTitle">
        <div className="leftViewTitle">
          <span className="leftViewTitleSpan">Community Dashboard</span>
        </div>
        <div className="rightViewTitle">
          <div className="rightViewTitleUserName1">
            <Icon icon="iconamoon:notification" width="20" height="20" />
          </div>
          <div className="rightViewTitleUserName">
            <button className="viewProfile"></button>
          </div>
          <div className="rightViewTitleUserName2">
            <span className="rightViewTitleSpan">{user.user_name}</span>
          </div>
        </div>
      </div>
      <h1 className="viewh1">All Road Requests</h1>
      <div className="searchRequestsDiv">
        <div className="searchIconDiv">
          <input
            type="text"
            placeholder="Search requests by title"
            className="searchRequestsInput"
          />
          <Icon
            icon="material-symbols-light:search-rounded"
            width="24"
            height="24"
            className="searchIcon"
          />
        </div>
        <div className="filterSearchDiv">
          <button className="filterButton">
            <span>Status</span>
            <Icon
              icon="mingcute:down-line"
              width="24"
              height="24"
              className="roleDownIcon"
            />
          </button>
          <button className="filterButton">
            <span>Date</span>
            <Icon
              icon="mingcute:down-line"
              width="24"
              height="24"
              className="roleDown1"
            />
          </button>
        </div>
      </div>

      <div className="requestsContainer">
        <div className="singleRequestsHolder">
          {requests.map((request) => (
            <div className="singleRequest">
              <div className="mapImage">
                <img
                  src={`data:image/jpej;base64,${request.photo}`}
                  alt="road"
                />
              </div>
              <div className="lowerSingleRequest">
                <h3 className="singleRequestTitle">{request.title}</h3>
                <p className="singleRequestp1">
                  Submitted on: {new Date(request.created_at).toLocaleString()}{" "}
                  by {request.user_name}
                </p>
                <p className="singleRequestp2">{request.description}</p>
                <span
                  className="singleRequestp3"
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
                >
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="singleRequestsHolder">
          <div className="singleRequest">
            <img src="/images.jpeg" alt="street map" className="mapImage" />
            <div className="lowerSingleRequest">
              <h3 className="singleRequestTitle">Karembure Road</h3>
              <p className="singleRequestp1">
                Submitted on: Oct 26, 2023 by John
              </p>
              <p className="singleRequestp2">A large pothole on 63rd street</p>
              <span className="singleRequestp3">Pending</span>
            </div>
          </div>
          <div className="singleRequest">
            <img src="/images.jpeg" alt="street map" className="mapImage" />
            <div className="lowerSingleRequest">
              <h3 className="singleRequestTitle">Musanze Road</h3>
              <p className="singleRequestp1">
                Submitted on: Oct 26, 2023 by John
              </p>
              <p className="singleRequestp2">A large pothole on 63rd street</p>
              <span className="singleRequestp4">Approved</span>
            </div>
          </div>
          <div className="singleRequest">
            <img src="/images.jpeg" alt="street map" className="mapImage" />
            <div className="lowerSingleRequest">
              <h3 className="singleRequestTitle">Masaka Road</h3>
              <p className="singleRequestp1">
                Submitted on: Oct 26, 2023 by John
              </p>
              <p className="singleRequestp2">A large pothole on 63rd street</p>
              <span className="singleRequestp5">Rejected</span>
            </div>
          </div>
        </div> */}
      </div>
      <Link to={"/request"}>
        <button className="addRequestButton">
          <Icon
            icon="material-symbols-light:add-rounded"
            width="24"
            height="24"
          />
          <span>New Road Request</span>
        </button>
      </Link>
    </>
  );
};

export default View;
