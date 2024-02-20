import React, { useState } from "react";
import Home from "./pages/home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Welcome to page</h1>
      <Home />
      <p>Вы нажали {count} раз</p>
      <button onClick={() => setCount(count + 1)}>Нажми на меня</button>
    </div>
  );
}

export default App;
