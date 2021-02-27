import React from "react";
import {
  FormModal,
  Combobox,
  integerRangeToArray,
  getCurrentYear,
} from "rsi-react-components";

const PayOption = ({ initialData, onAccept, open, onCancel }) => {
  const handleAccept = (data) => {
    console.log("handleAccept", data);
    onAccept(data);
  };

  const cy = getCurrentYear();
  const fromQtr = initialData.fromqtr || 1;
  const fromYear = initialData.fromyear || cy;
  const years = integerRangeToArray(fromYear, cy + 3);
  const qtrs = integerRangeToArray(fromQtr, 4);

  return (
    <FormModal
      initialData={initialData}
      open={open}
      caption="Pay Options"
      onAccept={handleAccept}
      onCancel={onCancel}
      maxWidth={100}
    >
      <Combobox caption="Year to Bill" name="billtoyear" items={years} />
      <Combobox caption="Quarter to Bill" name="billtoqtr" items={qtrs} />
    </FormModal>
  );
};

export default PayOption;
