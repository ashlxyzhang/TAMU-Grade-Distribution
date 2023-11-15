import React, { useEffect, useState } from "react";
import Form from "./Form";

const FetchGRDs = () => {
  const [data, setData] = useState({
    A: [0],
    B: [0],
    C: [0],
    D: [0],
    F: [0],
    GPA: [0],
    Q: [0],
    TOTAL: [0],
    INSTRUCTOR: [""],
    A_PER: [0],
    B_PER: [0],
    C_PER: [0],
    D_PER: [0],
    F_PER: [0],
    COURSE: [""],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/data");
        if (!res.ok) {
          throw new Error("Data not fetched");
        }
        const result = await res.json();

        Object.entries(data).forEach(([key, values]) => {
          setData((prevData) => ({
            ...prevData,
            [key]: Object.values(result[key]),
          }));
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Form />
      <div className="container d-flex justify-content-center">
        <table className="table table-striped table-bordered">
          <thead>
            <tr style={{ backgroundColor: "lightblue" }}>
              {Object.entries(data).map(([key, values], index) => (
                <th scope="col" key={index}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* data.A[0], data.B[0], etc. */}
            {/* data.A[1], data.B[1], etc. */}
            {(data as Record<string, number[] | string[]>)[
              Object.keys(data)[0]
            ].map((_, row) => (
              <tr key={row}>
                {Object.entries(data).map(([key, values], col) => (
                  <td key={col}>
                    {(data as Record<string, number[] | string[]>)[key][row]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FetchGRDs;
