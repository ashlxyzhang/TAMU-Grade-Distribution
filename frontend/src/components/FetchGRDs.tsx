import React, { useEffect, useState } from "react";
import Form from "./Form";

interface Props {
  dep: string;
  course: string;
  prof: string;
}

const FetchGRDs = ({ dep, course, prof }: Props) => {
  const [data, setData] = useState({
    COURSE: [""],
    PROF: [""],
    GPA: [0],
    A: [0],
    B: [0],
    C: [0],
    D: [0],
    F: [0],
    "A (%)": [0],
    "B (%)": [0],
    "C (%)": [0],
    "D (%)": [0],
    "F (%)": [0],
    Q: [0],
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
          if (result.hasOwnProperty(key)) {
            setData((prevData) => ({
              ...prevData,
              [key]: Object.values(result[key]),
            }));
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const displayData = (row: number, col: number, key: string) => {
    if (
      dep !== "" &&
      course !== "" &&
      data.COURSE[row] === dep + " " + course
    ) {
      if (data.PROF[row].includes(prof) || prof === "") {
        return (
          <td key={col}>
            {(data as Record<string, number[] | string[]>)[key][row]}
          </td>
        );
      }
    } else if (data.PROF[row].includes(prof) || prof === "") {
      return (
        <td key={col}>
          {(data as Record<string, number[] | string[]>)[key][row]}
        </td>
      );
    }
  };

  return (
    <>
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
                {Object.entries(data).map(([key, values], col) =>
                  displayData(row, col, key)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FetchGRDs;
