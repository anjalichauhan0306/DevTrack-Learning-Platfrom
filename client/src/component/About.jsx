import React from 'react';

const About = () => {
    return (
        <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>
            <div className='lg:w-[40%] md:w-[80%] w-full h-full flex items-center justify-center relative'>
                <img src="" alt="" className='w-[80%] h-[90%] rounded-lg' />
                <div className='max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]'>
                  <video src="" className='w-full rounded-xl shadow-lg border-2 border-white' controls autoPlay loop>
                  </video>
                </div>
            </div>

            <div className='lg:w-[50%] md:w-[70%] w-full h-full flex items-center justify-center flex-col px-[35px] md:px-[80px]'>
                <div className='flex text-[18px] items-center justify-center gap-[20px]'>About us
                    <TfiLayoutLineSolid className="w-[40px]"/>
                </div>
            </div>
        </div>
    );
}

export default About;
