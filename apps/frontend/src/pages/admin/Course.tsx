import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Course {
  id: number;
  name: string;
  totalUnits: number;
  description: string;
}

export default function Course() {
  const [courses, setCourses] = useState<Course[]>([]);

  const handleDelete = async (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this course?") === true
    ) {
      const result = await fetch(`http://localhost:3001/course/${id}`, {
        method: "DELETE",
      });
      getCourses();
    }
  };

  const getCourses = async () => {
    // get
    const result = await fetch("http://localhost:3001/course");
    const res = await result.json();
    setCourses(res);
  };

  useEffect(() => {
    (async () => {
      getCourses();
    })();
  }, []);

  return (
    <div>
      <section>
        <h2>Course List</h2>
        <Link to="/admin/AddCourse">
          <button className="btn btn-dark AddNewCourse">Add a new Course</button>
        </Link>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Course</th>
              <th scope="col">Total Units</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <th scope="row">{course.id}</th>
                <td>{course.name}</td>
                <td>{course.totalUnits}</td>
                <td>{course.description}</td>
                <td>
                  <Link to={`/admin/updateCourse/${course.id}`}>
                    <button
                      className="btn btn-sm btn-outline-info "
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    className="btn btn-sm m-2 btn-outline-danger"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}