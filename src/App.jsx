import "./App.css";
import RefferalForm from "./components/ReferralForm";
import TFTCLogo from "/tftc-logo.svg";

export default function App() {
  return (
    <main>
      <div className="img-container">
        <img src={TFTCLogo} alt="TFTC Logo" />
      </div>
      <h1>Referral Form</h1>
      <RefferalForm />
    </main>
  );
}
