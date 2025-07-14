import { useState } from "react";

function TestComponent() {
  const [val1, setVal1] = useState(10);

  return (
    <div>
      <h3>This is test component</h3>
      <button onClick={() => setVal1(val1 + 1)}>Change</button>
    </div>
  );
}

export default TestComponent;
