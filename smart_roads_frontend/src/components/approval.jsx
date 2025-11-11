import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Approval = () => {
  const token = localStorage.getItem("token");
  // const location = useLocation();
  // const { user } = location.state;
  const user = JSON.parse(localStorage.getItem("user"));
  const [approvals, setApprovals] = useState([]);
  const [visibleId, setVisibleId] = useState(null);
  const [approvalVisible, setApprovalVisible] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/approvals", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((output) => {
        setApprovals(output);
      });
    return;
  }, [token]);
  console.log(JSON.stringify(approvals, null, 2));

  return (
    <>
      <div className="viewTitle">
        <div className="leftViewTitle">
          <span className="leftViewTitleSpan">Smart Roads </span>
          <span className="spna">Admin Dashboard</span>
          <div>
            <Link className="titleLink">All requests</Link>
          </div>
        </div>
        <div className="rightViewTitle1">
          <div className="rightViewTitleUserName1">
            <Icon icon="iconamoon:notification" width="20" height="20" />
          </div>
          <div className="rightViewTitleUserName2">
            <button className="viewProfile1"></button>
          </div>
          <div className="rightViewTitleUserName2">
            <p className="rightViewTitleSpan">{user.user_name}</p>
            <p className="rightViewTitle">{user.user_type}</p>
          </div>
        </div>
      </div>
      <h1 className="approvalH1">Request Approval</h1>
      <div className="approvedbydivHOlder">
        <div className="approvedbydiv">
          <p className="approvedbyp">Pending Approvals</p>{" "}
          <h2 className="approvedbyh2">12</h2>
        </div>
        <div className="approvedbydiv">
          <p className="approvedbyp">Approved by You</p>{" "}
          <h2 className="approvedbyh2">20</h2>
        </div>
        <div className="approvedbydiv">
          <p className="approvedbyp">Rejected by You</p>{" "}
          <h2 className="approvedbyh2">8</h2>
        </div>
      </div>
      <div className="allApprovalHolder">
        {approvals.map((approval) => {
          return (
            <>
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
                <h4>{approval.title}</h4>
                <p>{approval.description}</p>
              </div>

              <div
                className="approvaldetails"
                style={{
                  display:
                    visibleId === approval.approval_id ? "block" : "none",
                }}
              >
                <div className="approvalimage">
                  <img src="" alt="approval Image" />
                </div>
                <span className="singleRequestp4">Pending</span>
                <div className="approvalDescription">
                  <h2>Pothole Main Street</h2>
                  <p className="approvalDescriptionp">
                    Secondary road connecting main road (Nyanza-Bugesera) to the
                    neighborhood econdary road connecting main road
                    (Nyanza-Bugesera) to the neighborhood econdary road
                    connecting main road (Nyanza-Bugesera) to the neighborhood
                    econdary road connecting main road (Nyanza-Bugesera) to the
                    neighborhood econdary road connecting main road
                    (Nyanza-Bugesera) to the neighborhood
                  </p>
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
                      <p className="requestSubmittedatp">2024-10-26</p>
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
                      <h4 className="requestSubmittedath4">Waiting Approval</h4>
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
                    />
                  </div>
                  <div className="approvebtnsdiv">
                    <button className="approveBTN">Approve</button>
                    <button className="rejectBTN">Reject</button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Approval;
