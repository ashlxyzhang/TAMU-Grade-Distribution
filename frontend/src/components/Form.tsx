import React, { useState } from "react";
import FetchGRDs from "./FetchGRDs";

const Form = () => {
  const [dep, setDep] = useState("");
  const [course, setCourse] = useState("");
  const [prof, setProf] = useState("");

  const getData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const depIn = event.currentTarget.elements.namedItem(
      "inputDep"
    ) as HTMLInputElement;
    const courseIn = event.currentTarget.elements.namedItem(
      "inputCourse"
    ) as HTMLInputElement;
    const profIn = event.currentTarget.elements.namedItem(
      "inputProf"
    ) as HTMLInputElement;

    setDep(depIn?.value || "");
    setCourse(courseIn?.value || "");
    setProf(profIn?.value || "");
  };

  return (
    <>
      <form action="" onSubmit={getData}>
        <div className="container d-flex align-items-center">
          <div className="mb-3 col-auto" style={{ paddingRight: 30 }}>
            <label htmlFor="inputDep">Department (CSCE, ARCH, etc.)</label>
            <input
              className="form-control"
              id="inputDep"
              type="text"
              placeholder=""
            />
          </div>
          <div className="mb-3 col-auto">
            <label htmlFor="inputCourse">Course Number (120, 301, etc.)</label>
            <input className="form-control" id="inputCourse" type="text" />
          </div>
          <div className="mb-3 col-auto">
            <label htmlFor="inputProf">
              Professor (Last Name, First Initial)
            </label>
            <input
              className="form-control"
              id="inputProf"
              type="text"
              placeholder="e.g. Ostrovskaya N"
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "lightblue" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <FetchGRDs
        dep={dep.toUpperCase()}
        course={course}
        prof={prof.toUpperCase()}
      />
    </>
  );
};

export default Form;
