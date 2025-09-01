// import React from 'react'
// import Template_1 from './Template_1';
// import Template_2 from './Template_2';

// const Template:React.FC = () => {
//   return (
//     <>
//       <div className="">
//         <Template_1 />
//         <Template_2 />
//       </div>
//     </>
//   );
// };

// export default Template


import React from 'react';
import Template_1 from './Template_1';
import { Template_2 } from './Template_2';

const Template: React.FC = () => {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="scale-85 -mt-4">
        <Template_1 />
      </div>
      <div className="scale-85 -mt-9 cursor-pointer">
        <Template_2 />
      </div>
    </div>
  );
};
export default Template;