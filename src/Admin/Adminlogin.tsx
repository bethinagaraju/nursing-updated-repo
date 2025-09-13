// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // function Adminlogin() {
// //   const [email, setEmail] = useState("");
// //   const [otp, setOtp] = useState("");
// //   const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");

// //   const navigate = useNavigate();
// //   const API_BASE = "http://localhost:8906/nursing/auth";

// //   // Send OTP
// //   const handleSendOtp = async () => {
// //     try {
// //       setLoading(true);
// //       setMessage("");
// //       const res = await axios.post(`${API_BASE}/send-otp`, { email }); // ✅ POST with body
// //       setStep(2);
// //       setMessage(res.data || "OTP sent to your email."); // Backend returns string
// //     } catch (error) {
// //       setMessage(error.response?.data?.message || "Failed to send OTP");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Verify OTP
// //   const handleVerifyOtp = async () => {
// //     try {
// //       setLoading(true);
// //       setMessage("");
// //       const res = await axios.post(`${API_BASE}/verify-otp`, { email, otp }); // ✅ POST with body

// //       if (res.data.success) {
// //         // Save token to localStorage
// //         localStorage.setItem("token", res.data.token);
// //         setMessage("Login successful!");
// //         // Redirect to /admin
// //         navigate("/admin");
// //       } else {
// //         setMessage("Invalid OTP");
// //       }
// //     } catch (error) {
// //       setMessage(error.response?.data?.message || "Failed to verify OTP");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
// //       <h1>Admin Login</h1>

// //       {/* Step 1: Enter Email */}
// //       {step === 1 && (
// //         <>
// //           <input
// //             type="email"
// //             placeholder="Enter your email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             style={{ width: "100%", padding: "10px", margin: "10px 0" }}
// //           />
// //           <button
// //             onClick={handleSendOtp}
// //             disabled={loading || !email}
// //             style={{ padding: "10px 20px", cursor: "pointer" }}
// //           >
// //             {loading ? "Sending..." : "Send OTP"}
// //           </button>
// //         </>
// //       )}

// //       {/* Step 2: Enter OTP */}
// //       {step === 2 && (
// //         <>
// //           <input
// //             type="text"
// //             placeholder="Enter OTP"
// //             value={otp}
// //             onChange={(e) => setOtp(e.target.value)}
// //             style={{ width: "100%", padding: "10px", margin: "10px 0" }}
// //           />
// //           <button
// //             onClick={handleVerifyOtp}
// //             disabled={loading || !otp}
// //             style={{ padding: "10px 20px", cursor: "pointer" }}
// //           >
// //             {loading ? "Verifying..." : "Verify OTP"}
// //           </button>
// //         </>
// //       )}

// //       {message && <p style={{ marginTop: "15px" }}>{message}</p>}
// //     </div>
// //   );
// // }

// // export default Adminlogin;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Adminlogin() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify OTP
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();
//   const API_BASE = "http://localhost:8906/nursing/auth";

//   // Send OTP
//   const handleSendOtp = async (auto = false) => {
//     try {
//       setLoading(true);
//       setMessage("");
//       const res = await axios.post(`${API_BASE}/send-otp`, { email });
//       setStep(2);
//       setMessage(res.data || "OTP sent to your email.");
//       if (auto) {
//         // Clear field so user just sees OTP input
//         setEmail("secretary@nursingmeet2026.com");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify OTP
//   const handleVerifyOtp = async () => {
//     try {
//       setLoading(true);
//       setMessage("");
//       const res = await axios.post(`${API_BASE}/verify-otp`, { email, otp });

//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token);
//         setMessage("Login successful!");
//         navigate("/admin");
//       } else {
//         setMessage("Invalid OTP");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to verify OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Detect special code NURSINGMEET2026
//   useEffect(() => {
//     if (email.trim().toUpperCase() === "NURSINGMEET2026") {
//       setEmail("secretary@nursingmeet2026.com");
//       handleSendOtp(true); // auto send OTP
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [email]);

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg, #4f46e5, #9333ea)",
//       }}
//     >
//       <div
//         style={{
//           background: "#fff",
//           padding: "40px",
//           borderRadius: "12px",
//           width: "100%",
//           maxWidth: "400px",
//           boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
//           textAlign: "center",
//         }}
//       >
//         <h1 style={{ marginBottom: "20px", color: "#4f46e5" }}>Admin Login</h1>

//         {step === 1 && (
//           <>
//             <input
//               type="text"
//               placeholder="Enter your email or code"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 margin: "10px 0",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//               }}
//             />
//             <button
//               onClick={() => handleSendOtp()}
//               disabled={loading || !email}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "none",
//                 borderRadius: "8px",
//                 background: "#4f46e5",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {step === 2 && (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 margin: "10px 0",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//               }}
//             />
//             <button
//               onClick={handleVerifyOtp}
//               disabled={loading || !otp}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "none",
//                 borderRadius: "8px",
//                 background: "#10b981",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//               }}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </>
//         )}

//         {message && (
//           <p
//             style={{
//               marginTop: "15px",
//               color: message.includes("success") ? "green" : "red",
//             }}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Adminlogin;





import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
  const [code, setCode] = useState(""); // Admin will enter only code
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const API_BASE = "http://localhost:8906/nursing/auth";
  const ADMIN_CODE = "NURSINGMEET2026";
  const ADMIN_EMAIL = "secretary@nursingmeet2026.com";

  // Send OTP
  const handleSendOtp = async () => {
    if (code.trim().toUpperCase() !== ADMIN_CODE) {
      setMessage("Invalid credentials");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(`${API_BASE}/send-otp`, {
        email: ADMIN_EMAIL,
      });
      setStep(2);
      setMessage(res.data || "OTP sent to your email.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(`${API_BASE}/verify-otp`, {
        email: ADMIN_EMAIL,
        otp,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful!");
        navigate("/admin");
      } else {
        setMessage("Invalid OTP");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4f46e5, #9333ea)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#4f46e5" }}>Admin Login</h1>

        {step === 1 && (
          <>
            <input
              type="password"
              placeholder="Enter Admin Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleSendOtp}
              disabled={loading || !code}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background: "#4f46e5",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                margin: "10px 0",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleVerifyOtp}
              disabled={loading || !otp}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                background: "#10b981",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("success") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Adminlogin;
