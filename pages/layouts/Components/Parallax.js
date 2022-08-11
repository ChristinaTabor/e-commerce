import React, { Fragment, useContext } from "react";
import CommonContext from "../../../helpers/common/CommonContext";
import MasterParallaxBanner from "./MasterParallaxBanner";

const Parallax = () => {
  const commonContext = useContext(CommonContext);

  return (
    <Fragment>
      <MasterParallaxBanner
        data={commonContext.commonData.home_parallax}
        parallaxClass="text-center p-left"
      />
    </Fragment>
  );
};

export default Parallax;
