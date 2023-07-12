import React, { useEffect, useState } from "react";
import "./ModalEditMaterials.css";
import axios from "axios";
import { useParams } from "react-router";

const ModalEditMaterials = (props) => {
  const [uuid, setUuid] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (props.material) {
      setUuid(props.material.uuid);
      setName(props.material.name);
      setDescription(props.material.description);
      setLink(props.material.link);
    }
  }, [props.material]);

  const updateMaterials = async (e) => {
    e.preventDefault();
    const requestData = {
      name: name,
      description: description,
      link: link,
    };
    try {
      const resp = await axios.patch(
        `http://localhost:5000/materials/${uuid}`,
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
        <h2>Edit Materi</h2>
        <form onSubmit={updateMaterials}>
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

export default ModalEditMaterials;
