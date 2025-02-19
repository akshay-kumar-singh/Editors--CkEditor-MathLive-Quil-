import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "mathlive";

const HybridEditor = () => {
  const quillRef = useRef(null);
  const [content, setContent] = useState("");
  const [showMathEditor, setShowMathEditor] = useState(false);
  const [mathLatex, setMathLatex] = useState("");

  const formulaHandler = () => {
    setShowMathEditor(true);
  };

  // Initialize Quill with combined functionality
  useEffect(() => {
    if (!quillRef.current) {
      const toolbarOptions = [
        [{ font: [] }, { size: [] }],
        [
          "bold",
          "italic",
          "underline",
          //  "strike"
        ],
        [
          { color: [] },
          //  { background: [] }
        ],
        [{ script: "sub" }, { script: "super" }],
        [
          // { header: [1, 2, 3, false] }
          // , "blockquote"  ,
          "code-block",
        ],
        [
          { list: "ordered" },
          { list: "bullet" },
          // { indent: "-1" },
          // { indent: "+1" },
        ],
        [{ align: [] }],
        ["link", "image", "video", "formula"],
        // ["clean"],
      ];

      quillRef.current = new Quill("#hybrid-editor", {
        theme: "snow",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: { formula: formulaHandler },
          },
          syntax: true,
        },
      });

      quillRef.current.on("text-change", () => {
        setContent(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  // Insert math equation
  const insertEquation = () => {
    if (mathLatex) {
      quillRef.current.focus();

      const range = quillRef.current.getSelection() || {
        index: quillRef.current.getLength(),
      };

      const mathSpan = `<span class="mathquill-render" data-latex="${mathLatex}">\\(${mathLatex}\\)</span>`;

      quillRef.current.clipboard.dangerouslyPasteHTML(range.index, mathSpan);

      quillRef.current.setSelection(range.index + mathLatex.length + 4, 0);

      setShowMathEditor(false);
      setMathLatex("");
    }
  };

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset(); // Render LaTeX with MathJax
    }
  }, [content]);

  const handleSubmit = () => {
    console.log("Submitted Content:", content);
  };

  return (
    <div className="hybrid-container">
      <h2>Hybrid Editor (Quill + MathLive)</h2>

      {/* Main Editor */}
      <div
        id="hybrid-editor"
        style={{ height: "300px", marginBottom: "20px" }}
      ></div>

      {/* MathLive Overlay */}
      {showMathEditor && (
        <div className="mathlive-overlay">
          <div className="mathlive-modal">
            <h3>Math Equation Editor</h3>
            <math-field
              style={{ width: "100%", fontSize: "24px", margin: "15px 0" }}
              onInput={(e) => setMathLatex(e.target.getValue("latex"))}
            ></math-field>
            <div className="math-buttons">
              <button onClick={insertEquation} className="math-insert">
                Insert Equation
              </button>
              <button
                onClick={() => setShowMathEditor(false)}
                className="math-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="output-preview"
        style={{
          marginTop: "20px",
          paddingTop: "10px",
          borderTop: "1px solid #ccc",
        }}
      >
        <h3>Preview:</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s ease-in-out",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default HybridEditor;
