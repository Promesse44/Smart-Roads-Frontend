import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Approval = () => {
  const API_BASE = (
    import.meta.env.VITE_API_BASE_URL || "https://smart-roads-ozka.onrender.com"
  ).trim();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const location = useLocation();
  // const { user } = location.state;

  const user = JSON.parse(localStorage.getItem("user"));
  const [approvals, setApprovals] = useState([]);
  const [visibleId, setVisibleId] = useState(null);
  const [approvalVisible, setApprovalVisible] = useState(true);
  const [approvedByYouVisible, setApprovedByYouVisible] = useState(false);
  const [approvalId, setApprovalId] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const userBtnRef = React.useRef(null);
  const userNavRef = React.useRef(null);
  //   if (!user) {
  //   navigate("/");
  //   return null;
  // }

  const getApprovals = () => {
    setLoading(true);
    fetch(`${API_BASE}/approvals`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((output) => {
        setApprovals(output);
        setLoading(false);
      });
    return;
  };

  useEffect(() => {
    getApprovals();
  }, [token]);
  // console.log(JSON.stringify(approvals, null, 2));

  const onApprove = (approval_id, requestId, status, note) => {
    // e.preventDefault();
    console.log(approval_id, requestId, status, note);
    fetch(`${API_BASE}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        approvalId: approval_id,
        requestId,
        status,
        note,
      }),
    })
      .then((res) => res.json())
      .then((output) => {
        alert(output.message);
        // console.log(output);
        getApprovals();
        setApprovalId(null);
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
          <span className="spna">Admin Dashboard</span>
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
            <p className="rightViewTitle">{user.user_type}</p>
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
      <h1 className="approvalH1">Request Approval</h1>
      <div className="approvedbydivHOlder">
        <div className="approvedbydiv">
          <p className="approvedbyp">Pending Approvals</p>{" "}
          <h2 className="approvedbyh2">
            {
              approvals.filter(
                (a) =>
                  a.to_be_approved_by === user.user_type &&
                  a.status === "Pending"
              ).length
            }
          </h2>
        </div>
        <div className="approvedbydiv">
          <p className="approvedbyp">Approved by You</p>{" "}
          <h2 className="approvedbyh2">
            {
              approvals.filter(
                (a) =>
                  a.to_be_approved_by === user.user_type &&
                  a.status === "Approved"
              ).length
            }
          </h2>
        </div>
        <div className="approvedbydiv">
          <p className="approvedbyp">Rejected by You</p>{" "}
          <h2 className="approvedbyh2">
            {
              approvals.filter(
                (a) =>
                  a.to_be_approved_by === user.user_type &&
                  a.status === "Rejected"
              ).length
            }
          </h2>
        </div>
      </div>
      {loading && (
        <div className="singleRequestsLoad">
          <Icon
            icon={"line-md:loading-twotone-loop"}
            color="rgb(50, 116, 83)"
            fontSize={100}
          />
        </div>
      )}
      <div className="allApprovalHolder">
        {approvals.map((approval) => {
          return (
            <React.Fragment key={approval.approval_id}>
              <div
                className="allApprovals"
                // style={{display: approvalVisible? "block":"none"}}
                onClick={() => {
                  setVisibleId(
                    visibleId === approval.approval_id
                      ? null
                      : approval.approval_id
                  );
                  setApprovalVisible(
                    approvalVisible === approval.approval_id ? false : true
                  );
                }}
              >
                <div
                  style={{
                    display:
                      visibleId === approval.approval_id ? "none" : "block",
                  }}
                >
                  <div className="allApprovalsIconHolder">
                    <div>
                      <h4>{approval.title}</h4>
                      <p
                        style={{
                          color:
                            approval.status === "Pending"
                              ? "rgb(136, 67, 3)"
                              : approval.status === "Approved"
                              ? "rgb(50, 116, 83)"
                              : approval.status === "Rejected"
                              ? "rgba(151, 43, 43, 1)"
                              : approval.status === "In_progress"
                              ? "rgba(89, 44, 119, 1)"
                              : "black",
                          backgroundColor:
                            approval.status === "Pending"
                              ? "rgb(243, 193, 146)"
                              : approval.status === "Approved"
                              ? "rgba(91, 206, 149, 1)"
                              : approval.status === "Rejected"
                              ? "rgba(221, 89, 89, 1)"
                              : approval.status === "In_progress"
                              ? "rgba(161, 84, 212, 1)"
                              : "black",
                        }}
                        className="allApprovalsIconp"
                      >
                        {approval.status}
                      </p>
                    </div>

                    <span>
                      {approval.status === "Approved"
                        ? "Approved"
                        : approval.status === "In_progress"
                        ? "Approved"
                        : approval.status === "Rejected"
                        ? "Rejected"
                        : "Wainting to be approved"}{" "}
                      by <strong>{approval.to_be_approved_by}</strong>
                    </span>
                    <Icon
                      icon="mingcute:right-line"
                      width="24"
                      height="24"
                      className="allApprovalsIcon"
                    ></Icon>
                  </div>
                </div>
                <div
                  style={{
                    display:
                      visibleId === approval.approval_id ? "block" : "none",
                  }}
                >
                  <div className="allApprovalsIconHolder">
                    <div>
                      <h4>{approval.title}</h4>
                      <p
                        style={{
                          color:
                            approval.status === "Pending"
                              ? "rgb(136, 67, 3)"
                              : approval.status === "Approved"
                              ? "rgb(50, 116, 83)"
                              : approval.status === "Rejected"
                              ? "rgba(151, 43, 43, 1)"
                              : approval.status === "In_progress"
                              ? "rgba(89, 44, 119, 1)"
                              : "black",
                          backgroundColor:
                            approval.status === "Pending"
                              ? "rgb(243, 193, 146)"
                              : approval.status === "Approved"
                              ? "rgba(91, 206, 149, 1)"
                              : approval.status === "Rejected"
                              ? "rgba(221, 89, 89, 1)"
                              : approval.status === "In_progress"
                              ? "rgba(161, 84, 212, 1)"
                              : "black",
                        }}
                        className="allApprovalsIconp"
                      >
                        {approval.status}
                      </p>
                    </div>
                    <Icon
                      icon="mingcute:down-line"
                      width="24"
                      height="24"
                      className="allApprovalsIcon"
                    />
                  </div>
                </div>
              </div>

              <div
                className="approvaldetails"
                style={{
                  display:
                    visibleId === approval.approval_id ? "block" : "none",
                }}
              >
                <div className="approvalimage">
                  <img
                    src={approval.photo}
                    alt="approval"
                    className="approvalimg"
                  />
                </div>
                <span
                  className="singleRequestp4"
                  style={{
                    color:
                      approval.status === "Pending"
                        ? "rgb(136, 67, 3)"
                        : approval.status === "Approved"
                        ? "rgb(50, 116, 83)"
                        : approval.status === "Rejected"
                        ? "rgba(151, 43, 43, 1)"
                        : approval.status === "In_progress"
                        ? "rgba(89, 44, 119, 1)"
                        : "black",
                    backgroundColor:
                      approval.status === "Pending"
                        ? "rgb(243, 193, 146)"
                        : approval.status === "Approved"
                        ? "rgba(91, 206, 149, 1)"
                        : approval.status === "Rejected"
                        ? "rgba(221, 89, 89, 1)"
                        : approval.status === "In_progress"
                        ? "rgba(161, 84, 212, 1)"
                        : "black",
                  }}
                >
                  {approval.status}
                </span>
                <div className="approvalDescription">
                  <h2>{approval.title}</h2>
                  <p className="approvalDescriptionp">{approval.description}</p>
                  <h3>Status History</h3>
                  <div className="statusHistory">
                    <div>
                      <Icon
                        icon="material-symbols-light:upload"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className="statusHistory2">
                      <h4 className="requestSubmittedath4">
                        Request Submitted
                      </h4>
                      <p className="requestSubmittedatp">
                        {new Date(approval.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="statusHistory">
                    <div>
                      <Icon
                        icon="simple-icons:ticktick"
                        width="15"
                        height="15"
                        className="statusHistoryIcon"
                      />
                    </div>
                    <div className="statusHistory2">
                      <h4 className="requestSubmittedath4">
                        {approval.status}
                      </h4>
                      <p className="requestSubmittedatp">Current stage</p>
                    </div>
                  </div>
                </div>
                <div className="approvebtnsdivHolder">
                  <h3>Your action required</h3>
                  <div className="noteHolder">
                    <textarea
                      type="text"
                      className="note"
                      placeholder="Add a note"
                      rows={5}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                  <div className="approvebtnsdiv">
                    <button
                      className="approveBTN"
                      onClick={() => {
                        user.user_type !== "Architect"
                          ? onApprove(
                              approval.approval_id,
                              approval.request_id,
                              "Approved",
                              note
                            )
                          : onApprove(
                              approval.approval_id,
                              approval.request_id,
                              "In_progress",
                              note
                            );
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="rejectBTN"
                      onClick={() => {
                        onApprove(
                          approval.approval_id,
                          approval.request_id,
                          "Rejected",
                          note
                        );
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
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

export default Approval;
