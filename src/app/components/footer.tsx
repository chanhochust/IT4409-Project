'use client';

import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok, FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111] text-[#eee] py-12 px-5 font-sans mt-10">
      <div className="max-w-full justify-center mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div className="min-w-[200px]">
          <h2 className="text-[24px] font-bold text-sky-400 mb-2">Tibiki</h2>
          <p>Khám phá thế giới mua sắm trực tuyến tiện lợi, chất lượng và đáng tin cậy cùng Tibiki.</p>
          <div className="flex items-center gap-2.5 mt-2">
            <a href="#" aria-label="Facebook" className="w-[35px] h-[35px] rounded-full bg-[#333] text-white flex items-center justify-center hover:bg-sky-500 transition"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram" className="w-[35px] h-[35px] rounded-full bg-[#333] text-white flex items-center justify-center hover:bg-sky-500 transition"><FaInstagram /></a>
            <a href="#" aria-label="Twitter" className="w-[35px] h-[35px] rounded-full bg-[#333] text-white flex items-center justify-center hover:bg-sky-500 transition"><FaXTwitter /></a>
            <a href="#" aria-label="TikTok" className="w-[35px] h-[35px] rounded-full bg-[#333] text-white flex items-center justify-center hover:bg-sky-500 transition"><FaTiktok /></a>
          </div>
        </div>

        <div className="min-w-[200px]">
          <h4 className="font-semibold mb-3 text-white">Hỗ trợ khách hàng</h4>
          <ul className="list-none p-0 space-y-2">
            <li><a className="text-[#ccc] no-underline hover:text-[#00bcd4] transition" href="#">Trung tâm trợ giúp</a></li>
            <li><a className="text-[#ccc] no-underline hover:text-[#00bcd4] transition" href="#">Hướng dẫn mua hàng</a></li>
            <li><a className="text-[#ccc] no-underline hover:text-[#00bcd4] transition" href="#">Theo dõi đơn hàng</a></li>
            <li><a className="text-[#ccc] no-underline hover:text-[#00bcd4] transition" href="#">Chính sách đổi trả</a></li>
          </ul>
        </div>

        <div className="min-w-[200px]">
          <h4 className="font-semibold mb-3 text-white">Về Tibiki</h4>
          <ul className="list-none p-0 space-y-2">
            <li><a className="text-[#ccc] no-underline hover:text-[#00bcd4] transition" href="#">Giới thiệu</a></li>
            <li><a className="text-[#ccc] no-underline hover:text-[#00bcd4] transition" href="#">Tuyển dụng</a></li>
            <li><a className="text-[#ccc] no-underline hover:text-[#00bcd4] transition" href="#">Điều khoản sử dụng</a></li>
            <li><a className="text-[#ccc] no-underline hover:text-[#00bcd4] transition" href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className="min-w-[200px]">
          <h4 className="font-semibold mb-3 text-white">Liên hệ</h4>
          <p className="mb-2 flex items-center"><FaLocationDot className="text-[#00bcd4] mr-2" /> </p>
          <p className="mb-2 flex items-center"><FaPhone className="text-[#00bcd4] mr-2" /> </p>
          <p className="mb-2 flex items-center"><FaEnvelope className="text-[#00bcd4] mr-2" /> </p>
        </div>
      </div>

      <div className="text-center border-t border-[#333] pt-4 mt-10 text-[#999] text-sm">
        <p>© 2025 Tibiki. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
