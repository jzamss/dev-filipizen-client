import React from 'react'
import { EPayment } from 'rsi-react-filipizen'

import OnlineBilling from './OnlineBilling';

const Payment = (props) => {
  return (
    <EPayment
      {...props}
      component={OnlineBilling}
      initialStep={1}
    />
  )
}

export default Payment
