import { NextResponse } from 'next/server';
import { mockShops } from 'src/data/mockData';

/**
 * [GET] /api/admin/shops
 * Lấy danh sách gian hàng, hỗ trợ lọc theo trạng thái
 * Query params: ?status=pending | active | rejected
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // Truy cập mảng global để đảm bảo dữ liệu mới nhất
    const shops = (global as any).tibikiShops || mockShops;

    // Lọc theo status nếu có
    let filteredShops = status ? shops.filter((s: any) => s.status === status) : shops;

    // Sắp xếp: Pending lên đầu, sau đó theo ngày gửi (mới nhất trước)
    filteredShops = filteredShops.sort((a: any, b: any) => {
      // Priority: pending > active > rejected
      const statusPriority: any = { pending: 0, active: 1, rejected: 2 };
      if (statusPriority[a.status] !== statusPriority[b.status]) {
        return statusPriority[a.status] - statusPriority[b.status];
      }

      // Nếu cùng status, sắp xếp theo ngày (mới nhất lên trước)
      const dateA = a.submittedDate ? new Date(a.submittedDate.split('/').reverse().join('-')) : new Date(0);
      const dateB = b.submittedDate ? new Date(b.submittedDate.split('/').reverse().join('-')) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    console.log(`[API GET Shops] Trả về ${filteredShops.length} shop${status ? ` (status=${status})` : ''}`);

    return NextResponse.json(filteredShops);
  } catch (error) {
    console.error('Lỗi API Get Shops:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ khi tải danh sách Shop' }, { status: 500 });
  }
}
