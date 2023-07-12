import React, { useEffect, useState } from "react";
import "./Courses.css";
import axios from "axios";
import { useNavigate } from "react-router";
import formatRupiah from "../../utils/FormatRupiah";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [visibleBtn, setVisibleBtn] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/courses`);
      setCourses(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const goAddCourse = () => {
    navigate(`/courses/add/`);
  };

  const goUpdateCourse = (uuid) => {
    navigate(`/courses/edit/${uuid}`);
  };

  const deleteCourse = async (uuid) => {
    try {
      const resp = await axios.delete(`http://localhost:5000/courses/${uuid}`);
      alert(resp.data.msg);
      getCourses();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const goMaterials = (uuid) => {
    navigate(`/materialsofcourse/${uuid}`);
  };

  return (
    <div className="courses">
      <div className="search">
        <input type="text" placeholder="Cari kursus ..... " />
        <button>Cari</button>
      </div>
      <div className="add">
        <button onClick={goAddCourse}>
          <i className="fa-solid fa-folder-plus"></i>
          Tambah Kursus
        </button>
      </div>
      <div className="list-course">
        {courses.map((data) => {
          const courseNames = data.name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("");
          const colorFolder = data.color;
          let color;
          if (colorFolder === "biru") {
            color = "biru";
          } else if (colorFolder === "merah") {
            color = "merah";
          } else if (colorFolder === "pink") {
            color = "pink";
          } else if (colorFolder === "hijau") {
            color = "hijau";
          } else if (colorFolder === "kuning") {
            color = "kuning";
          } else if (colorFolder === "orens") {
            color = "orens";
          } else if (colorFolder === "abu-abu") {
            color = "abu-abu";
          }

          return (
            <div className={`card ${color}`} key={data.uuid}>
              <div className="top">
                <p className={`icon ${color}`}>{courseNames}</p>
                <p className="duration">{data.duration}</p>
              </div>
              <div className="bottom">
                <div className="left">
                  <p className="name">{data.name}</p>
                  <p className="price">{formatRupiah(data.price)}</p>
                  <button onClick={() => goMaterials(data.uuid)}>Lihat</button>
                </div>
                {visibleBtn === true ? (
                  <i
                    className="fa-solid fa-ellipsis"
                    onClick={() => setVisibleBtn(false)}
                  ></i>
                ) : (
                  <div className="btn">
                    <i
                      className="fa-solid fa-pen"
                      onClick={() => goUpdateCourse(data.uuid)}
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteCourse(data.uuid)}
                    ></i>
                    <i
                      class="fa-solid fa-chevron-right"
                      onClick={() => setVisibleBtn(true)}
                    ></i>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
