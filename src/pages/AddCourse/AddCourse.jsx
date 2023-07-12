import React, { useEffect, useState } from "react";
import "./AddCourse.css";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("biru");

  const navigate = useNavigate();

  const addCourse = async (e) => {
    e.preventDefault();
    const requestData = {
      name: name,
      description: description,
      duration: duration,
      price: price,
      color: color,
    };
    try {
      const resp = await axios.post(
        `http://localhost:5000/courses`,
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
    <div className="ac">
      <div className="top">
        <Link to={`/`}>
          <i className="fa-solid fa-chevron-left"></i>
        </Link>
        <p className="title">Tambahkan Kursus</p>
        <div></div>
      </div>
      <div className="form">
        <form onSubmit={addCourse}>
          <label htmlFor="">Nama Kursus</label>
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Masukkan nama kursus"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label htmlFor="">Deskripsi</label>
          <div className="input-box">
            <textarea
              type="text"
              name="description"
              placeholder="Masukkan deskripsi"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <label htmlFor="">Durasi</label>
          <div className="input-box">
            <input
              type="text"
              name="duration"
              placeholder="Masukkan durasi kursus / ex. 30 Hari"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <label htmlFor="">Harga</label>
          <div className="input-box">
            <input
              type="number"
              name="price"
              placeholder="Masukkan Harga / ex. 150000"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <label htmlFor="">Warna Folder</label>
          <div className="input-box">
            <select
              name=""
              id=""
              placeholder="Pilih Jaminan Penyewaan"
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="biru">Biru</option>
              <option value="merah">Merah</option>
              <option value="pink">Pink</option>
              <option value="hijau">Hijau</option>
              <option value="kuning">Kuning</option>
              <option value="orens">Orens</option>
              <option value="abu-abu">Abu-abu</option>
            </select>
          </div>
          <div className="btn">
            <button type="submit">Tambahkan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
