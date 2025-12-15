'use client';

import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok, FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h2 className="footer-logo">Tibiki</h2>
          <p>Khám phá thế giới mua sắm trực tuyến tiện lợi, chất lượng và đáng tin cậy cùng Tibiki.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaXTwitter /></a>
            <a href="#" aria-label="TikTok"><FaTiktok /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Hỗ trợ khách hàng</h4>
          <ul>
            <li><a href="#">Trung tâm trợ giúp</a></li>
            <li><a href="#">Hướng dẫn mua hàng</a></li>
            <li><a href="#">Theo dõi đơn hàng</a></li>
            <li><a href="#">Chính sách đổi trả</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Về Tibiki</h4>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Liên hệ</h4>
          <p><FaLocationDot /></p>
          <p><FaPhone /></p>
          <p><FaEnvelope /></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Tibiki. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
