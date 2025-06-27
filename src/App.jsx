import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/App.css";
import { Pagination } from "swiper/modules";

import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";
import img7 from "./assets/7.jpg";
import img8 from "./assets/8.jpg";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-white drop-shadow-lg text-center">
        Wilfradas
      </h1>

      <div className="w-full max-w-2xl mb-8">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
        >
          <SwiperSlide>
            <img
              src={img1}
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img2}
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img3}
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img4}
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img5}
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img6}
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img7}
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img8}
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="w-full max-w-2xl text-white text-base sm:text-lg leading-relaxed bg-black/30 p-6 sm:p-8 rounded-xl shadow-xl">
        <p>
          Las <strong>Wilfradas</strong> son un evento muy especial que se celebra cada año en el <strong>Liceo 3</strong>, donde los alumnos se reúnen para disfrutar de actividades recreativas, juegos, música y mucha diversión.
        </p>
        <p className="mt-4">
          Este encuentro fomenta la creatividad, el compañerismo y el espíritu de comunidad, convirtiéndose en uno de los momentos más esperados por todos. ¡Una experiencia única para crear recuerdos inolvidables entre compañeros!
        </p>
      </div>
    </div>
  );
}

export default App;
