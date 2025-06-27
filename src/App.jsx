import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/App.css";
import { Pagination } from "swiper/modules";

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
              src="../src/assets/1.jpg"
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../src/assets/2.jpg"
              alt="Ciudad"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../src/assets/3.jpg"
              alt="Ciudad"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../src/assets/4.jpg"
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../src/assets/5.jpg"
              alt="Ciudad"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../src/assets/6.jpg"
              alt="Ciudad"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../src/assets/7.jpg"
              alt="Montañas"
              className="rounded-xl shadow-2xl w-full max-h-[400px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../src/assets/8.jpg"
              alt="Ciudad"
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
