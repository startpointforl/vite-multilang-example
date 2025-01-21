import { useState } from "react";
import "../App.css";

export const SimpleComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h1>Simple component</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
};
