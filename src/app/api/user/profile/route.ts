import { NextResponse } from 'next/server';
// Import dữ liệu từ nguồn tập trung để đảm bảo đồng bộ với các trang khác
import { mockProfiles } from '@/src/data/mockData';

/**
 * [GET] /api/user/profile?userId=...
 * Lấy thông tin chi tiết hồ sơ để hiển thị lên Form Profile
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Không tìm thấy ID người dùng' }, { status: 400 });
    }

    // Giả lập độ trễ mạng thực tế
    await new Promise((resolve) => setTimeout(resolve, 500));

    /**
     * TRUY XUẤT DỮ LIỆU:
     * Nếu tìm thấy userId trong mockProfiles thì trả về dữ liệu đó.
     * Nếu không (user mới đăng ký), trả về bộ khung mặc định để tránh lỗi Frontend.
     */
    const profile = mockProfiles[userId] || {
      fullName: '',
      nickname: '',
      dob_day: '1',
      dob_month: '1',
      dob_year: '2000',
      gender: 'other',
      nationality: 'VN',
      phone: '',
    };

    return NextResponse.json(profile);
  } catch (error) {
    console.error('API Profile GET Error:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}

/**
 * [PUT] /api/user/profile
 * Cập nhật thông tin hồ sơ khi người dùng nhấn nút "Lưu thay đổi"
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, ...updateData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ (thiếu userId)' }, { status: 400 });
    }

    /**
     * GIẢ LẬP LƯU VÀO DATABASE:
     * Cập nhật bản ghi trong mảng mockProfiles toàn cục.
     * Trong thực tế, bạn sẽ dùng: await db.profile.update({ where: { userId }, data: updateData })
     */
    mockProfiles[userId] = {
      ...mockProfiles[userId],
      ...updateData,
    };

    // Ghi log hệ thống để theo dõi quá trình test
    console.log(`--- TIBIKI UPDATE LOG ---`);
    console.log(`User ${userId} đã cập nhật hồ sơ:`, updateData);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'Cập nhật hồ sơ thành công!',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API Profile PUT Error:', error);
    return NextResponse.json({ error: 'Cập nhật hồ sơ thất bại' }, { status: 500 });
  }
}
