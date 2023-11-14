import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
    F: [],
    GPA: [],
    Q: [],
    TOTAL: [],
    INSTRUCTOR: [],
    A_PER: [],
    B_PER: [],
    C_PER: [],
    D_PER: [],
    F_PER: [],
    COURSE: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/data");
        if (!res.ok) {
          throw new Error("Data not fetched");
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <p>{data.A[0]}</p>
        <p>{data.B[0]}</p>
        <p>{data.C[0]}</p>
        <p>{data.D[0]}</p>
      </div>
    </>
  );
}

export default App;
