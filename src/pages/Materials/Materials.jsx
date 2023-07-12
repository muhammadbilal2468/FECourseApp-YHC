import React, { useEffect, useState } from "react";
import "./Materials.css";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalAddMaterials from "../../components/ModalAddMaterials/ModalAddMaterials";
import ModalEditMaterials from "../../components/ModalEditMaterials/ModalEditMaterials";

const Materials = () => {
  const [course, setCourse] = useState("");
  const [materials, setMaterials] = useState([]);
  const [visibleDesc, setVisibleDesc] = useState(false);
  const [visibleMaterial, setVisibleMaterial] = useState(false);
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const navigate = useNavigate();

  const { uuid } = useParams();

  useEffect(() => {
    getCourse();
    getMaterials();
  }, [uuid, materials]);

  const getCourse = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/courses/${uuid}`);
      setCourse(resp.data);
      // console.log(resp.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const getMaterials = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/materialsbycourse/${uuid}`
      );
      setMaterials(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteMaterial = async (uuid) => {
    try {
      const resp = await axios.delete(
        `http://localhost:5000/materials/${uuid}`
      );
      alert(resp.data.msg);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const toggleVisibleDesc = () => {
    setVisibleDesc(!visibleDesc);
  };
  const toggleVisibleMaterial = () => {
    setVisibleMaterial(!visibleMaterial);
  };
  const toggleVisibleModalAdd = () => {
    setVisibleModalAdd(!visibleModalAdd);
  };
  const toggleVisibleModalEdit = (material) => {
    setSelectedMaterial(material); // Mengatur selectedMaterial dengan material yang dipilih
    setVisibleModalEdit(!visibleModalEdit);
  };

  return (
    <div className="materials">
      <div className="top">
        <Link to={`/`}>
          <i className="fa-solid fa-chevron-left"></i>
        </Link>
        <p className="title">Materi {course.name}</p>
        <div></div>
      </div>
      <div className="desc-total">
        <div className="description">
          <div className="title" onClick={toggleVisibleDesc}>
            <p className="text">Deskripsi Kursus</p>
            <i
              className={`fa-solid fa-chevron-${visibleDesc ? "up" : "down"}`}
            ></i>
          </div>
          {visibleDesc && (
            <p className="value">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, ut excepturi rerum ratione nihil dolor, corrupti optio
              eligendi soluta aperiam cumque dolore amet ea, corporis nulla
              minima quibusdam tempora quis. Cupiditate, minima delectus
              consequuntur rem velit est, magni blanditiis ex laborum voluptates
              ipsam consectetur nulla tempora.
            </p>
          )}
        </div>
        <div className="total">
          <p className="length">{materials.length}</p>
          <p className="subtitle">Materi</p>
        </div>
      </div>
      <div className="add">
        <button onClick={toggleVisibleModalAdd}>
          <i className="fa-solid fas-folder-plus"></i>
          Tambah Materi
        </button>
      </div>
      <div className="list-materials">
        <div className="title">
          <p className="text">Nama Materi</p>
          <p className="text">Deskripsi</p>
          <p className="text">Link Materi</p>
          <p className="text">Action</p>
        </div>
        {materials.map((data) => {
          return (
            <div className="value" key={data.uuid}>
              <div className="name" onClick={toggleVisibleMaterial}>
                <i
                  className={`fa-solid fa-chevron-${
                    visibleMaterial ? "up" : "down"
                  }`}
                ></i>
                <p className="text">{data.name}</p>
              </div>
              <div className="text" onClick={toggleVisibleMaterial}>
                <p className="bold">Deskripsi Materi</p>
                {visibleMaterial && <p className="text">{data.description}</p>}
              </div>
              <div className="text" onClick={toggleVisibleMaterial}>
                <p className="bold">Link Materi</p>
                {visibleMaterial && <p className="text">{data.link}</p>}
              </div>
              <div className="btn">
                <i
                  className="fa-solid fa-pen"
                  onClick={() => toggleVisibleModalEdit(data)}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => deleteMaterial(data.uuid)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      <ModalAddMaterials
        visible={visibleModalAdd}
        onClose={toggleVisibleModalAdd}
      />
      <ModalEditMaterials
        visible={visibleModalEdit}
        onClose={toggleVisibleModalEdit}
        material={selectedMaterial}
      />
    </div>
  );
};

export default Materials;
