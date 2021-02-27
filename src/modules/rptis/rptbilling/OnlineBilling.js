import React, { useState } from 'react'
import {
  Card,
  Panel,
  Text,
  Button,
  Submit,
  Form,
  ActionBar,
  Spacer,
  Service,
  Error,
  Subtitle,
  Title,
  Decimal,
  BackLink,
  useDataContext
} from 'rsi-react-components'

import PayOption from './PayOption'

const origin = 'filipizen'

const OnlineBilling = ({
  title,
  partner,
  contact,
  onCancel,
  onSubmit,
  error: paymentError
}) => {
  const [ctx, updateCtx] = useDataContext();
  const [error, setError] = useState(paymentError);
  const [showPayOption, setShowPayOption] = useState(false)

  const getBilling = async (billOptions = {}) => {
    const svc = await Service.lookupAsync(`${partner.id}:OnlineLandTaxBillingService`, "rpt")
    const params = { txntype: ctx.txntype, refno: ctx.refno, ...billOptions }
    return await svc.invoke("getBilling", params);
  }

  const loadBill = (billOptions = {}) => {
    setError(null);
    getBilling(billOptions).then(bill => {
      updateCtx({bill: bill.info});
    }).catch(err => {
      setError(err.toString());
    })
  }

  const payOptionHandler = (billOption) => {
    setShowPayOption(false)
    loadBill(billOption)
  }

  const checkoutPayment = (bill) => {
    const po = { ...bill };
    const items = po.items;
    delete po.items;

    onSubmit({
      origin, 
      refno: ctx.refno,
      txntype: ctx.txntype,
      orgcode: partner.id,
      billtoyear: bill.billtoyear,
      billtoqtr: bill.billtoqtr,
      paidby: bill.paidby,
      paidbyaddress: bill.paidbyaddress,
      amount: bill.amount,
      particulars: `Real Property TD No. ${bill.tdno} ${bill.billperiod}`,
      items: items,
      info: {data: po},
    })
  }

  const onCancelBilling = () => {
    onCancel(0);
  }

  const visibleContactInfo = !contact.email ? false : contact.email === ctx.bill.email;

  return (
    <Card style={{maxWidth: 500}}>
      <Title>{title}</Title>
      <Subtitle>Billing Information</Subtitle>
      <Spacer />
      <Error msg={error} />
      <Form initialData={ctx.bill} onSubmit={checkoutPayment}>
        <Panel row>
          <Text name='billno' caption='Bill No.' readOnly={true} />
          <Text name='billdate' caption='Bill Date' readOnly={true} />
        </Panel>
        <Text name='tdno' caption='TD No.' readOnly={true} />
        <Text name='fullpin' caption='PIN' readOnly={true} />
        <Text name='taxpayer.name' caption='Property Owner' readOnly={true} visible={visibleContactInfo} />
        <Text name='taxpayer.address' caption='Owner Address' readOnly={true} visible={visibleContactInfo} />
        <Text name='billperiod' caption='Bill Period' readOnly={true} />
        <Decimal name='amount' caption='Amount Due' readOnly={true} textAlign="left" />
        <ActionBar>
          <BackLink caption='Back' action={onCancelBilling} />
          <Panel row>
            <Button caption='Pay Option' action={() => setShowPayOption(true)} variant="outlined" />
            <Submit caption='Confirm Payment' disabled={ctx.bill.amount === 0} />
          </Panel>
        </ActionBar>
      </Form>
      
      <PayOption
        initialData={{
            billtoyear: ctx.bill.billtoyear,
            billtoqtr: ctx.bill.billtoqtr,
            fromyear: ctx.bill.fromyear,
            fromqtr: ctx.bill.fromqtr,
          }}
        open={showPayOption}
        onAccept={payOptionHandler}
        onCancel={() => setShowPayOption(false)}
      />
    </Card>
  )
}

export default OnlineBilling
