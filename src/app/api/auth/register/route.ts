import { NextResponse } from 'next/server';
// Import dữ liệu giả lập từ file mockData.ts
import { mockUsers, addUser } from '@/src/data/mockData';

/**
 * [POST] /api/register
 * Logic đăng ký người dùng mới theo trình tự thực tế
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!email || !password) {
      return NextResponse.json({ error: 'Vui lòng cung cấp đầy đủ email và mật khẩu.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu phải có ít nhất 6 ký tự.' }, { status: 400 });
    }

    // 2. Kiểm tra xem Email đã tồn tại trong hệ thống chưa
    const isExisted = mockUsers.find((u) => u.email === email);
    if (isExisted) {
      return NextResponse.json({ error: 'Email này đã được sử dụng. Vui lòng chọn email khác.' }, { status: 400 });
    }

    // 3. Giả lập độ trễ mạng như thực tế (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 4. Tạo userId duy nhất và khởi tạo dữ liệu mặc định
    // Trong thực tế, DB sẽ tự tạo UUID hoặc ID tự tăng
    const newUserId = `USR-${Math.floor(1000 + Math.random() * 9000)}`;

    // Bước 4.1: Tạo tài khoản Auth gốc
    const newUser = {
      id: newUserId,
      email: email,
      password: password, // Trong thực tế phải dùng bcrypt để hash mật khẩu
      role: 'customer' as const, // Mọi người dùng mới đều là khách hàng
      shopStatus: 'none' as const, // Chưa có cửa hàng
    };

    // Bước 4.2: Tạo hồ sơ cá nhân mặc định
    const newProfile = {
      fullName: '',
      nickname: '',
      dob_day: '1',
      dob_month: '1',
      dob_year: '2000',
      gender: 'other',
      nationality: 'VN',
      phone: '', // Để trống để khách hàng tự bổ sung sau
      avatar: '', // Chưa có ảnh đại diện
    };

    /**
     * LƯU Ý KỸ THUẬT:
     * Vì chúng ta đang dùng file mockData.ts làm "Database tạm",
     * chúng ta sẽ đẩy dữ liệu mới vào mảng để các API khác có thể thấy được.
     */
    addUser(newUser, newProfile);

    // 5. Trả về kết quả thành công
    return NextResponse.json({
      success: true,
      message: 'Đăng ký thành công!',
      data: {
        userId: newUserId,
        email: email,
        nextStep: 'Vui lòng đăng nhập để hoàn thiện hồ sơ cá nhân.',
      },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.' }, { status: 500 });
  }
}
