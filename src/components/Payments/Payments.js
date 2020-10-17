import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  height: auto;
  padding: 2em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 600;
  font-size: 1.3em;
  color: #3d9a04;
`;

const PaymentDetailsDiv = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
`;

const Detail = styled.div`
  width: 40%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const Option = styled.h3`
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 1.1em;
`;

const Value = styled.h3`
  font-family: Helvetica;
  font-style; normal;
  font-weight: 600;
  font-size: 1.2em;
`;

const MakePaymentButton = styled.button`
  height: 2.4em;
  width: 12em;
  color: white;
  background-color: #3d9a04;
  border: none;
  border-radius: 7px;
  margin-top: 1em;
  cursor: pointer;
`;

const MpesaDiv = styled.div`
  margin-top: 3em;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  margin-top: 0.5em;
  height: 2.3em;
  width: 100%;
  background-color: #e5e5e5;
  border: none;
  border-radius: 8px;
`;

function Payments() {
  return (
    <MainDiv>
      <Title>Payments</Title>
      <PaymentDetailsDiv>
        <Detail>
          <Option>Lessor Name : </Option>
          <Value>Kinyanjui</Value>
        </Detail>
        <Detail>
          <Option>Amount : </Option>
          <Value>Ksh. 12000</Value>
        </Detail>
      </PaymentDetailsDiv>
      <MakePaymentButton>Make Payment</MakePaymentButton>

      <MpesaDiv>
        <Title>Enter Mpesa Code</Title>
        <Input></Input>
        <MakePaymentButton>Send</MakePaymentButton>
      </MpesaDiv>
    </MainDiv>
  );
}

export default Payments;
