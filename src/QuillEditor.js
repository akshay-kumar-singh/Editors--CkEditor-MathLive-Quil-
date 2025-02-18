import React, { useRef, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const QuillEditor = () => {
  const quillRef = useRef(null);
  const [quillContent, setQuillContent] = useState("");

  useEffect(() => {
    if (!quillRef.current) {
      const toolbarOptions = [
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ header: [1, 2, 3, false] }, "blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ direction: "rtl" }, { align: [] }],
        ["link", "image", "video", "formula"],
        ["clean"],
      ];

      quillRef.current = new Quill("#quill-editor", {
        theme: "snow",
        placeholder: "Start writing rich text...",
        modules: {
          toolbar: toolbarOptions,
          syntax: true,
        },
      });

      quillRef.current.on("text-change", () => {
        setQuillContent(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  const handleSubmit = () => {
    console.log("Submitted Content:", quillContent);
  };

  return (
    <div className="editor-container">
      <h2>Quill Editor</h2>
      <div id="toolbar"></div>
      <div
        id="quill-editor"
        style={{ height: "250px", marginBottom: "10px" }}
      ></div>

      <h3>Output:</h3>
      <div
        className="output-box"
        dangerouslySetInnerHTML={{
          __html: quillContent || "<p>No text yet.</p>",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{ marginTop: "10px", padding: "8px 12px", cursor: "pointer" }}
      >
        Submit
      </button>
    </div>
  );
};

export default QuillEditor;
