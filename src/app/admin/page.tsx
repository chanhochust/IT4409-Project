import Link from 'next/link';
import {
  FaBox,
  FaShoppingBasket,
  FaUsers,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaLink,
  FaChartBar,
} from 'react-icons/fa';
import 'src/app/admin/global.css';

export default function AdminDashboardPage() {
  return (
    <div className='admin-main-wrapper'>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
        Tổng quan quản trị
      </h1>

      {/*  Các Thẻ Thống kê chính */}
      <div className='dashboard-stats-grid'>
        <StatCard icon={FaMoneyBillWave} title='Doanh thu' value='120.5M' change='+12.5%' color='#007bff' trend='up' />
        <StatCard icon={FaShoppingBasket} title='Đơn hàng' value='1,245' change='+5.2%' color='#28a745' trend='up' />
        <StatCard icon={FaUsers} title='Khách hàng' value='345' change='-2.1%' color='#dc3545' trend='down' />
        <StatCard
          icon={FaBox}
          title='Tổng sản phẩm'
          value='2,100'
          change='Đang hoạt động'
          color='#ffc107'
          trend='neutral'
        />
      </div>

      {/*  Khu vực Biểu đồ (Placeholder) */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          marginTop: '20px',
        }}>
        <h2
          style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#343a40',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
          <FaChartBar style={{ color: '#007bff' }} /> Báo cáo Doanh thu hàng tháng
        </h2>
        <div
          style={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed #ced4da',
            borderRadius: '4px',
            color: '#999',
          }}>
          [Khu vực hiển thị biểu đồ/báo cáo]
        </div>
      </div>
    </div>
  );
}

// Component Thẻ thống kê
const StatCard = ({ icon: Icon, title, value, change, color, trend }: any) => {
  const trendClass = trend === 'up' ? 'trend-up' : trend === 'down' ? 'trend-down' : 'trend-neutral';
  const TrendIcon = trend === 'up' ? FaArrowUp : trend === 'down' ? FaArrowDown : 'span';

  return (
    <div className='stat-card' style={{ borderColor: color }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p className='stat-title'>{title}</p>
          <h3 className='stat-value'>{value}</h3>
        </div>
        <Icon className='stat-card-icon' style={{ color: color }} />
      </div>
      <span className={`stat-trend ${trendClass}`}>
        {trend !== 'neutral' && <TrendIcon style={{ fontSize: '0.7rem' }} />}
        {change}
      </span>
    </div>
  );
};
