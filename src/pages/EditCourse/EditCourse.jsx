import React, { useEffect, useState } from "react";
import "./EditCourse.css";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("biru");

  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    getCourseById();
  }, [uuid, color]);

  const getCourseById = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/courses/${uuid}`);
      setName(resp.data.name);
      setDescription(resp.data.description);
      setDuration(resp.data.duration);
      setPrice(resp.data.price);
      setColor(resp.data.color);
      console.log(resp.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    const requestData = {
      name: name,
      description: description,
      duration: duration,
      price: price,
      color: color,
    };
    try {
      const resp = await axios.patch(
        `http://localhost:5000/courses/${uuid}`,
        requestData
      );
      console.log(resp.data);
      console.log(requestData);
      alert(resp.data.msg);
      navigate(`/`);
    } catch (error) {
      console.log(error.response.message);
    }
  };

  console.log(color);

  return (
    <div className="ec">
      <div className="top">
        <Link to={`/`}>
          <i className="fa-solid fa-chevron-left"></i>
        </Link>
        <p className="title">Edit Kursus</p>
        <div></div>
      </div>
      <div className="form">
        <form onSubmit={updateCourse}>
          <label htmlFor="">Nama Kursus</label>
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Masukkan nama kursus"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label htmlFor="">Deskripsi</label>
          <div className="input-box">
            <textarea
              type="text"
              name="description"
              placeholder="Masukkan deskripsi"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <label htmlFor="">Durasi</label>
          <div className="input-box">
            <input
              type="text"
              name="duration"
              placeholder="Masukkan durasi kursus / ex. 30 Hari"
              defaultValue={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <label htmlFor="">Harga</label>
          <div className="input-box">
            <input
              type="number"
              name="price"
              placeholder="Masukkan Harga / ex. 150000"
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {/* <label htmlFor="">Warna Folder</label>
          <div className="input-box">
            <select
              name="color"
              id=""
              placeholder="Pilih Jaminan Penyewaan"
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="biru">biru</option>
              <option value="merah">merah</option>
              <option value="pink">pink</option>
              <option value="hijau">hijau</option>
              <option value="kuning">kuning</option>
              <option value="orens">orange</option>
              <option value="abuabu">abu-abu</option>
            </select>
          </div> */}
          <div className="btn">
            <button type="submit">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
