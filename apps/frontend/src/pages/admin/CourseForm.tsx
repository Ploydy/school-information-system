import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CourseRequest, CourseResponse } from '@sis/dto'

type FormData = {
  id: string;
  name: string;
  totalUnits: number;
  description: string;
}

function CourseForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleClick = async (course: FormData) => {
    const request: CourseRequest = {
      name: course.name, totalUnits: course.totalUnits, description: course.description,
      id: course.id,
    }
    try {
     const result = await axios.post<CourseResponse, any, CourseRequest>("http://localhost:3001/course", request);
      navigate("/admin/course");
    } catch (err) {
      console.log(err);
    }
  };

    // getting data
    useEffect(  ()  => {
      axios
        .get('http://localhost:3001/course/' + id)
        .then(res => {
          setValue ("name", res.data.name);
          setValue ("totalUnits", res.data.totalUnits);
          setValue ('description', res.data.description);
        })
        .catch(err => console.log(err))
    }, [id])

  return ( 
    <div className="container card">
      <div className="form-title text-center">
        <h2 className="text-dark">{!id? 'New': 'Update'} Course</h2>
        <span className="">Use the below form to create a new course</span>
      </div>

      <form action="/course" method="POST">
        <div className="newCourse">
          <div className="form-group">
            <input
              type="text"
              placeholder="Course Name"
              {...register('name')}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Total Units"
              {...register('totalUnits')}
            />
          </div>

          <div className="form-control mt-3">
            <textarea
              className="form-control"
              rows={5}
              placeholder="Description"
              {...register('description')}

            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit(handleClick)}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;