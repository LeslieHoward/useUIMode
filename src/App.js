import "./styles.css";
import useUIMode from "./useUIMode";

export default function App() {
  const { uiMode, isPCMode } = useUIMode();

  console.log("APP uiMode", uiMode);
  console.log("APP isPCMode", isPCMode);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
