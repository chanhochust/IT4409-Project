import { NextResponse } from 'next/server';
import { mockAddresses, syncAddressDefault } from 'src/data/mockData';

/**
 * [GET] /api/user/addresses?userId=...
 * Truy xuất danh sách địa chỉ dựa trên ID người dùng từ bộ nhớ Global.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Yêu cầu cung cấp userId' }, { status: 400 });
    }

    // Lọc địa chỉ từ mảng tham chiếu global trong Canvas
    const userAddresses = mockAddresses.filter((addr: any) => addr.userId === userId);

    // Giả lập độ trễ mạng nhẹ (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(userAddresses);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server khi lấy địa chỉ' }, { status: 500 });
  }
}

/**
 * [POST] /api/user/addresses
 * Thêm địa chỉ mới và xử lý logic địa chỉ mặc định.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, ...addressData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Thiếu thông tin người dùng' }, { status: 400 });
    }

    // Tạo ID mới (number) dựa trên timestamp như logic trong AddressPage của bạn
    const newId = Date.now();

    const newAddress = {
      id: newId,
      userId,
      ...addressData,
    };

    // 1. Thêm vào mảng tham chiếu global
    mockAddresses.push(newAddress);

    // 2. Nếu là địa chỉ mặc định, gọi hàm đồng bộ từ Canvas để gỡ mặc định các địa chỉ khác
    if (newAddress.isDefault) {
      syncAddressDefault(userId, newId);
    }

    console.log(`[API] Đã thêm địa chỉ ${newId} cho User ${userId}`);

    return NextResponse.json({
      success: true,
      message: 'Thêm địa chỉ mới thành công!',
      data: newAddress,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi tạo địa chỉ mới' }, { status: 500 });
  }
}

/**
 * [PUT] /api/user/addresses
 * Cập nhật thông tin địa chỉ hiện có.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, userId, ...updateData } = body;

    if (!id || !userId) {
      return NextResponse.json({ error: 'Thiếu ID địa chỉ hoặc UserID' }, { status: 400 });
    }

    // Tìm index của địa chỉ trong mảng global
    const index = mockAddresses.findIndex((a: any) => a.id === id && a.userId === userId);

    if (index === -1) {
      return NextResponse.json({ error: 'Không tìm thấy địa chỉ cần cập nhật' }, { status: 404 });
    }

    // Cập nhật dữ liệu trực tiếp vào vùng nhớ global
    mockAddresses[index] = {
      ...mockAddresses[index],
      ...updateData,
    };

    // Nếu cập nhật thành địa chỉ mặc định, xử lý đồng bộ các địa chỉ còn lại
    if (updateData.isDefault) {
      syncAddressDefault(userId, id);
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật địa chỉ thành công!',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi cập nhật địa chỉ' }, { status: 500 });
  }
}

/**
 * [DELETE] /api/user/addresses?id=...&userId=...
 * Xóa địa chỉ khỏi hệ thống.
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');
    const userId = searchParams.get('userId');

    if (!id || !userId) {
      return NextResponse.json({ error: 'Thiếu thông tin để xóa' }, { status: 400 });
    }

    const index = mockAddresses.findIndex((a: any) => a.id === id && a.userId === userId);

    if (index !== -1) {
      // Logic: Không cho xóa nếu là địa chỉ mặc định (Bạn có thể bỏ qua nếu muốn)
      if (mockAddresses[index].isDefault && mockAddresses.filter((a: any) => a.userId === userId).length > 1) {
        return NextResponse.json({ error: 'Vui lòng đặt địa chỉ khác làm mặc định trước khi xóa' }, { status: 400 });
      }

      mockAddresses.splice(index, 1);
      return NextResponse.json({ success: true, message: 'Đã xóa địa chỉ thành công' });
    }

    return NextResponse.json({ error: 'Không tìm thấy địa chỉ' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi xóa địa chỉ' }, { status: 500 });
  }
}
