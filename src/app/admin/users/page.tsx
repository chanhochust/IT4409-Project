'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Ban,
  Eye,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  ShieldCheck,
  Calendar,
  Mail,
  Phone,
} from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Load danh sách người dùng
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok) setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Lỗi tải người dùng:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý Khóa/Mở khóa
  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'banned' ? 'active' : 'banned';
    if (!confirm(`Xác nhận ${newStatus === 'banned' ? 'Khóa' : 'Mở khóa'} tài khoản này?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
      }
    } catch (error) {
      alert('Lỗi máy chủ');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='w-full space-y-6 font-sans text-slate-900'>
      {/* HEADER TỐI GIẢN */}
      <div className='flex flex-col items-center justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row'>
        <h1 className='text-2xl font-semibold text-gray-800'>Quản lý Người dùng</h1>

        <div className='relative w-full md:w-96'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={16} />
          <input
            type='text'
            placeholder='Tìm theo tên hoặc email...'
            className='w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* BẢNG DỮ LIỆU CHUẨN STYLE SẢN PHẨM */}
      <div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-b border-slate-200 bg-slate-50'>
              <th className='px-10 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500'>Thành viên</th>
              <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500'>Ngày tham gia</th>
              <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                Đối tác bán hàng
              </th>
              <th className='px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                Trạng thái tài khoản
              </th>
              <th className='px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-100'>
            {isLoading ? (
              <tr>
                <td colSpan={5} className='py-20 text-center text-slate-400'>
                  <Loader2 className='mx-auto mb-2 animate-spin' />
                  <p className='text-xs font-medium'>Đang tải danh sách...</p>
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className='transition-colors hover:bg-slate-50/50'>
                  {/* CỘT 1: THÀNH VIÊN */}
                  <td className='px-10 py-4'>
                    <div className='flex items-center gap-3'>
                      <img
                        src={user.avatar}
                        className='h-9 w-9 rounded-full border border-slate-200 bg-slate-100 object-cover'
                        alt=''
                      />
                      <div className='min-w-0'>
                        <p className='text-[14px] font-bold leading-tight text-slate-800'>{user.fullName}</p>
                        <p className='text-[11px] font-medium text-slate-400'>{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* CỘT 2: NGÀY THAM GIA */}
                  <td className='px-6 py-4 text-sm font-medium text-slate-600'>
                    <div className='flex items-center gap-2'>
                      <Calendar size={14} className='text-slate-300' />
                      {user.joinDate}
                    </div>
                  </td>

                  {/* CỘT 3: ĐỐI TÁC BÁN HÀNG */}
                  <td className='px-6 py-4'>
                    <ShopStatusBadge status={user.shopStatus} />
                  </td>

                  {/* CỘT 4: TRẠNG THÁI TÀI KHOẢN */}
                  <td className='px-6 py-4'>
                    {user.status === 'banned' ? (
                      <span className='inline-flex items-center gap-1.5 text-[12px] font-bold uppercase text-rose-600'>
                        <XCircle size={14} /> Đã bị khóa
                      </span>
                    ) : (
                      <span className='inline-flex items-center gap-1.5 text-[12px] font-bold uppercase text-emerald-600'>
                        <CheckCircle2 size={14} /> Hoạt động
                      </span>
                    )}
                  </td>

                  {/* CỘT 5: THAO TÁC */}
                  <td className='space-x-1 px-8 py-4 text-left'>
                    <button
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      className={`cursor-pointer rounded-lg p-2 transition-all ${
                        user.status === 'banned'
                          ? 'text-emerald-500 hover:bg-emerald-50'
                          : 'text-rose-400 hover:bg-rose-50'
                      }`}
                      title={user.status === 'banned' ? 'Mở khóa' : 'Khóa tài khoản'}>
                      <Ban size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className='py-20 text-center text-xs font-bold uppercase tracking-widest text-slate-300'>
                  Không tìm thấy kết quả phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ShopStatusBadge = ({ status }: { status: string }) => {
  const config: any = {
    active: {
      label: 'Đối tác Shop',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      icon: <ShieldCheck size={12} />,
    },
    pending: { label: 'Chờ duyệt', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: <Clock size={12} /> },
    rejected: { label: 'Từ chối', color: 'bg-rose-50 text-rose-600 border-rose-100', icon: <XCircle size={12} /> },
    disabled: { label: 'Đã khóa', color: 'bg-slate-100 text-slate-500 border-slate-200', icon: <Ban size={12} /> },
    none: { label: 'Khách hàng', color: 'bg-blue-50 text-blue-500 border-blue-100', icon: <User size={12} /> },
  };

  const current = config[status] || config['none'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold uppercase ${current.color}`}>
      {current.icon} {current.label}
    </span>
  );
};
