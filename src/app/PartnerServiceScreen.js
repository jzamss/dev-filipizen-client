import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
// import LguMasterTemplate from "../templates/LguMasterTemplate";
// import { getPartnerServiceFromLocation } from "../lib/partner";
import { getServiceComponent } from "../modules";

const getPartnerServiceInfo = (location) => {
  if (location && location.state) {
    return location.state;
  }
  return {};
};

const PartnerServiceScreen = (props) => {
  const location = useLocation();
  const history = useHistory();
  console.log("location", location);
  console.log("history", history);

  const { partner, service } = getPartnerServiceInfo(location);
  const ServiceModule = getServiceComponent(service);

  return (
    <div>
      <h1>Partner Service</h1>
      <ServiceModule />
    </div>
  );
};

export default PartnerServiceScreen;
