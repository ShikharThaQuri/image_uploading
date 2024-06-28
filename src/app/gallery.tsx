"use client";

import Image from "next/image";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

function Gallery(data: any) {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://res.cloudinary.com/dxr1ajuew/image/upload/v1719058103/nextjs-imageGallary/gefrdugy6hm0xwxbakzm.jpg"
  );
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="my-10 mx-20">
      <div className="flex flex-wrap justify-center  gap-[0.6rem]">
        {Object.keys(data.data.result).map((items, i) => (
          // <SingleImage imageUrl={} key={i} />
          <div className="relative w-full max-w-[20rem] h-[20rem]" key={i}>
            <Image
              src={data.data.result[items].image_url}
              alt="photo"
              sizes="(max-width: 768px) 100vw, 700px"
              fill
              priority
              className="border object-cover object-center"
              key={i}
              onClick={(e) => {
                setImageUrl(data.data.result[items].image_url);
                setActive(true);
              }}
            />

            {active === true ? (
              <CloseIcon
                className="fixed top-[1rem] right-[1rem] text-white text-[4rem] ml-[1rem] mt-[1rem] cursor-pointer z-[200]"
                onClick={(e) => {
                  setActive(false);
                }}
              />
            ) : (
              ""
            )}

            <div
              className={`${
                active === false ? "hidden" : "block"
              } fixed top-0 bottom-0 right-0 left-0 bg-black z-[50]`}
            >
              <div className="flex justify-center items-center w-[100%] h-full">
                <div className="relative w-full max-w-[80%] h-[75%] object-cover object-center ">
                  <Image
                    src={imageUrl}
                    alt="photo"
                    sizes="(max-width: 768px) 100vw, 700px"
                    fill
                    priority
                    className="border z-[100]"
                    key={i}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
