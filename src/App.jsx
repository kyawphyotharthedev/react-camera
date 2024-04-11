import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(null);
  const [image, setImage] = useState("");

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);

    const imageDataUrl = photo.toDataURL("image/png");
    setImage(imageDataUrl);
  };

  const saveImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "TarzanImage.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <section>
      <div className="flex flex-col items-center lg:flex-row mt-20 md:justify-center gap-20">
        <div className="w-[90%] md:w-[50%] lg:w-[30%]">
          <video ref={videoRef} className="rounded-lg"></video>
          <button
            className=" bg-gray-500 text-white rounded-md px-4 py-2 mt-5"
            onClick={takePhoto}
          >
            Take Photo
          </button>
        </div>
        <div className="flex flex-col items-center">
          <canvas ref={photoRef} className="w-[90%] mx-auto lg:w-[60%] rounded-lg"></canvas>
          <div className={hasPhoto == true ? "flex gap-20" : "hidden" }>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-5"
              onClick={saveImage}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-5"
              onClick={closePhoto}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
