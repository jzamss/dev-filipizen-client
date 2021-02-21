import React, { useEffect } from "react";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import { Title, Subtitle, Link } from "../rsi-react-components";
import UnderMaintenance from "../components/UnderMaintenance";
import "./PartnerScreen.css";
import { usePartner } from "../hooks";

const ServiceList = (props) => {
  const { modules, onSelect } = props;
  return (
    <div className="PartnerScreen__modules">
      {modules.map((module, idx) => {
        return (
          <div key={`${module.name}${idx}`} className="PartnerScreen__module">
            <Subtitle>{module.title}</Subtitle>
            {module.services.map((service) => (
              <Link
                key={service.name}
                component="button"
                onClick={() => onSelect(module, service)}
              >
                {service.title}
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const PartnerScreen = ({ location, history }) => {
  const [partner, modules, partnerError] = usePartner({ location });

  useEffect(() => {
    if (partnerError) {
      history.push("/partners");
    }
  }, [partnerError, history]);

  const onSelectService = (module, service) => {
    history.push({
      pathname: `/partner/${partner.group.name}_${partner.name}/${module.name}/${service.name}`,
      state: { partner, module, service },
    });
  };

  return (
    <LguMasterTemplate partner={partner}>
      {modules.length > 0 ? (
        <div className="PartnerScreen">
          <Title>Select Transaction</Title>
          <ServiceList modules={modules} onSelect={onSelectService} />
        </div>
      ) : (
        <UnderMaintenance containerStyle={{ marginTop: 40 }} />
      )}
    </LguMasterTemplate>
  );
};

export default PartnerScreen;
