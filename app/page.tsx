"use client";

import ProductList from "./components/ProductList";

export default function HomePage() {
  const products = [
    {
      id: "1",
      name: "Tai nghe Bluetooth Anker Soundcore",
      image: "/tai_nghe.jpg",
      price: 890000,
      oldPrice: 1200000,
      rating: 4,
    },
    {
      id: "2",
      name: "Điện thoại Xiaomi Redmi Note 12",
      image: "",
      price: 4990000,
      oldPrice: 5490000,
      rating: 5,
    },
    {
      id: "3",
      name: "Laptop Dell Inspiron 15",
      image: "",
      price: 14500000,
      oldPrice: 15900000,
      rating: 4,
    },
    {
      id: "4",
      name: "Balo chống nước Mikkor",
      image: "",
      price: 490000,
      rating: 5,
    },
  ];

  return (
    <main className="main-home">
      <section className="hero-banner">
        <h2>Khuyến mãi hôm nay!</h2>
      </section>

      <section className="product-section">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list-grid">
          <ProductList products={products} />
        </div>
      </section>
    </main>
  );
}