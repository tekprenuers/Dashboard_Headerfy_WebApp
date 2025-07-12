import React, { useState } from 'react';
import AdminPP from '../../assets/Image/adminPP.png';
import { MdToggleOn, MdToggleOff } from 'react-icons/md'; // 

const AdminDashboard: React.FC = () => {
  const [isClientLoginDisabled, setIsClientLoginDisabled] = useState(false);

  const toggleLogin = () => {
    setIsClientLoginDisabled(!isClientLoginDisabled);
  };

  return (
    <div className='bg-[#EFEEEE]'>
      <div className='flex justify-between items-center bg-[#FFFFFF]'>
        <p className='font-semibold text-[32px]'>Dashboard Overview</p>
        <div className='flex items-center gap-[60px] '>
          <div className='flex items-center gap-[4px] cursor-pointer' onClick={toggleLogin}>
            <p className='underline text-[20px] text-[#000000]'>
              Disable All Client Login
            </p>
            {isClientLoginDisabled ? (
              <MdToggleOn size={54} color="#003366" />
            ) : (
              <MdToggleOff size={54} color="gray" />
            )}
          </div>
          <div className='w-[35px] h-[35px] rounded-full overflow-hidden'>
            <img className='w-full h-full object-cover' src={AdminPP} alt="Admin" />
          </div>
        </div>
        
      </div>
      <p className='font-[600] font-[24px] py-[15px]'>Welocome, <span className='font-[20px] font-[500]'>Admin</span></p>
      <div className='flex justify-between align-center gap-[15px]'>
        <div className='flex align-center justify-center  flex-col bg-[#003366] text-[#ffffff] rounded-[12px] flex-1 h-[171px]'>
            {/* people icon */}
            <p className='font-[20px] font-[400] '>Total Users</p>
            <p className='font-[space Grotesk] font-[700] font-[32px]'>242</p>
        </div>
         <div className='flex align-center justify-center flex-col bg-[#F65901] text-[#ffffff] shadow-[0px_4px_4px_0px_#F6590140] rounded-[12px] flex-1 h-[171px]'>
            {/* Active users */}
            <p className='font-[20px] font-[400] '>Active Users</p>
            <p className='font-[space Grotesk] font-[700] font-[32px]'>127</p>
        </div>
         <div className='flex align-center justify-center flex-col bg-[#AB0F0F] text-[#ffffff] shadow-[0px_4px_4px_0px_#AB0F0F40] rounded-[12px] flex-1 h-[171px]'>
             {/* person and + icon */}
            <p className='font-[20px] font-[400] '>New signups</p>
            <p className='font-[space Grotesk] font-[700] font-[32px]' >+32 <span>This week</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
