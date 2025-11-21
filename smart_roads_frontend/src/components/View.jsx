import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const View = () => {
  const API_BASE = (
    import.meta.env.VITE_API_BASE_URL || "https://smart-roads-ozka.onrender.com"
  ).trim();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showUser, setShowUser] = useState(false);
  const userBtnRef = React.useRef(null);
  const userNavRef = React.useRef(null);
  const [usedStatus, setUsedStatus] = useState(null);

  // const location = useLocation();

  // const { user } = location.state;

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`${API_BASE}/request`, {
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
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

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
          <span className="leftViewTitleSpan">Community Dashboard</span>
        </div>
        <div className="rightViewTitle">
          <div className="rightViewTitleUserName1">
            <Icon icon="iconamoon:notification" width="20" height="20" />
          </div>
          <div className="rightViewTitleUserName">
            <button
              ref={userBtnRef}
              className="viewProfile"
              onClick={() => setShowUser((prev) => !prev)}
            ></button>
          </div>
          <div className="rightViewTitleUserName2">
            <span className="rightViewTitleSpan">{user.user_name}</span>
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
          {loading && (
            <div className="singleRequestsLoad">
              <Icon
                icon={"line-md:loading-twotone-loop"}
                color="rgb(50, 116, 83)"
                fontSize={100}
              />
            </div>
          )}
          {requests.map((request) => {
            const latest = request.latest_approval;
            const previous = request.previous_approval || null;
            const usedStatus =
              latest?.status === "In_progress"
                ? latest
                : latest?.approver_type === "Government"
                ? latest
                : latest?.approver_type === "Local_leader" &&
                  latest?.status === "Pending"
                ? latest
                : previous;
            return (
              <div className="singleRequest" key={request.request_id}>
                <div className="mapImage">
                  <img src={request.photo} alt="road" />
                </div>
                <div className="requestDetailItem">
                  <h3 className="singleRequestTitle">{request.title}</h3>
                  <p className="singleRequestp1">
                    Submitted on:{" "}
                    {new Date(request.created_at).toLocaleString()} by{" "}
                    {request.user_name}
                  </p>
                  <p className="singleRequestp2">
                    {request.description.slice(0, 100)}
                  </p>
                  <div className="lowerSingleRequest">
                    <span
                      className="singleRequestp3"
                      style={{
                        color:
                          usedStatus.status === "Pending"
                            ? "rgb(136, 67, 3)"
                            : usedStatus.status === "Approved"
                            ? "rgb(50, 116, 83)"
                            : usedStatus.status === "Rejected"
                            ? "rgba(151, 43, 43, 1)"
                            : usedStatus.status === "In_progress"
                            ? "rgba(89, 44, 119, 1)"
                            : "black",
                        backgroundColor:
                          usedStatus.status === "Pending"
                            ? "rgb(243, 193, 146)"
                            : usedStatus.status === "Approved"
                            ? "rgba(91, 206, 149, 1)"
                            : usedStatus.status === "Rejected"
                            ? "rgba(221, 89, 89, 1)"
                            : usedStatus.status === "In_progress"
                            ? "rgba(161, 84, 212, 1)"
                            : "black",
                      }}
                    >
                      {usedStatus.status}
                    </span>
                    <button className="viewSinglebtn">
                      <Link
                        className="viewSinglebtnLink"
                        to={`/view/${request.request_id}`}
                      >
                        View more
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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

export default View;
