import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormWrapper = styled.form`
  font-family: "Nunito Sans", sans-serif;
  color: rgb(0, 0, 0);
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-family: "Nunito Sans";
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid rgb(229, 231, 235);
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
`;

const FormButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: rgb(21, 23, 26);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const Message = styled.p`
  margin-bottom: 1rem;
  color: ${(props) => (props.type === "error" ? "red" : "green")};
`;

const ReferralForm = () => {
  const [referrerName, setReferrerName] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [refereeEmail, setRefereeEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ghost-referral-server.vercel.app/referral",
        {
          referrerName,
          referrerEmail,
          refereeEmail,
        },
      );

      if (response.status === 200) {
        setMessage({
          text: "Referral submitted successfully!",
          type: "success",
        });
        setReferrerName("");
        setReferrerEmail("");
        setRefereeEmail("");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const { details } = error.response.data;
          const errorMessages = {
            "Referee is already a member.": "The referee is already a member.",
            "Referrer is already a member.":
              "The referrer is already a member.",
            "Referrer has already made a referral.":
              "The referrer has already made a referral. Only one referral per member at this time.",
          };
          setMessage({
            text: errorMessages[details] || error.response.data.message,
            type: "error",
          });
        } else {
          setMessage({
            text: "An error occurred. Please try again later.",
            type: "error",
          });
        }
      } else if (error.request) {
        setMessage({
          text: "No response received from the server. Please try again later.",
          type: "error",
        });
      } else {
        setMessage({
          text: "An error occurred. Please try again later.",
          type: "error",
        });
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {message.text && <Message type={message.type}>{message.text}</Message>}
      <div>
        <FormLabel htmlFor="referrerName">Your First Name:</FormLabel>
        <FormInput
          type="text"
          id="referrerName"
          value={referrerName}
          onChange={(e) => setReferrerName(e.target.value)}
          required
        />
      </div>
      <div>
        <FormLabel htmlFor="referrerEmail">
          Your Email (Associated with TFTC):
        </FormLabel>
        <FormInput
          type="email"
          id="referrerEmail"
          value={referrerEmail}
          onChange={(e) => setReferrerEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <FormLabel htmlFor="refereeEmail">
          Email of the person you are referring:
        </FormLabel>
        <FormInput
          type="email"
          id="refereeEmail"
          value={refereeEmail}
          onChange={(e) => setRefereeEmail(e.target.value)}
          required
        />
      </div>
      <FormButton type="submit">Submit</FormButton>
    </FormWrapper>
  );
};

export default ReferralForm;
