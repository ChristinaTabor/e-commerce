import React, { Fragment, useContext } from "react";
import Slider from "react-slick";
import CommonContext from "../../../helpers/common/CommonContext";
import MasterBanner from "./MasterBanner";

const Banner = () => {
  const commonContext = useContext(CommonContext);
  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 2500
  }
  return (
    <Fragment>
      <section className="p-0">
        <Slider {...sliderSettings} className="slide-1 home-slider">
          {commonContext.commonData.home_banner.map((data, i) => {
            return (
              <MasterBanner
                key={i}
                img={data.img}
                desc={data.desc}
                title={data.title}
                btn={data.btn}
                link={"/shop"}
              />
            );
          })}
        </Slider>
      </section>
    </Fragment>
  );
};

export default Banner;
