import React, { useEffect, useState } from "react";
import "./ModalAddMaterials.css";
import axios from "axios";
import { useParams } from "react-router";

const ModalAddMaterials = (props) => {
  const [course, setCourse] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/courses/${uuid}`);
      setCourse(resp.data);
      // console.log(resp.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const { uuid } = useParams();

  const addMaterials = async (e) => {
    e.preventDefault();
    const requestData = {
      name: name,
      description: description,
      link: link,
      courseId: course.id,
    };
    try {
      const resp = await axios.post(
        `http://localhost:5000/materials`,
        requestData
      );
      console.log(resp.data);
      console.log(requestData);
      alert(resp.data.msg);
      closeModal();
    } catch (error) {
      console.log(error.response.message);
    }
  };

  const closeModal = () => {
    props.onClose();
  };

  if (!props.visible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Tambah Materi Baru</h2>
        <form onSubmit={addMaterials}>
          <div className="form-group">
            <label htmlFor="name">Nama Materi</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="link">Link Materi</label>
            <input
              type="text"
              name="link"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={closeModal}>
              Batal
            </button>
            <button type="submit">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddMaterials;
