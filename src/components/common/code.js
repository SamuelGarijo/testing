import { useEffect, useState } from "react";
import Prism from "prismjs";

Prism.hooks.add("after-highlight", function (env) {
  var lines = env.element.innerHTML.split("\n");
  for (var i = 0; i < lines.length; i++) {
    lines[i] = '<span class="line">' + lines[i] + "</span>";
  }
  env.element.innerHTML = lines.join("\n");
});

export default function Code({ url, language = "clike" }) {
  const [code, setCode] = useState("");
  const [key, setKey] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        setCode(text);
        setKey((prevKey) => prevKey + 1);
      });
  }, [url]);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div key={key}>
      <pre className="prismjs">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
