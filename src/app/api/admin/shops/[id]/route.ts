import { NextResponse } from 'next/server';
import { mockShops, mockUsers } from 'src/data/mockData';

/**
 * [GET] /api/admin/shops/[id]
 * Lấy chi tiết 1 shop
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const shops = (global as any).tibikiShops || mockShops;
    const shop = shops.find((s: any) => s.shopId === params.id);

    if (!shop) {
      return NextResponse.json({ error: 'Không tìm thấy shop' }, { status: 404 });
    }

    console.log(`[API GET Shop Detail] Shop ${params.id}`);
    return NextResponse.json(shop);
  } catch (error) {
    console.error('Lỗi API Get Shop Detail:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ' }, { status: 500 });
  }
}

/**
 * [PATCH] /api/admin/shops/[id]
 * Cập nhật trạng thái Shop và đồng bộ với User
 * Body: { status: 'active' | 'rejected' | 'pending', rejectReason?: string }
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, rejectReason } = body;

    // 1. Validate status
    const validStatuses = ['active', 'rejected', 'pending', 'disable'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Trạng thái không hợp lệ.' }, { status: 400 });
    }

    // 2. Validate reject reason
    if (status === 'rejected' && !rejectReason) {
      return NextResponse.json({ error: 'Vui lòng cung cấp lý do từ chối' }, { status: 400 });
    }

    // 3. Tìm shop trong global storage
    const shops = (global as any).tibikiShops || mockShops;
    const users = (global as any).tibikiUsers || mockUsers;

    const shopIndex = shops.findIndex((s: any) => s.shopId === id);
    if (shopIndex === -1) {
      return NextResponse.json({ error: 'Không tìm thấy shop' }, { status: 404 });
    }

    const shop = shops[shopIndex];
    const ownerId = shop.ownerId;

    // 4. Cập nhật trạng thái shop
    shop.status = status;

    // Lưu/xóa lý do từ chối
    if (status === 'rejected') {
      shop.rejectReason = rejectReason;
    } else {
      delete shop.rejectReason; // Xóa lý do từ chối cũ khi approve
    }

    // Cập nhật thời gian
    if (status === 'active') {
      shop.approvedDate = new Date().toLocaleDateString('vi-VN');
    } else if (status === 'rejected') {
      shop.rejectedDate = new Date().toLocaleDateString('vi-VN');
    }

    // 5. Đồng bộ trạng thái sang User
    const userIndex = users.findIndex((u: any) => u.id === ownerId);
    if (userIndex !== -1) {
      const user = users[userIndex];
      const oldStatus = user.shopStatus;

      // Map shop status -> user shopStatus
      user.shopStatus = status;

      console.log(`[ADMIN PATCH] User ${ownerId}: ${oldStatus} → ${status}`);
    } else {
      console.warn(`[ADMIN PATCH] Không tìm thấy user ${ownerId} để đồng bộ`);
    }

    console.log(`[ADMIN PATCH] Shop ${id}: ${shop.status}`);

    // 6. Return success response
    const actionMessage = status === 'active' ? 'phê duyệt' : status === 'rejected' ? 'từ chối' : 'cập nhật';

    return NextResponse.json({
      success: true,
      message: `Đã ${actionMessage} shop thành công`,
      shop: {
        shopId: shop.shopId,
        shopName: shop.shopName,
        status: shop.status,
        ownerId: shop.ownerId,
        rejectReason: shop.rejectReason,
        approvedDate: shop.approvedDate,
        rejectedDate: shop.rejectedDate,
      },
    });
  } catch (error) {
    console.error('Lỗi API Shop PATCH:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ khi cập nhật shop' }, { status: 500 });
  }
}
