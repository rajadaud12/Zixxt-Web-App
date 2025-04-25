"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';


export const Main = () => {
  useEffect(() => {
    // Animation for the headline
    const headline = document.querySelector(".headline");
    if (headline) {
      headline.style.opacity = "0";
      headline.style.transform = "translateY(-20px)";
      setTimeout(() => {
        headline.style.transition = "opacity 1s ease-out, transform 1s ease-out";
        headline.style.opacity = "1";
        headline.style.transform = "translateY(0)";
      }, 300);
    }

    // Animation for the subheading
    const subheading = document.querySelector(".subheading");
    if (subheading) {
      subheading.style.opacity = "0";
      setTimeout(() => {
        subheading.style.transition = "opacity 1s ease-out";
        subheading.style.opacity = "1";
      }, 800);
    }

    // Sequential fast animation for cards and UI elements
    const elements = document.querySelectorAll(".animate-in");
    elements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 300 + index * 100);
    });
  }, []);

  return (
    <div className="main-container w-[1184px] h-[540.264px] relative mx-auto my-0">
      <span className="headline flex w-[774px] h-[21.47%] justify-center items-start font-['Albert_Sans'] text-[48px] font-medium leading-[57.6px] text-[#000] absolute top-0 left-[17.86%] text-center capitalize overflow-hidden z-[32]">
        Your All In One Platform For <br />
        Services, Education, and Software
      </span>
      <div className="w-full h-[90.56%] absolute top-[9.44%] left-0 z-[95]">
        {/* Services Card */}
        <div className="animate-in w-[15.03%] h-[38.63%] bg-[#fff] rounded-[27px] border-solid border border-[rgba(0,0,0,0.1)] absolute top-0 left-0 z-[47] hover:shadow-lg hover:scale-105 transition-all duration-300">
          <div className="w-[126px] h-[63px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/AGcP0YqcCa.png)] bg-cover bg-no-repeat relative z-[60] mt-[16px] mr-0 mb-0 ml-[25px]">
            <div className="w-[89.095px] h-[18.452px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/G4BAFSRXkU.png)] bg-cover bg-no-repeat relative z-[61] mt-0 mr-0 mb-0 ml-[18.453px]" />
            <span className="flex w-[55px] h-[26px] justify-center items-start font-['Albert_Sans'] text-[16px] font-medium leading-[19.2px] text-[#018cff] relative text-center capitalize whitespace-nowrap z-[62] mt-[11.548px] mr-0 mb-0 ml-[37px]">
              100+
            </span>
          </div>
          <span className="flex w-[55px] h-[26px] justify-center items-start font-['Albert_Sans'] text-[12px] font-medium leading-[14.4px] text-[#000] relative text-center capitalize z-[63] mt-[-2px] mr-0 mb-0 ml-[60px]">
            Services
          </span>
          <div className="w-[156px] h-[14.345px] bg-[rgba(255,255,255,0)] rounded-[7px] relative z-[49] mt-[3.656px] mr-0 mb-0 ml-[11px]">
            <span className="flex h-[62.74%] justify-start items-start font-['Albert_Sans'] text-[10px] font-normal leading-[9px] text-[rgba(0,0,0,0.8)] absolute top-[2.4%] left-[7.05%] text-left whitespace-nowrap z-[55]">
              Search Engine Optimization
            </span>
          </div>
          <div className="w-[83.71%] h-[6.29%] bg-[rgba(255,255,255,0)] rounded-[7px] opacity-80 absolute top-[64.61%] left-[5.62%] z-50" />
          <span className="flex h-[3.7%] justify-start items-start font-['Albert_Sans'] text-[10px] font-normal opacity-80 leading-[7px] text-[rgba(0,0,0,0.6)] absolute top-[65.08%] left-[11.8%] text-left whitespace-nowrap z-[56]">
            Pay-Per-Click Advertising
          </span>
          <span className="flex h-[6.35%] justify-start items-start font-['Albert_Sans'] text-[10px] font-normal opacity-70 leading-[12px] text-[rgba(0,0,0,0.4)] absolute top-[74.6%] left-[11.24%] text-left whitespace-nowrap z-[57]">
            Content Marketing
          </span>
          <div className="w-[57.3%] h-[3.24%] bg-[rgba(255,255,255,0)] rounded-[7px] opacity-70 absolute top-[76.12%] left-[5.62%] z-[51]" />
          <span className="flex h-[6.35%] justify-start items-start font-['Albert_Sans'] text-[10px] font-normal opacity-70 leading-[12px] text-[rgba(0,0,0,0.08)] absolute top-[84.66%] left-[11.24%] text-left whitespace-nowrap z-[58]">
            Digital Marketing
          </span>
          <div className="w-[51.69%] h-[3.24%] bg-[rgba(255,255,255,0)] rounded-[7px] opacity-70 absolute top-[86.17%] left-[5.62%] z-[52]" />
        </div>
        <span className="subheading flex w-[62.58%] h-[4.09%] justify-center items-start font-['Albert_Sans'] text-[20px] font-normal leading-[20px] text-[#818181] absolute top-[16.96%] left-[19.38%] text-center capitalize whitespace-nowrap z-[33]">
          A unified hub offering endless possibilities in services, education,
          and software
        </span>
        {/* App Types Card */}
        <div className="animate-in float-animation w-[12.58%] h-[32.5%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/w6FjRQhyzo.png)] bg-contain bg-no-repeat absolute top-[19.01%] left-[87.42%] z-[83] hover:shadow-lg hover:scale-105 transition-all duration-300" style={{ transformOrigin: 'center' }}>
          <div className="flex w-[66.44%] flex-col gap-[17px] items-end flex-nowrap bg-[#fff] absolute top-[11.95%] left-[14.09%] z-[82]">
            <div className="w-[99px] h-[17.643px] shrink-0 relative z-[81]">
              <div className="w-[17.82%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/thD5YD24KY.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[80]" />
              <span className="flex h-[14px] justify-start items-start font-['Albert_Sans'] text-[11px] font-normal leading-[13.2px] text-[rgba(0,0,0,0.5)] absolute top-[2px] left-[31px] text-left capitalize whitespace-nowrap z-[84]">
                Web App
              </span>
            </div>
            <div className="w-[96px] h-[17px] shrink-0 relative z-[80]">
              <div className="w-[13.54%] h-[105.88%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/QREJL5M6cK.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[-2.94%] left-[-0.52%] z-[80]" />
              <span className="flex h-[14px] justify-start items-start font-['Albert_Sans'] text-[11px] font-normal leading-[13.2px] text-[rgba(0,0,0,0.5)] absolute top-[2px] left-[28px] text-left capitalize whitespace-nowrap z-[87]">
                Mobile apps
              </span>
            </div>
            <div className="w-[98px] h-[15.253px] shrink-0 relative z-[80]">
              <div className="w-[15.56%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/JAZsQNkVTN.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[91]" />
              <span className="flex h-[14px] justify-start items-start font-['Albert_Sans'] text-[11px] font-normal leading-[13.2px] text-[rgba(0,0,0,0.5)] absolute top-px left-[30px] text-left capitalize whitespace-nowrap z-[80]">
                ecommerce
              </span>
            </div>
            <div className="w-[98px] h-[16.882px] shrink-0 relative z-[80]">
              <div className="w-[20.09%] h-[105.93%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/3Cx7JAv43N.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[-2.97%] left-[-0.51%] z-[94]" />
              <span className="flex h-[14px] justify-start items-start font-['Albert_Sans'] text-[11px] font-normal leading-[13.2px] text-[rgba(0,0,0,0.5)] absolute top-[2px] left-[30px] text-left capitalize whitespace-nowrap z-[80]">
                LMS
              </span>
            </div>
          </div>
          <div className="flex w-[95.97%] flex-col gap-[35px] items-start flex-nowrap bg-[#fff] absolute top-[28.3%] left-[2.01%] z-[78]">
            <div className="animate-in w-[143px] h-px shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/mYn9WR0v8c.png)] bg-cover bg-no-repeat relative z-[79]" />
            <div className="animate-in w-[143px] h-px shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/oWWH8t34iA.png)] bg-cover bg-no-repeat relative z-[80]" />
            <div className="animate-in w-[143px] h-px shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/hkLs3adxEO.png)] bg-cover bg-no-repeat relative z-[81]" />
          </div>
        </div>
        {/* Join Now Button */}
        <div className="join-now-btn animate-in w-[14.36%] h-[10.22%] bg-[#000] rounded-[34px] absolute top-[30.45%] left-[34.46%] z-[110] cursor-pointer transition-all duration-300 hover:bg-[#333] hover:shadow-xl hover:scale-105 active:scale-95">
          <div className="w-[40px] h-[40px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/MCboFd1PxU.png)] bg-cover bg-no-repeat absolute top-[5px] left-[5px] z-[38]" />
          <div className="flex w-[68px] h-[23px] gap-[10px] justify-center items-center flex-nowrap absolute top-[13px] left-1/2 translate-x-[-33.82%] translate-y-0 z-[39]">
            <Link href="/signup" className="h-[19px] shrink-0 basis-auto font-['Albert_Sans'] text-[16px] font-normal leading-[19px] text-[#fff] relative text-left whitespace-nowrap z-40">
              Join Now
            </Link>
          </div>
        </div>
        
        {/* Sign In Button */}
        <div className="sign-in-btn animate-in flex w-[14.36%] h-[10.22%] pt-px pr-[75px] pb-px pl-[75px] gap-[10px] justify-center items-center flex-nowrap rounded-[100px] border-solid border border-[rgba(0,0,0,0.2)] absolute top-[30.45%] left-[50.34%] z-[35] cursor-pointer transition-all duration-300 hover:border-[#000] hover:shadow-md hover:scale-105 active:scale-95 hover:bg-[#f8f8f8]">
          <Link href="/signin" className="flex w-[47px] h-[17px] justify-center items-start shrink-0 basis-auto font-['Albert_Sans'] text-[15px] font-normal leading-[17px] text-[#000] relative text-center whitespace-nowrap z-[36]">
            Sign In
          </Link>
        </div>
        <div className="animate-in w-[1.92%] h-[5.33%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/FusX5erDDA.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[30.45%] left-[68.4%] z-[3]" />
        <div className="animate-in w-[1.92%] h-[5.33%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/C39Kvn1FAi.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[30.45%] left-[70.58%] z-[4]" />
        <div className="animate-in w-[1.92%] h-[5.33%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/KvZpYqXuZU.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[30.45%] left-[72.75%] z-[5]" />
        <div className="animate-in float-animation w-[47.65%] h-[59.85%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/EkFtSqaL1R.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[30.86%] left-[4.17%] z-[44]">
          <div className="w-[74.235px] h-[26.102px] relative z-[19] mt-[3px] mr-0 mb-0 ml-[249.544px]">
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/EiQpCUuSGi.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[17]" />
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/t7R7kQxVuD.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[34.7%] z-[18]" />
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/sq0FRmREHU.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[69.41%] z-[19]" />
          </div>
          <div className="w-[100.001px] h-[26.102px] relative z-[27] mt-[-3.731px] mr-0 mb-0 ml-[236.661px]">
            <div className="w-[22.71%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/zyfPuWPgRJ.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[16]" />
            <div className="w-[22.71%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/srxBfctNn5.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[25.76%] z-20" />
            <div className="w-[22.71%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/KYAHzcsaMh.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[51.52%] z-[27]" />
            <div className="w-[22.71%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/WEF1QKUryH.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[77.29%] z-[21]" />
          </div>
          <div className="w-[74.235px] h-[26.102px] relative z-[28] mt-[-2.031px] mr-0 mb-0 ml-[249.204px]">
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/To7QKYYW4M.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-[24]" />
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/JZwZXu1moH.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[34.7%] z-[28]" />
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/V9uxhFQM4n.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[69.41%] z-[26]" />
          </div>
        </div>
        <div className="animate-in w-[1.92%] h-[5.33%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/LyF0TVKvBY.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[35.03%] left-[67.31%] z-[2]" />
        <div className="animate-in w-[1.92%] h-[5.33%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/gXvUCNUsFu.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[35.03%] left-[69.49%] z-[6]" />
        <div className="animate-in w-[1.92%] h-[5.33%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/tjffHYA708.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[35.03%] left-[71.67%] z-[13]" />
        <div className="animate-in w-[1.92%] h-[5.33%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/ahyFum6DZA.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[35.03%] left-[73.84%] z-[7]" />
        <div className="animate-in float-animation w-[43.8%] h-[63.05%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/yMLTCZyxBh.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[36.95%] left-[53.97%] z-[64]">
          <div className="w-[74.235px] h-[26.102px] relative z-[14] mt-[14.634px] mr-0 mb-0 ml-[170.545px]">
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/rGWDXXqo5v.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-0 z-10" />
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/njoG2UjwFz.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[34.7%] z-[14]" />
            <div className="w-[30.59%] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/NmqNao8Wu3.png)] bg-[length:100%_100%] bg-no-repeat absolute top-0 left-[69.41%] z-[12]" />
          </div>
          {/* Your Ideas Card */}
          <div className="animate-in flex w-[127px] h-[41px] pt-[9px] pr-[20px] pb-[9px] pl-[20px] gap-[6px] items-center flex-nowrap bg-[#fff] rounded-[15px] relative shadow-[0_5px_128.8px_0_rgba(255,97,0,0.3)] z-[66] mt-[103.457px] mr-0 mb-0 ml-[153.002px] hover:shadow-lg hover:scale-105 transition-all duration-300">
            <div className="w-[20px] h-[21px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/VyPV5WTDbO.png)] bg-cover bg-no-repeat relative z-[67]" />
            <span className="h-[14px] shrink-0 basis-auto font-['Albert_Sans'] text-[12px] font-medium leading-[14px] text-[#ffb400] relative text-left whitespace-nowrap z-[68]">
              Your Ideas
            </span>
          </div>
        </div>
        {/* Your Impact Card */}
        <div className="animate-in flex w-[11.82%] h-[8.18%] pt-[8px] pr-[22px] pb-[8px] pl-[22px] gap-[7px] items-center flex-nowrap bg-[#fff] rounded-[15px] absolute top-[49.26%] left-[1.27%] shadow-[0_5px_128.8px_0_rgba(0,110,255,0.3)] z-[72] hover:shadow-lg hover:scale-105 transition-all duration-300">
          <div className="w-[19px] h-[20px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/xR2ShGnb7s.png)] bg-cover bg-no-repeat relative z-[73]" />
          <span className="h-[14px] shrink-0 basis-auto font-['Albert_Sans'] text-[12px] font-medium leading-[14px] text-[#018cff] relative text-left whitespace-nowrap z-[74]">
            Your Impact
          </span>
        </div>
        {/* Academic/Skills/Languages Card */}
        <div className="animate-in flex w-[16.3%] h-[36.18%] pt-[24px] pr-[20px] pb-[24px] pl-[20px] flex-col gap-[10px] justify-center items-center flex-nowrap bg-[#fff] rounded-[27px] border-solid border border-[rgba(0,0,0,0.1)] absolute top-[57.43%] left-[15.88%] z-[95] hover:shadow-lg hover:scale-105 transition-all duration-300">
          <div className="flex w-[180px] h-[140px] flex-col gap-[10px] items-start shrink-0 flex-nowrap absolute top-[17.5px] left-0 z-[96]">
            <div className="w-[156px] h-[40px] shrink-0 bg-[#03aa64] rounded-[34px] absolute top-0 left-[18px] z-[97]">
              <div className="flex w-[31px] h-[31px] pt-[7px] pr-[9px] pb-[7px] pl-[9px] gap-[10px] items-center flex-nowrap bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/ecJeaVUqGz.png)] bg-cover bg-no-repeat absolute top-[5px] left-[5px] z-[100]" />
              <div className="flex w-[56px] h-[23px] gap-[10px] justify-center items-center flex-nowrap absolute top-[9px] left-1/2 translate-x-[-30.36%] translate-y-0 z-[98]">
                <span className="h-[14px] shrink-0 basis-auto font-['Albert_Sans'] text-[12px] font-normal leading-[14px] text-[#fff] relative text-left whitespace-nowrap z-[99]">
                  Academic
                </span>
              </div>
            </div>
            <div className="w-[156px] h-[40px] shrink-0 bg-[#f7f7f7] rounded-[34px] absolute top-[50px] left-[18px] z-[101]">
              <div className="flex w-[31px] h-[31px] pt-[7px] pr-[9px] pb-[7px] pl-[9px] gap-[10px] items-center flex-nowrap bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/5P7hYiaw8H.png)] bg-cover bg-no-repeat absolute top-[5px] left-[5px] z-[104]" />
              <div className="flex w-[28px] h-[23px] gap-[10px] justify-center items-center flex-nowrap absolute top-[9px] left-1/2 translate-x-[-10.71%] translate-y-0 z-[102]">
                <span className="h-[14px] shrink-0 basis-auto font-['Albert_Sans'] text-[12px] font-normal leading-[14px] text-[#818181] relative text-left whitespace-nowrap z-[103]">
                  Skills
                </span>
              </div>
            </div>
            <div className="w-[156px] h-[40px] shrink-0 bg-[#f7f7f7] rounded-[34px] absolute top-[100px] left-[18px] z-[105]">
              <div className="flex w-[31px] h-[31px] pt-[7px] pr-[9px] pb-[7px] pl-[9px] gap-[10px] items-center flex-nowrap bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/rVDQTEP8G1.png)] bg-cover bg-no-repeat absolute top-[5px] left-[5px] z-[108]" />
              <div className="flex w-[60px] h-[23px] gap-[10px] justify-center items-center flex-nowrap absolute top-[9px] left-1/2 translate-x-[-31.67%] translate-y-0 z-[106]">
                <span className="h-[14px] shrink-0 basis-auto font-['Albert_Sans'] text-[12px] font-normal leading-[14px] text-[#818181] relative text-left whitespace-nowrap z-[107]">
                  Languages
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="animate-in w-[7.43%] h-[15.67%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/qFnhmurxSK.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[63.36%] left-[48.61%] z-[65]" />
        <div className="w-[23.73%] h-[17.47%] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/QrbgNxgFjX.png)] bg-[length:100%_100%] bg-no-repeat absolute top-[78.24%] left-[29.27%] z-[43]">
          {/* Your Growth Card */}
          <div className="your-growth-card animate-in flex w-[138px] h-[40px] pt-[12px] pr-[18px] pb-[12px] pl-[18px] gap-[10px] items-center flex-nowrap bg-[#fff] rounded-[15px] relative shadow-[0_5px_128.8px_0_rgba(29,255,0,0.3)] z-[119] mt-[21.221px] mr-0 mb-0 ml-[73.5px] hover:shadow-lg hover:scale-105 hover:bg-[#f0f0f0] transition-all duration-300 cursor-pointer">
            <div className="w-[20px] h-[14.805px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-04-24/wNK0mkUVa7.png)] bg-cover bg-no-repeat relative z-[70]" />
            <span className="flex w-[71px] h-[12.727px] justify-start items-start shrink-0 basis-auto font-['Albert_Sans'] text-[12px] font-medium leading-[12.727px] text-[#03aa64] relative text-left whitespace-nowrap z-[71]">
              Your Growth
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



export const HeroSection = ({ userName = "Shahab Hassan" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Services');
  
  // Function to generate random service ID (1-3) for redirect
  const getRandomServiceId = () => {
      return Math.floor(Math.random() * 3) + 1;
  };

  const handleServiceSelect = (service) => {
      setSelectedService(service);
      setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white">
      {/* Welcome banner */}
      <div className="bg-secondary py-2 px-4 rounded-full inline-flex items-center gap-2 ml-6 mt-6">
        <span className="text-yellow-400">👋</span>
        <span className="text-primary text-sm">welcome back to Zixxt</span>
      </div>

      {/* Main hero content */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row mt-12">
        <div className="flex-1">
          <h1 className="text-5xl font-semiBold mb-2 text-primary">
            Hi,<br />
            <span className="text-black">{userName}</span>
          </h1>
          <p className="text-gray-500 text-base mb-6">
            Ready to explore the best and most diverse range of Listings
          </p>

          <div className="flex space-x-4 mt-10">
          <div className=" flex px-3 py-3 bg-secondary rounded-full w-[500px] justify-between items-center">
              <a href={`/serviceListings/${getRandomServiceId()}`}>
                  <div className="bg-primary text-white px-6 py-2 rounded-full flex justify-center items-center space-x-2 w-[330px] h-[60px]">
                  <span>Explore Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  </div>
              </a>

            <div className="relative">
              <button 
                className="bg-secondary text-gray-700 px-6 py-2 rounded-full flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedService}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10 py-1">
                  <button 
                    onClick={() => handleServiceSelect('Services')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                  >
                    Services
                  </button>
                  <button 
                    onClick={() => handleServiceSelect('Education')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                  >
                    Education
                  </button>
                  <button 
                    onClick={() => handleServiceSelect('Softwares')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                  >
                    Softwares
                  </button>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>

        {/* Image section - Fixed to match the design exactly */}
        <div className="flex-1 flex ml-2">
          <div className="flex-1 mr-2">
            <div className="rounded-[30px] overflow-hidden shadow-md h-[390px]">
              <img
                src="/images/heroSection/image1.png" 
                alt="POS System"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-1/3 flex flex-col space-y-2">
            <div className="rounded-[30px] overflow-hidden shadow-md h-2/3">
              <img
                src="/images/heroSection/image2.png" 
                alt="Developer working"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-[30px] overflow-hidden shadow-md h-1/3">
              <img
                src="/images/heroSection/image3.png" 
                alt="Code snippet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action cards section */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-start space-x-4">
              <div className="bg-primary p-3 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-1">Have Something Specific In Mind</h3>
                <p className="text-gray-600 text-xs mb-3">Post a Request and unlock exclusive offers from top-rated sellers!</p>
                <a href="/post-request">
                  <button className="bg-primary text-white px-5 py-2 rounded-full inline-flex items-center space-x-2 text-sm hover:primary transition-all duration-300">
                    <span>Post a Request</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border">
            <div className="flex items-start space-x-4">
              <div className="bg-primary p-3 rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-1">To Do's</h3>
                <p className="text-gray-600 text-xs mb-3">Post a Request and unlock exclusive offers from top-rated sellers!</p>
                <div className="flex justify-around items-center px-2 py-2 bg-gray-100 rounded-full w-[400px]">
                  <span className="inline-flex items-center text-green-500 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Post a Request
                  </span>
                  <a href="/complete-profile" className="text-gray-700 text-xs hover:text-primary transition-colors">
                    Complete Profile
                  </a>
                  <a href="/view-post" className="text-gray-700 text-xs hover:text-primary transition-colors">
                    View a Post
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};