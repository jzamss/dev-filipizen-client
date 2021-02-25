import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import { getService, getServiceComponent } from "../modules";
import { PartnerContext, ContactContext } from "rsi-react-filipizen";
import { usePartner } from "../hooks";

const PartnerServiceScreen = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [partner, setPartner, isPartnerError] = usePartner(location);
  const [service, setService] = useState();
  const [contact, setContact] = useState({
    name: "JUAN",
    address: "CEBU",
    email: "g@gmail.com",
    verified: false,
  });

  useEffect(() => {
    if (!partner) return;
    const service = getService({ partner, location });
    if (service) {
      setService(service);
    } else {
      history.push("/partners");
    }
  }, [partner]);

  useEffect(() => {
    if (isPartnerError) {
      history.push("/partners");
    }
  }, [isPartnerError, history]);

  if (!partner || !service) return null;

  const ServiceComponent = getServiceComponent(service);
  return (
    <PartnerContext.Provider value={[partner, setPartner]}>
      <ContactContext.Provider value={[contact, setContact]}>
        <LguMasterTemplate partner={partner}>
          <ServiceComponent {...props} />
        </LguMasterTemplate>
      </ContactContext.Provider>
    </PartnerContext.Provider>
  );
};

export default PartnerServiceScreen;
