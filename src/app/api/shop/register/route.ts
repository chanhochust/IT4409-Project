import { NextResponse } from 'next/server';
import { mockShops, mockUsers } from 'src/data/mockData';

/**
 * [POST] /api/shop/register
 * Tiếp nhận hồ sơ đăng ký bán hàng từ người dùng
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, businessName, email, taxCode, businessType, address, fullName, phone } = body;

    // 1. Kiểm tra dữ liệu bắt buộc
    if (!userId || !businessName || !address || !fullName || !phone) {
      return NextResponse.json({ error: 'Vui lòng điền đầy đủ các thông tin bắt buộc (*)' }, { status: 400 });
    }

    // 2. Truy cập bộ nhớ Global
    const shops = (global as any).tibikiShops || mockShops;
    const users = (global as any).tibikiUsers || mockUsers;

    // 3. Tìm user hiện tại
    const user = users.find((u: any) => u.id === userId);
    if (!user) {
      return NextResponse.json({ error: 'Không tìm thấy thông tin người dùng' }, { status: 404 });
    }

    // 4. Kiểm tra xem User này đã gửi đơn chưa
    const existingShop = shops.find((s: any) => s.ownerId === userId);

    // Nếu đã có shop đang pending hoặc active -> không cho gửi lại
    if (existingShop && existingShop.status === 'pending') {
      return NextResponse.json(
        { error: 'Bạn đã có một yêu cầu đang chờ duyệt. Vui lòng đợi phản hồi từ quản trị viên.' },
        { status: 400 },
      );
    }

    if (existingShop && existingShop.status === 'active') {
      return NextResponse.json({ error: 'Tài khoản của bạn đã có shop đang hoạt động.' }, { status: 400 });
    }

    // Nếu shop bị reject trước đó -> cho phép gửi lại
    if (existingShop && existingShop.status === 'rejected') {
      // Cập nhật shop cũ thay vì tạo mới
      existingShop.shopName = businessName;
      existingShop.businessEmail = email;
      existingShop.taxCode = taxCode || 'Chưa cung cấp';
      existingShop.businessType = businessType;
      existingShop.warehouseAddress = address;
      existingShop.status = 'pending'; // Chuyển lại sang pending
      existingShop.submittedDate = new Date().toLocaleDateString('vi-VN');
      existingShop.representative = {
        fullName: fullName,
        phone: phone,
        email: email,
      };
      existingShop.rejectReason = undefined; // Xóa lý do từ chối cũ

      // Cập nhật trạng thái user
      user.shopStatus = 'pending';

      console.log(`[SHOP REGISTER] User ${userId} đã gửi lại hồ sơ: ${businessName}`);

      return NextResponse.json({
        success: true,
        message: 'Hồ sơ của bạn đã được gửi lại thành công. Vui lòng đợi quản trị viên phê duyệt trong 24h.',
        shopId: existingShop.shopId,
      });
    }

    // 5. Tạo mã Shop ID ngẫu nhiên (cho user lần đầu đăng ký)
    const newShopId = `SHOP-${Math.floor(1000 + Math.random() * 9000)}`;

    // 6. Tạo hồ sơ Shop mới
    const newShop = {
      shopId: newShopId,
      ownerId: userId,
      shopName: businessName,
      businessEmail: email,
      taxCode: taxCode || 'Chưa cung cấp',
      businessType: businessType || 'Cá nhân / Hộ kinh doanh',
      warehouseAddress: address,
      status: 'pending', // Trạng thái mặc định là chờ duyệt
      logo: `https://placehold.co/200x200?text=${encodeURIComponent(businessName.charAt(0))}`,
      submittedDate: new Date().toLocaleDateString('vi-VN'),
      ownerInfo: {
        fullName: fullName,
        phone: phone,
        email: email,
      },
    };

    // 7. Lưu vào mảng Global
    shops.push(newShop);

    // 8. CẬP NHẬT TRẠNG THÁI USER: none -> pending
    user.shopStatus = 'pending';

    console.log(`[SHOP REGISTER] User ${userId} (${user.email}) đã đăng ký shop: ${businessName}`);
    console.log(`[SHOP REGISTER] Trạng thái user cập nhật: ${user.shopStatus}`);

    return NextResponse.json({
      success: true,
      message: 'Hồ sơ của bạn đã được gửi đi thành công. Vui lòng đợi quản trị viên phê duyệt trong 24h.',
      shopId: newShopId,
    });
  } catch (error) {
    console.error('Lỗi API Đăng ký Shop:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ khi xử lý hồ sơ' }, { status: 500 });
  }
}
