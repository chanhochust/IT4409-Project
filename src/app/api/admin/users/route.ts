import { NextResponse } from 'next/server';
import { mockUsers, mockProfiles } from '@/src/data/mockData';

/**
 * [GET] /api/admin/users
 * Lấy danh sách thành viên với đầy đủ thông tin hồ sơ
 */
export async function GET() {
  try {
    const users = (global as any).tibikiUsers || mockUsers;
    const profiles = (global as any).tibikiProfiles || mockProfiles;

    const combinedData = users.map((user: any) => {
      const profile = profiles[user.id] || {};
      return {
        id: user.id,
        email: user.email,
        fullName: profile.fullName || 'Thành viên mới',
        avatar: profile.avatar || `https://i.pravatar.cc/150?u=${user.id}`,
        shopStatus: user.shopStatus || 'none',
        status: user.status || 'active',
        // Đảm bảo luôn có ngày tham gia, nếu không có lấy ngày mặc định
        joinDate: user.joinDate || '12/12/2024',
      };
    });

    return NextResponse.json(combinedData);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi lấy dữ liệu' }, { status: 500 });
  }
}
