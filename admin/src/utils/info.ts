export const claims = [
  {
    id: 1,
    claimId: "CLM001",
    deviceModel: "iPhone 13 Pro",
    brand: "Apple",
    imei: "123456789012345",
    amount: "50000",
    status: "approved",
    insurer: "Mona Tech",
    date: "2025-06-01",
    category: "approved",
    createdAt: "2025-06-01T09:00:00Z"
  },
  {
    id: 2,
    claimId: "CLM002",
    deviceModel: "Galaxy S22",
    brand: "Samsung",
    imei: "123456789012346",
    amount: "45000",
    status: "pending",
    insurer: "ShieldCare",
    date: "2025-06-02",
    category: "pending",
    createdAt: "2025-06-02T10:00:00Z"
  },
  {
    id: 3,
    claimId: "CLM003",
    deviceModel: "Pixel 7",
    brand: "Google",
    imei: "123456789012347",
    amount: "42000",
    status: "rejected",
    insurer: "Mona Tech",
    date: "2025-06-03",
    category: "rejected",
    createdAt: "2025-06-03T11:00:00Z"
  },
  {
    id: 4,
    claimId: "CLM004",
    deviceModel: "iPhone 14",
    brand: "Apple",
    imei: "123456789012348",
    amount: "60000",
    status: "completed",
    insurer: "Mona Tech",
    date: "2025-06-04",
    category: "completed",
    createdAt: "2025-06-04T12:00:00Z"
  },
  {
    id: 5,
    claimId: "CLM005",
    deviceModel: "Galaxy A52",
    brand: "Samsung",
    imei: "123456789012349",
    amount: "30000",
    status: "under review",
    insurer: "ShieldCare",
    date: "2025-06-05",
    category: "uncategorized",
    createdAt: "2025-06-05T13:00:00Z"
  },
  // ... copy and vary the following pattern until id 40
  ...Array.from({ length: 35 }, (_, i) => {
    const index = i + 6;
    const statuses = ["approved", "pending", "completed", "rejected", "under review"];
    const categories = ["approved", "pending", "completed", "rejected", "uncategorized"];
    const brands = ["Apple", "Samsung", "Google", "Infinix", "Tecno"];
    const models = ["iPhone X", "Galaxy S21", "Pixel 6", "Hot 12", "Camon 20"];
    const insurerOptions = ["Mona Tech", "ShieldCare", "Infinity Protect"];

    return {
      id: index,
      claimId: `CLM${String(index).padStart(3, "0")}`,
      deviceModel: models[i % models.length],
      brand: brands[i % brands.length],
      imei: `1234567890123${index}`,
      amount: (30000 + (i % 5) * 5000).toString(),
      status: statuses[i % statuses.length],
      insurer: insurerOptions[i % insurerOptions.length],
      date: `2025-06-${String((i % 28) + 1).padStart(2, "0")}`,
      category: categories[i % categories.length],
      createdAt: `2025-06-${String((i % 28) + 1).padStart(2, "0")}T0${(i % 10)}:00:00Z`
    };
  })
];
