import React, { useState } from "react";
import "mathlive";

function MathLiveEditor() {
  const [mathContent, setMathContent] = useState("");

  const handleInput = (event) => {
    setMathContent(event.target.getValue("latex"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Math content submitted:", mathContent);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "15px" }}>MathLive Editor</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <math-field
          onInput={handleInput}
          style={{
            fontSize: "24px",
            width: "80%",
            minWidth: "500px",
            minHeight: "80px",
            padding: "10px",
            border: "2px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            outline: "none",
          }}
        ></math-field>

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "15px",
            padding: "12px 25px",
            fontSize: "18px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s ease-in-out",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Submit Math
        </button>
      </div>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <strong>LaTeX Output:</strong>{" "}
        <span style={{ color: "#007BFF" }}>{mathContent}</span>
      </div>
    </div>
  );
}

export default MathLiveEditor;
