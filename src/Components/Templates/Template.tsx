import React from 'react'
import Template_1 from './Template_1';
import Template_2 from './Template_2';

const Template:React.FC = () => {
  return (
    <>
      <div className="mb-7">
        <Template_1 />
        <Template_2 />
      </div>
    </>
  );
};

export default Template
