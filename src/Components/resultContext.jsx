import { createContext, useContext, useState } from "react";

const ResultContext = createContext();

const ResultProvider = ({ children }) => {
  const [result, setResult] = useState("");

  return (
    <>
      <ResultContext.Provider value={{ result, setResult }}>
        {children}
      </ResultContext.Provider>
    </>
  );
};

const useResultContext = () => {
  return useContext(ResultContext);
};

export { ResultContext, ResultProvider, useResultContext };
