import React, {useContext} from "react";
import HeaderOne from "../headers/header-one";
import MasterFooter from "../footers/common/MasterFooter";
import CommonContext from "../../helpers/common/CommonContext";

const CommonLayout = ({ children }) => {
  const commonContext = useContext(CommonContext)
  console.log("commonContext", commonContext)
  return (
    <>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href={favicon ? favicon : ""} />
      </Helmet> */}
      <HeaderOne topClass="top-header" data={commonContext.commonData} />
      <>{children}</>
      <MasterFooter
        footerClass={`footer-light `}
        footerLayOut={"light-layout upper-footer"}
        footerSection={"small-section border-section border-top-0"}
        belowSection={"section-b-space light-layout"}
        newLatter={true}
        data={commonContext.commonData}
      />
    </>
  );
};

export default CommonLayout;
