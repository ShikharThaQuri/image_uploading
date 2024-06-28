"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

import UploadIcon from "@mui/icons-material/Upload";

function From() {
  const { refresh } = useRouter();

  const [file, setFile] = useState<File>();
  const [loading, setLoding] = useState<Boolean>(false);

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoding(true);

      const Data = new FormData();
      Data.set("image", file);

      const { data } = await axios.post(
        "http://localhost:3000/api/photo",
        Data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data) {
        setLoding(false);
      }
    } catch (error) {
      console.log(error);
    }

    refresh();
  };

  return (
    <form
      onSubmit={formHandler}
      encType="multipart/form-data"
      className="flex flex-col items-center mb-[5rem] mt-[2rem]"
    >
      <input
        className="hidden"
        type="file"
        name="file"
        id="uploadImg"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <label
        htmlFor="uploadImg"
        className="bg-[#c0392b] text-white font-bold px-[2rem] py-[0.9rem] rounded cursor-pointer"
      >
        <UploadIcon className="mr-[0.4rem]" />
        {loading ? "UPLOADING..." : "UPLOAD IMAGE"}
      </label>

      <button
        disabled={loading ? true : false}
        className="px-[1.5rem] py-[0.5rem] bg-[#6c757d] mt-[2rem] font-bold rounded hover:bg-[#]"
      >
        Submit
      </button>
    </form>
  );
}

export default From;
