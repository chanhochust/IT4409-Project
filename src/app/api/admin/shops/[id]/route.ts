import { NextResponse } from 'next/server';
// Đảm bảo đường dẫn import này khớp với tệp mockData.ts của bạn
import { mockShops, mockUsers } from 'src/data/mockData';

/**
 * [GET] /api/admin/shops/[id]
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const shops = (global as any).tibikiShops || mockShops;
    const shop = shops.find((s: any) => s.shopId === id);

    if (!shop) {
      return NextResponse.json({ error: 'Không tìm thấy shop' }, { status: 404 });
    }

    return NextResponse.json(shop);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}

/**
 * [PATCH] /api/admin/shops/[id]
 * Cập nhật trạng thái Shop và đồng bộ với User
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, rejectReason, banReason } = body;

    const validStatuses = ['active', 'rejected', 'pending', 'disabled'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: `Trạng thái '${status}' không hợp lệ.` }, { status: 400 });
    }

    if (status === 'rejected' && !rejectReason) {
      return NextResponse.json({ error: 'Vui lòng cung cấp lý do từ chối' }, { status: 400 });
    }

    const shops = (global as any).tibikiShops || mockShops;
    const users = (global as any).tibikiUsers || mockUsers;

    const shopIndex = shops.findIndex((s: any) => s.shopId === id);
    if (shopIndex === -1) {
      console.error(`[API ERROR] Không tìm thấy Shop ID: ${id}`);
      return NextResponse.json({ error: `Không tìm thấy shop có ID: ${id}` }, { status: 404 });
    }

    const shop = shops[shopIndex];
    const ownerId = shop.ownerId;

    // Cập nhật dữ liệu shop
    shop.status = status;
    if (status === 'rejected') {
      shop.rejectReason = rejectReason;
    } else if (status === 'disabled') {
      shop.banReason = banReason;
    } else {
      delete shop.rejectReason;
      delete shop.banReason;
    }

    if (status === 'active') {
      shop.approvedDate = new Date().toLocaleDateString('vi-VN');
    } else if (status === 'rejected') {
      shop.rejectedDate = new Date().toLocaleDateString('vi-VN');
    }

    // Đồng bộ trạng thái sang bảng Users
    const userIndex = users.findIndex((u: any) => u.id === ownerId);
    if (userIndex !== -1) {
      users[userIndex].shopStatus = status;
    }

    return NextResponse.json({
      success: true,
      message: `Đã cập nhật trạng thái shop thành ${status}`,
      data: shop,
    });
  } catch (error) {
    console.error('Lỗi API Shop PATCH:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}
