import React, { useState, useContext } from "react";
import { Card, Title, Panel, Wizard } from "rsi-react-components";
import {
  ContactContext,
  PartnerContext,
  ContactVerification,
} from "rsi-react-filipizen";

const RptBillingController = ({ history }) => {
  const [contact, setContact] = useContext(ContactContext);

  const onVerifyContact = (contact) => {};

  return (
    <Card>
      <Title>Online Realty Tax Billing</Title>
      <ContactVerification
        visible={!contact.verified}
        onVerify={onVerifyContact}
        onCancel={history.goBack}
      />
      <Wizard visible={contact.verified}>
        <Wizard.Page>
          <h1>Verified </h1>
          <pre>{JSON.stringify(contact, null, 2)}</pre>
        </Wizard.Page>
      </Wizard>
      {/* <pre>{JSON.stringify(contact, null, 2)}</pre> */}
    </Card>
  );
};

export default RptBillingController;
