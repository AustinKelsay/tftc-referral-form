import "./App.css";
import RefferalForm from "./components/ReferralForm";
import TFTCLogo from "/tftc-logo.svg";
import QuestionMark from "/question-mark.svg";

export default function App() {
  return (
    <main>
      <div className="img-container">
        <img src={TFTCLogo} alt="TFTC Logo" />
      </div>
      <h1>Referral Form</h1>
      <div>
        {/* <div className="question-mark-container">
          <img
            style={{ width: "25px" }}
            src={QuestionMark}
            alt="Question Mark"
          />
        </div> */}
        <ol>
          <li>
            Think of someone in your network who isn't a member of the TFTC
            community and refer them to our email list using the form below.
          </li>
          <li>
            If that person stays subscribed to the newsletter and opens three
            issues you will both receive sats. A link to redeem your TFTC
            rewards will be sent directly to your email inbox.
          </li>
        </ol>
      </div>
      <RefferalForm />
    </main>
  );
}
