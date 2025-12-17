
export default function ProductFeedback({
  productId,
}: {
  productId: string;
}) {
  const reviews = [
    {
      name: "Nguyễn Văn A",
      rating: 5,
      comment: "Sản phẩm rất tốt, giao hàng nhanh!",
    },
    {
      name: "Trần Thị B",
      rating: 4,
      comment: "Gói hàng cẩn thận, mình hài lòng.",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-[#eee]">
      <h2 className="text-xl font-semibold mb-4 text-center">Đánh giá từ khách hàng</h2>

      {reviews.map((r, i) => (
        <div key={i} className="py-4 border-b border-[#f1f1f1]">
          <div className="font-semibold mb-1">{r.name}</div>
          <div className="text-[#fdd835]">
            {"★".repeat(r.rating)}
          </div>
          <p className="text-sm text-[#444]">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
