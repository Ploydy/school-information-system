import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Course {
  id: string;
  name: string;
  totalUnits: number;
  description: string;
}

function UpdateCourse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Course>({
    id: "",
    name: "",
    totalUnits: 0,
    description: "",
  });

  // getting data
  useEffect(() => {
    axios
      .get<Course>('http://localhost:3001/course/' + id)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [id])

  // onsubmit
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    axios
      .put('http://localhost:3001/course/' + id, data)
      .then(res => {
        navigate("/admin/course");
      })
  }

  return (
    <div className="container card">
      <div className="form-title text-center">
        <h2 className="text-dark">Update Course</h2>
        <span className="">Use the below form to update a course</span>
      </div>

      <form>
        <div className="newCourse">

          <div className="form-group">
            <input
              disabled
              value={data.id}
            >
            </input>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={data.name}
              placeholder="Course Name"
              onChange={e => setData({ ...data, name: e.target.value })}
            >
            </input>
          </div>


          <div className="form-group">
            <input
              type="number"
              value={data.totalUnits}
              placeholder="Total Units"
              onChange={e => setData({ ...data, totalUnits: Number(e.target.value) })}
            >
            </input>
          </div>

          <div className="form-control mt-3">
            <textarea
              className="form-control"
              rows={5}
              placeholder="Description"
              value={data.description}
              onChange={e => setData({ ...data, description: e.target.value })}
            />
          </div>

          <button className="btn btn-info Save" onClick={handleClick} >Save</button>

        </div>


      </form>

    </div>
  )

};

export default UpdateCourse;