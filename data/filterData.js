export const filterData = {
  getColors: {
    colors: ["red", "white", "black", "green", "yellow", "blue"],
  },
  getBrands: {
    brand: [
      "Nike",
      "Louis Vuitton",
      "Hermes",
      "Gucci",
      "Zalando",
      "Adidas",
      "Zara",
      "H&M",
      "Cartier",
      "Lululemon",
      "Chanel",
    ],
  },
  getSize: {
    size: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  newProducts: [
    {
      id: "1123",
      title: "Test",
      description: "Test desc",
      type: "type",
      brand: "Brand",
      category: "category",
      price: 12,
      new: true,
      stock: 4,
      sale: false,
      discount: 10,
      variants: [
        {
          id: "12",
          sku: 12,
          size: 12,
          color: "red",
          image_id: "123",
        },
        {
          id: "12",
          sku: 12,
          size: 12,
          color: "green",
          image_id: "123",
        },
      ],
      images: [
        {
          image_id: "123",
          id: "123",
          alt: "Test",
          src: "http://themes.pixelstrap.com/multikart/assets/images/pro3/33.jpg",
        },
      ],
    },
  ],
};
