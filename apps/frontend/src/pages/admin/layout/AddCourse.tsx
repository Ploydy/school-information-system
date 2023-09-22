import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface Course {
  name: string;
  totalUnits: number | null;
  description: string;
}

function AddCourse() {
  const [course, setCourses] = useState<Course>({
    name: "",
    totalUnits: null,
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourses((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/course", course);
      navigate("/admin/course");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container card">
      <div className="form-title text-center">
        <h2 className="text-dark">New Course</h2>
        <span className="">Use the below form to create a new course</span>
      </div>

      <form action="/course" method="POST">
        <div className="newCourse">
          <div className="form-group">
            <input type="text" name="name" onChange={handleChange} placeholder="Course Name" />
          </div>
          <div className="form-group">
            <input type="number" name="totalUnits" onChange={handleChange} placeholder="Total Units" />
          </div>

          <div className="form-control mt-3">
            <textarea
              className="form-control"
              rows={5}
              placeholder="Description"
              name="description"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-info Save" onClick={handleClick}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;