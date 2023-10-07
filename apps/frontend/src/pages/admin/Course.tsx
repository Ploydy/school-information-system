import { useEffect, useState } from "react";
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
        <Link to="/admin/course/new">
          <button className="btn btn-dark AddNewCourse">Add a new Course</button>
        </Link>
        <table className="table-fixed">
          <thead >
            <tr>
              <th className="border w-1/5 px-1 py-2" scope="col">Id</th>
              <th className="border w-1/5 px-1 py-2" scope="col">Course</th>
              <th className="border w-1/5 px-1 py-2" scope="col">Total Units</th>
              <th className="border w-1/5 px-1 py-2" scope="col">Description</th>
              <th className="border w-1/5 px-1 py-2" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <th className="border px-4 py-2" scope="row">{course.id}</th>
                <td className="border px-4 py-2 text-center">{course.name}</td>
                <td className="border px-4 py-2 text-center">{course.totalUnits}</td>
                <td className="border px-4 py-2 text-center" >{course.description}</td>
                <td className="border px-4 py-2 text-center">
                  <Link to={`/admin/course/${course.id}`}>
                    <button
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    className=""
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