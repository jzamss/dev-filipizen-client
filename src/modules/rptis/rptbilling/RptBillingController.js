import React from "react";
import { PageFlow } from "rsi-react-components";
import { EmailVerification, usePartnerFromLocation } from "rsi-react-filipizen"

import InitialInfo from "./InitialInfo";
import Payment from "./Payment";

const pages = [
  { step: 1, name: "verification", caption: "Verification", Component: EmailVerification },
  { step: 2, name: "initial", caption: "Initial Information", Component: InitialInfo },
  { step: 3, name: "payment", caption: "Payment", Component: Payment },
];

const RptBillingController = (props) => {
  const { history, location } = props;
  const [partner] = usePartnerFromLocation(location);

  const onComplete = () => {
    history.goBack();
  };

  const onCancel = () => {
    history.goBack();
  };

  const onCancelPayment = () => {
    history.goBack();
  }

  return (
    <PageFlow
      title="Online Realty Tax Billing"
      initialData={{
        txntype: "rptcol",
        refno: null,
        bill: {},
      }}
      {...props}
      partner={partner}
      pages={pages}
      onCancel={onCancel}
      onComplete={onComplete}
      onCancelPayment={onCancelPayment}
    />
  );
};

export default RptBillingController;
