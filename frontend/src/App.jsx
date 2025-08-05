import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code.trim()) {
      alert("Please enter some code to review.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (err) {
      setReview(" Error fetching review. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              width: "100%",
              minHeight: "100%",
              overflow: "auto",
            }}
          />
        </div>

        <div
          onClick={reviewCode}
          className="review"
          style={{
            backgroundColor: loading ? "#999" : "#d6d6f5",
            pointerEvents: loading ? "none" : "auto",
            cursor: loading ? "not-allowed" : "pointer",
            textAlign: "center",
            padding: "10px",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          {loading ? "🔄 Getting your review..." : "Review"}
        </div>
      </div>

      <div className="right">
        {loading ? (
          <p className="text-white">⏳ Analyzing your code...</p>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
}

export default App;
