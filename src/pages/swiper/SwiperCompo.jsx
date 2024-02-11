import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
function SwiperCompo() {
  return (
    <>
      <div
        className="swiper-main-component "
        style={{ width: "100vw", height: "90vh" }}
      >
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination, Autoplay]}
          autoplay={{ running: true }}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://imgs.search.brave.com/4RC7cIzcSVHbBGr_obFiKSAcXoWNYtSkmiXauH34aoI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/NzMyMzczNi9waG90/by9hLXZpZXctdXAt/aW50by10aGUtdHJl/ZXMtZGlyZWN0aW9u/LXNreS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9aTRIWU83/eGhhbzdDa0d5N1pj/XzhYU05YX2lxRzB2/QXdOc3JIMUVSbXcy/UT0"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img
              src="https://imgs.search.brave.com/4RC7cIzcSVHbBGr_obFiKSAcXoWNYtSkmiXauH34aoI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/NzMyMzczNi9waG90/by9hLXZpZXctdXAt/aW50by10aGUtdHJl/ZXMtZGlyZWN0aW9u/LXNreS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9aTRIWU83/eGhhbzdDa0d5N1pj/XzhYU05YX2lxRzB2/QXdOc3JIMUVSbXcy/UT0"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img
              src="https://imgs.search.brave.com/4RC7cIzcSVHbBGr_obFiKSAcXoWNYtSkmiXauH34aoI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/NzMyMzczNi9waG90/by9hLXZpZXctdXAt/aW50by10aGUtdHJl/ZXMtZGlyZWN0aW9u/LXNreS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9aTRIWU83/eGhhbzdDa0d5N1pj/XzhYU05YX2lxRzB2/QXdOc3JIMUVSbXcy/UT0"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <img
              src="https://imgs.search.brave.com/4RC7cIzcSVHbBGr_obFiKSAcXoWNYtSkmiXauH34aoI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/NzMyMzczNi9waG90/by9hLXZpZXctdXAt/aW50by10aGUtdHJl/ZXMtZGlyZWN0aW9u/LXNreS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9aTRIWU83/eGhhbzdDa0d5N1pj/XzhYU05YX2lxRzB2/QXdOc3JIMUVSbXcy/UT0"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default SwiperCompo;
