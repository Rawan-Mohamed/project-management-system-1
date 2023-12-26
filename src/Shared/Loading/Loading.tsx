import React from "react";
import { Bars } from 'react-loader-spinner'
const Loading: React.FC = () => {
  return (
    <div className="d-flex align-items-center justify-content-center my-5 pt-5">
      <Bars
        height="80"
        width="80"
        color="#446861"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Loading;
