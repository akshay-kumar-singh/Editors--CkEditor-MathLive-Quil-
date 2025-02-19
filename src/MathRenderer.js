import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

// MathJax Configuration
const config = {
  loader: { load: ["input/tex", "output/chtml"] },
};

const MathRenderer = ({ content }) => {
  return (
    <MathJaxContext config={config}>
      <MathJax>
        {/* Ensure MathJax properly renders */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </MathJax>
    </MathJaxContext>
  );
};

export default MathRenderer;
