import "@/app/products/[id]/products.css";

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
    <div className="feedback-container">
      <h2 className="feedback-title">Đánh giá từ khách hàng</h2>

      {reviews.map((r, i) => (
        <div key={i} className="review-item">
          <div className="review-name">{r.name}</div>
          <div className="review-stars">
            {"★".repeat(r.rating)}
          </div>
          <p className="review-text">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
