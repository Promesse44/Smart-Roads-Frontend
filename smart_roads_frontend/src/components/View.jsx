import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const View = () => {
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
            <span className="rightViewTitleSpan">James Bond</span>
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
        </div>
        <div className="singleRequestsHolder">
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
    </>
  );
};

export default View;
