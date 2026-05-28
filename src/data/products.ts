export interface NutritionalFacts {
  calories: string;
  fiber: string;
  vitamins: string[];
  carb?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'greens' | 'fruits' | 'spices';
  categoryName: string;
  price: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockCount: number;
  images: string[];
  shortDescription: string;
  description: string;
  nutritionalFacts: NutritionalFacts;
  origin: string;
  certifications: string[];
  weight: string;
}

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'greens', name: 'Rau Sạch Hữu Cơ' },
  { id: 'fruits', name: 'Trái Cây Cao Cấp' },
  { id: 'spices', name: 'Gia Vị & Thảo Mộc' },
] as const;

export const products: Product[] = [
  {
    id: '1',
    name: 'Cải Bó Xôi Hữu Cơ (Spinach)',
    slug: 'cai-bo-xoi-huu-co',
    category: 'greens',
    categoryName: 'Rau Sạch Hữu Cơ',
    price: 35000,
    unit: 'Túi 300g',
    rating: 4.9,
    reviewsCount: 32,
    stockStatus: 'in_stock',
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582281227099-7f45772a1063?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Cải bó xôi (rau chân vịt) trồng theo tiêu chuẩn hữu cơ USDA tại trang trại Đà Lạt. Lá dày xanh mướt, ngọt nước.',
    description: 'Cải bó xôi hữu cơ tại Tiệm Rau 55 được canh tác hoàn toàn tự nhiên tại vùng đất mát mẻ Đà Lạt. Sản phẩm tuyệt đối không chứa thuốc trừ sâu, phân bón hóa học hay chất biến đổi gen. Cải bó xôi là "siêu thực phẩm" cực kỳ giàu sắt, chất xơ, vitamin A, C và K giúp nâng cao hệ miễn dịch, cải thiện thị lực và tăng cường sức khỏe tim mạch. Rất thích hợp làm nước ép detox, xào tỏi hoặc nấu súp.',
    nutritionalFacts: {
      calories: '23 kcal / 100g',
      fiber: '2.2g',
      vitamins: ['Vitamin A (188%)', 'Vitamin C (47%)', 'Sắt (15%)', 'Canxi']
    },
    origin: 'Đơn Dương, Đà Lạt',
    certifications: ['USDA Organic', 'VietGAP'],
    weight: '300g'
  },
  {
    id: '2',
    name: 'Cà Chua Bi Ruby Đà Lạt',
    slug: 'ca-chua-bi-ruby',
    category: 'greens',
    categoryName: 'Rau Sạch Hữu Cơ',
    price: 45000,
    unit: 'Hộp 500g',
    rating: 4.8,
    reviewsCount: 45,
    stockStatus: 'in_stock',
    stockCount: 20,
    images: [
      'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590137876181-2a5a7e34030d?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Cà chua bi ngọt lịm giống Ruby, mọng nước, giòn rụm. Phù hợp cho món salad và ăn nhẹ hàng ngày.',
    description: 'Cà chua bi giống Ruby sở hữu hình dáng thuôn dài đẹp mắt cùng sắc đỏ sẫm như ngọc hồng lựu. Nhờ phương pháp chăm sóc hữu cơ nhà kính công nghệ cao, từng quả cà chua có độ ngọt thanh vượt trội, vỏ mỏng dai nhẹ và cực kỳ giòn ngọt. Chứa hàm lượng chất chống oxy hóa Lycopene dồi dào, sản phẩm là người bạn vàng giúp trẻ hóa làn da, giảm cholesteron xấu trong máu.',
    nutritionalFacts: {
      calories: '18 kcal / 100g',
      fiber: '1.2g',
      vitamins: ['Lycopene', 'Vitamin C (21%)', 'Kali', 'Vitamin K']
    },
    origin: 'Trại Mát, Đà Lạt',
    certifications: ['VietGAP', 'GlobalGAP'],
    weight: '500g'
  },
  {
    id: '3',
    name: 'Bơ Sáp 034 Đắk Lắk (Loại I)',
    slug: 'bo-sap-034',
    category: 'fruits',
    categoryName: 'Trái Cây Cao Cấp',
    price: 75000,
    unit: '1 Kg (2-3 Quả)',
    rating: 4.7,
    reviewsCount: 58,
    stockStatus: 'in_stock',
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587563871167-1ee9c271aefb?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Bơ sáp giống 034 đặc sản Đắk Lắk. Trái dài, hạt cực nhỏ, cơm vàng dẻo béo ngậy không xơ.',
    description: 'Được mệnh danh là vua của các loại bơ nội địa, bơ sáp 034 đạt độ dẻo mềm hoàn hảo khi chín. Lớp cơm bơ dày màu vàng ươm bắt mắt, béo thơm ngậy đặc trưng và hoàn toàn không bị xơ chỉ. Bơ sáp giàu chất béo không bão hòa đơn tốt cho tim, axit folic nuôi dưỡng tế bào não và rất nhiều vitamin E giúp da mịn màng hồng hào tự nhiên.',
    nutritionalFacts: {
      calories: '160 kcal / 100g',
      fiber: '7g',
      vitamins: ['Vitamin E (14%)', 'B6 (20%)', 'Kali (10%)', 'Axit Folic']
    },
    origin: 'Cư M\'gar, Đắk Lắk',
    certifications: ['Đặc sản vùng miền', 'VietGAP'],
    weight: '1kg'
  },
  {
    id: '4',
    name: 'Hương Thảo Tươi (Rosemary)',
    slug: 'huong-thao-tuoi',
    category: 'spices',
    categoryName: 'Gia Vị & Thảo Mộc',
    price: 28000,
    unit: 'Hộp 50g',
    rating: 4.9,
    reviewsCount: 19,
    stockStatus: 'in_stock',
    stockCount: 8,
    images: [
      'https://images.unsplash.com/photo-1596701062351-8a29144a86f5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533604470876-0bf17d0c3bd3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608797178974-15b35a61d121?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Lá hương thảo tươi ngát hương, gia vị hoàn hảo cho món beefsteak, nướng và decor đồ uống.',
    description: 'Hương thảo (Rosemary) tươi trồng hữu cơ có lá kim dày đặc chứa tinh dầu cực kỳ thơm mát. Mùi hương nồng ấm đặc trưng của hương thảo giúp đánh tan mùi tanh của thịt đỏ, làm tăng hương vị đậm đà cho các món nướng thảo mộc, bít tết hoặc nướng khoai tây. Ngoài nấu ăn, mùi hương từ lá hương thảo còn có tác dụng thư giãn tinh thần, tăng cường khả năng tập trung.',
    nutritionalFacts: {
      calories: '131 kcal / 100g',
      fiber: '14.1g',
      vitamins: ['Tinh dầu Cineol', 'Canxi (31%)', 'Vitamin A', 'Vitamin C']
    },
    origin: 'Lạc Dương, Lâm Đồng',
    certifications: ['VietGAP Hữu Cơ'],
    weight: '50g'
  },
  {
    id: '5',
    name: 'Cải Thìa Hữu Cơ Đà Lạt',
    slug: 'cai-thia-huu-co',
    category: 'greens',
    categoryName: 'Rau Sạch Hữu Cơ',
    price: 24000,
    unit: 'Túi 500g',
    rating: 4.6,
    reviewsCount: 22,
    stockStatus: 'in_stock',
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1606588590111-53697e68cfb0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587563871167-1ee9c271aefb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Cải thìa (Bok Choy) bẹ to mập, giòn ngọt, giàu khoáng chất. Thích hợp xào dầu hào hoặc nấu canh.',
    description: 'Cải thìa hữu cơ có phần bẹ trắng muốt đầy đặn cùng phiến lá xanh non mềm mại. Nhờ thổ nhưỡng giàu mùn và khí hậu mát mẻ quanh năm tại Lâm Đồng, cải thìa tích tụ được vị ngọt mát tự nhiên và độ giòn sần sật đặc trưng. Loại rau này rất giàu canxi, phốt pho, giúp xương chắc khỏe và tăng khả năng kháng viêm hiệu quả.',
    nutritionalFacts: {
      calories: '13 kcal / 100g',
      fiber: '1.0g',
      vitamins: ['Vitamin C (75%)', 'Vitamin K (57%)', 'Canxi (10%)', 'Beta-carotene']
    },
    origin: 'Đức Trọng, Lâm Đồng',
    certifications: ['VietGAP'],
    weight: '500g'
  },
  {
    id: '6',
    name: 'Táo Envy Organic Mỹ (Size L)',
    slug: 'tao-envy-organic',
    category: 'fruits',
    categoryName: 'Trái Cây Cao Cấp',
    price: 139000,
    unit: 'Túi 1 Kg (approx. 3 quả)',
    rating: 4.9,
    reviewsCount: 74,
    stockStatus: 'in_stock',
    stockCount: 18,
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570913149827-d2ac223edd3e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Táo Envy cao cấp nhập khẩu từ Mỹ. Quả tròn đỏ sọc vàng, thịt trắng giòn tan, ngọt thơm đặc trưng.',
    description: 'Táo Envy trứ danh được canh tác theo phương pháp hữu cơ khắt khe tại Mỹ. Với thịt táo trắng mịn tinh khiết, lâu bị thâm sau khi cắt, táo mang lại vị ngọt đậm đà xen lẫn hương thơm vani quyến rũ khó cưỡng. Táo Envy chứa lượng chất xơ hòa tan pectin tuyệt vời hỗ trợ tối đa cho đường ruột và chứa lượng Vitamin C dồi dào tăng collagen tự nhiên.',
    nutritionalFacts: {
      calories: '52 kcal / 100g',
      fiber: '2.4g',
      vitamins: ['Vitamin C (14%)', 'Kali (3%)', 'Pectin', 'Kháng chất']
    },
    origin: 'Washington, Mỹ',
    certifications: ['USDA Organic', 'Import Quality'],
    weight: '1kg'
  },
  {
    id: '7',
    name: 'Gừng Sẻ Hữu Cơ Tây Nguyên',
    slug: 'gung-se-huu-co',
    category: 'spices',
    categoryName: 'Gia Vị & Thảo Mộc',
    price: 32000,
    unit: 'Gói 300g',
    rating: 4.8,
    reviewsCount: 15,
    stockStatus: 'in_stock',
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Gừng sẻ củ nhỏ, vỏ dày sần sùi nhưng cực kỳ cay thơm, đậm vị tinh dầu tự nhiên.',
    description: 'Khác biệt hoàn toàn với gừng trâu củ to nhạt nước, gừng sẻ Tây Nguyên củ tuy nhỏ nhưng chứa lượng tinh dầu cay nồng vượt trội gấp nhiều lần. Gừng được trồng trên nương rẫy đất đỏ tự nhiên. Đây là vị thuốc ấm trung tiêu tuyệt vời, giúp giải cảm, giảm buồn nôn, hỗ trợ tiêu hóa tốt và làm dậy mùi thơm lừng cho các món kho, xào châu Á.',
    nutritionalFacts: {
      calories: '80 kcal / 100g',
      fiber: '2g',
      vitamins: ['Gingerol', 'Vitamin B3', 'Vitamin B6', 'Magie']
    },
    origin: 'Gia Lai, Tây Nguyên',
    certifications: ['VietGAP Hữu Cơ'],
    weight: '300g'
  },
  {
    id: '8',
    name: 'Nho Mẫu Đơn Shine Muscat (Hàn Quốc)',
    slug: 'nho-mau-don-muscat',
    category: 'fruits',
    categoryName: 'Trái Cây Cao Cấp',
    price: 499000,
    unit: 'Chùm 600g',
    rating: 5.0,
    reviewsCount: 39,
    stockStatus: 'in_stock',
    stockCount: 5,
    images: [
      'https://images.unsplash.com/photo-1601275868399-45bec4f2cd9a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Nho mẫu đơn Muscat hữu cơ nhập khẩu Hàn Quốc. Trái to xanh mướt, không hạt, ngọt lịm vị sữa.',
    description: 'Nho mẫu đơn Muscat (Shine Muscat) đạt tiêu chuẩn "Premium Choice" trồng theo phương thức mỗi cành chỉ giữ lại một chùm nho tốt nhất. Quả nho tròn lẳn căng mọng, vỏ mỏng không chát, cắn vào giòn tan lan tỏa vị ngọt lịm đậm đà cùng mùi hương hoa nhài quyện vị sữa độc đáo. Nho chứa chất chống lão hóa Resveratrol mạnh mẽ cùng lượng đường tự nhiên lành mạnh, nạp nhanh năng lượng cho cơ thể.',
    nutritionalFacts: {
      calories: '69 kcal / 100g',
      fiber: '0.9g',
      vitamins: ['Resveratrol', 'Vitamin C (9%)', 'Vitamin K (12%)', 'Sắt']
    },
    origin: 'Gyeongsangbuk-do, Hàn Quốc',
    certifications: ['Premium GAP Hàn Quốc', 'Import Quality'],
    weight: '600g'
  },
  {
    id: '9',
    name: 'Quế Ống Sáo Trà Bồng Cổ Cự',
    slug: 'que-ong-sao-tra-bong',
    category: 'spices',
    categoryName: 'Gia Vị & Thảo Mộc',
    price: 55000,
    unit: 'Hộp 100g',
    rating: 4.8,
    reviewsCount: 14,
    stockStatus: 'in_stock',
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Quế vỏ dày cạo sạch vỏ từ vùng rừng núi Trà Bồng, vị cay ngọt đậm đà, mùi hương quý phái.',
    description: 'Được chế biến từ vỏ thân cây quế đại thụ vùng núi Trà Bồng, Quảng Ngãi - nơi có quế cho hàm lượng tinh dầu cao nhất Đông Nam Á. Từng ống quế được phơi sấy khô đạt chuẩn, cuộn tròn đều như ống sáo thanh mảnh. Gia vị không thể thiếu để nấu nước phở gia truyền thơm nức lòng, làm các món hầm hoặc pha trà quế nóng ấm ngày đông.',
    nutritionalFacts: {
      calories: '247 kcal / 100g',
      fiber: '53.1g',
      vitamins: ['Cinnamaldehyde (tinh dầu quế)', 'Canxi (100%)', 'Sắt (46%)', 'Kẽm']
    },
    origin: 'Trà Bồng, Quảng Ngãi',
    certifications: ['OCOP 4 Sao', 'Chỉ dẫn địa lý'],
    weight: '100g'
  },
  {
    id: '10',
    name: 'Nấm Hương Tươi Hữu Cơ',
    slug: 'nam-huong-tuoi-organic',
    category: 'greens',
    categoryName: 'Rau Sạch Hữu Cơ',
    price: 38000,
    unit: 'Khay 200g',
    rating: 4.7,
    reviewsCount: 29,
    stockStatus: 'in_stock',
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504387828074-ab79b06838e4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478144592103-25e218a04891?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Nấm hương tươi thu hoạch sớm. Tai nấm dày dặn, vị ngọt bùi dai giòn như thịt gà.',
    description: 'Nấm hương tươi hữu cơ trồng tự nhiên trên phôi gỗ sồi tiệt trùng tại vùng núi lạnh Lâm Đồng. Nấm hương có hương thơm đặc trưng thanh tao cực kỳ quyến rũ khi chế biến nhiệt. Nấm hương được ví như "hoàng hậu của các loài nấm", cực kỳ giàu protein lành tính thay thế thịt cho người ăn chay, chứa lentinan tăng đề kháng tự nhiên.',
    nutritionalFacts: {
      calories: '34 kcal / 100g',
      fiber: '2.5g',
      vitamins: ['Protein thực vật', 'Vitamin D (18%)', 'Kẽm', 'Vitamin B2']
    },
    origin: 'Lạc Dương, Lâm Đồng',
    certifications: ['VietGAP', 'Organic Hữu cơ'],
    weight: '200g'
  },
  {
    id: '11',
    name: 'Chanh Dây Mật Đà Lạt',
    slug: 'chanh-day-mat-da-lat',
    category: 'fruits',
    categoryName: 'Trái Cây Cao Cấp',
    price: 48000,
    unit: 'Túi 1 Kg',
    rating: 4.8,
    reviewsCount: 31,
    stockStatus: 'in_stock',
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596701062351-8a29144a86f5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601275868399-45bec4f2cd9a?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Chanh dây giống mật vỏ vàng chín mọng ngọt mát, không bị chua gắt, hương thơm dịu mát.',
    description: 'Giống chanh dây hoàng kim đặc biệt vỏ vàng óng. Phần ruột có màu mật ong đặc quánh, chứa vị ngọt sâu nhẹ nhàng xen chút xíu chua dịu, có thể cắn ăn trực tiếp hoặc dầm đá cực kỳ hấp dẫn. Chanh dây chứa hàm lượng Vitamin C và Kali vô địch giúp bù điện giải tức thì cho cơ thể sảng khoái mát lành.',
    nutritionalFacts: {
      calories: '97 kcal / 100g',
      fiber: '10.4g',
      vitamins: ['Vitamin C (50%)', 'Vitamin A (25%)', 'Kali (7%)', 'Beta-carotene']
    },
    origin: 'Cầu Đất, Đà Lạt',
    certifications: ['VietGAP'],
    weight: '1kg'
  },
  {
    id: '12',
    name: 'Ớt Xiêm Rừng Xanh Tươi mộc mạc',
    slug: 'ot-xiem-rung-xanh',
    category: 'spices',
    categoryName: 'Gia Vị & Thảo Mộc',
    price: 39000,
    unit: 'Hộp 100g',
    rating: 4.9,
    reviewsCount: 18,
    stockStatus: 'low_stock',
    stockCount: 3,
    images: [
      'https://images.unsplash.com/photo-1588252303782-cb80119cb665?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=800&auto=format&fit=crop'
    ],
    shortDescription: 'Ớt xiêm rừng xanh đặc sản hoang dã. Trái siêu nhỏ nhưng độ cay nồng cực mạnh cùng mùi thơm đặc biệt.',
    description: 'Ớt xiêm rừng sinh trưởng hoàn toàn tự nhiên nơi bìa rừng núi cao Tây Nguyên. Trái ớt chỉ dài khoảng 1-2 cm, màu xanh thẫm đặc trưng, cắn một miếng sẽ dậy vị cay giòn rát lưỡi và tỏa mùi thơm thảo mộc quý phái không một loại ớt thường nào sánh kịp. Rất được săn đón để ngâm nước mắm tỏi ăn cùng mỳ tôm, cơm nóng hoặc pha nước chấm cá nướng.',
    nutritionalFacts: {
      calories: '40 kcal / 100g',
      fiber: '1.5g',
      vitamins: ['Capsaicin (cực mạnh)', 'Vitamin C (240%)', 'Vitamin A', 'Kali']
    },
    origin: 'Kon Plông, Kon Tum',
    certifications: ['Đặc sản tự nhiên', 'An toàn thực phẩm'],
    weight: '100g'
  }
];
