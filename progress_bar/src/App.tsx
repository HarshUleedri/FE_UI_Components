import { useEffect, useState } from "react";
import { ProgressBar } from "./compontents/ProgressBar";

const App = () => {
  const [value, setValue] = useState<number>(0);
  const [successfull, setSuccessfull] = useState<boolean>(false);

  useEffect(() => {
    const int = setInterval(() => {
      setValue((prev) => {
        if (value >= 100) {
          clearInterval(int);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(int);
  }, [value]);

  return (
    <div className="app">
      <h1 className="title">Progress Bar</h1>
      <ProgressBar onComplete={() => setSuccessfull(true)} value={value} />
      {successfull && <p className="success">Successfully completed !</p>}
    </div>
  );
};

export default App;
