import TestComponent from "./components/TestComponent";
import AuthComponent from "./components/AuthComponent";

function App() {
  return (
    <>
      <AuthComponent>
        {/* <FileUpload /> */}
        <TestComponent />
        <h4>This is App Component</h4>
      </AuthComponent>
    </>
  );
}

export default App;
