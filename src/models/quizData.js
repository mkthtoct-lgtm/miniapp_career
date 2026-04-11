// src/models/quizData.js
export const MAX_STAT = 100;

export const HOLLAND_TRAITS = {
  R: 'realistic',    // Thực tế - Kỹ thuật (Thợ rèn)
  I: 'investigative',// Nghiên cứu - Logic (Kiếm sĩ)
  A: 'artistic',     // Nghệ thuật - Sáng tạo (Pháp sư)
  S: 'social',       // Xã hội - Giao tiếp (Hiệp sĩ)
  E: 'enterprising', // Quản lý - Lãnh đạo (Rồng)
  C: 'conventional'  // Nghiệp vụ - Tổ chức (Cung thủ)
};

// ==================== 15 CÂU CORE CHUNG (Tính Holland cao, thực tế) ====================
const CORE_QUESTIONS = [
  {
    q: "6. Bạn thích công việc nào nhất?",
    answers: [
      "Sửa chữa máy móc, lắp ráp thiết bị, làm việc với tay chân",
      "Nghiên cứu, phân tích dữ liệu, giải quyết vấn đề phức tạp",
      "Thiết kế, vẽ vời, tạo ra những thứ đẹp mắt và độc đáo",
      "Giúp đỡ, tư vấn, chăm sóc và hướng dẫn người khác"
    ],
    stats: [
      { realistic: 3, investigative: 1 },
      { investigative: 3, conventional: 1 },
      { artistic: 3, realistic: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "7. Môi trường làm việc lý tưởng của bạn là:",
    answers: [
      "Ngoài trời hoặc xưởng sản xuất, làm việc trực tiếp với vật liệu",
      "Phòng thí nghiệm hoặc văn phòng yên tĩnh để tập trung nghiên cứu",
      "Studio sáng tạo, nơi có thể tự do bày trí và thể hiện ý tưởng",
      "Không gian làm việc nhóm, thường xuyên trò chuyện và hỗ trợ lẫn nhau"
    ],
    stats: [
      { realistic: 3, conventional: 1 },
      { investigative: 3, realistic: 1 },
      { artistic: 3, social: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "8. Bạn cảm thấy thỏa mãn nhất khi:",
    answers: [
      "Hoàn thành một sản phẩm cụ thể bằng tay (đồ handmade, sửa chữa...)",
      "Tìm ra giải pháp logic cho một vấn đề khó",
      "Tạo ra một tác phẩm hoặc ý tưởng sáng tạo được mọi người khen ngợi",
      "Giúp người khác vượt qua khó khăn và thấy họ tiến bộ"
    ],
    stats: [
      { realistic: 3, investigative: 1 },
      { investigative: 3, conventional: 1 },
      { artistic: 3, social: 1 },
      { social: 3, artistic: 1 }
    ]
  },
  {
    q: "9. Bạn thích học kỹ năng nào nhất?",
    answers: [
      "Kỹ thuật sửa chữa, vận hành máy móc, lái xe chuyên dụng",
      "Phân tích dữ liệu, lập trình, nghiên cứu khoa học",
      "Vẽ, thiết kế đồ họa, chụp ảnh, làm video",
      "Kỹ năng giao tiếp, thuyết trình, huấn luyện đội nhóm"
    ],
    stats: [
      { realistic: 3, conventional: 1 },
      { investigative: 3, realistic: 1 },
      { artistic: 3, enterprising: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "10. Khi làm việc nhóm, bạn thường đảm nhận vai trò:",
    answers: [
      "Thực hiện công việc tay chân, lắp đặt, kiểm tra chất lượng",
      "Phân tích dữ liệu và đưa ra giải pháp tối ưu",
      "Đề xuất ý tưởng sáng tạo và thiết kế",
      "Phối hợp, động viên và giữ tinh thần cho cả nhóm"
    ],
    stats: [
      { realistic: 3, investigative: 1 },
      { investigative: 3, conventional: 1 },
      { artistic: 3, social: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "11. Bạn thích đọc loại sách / xem loại nội dung nào?",
    answers: [
      "Hướng dẫn sửa chữa, sách kỹ thuật, tài liệu về máy móc",
      "Sách khoa học, tài liệu nghiên cứu, báo cáo phân tích",
      "Tiểu thuyết, sách nghệ thuật, sách về thiết kế và sáng tạo",
      "Sách self-help, tâm lý học, kỹ năng giao tiếp và lãnh đạo"
    ],
    stats: [
      { realistic: 3, conventional: 1 },
      { investigative: 3, realistic: 1 },
      { artistic: 3, social: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "12. Công việc hàng ngày bạn muốn làm nhiều nhất là:",
    answers: [
      "Làm việc với công cụ, máy móc, vật liệu thực tế",
      "Thu thập và phân tích số liệu, tìm ra quy luật",
      "Sáng tạo nội dung, thiết kế sản phẩm mới",
      "Gặp gỡ, trò chuyện, hỗ trợ và tư vấn cho người khác"
    ],
    stats: [
      { realistic: 3, investigative: 1 },
      { investigative: 3, conventional: 1 },
      { artistic: 3, realistic: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "13. Bạn tự tin nhất với khả năng nào?",
    answers: [
      "Sử dụng thành thạo công cụ và máy móc",
      "Phân tích logic và giải quyết vấn đề phức tạp",
      "Tạo ra những ý tưởng và sản phẩm sáng tạo",
      "Kết nối, thuyết phục và lãnh đạo người khác"
    ],
    stats: [
      { realistic: 3, conventional: 1 },
      { investigative: 3, realistic: 1 },
      { artistic: 3, social: 1 },
      { enterprising: 3, social: 1 }
    ]
  },
  {
    q: "14. Khi gặp khó khăn, bạn thường giải quyết bằng cách:",
    answers: [
      "Thử nghiệm trực tiếp, sửa chữa và điều chỉnh thực tế",
      "Nghiên cứu tài liệu, phân tích nguyên nhân gốc rễ",
      "Nghĩ ra cách tiếp cận mới, sáng tạo khác biệt",
      "Hỏi ý kiến người khác và cùng thảo luận tìm giải pháp"
    ],
    stats: [
      { realistic: 3, investigative: 1 },
      { investigative: 3, conventional: 1 },
      { artistic: 3, enterprising: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "15. Bạn thích loại dự án nào nhất?",
    answers: [
      "Dự án xây dựng, lắp ráp, chế tạo sản phẩm vật lý",
      "Dự án nghiên cứu, khảo sát, phát triển công nghệ",
      "Dự án thiết kế thương hiệu, nội dung sáng tạo",
      "Dự án cộng đồng, đào tạo, phát triển con người"
    ],
    stats: [
      { realistic: 3, conventional: 1 },
      { investigative: 3, realistic: 1 },
      { artistic: 3, social: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "16. Điều bạn ghét nhất trong công việc là:",
    answers: [
      "Phải ngồi một chỗ làm việc giấy tờ suốt ngày",
      "Công việc lặp lại nhàm chán, không có thử thách trí tuệ",
      "Môi trường quá cứng nhắc, không cho phép sáng tạo",
      "Phải làm việc một mình, ít tương tác với đồng nghiệp"
    ],
    stats: [
      { conventional: 3, realistic: 1 },
      { investigative: 3, artistic: 1 },
      { artistic: 3, realistic: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "17. Bạn muốn được khen ngợi vì điều gì?",
    answers: [
      "Sản phẩm làm ra chắc chắn, bền đẹp và thực tế",
      "Phân tích sâu sắc và giải pháp thông minh",
      "Ý tưởng sáng tạo và thẩm mỹ cao",
      "Khả năng hỗ trợ và lãnh đạo đội nhóm hiệu quả"
    ],
    stats: [
      { realistic: 3, conventional: 1 },
      { investigative: 3, realistic: 1 },
      { artistic: 3, social: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "18. Bạn thích sử dụng công cụ nào nhất?",
    answers: [
      "Búa, máy khoan, dụng cụ cơ khí",
      "Phần mềm phân tích dữ liệu, Excel nâng cao",
      "Photoshop, phần mềm thiết kế đồ họa",
      "Công cụ quản lý dự án, CRM, công cụ thuyết trình"
    ],
    stats: [
      { realistic: 3, investigative: 1 },
      { conventional: 3, investigative: 1 },
      { artistic: 3, realistic: 1 },
      { enterprising: 3, social: 1 }
    ]
  },
  {
    q: "19. Cuối ngày bạn cảm thấy mệt mỏi nhất khi phải:",
    answers: [
      "Ngồi làm báo cáo, giấy tờ, nhập liệu nhiều giờ",
      "Làm việc lặp lại không cần suy nghĩ",
      "Làm theo quy trình cứng nhắc không được sáng tạo",
      "Không có ai để trao đổi hoặc hỗ trợ"
    ],
    stats: [
      { conventional: 3, realistic: 1 },
      { realistic: 3, investigative: 1 },
      { artistic: 3, enterprising: 1 },
      { social: 3, enterprising: 1 }
    ]
  },
  {
    q: "20. Bạn mơ về một công việc cho phép bạn:",
    answers: [
      "Làm việc thực tế với máy móc và sản phẩm cụ thể",
      "Nghiên cứu và khám phá kiến thức mới liên tục",
      "Tự do sáng tạo và thể hiện cá tính",
      "Lãnh đạo, giúp đỡ và ảnh hưởng đến nhiều người"
    ],
    stats: [
      { realistic: 3, conventional: 1 },
      { investigative: 3, realistic: 1 },
      { artistic: 3, social: 1 },
      { social: 3, enterprising: 1 }
    ]
  }
];

// ==================== CLASS QUESTIONS (5 câu riêng + 15 CORE) ====================
export const CLASS_QUESTIONS = {
  kiemsi: [  // Investigative (Logic, Phân tích) + Realistic
    {
      q: "1. (KIẾM SĨ) Khi gặp vấn đề kỹ thuật phức tạp, bạn làm gì đầu tiên?",
      answers: [
        "Tự tay tháo ra kiểm tra và thử nghiệm ngay",
        "Phân tích logic, vẽ sơ đồ luồng trước khi hành động",
        "Hỏi ý kiến chuyên gia hoặc tra cứu tài liệu",
        "Tuân thủ quy trình chuẩn có sẵn"
      ],
      stats: [{ realistic: 3 }, { investigative: 3 }, { social: 3 }, { conventional: 3 }]
    },
    {
      q: "2. (KIẾM SĨ) Vũ khí mạnh nhất của bạn là gì?",
      answers: [
        "Kiến thức sâu và khả năng phân tích logic",
        "Kỹ năng thực hành và sửa chữa nhanh chóng",
        "Khả năng học hỏi và thích ứng với tình huống mới",
        "Sức bền và sự kiên trì cao"
      ],
      stats: [{ investigative: 3 }, { realistic: 3 }, { enterprising: 3 }, { conventional: 3 }]
    },
    {
      q: "3. (KIẾM SĨ) Bạn thích giải quyết vấn đề theo cách nào?",
      answers: [
        "Thử nghiệm thực tế nhiều lần để tìm ra cách tốt nhất",
        "Xây dựng lý thuyết và chứng minh bằng dữ liệu",
        "Thảo luận nhóm để lấy nhiều góc nhìn",
        "Tuân thủ quy trình và hướng dẫn chuẩn"
      ],
      stats: [{ realistic: 3 }, { investigative: 3 }, { social: 3 }, { conventional: 3 }]
    },
    {
      q: "4. (KIẾM SĨ) Điều khiến bạn khó chịu nhất khi làm việc?",
      answers: [
        "Công cụ hỏng hoặc thiếu chính xác",
        "Thiếu dữ liệu và bằng chứng rõ ràng",
        "Phải làm việc một mình quá lâu mà không trao đổi",
        "Quy tắc cứng nhắc không cho phép linh hoạt"
      ],
      stats: [{ realistic: 3 }, { investigative: 3 }, { social: 3 }, { conventional: 3 }]
    },
    {
      q: "5. (KIẾM SĨ) Bạn muốn trở thành kiểu chuyên gia nào?",
      answers: [
        "Kỹ sư thực chiến giỏi sửa chữa và vận hành",
        "Nhà nghiên cứu phân tích dữ liệu sâu sắc",
        "Người dẫn dắt và huấn luyện đội ngũ kỹ thuật",
        "Chuyên gia tuân thủ quy trình và kiểm soát chất lượng"
      ],
      stats: [{ realistic: 3 }, { investigative: 3 }, { enterprising: 3 }, { conventional: 3 }]
    },
    ...CORE_QUESTIONS
  ],

  cungthu: [  // Conventional (Tổ chức, Chính xác) + Investigative
    {
      q: "1. (CUNG THỦ) Khi đứng từ xa quan sát, bạn tập trung vào gì?",
      answers: [
        "Tính toán chính xác hướng gió, khoảng cách và quỹ đạo",
        "Phân tích sơ đồ đội hình và điểm yếu của đối phương",
        "Chọn mục tiêu quan trọng nhất để hành động trước",
        "Quan sát tình trạng đồng đội để hỗ trợ kịp thời"
      ],
      stats: [{ conventional: 3 }, { investigative: 3 }, { enterprising: 3 }, { social: 3 }]
    },
    {
      q: "2. (CUNG THỦ) Làm sao để đạt độ chính xác tuyệt đối?",
      answers: [
        "Lặp lại thao tác tập luyện hàng nghìn lần",
        "Ghi chép số liệu sai số và điều chỉnh liên tục",
        "Giữ tâm lý bình tĩnh và tập trung cao độ",
        "Sử dụng công cụ hỗ trợ đo lường chính xác"
      ],
      stats: [{ realistic: 3 }, { conventional: 3 }, { investigative: 3 }, { artistic: 3 }]
    },
    {
      q: "3. (CUNG THỦ) Phong cách làm việc yêu thích của bạn là:",
      answers: [
        "Lên kế hoạch tỉ mỉ từng bước trước khi bắt đầu",
        "Vừa làm vừa thu thập dữ liệu để tối ưu hóa",
        "Độc lập tác chiến và tự quyết định thời điểm",
        "Đồng bộ nhịp độ chặt chẽ với toàn đội"
      ],
      stats: [{ conventional: 3 }, { investigative: 3 }, { enterprising: 3 }, { social: 3 }]
    },
    {
      q: "4. (CUNG THỦ) Vật dụng không thể thiếu của bạn là:",
      answers: [
        "Bộ dụng cụ bảo trì và kiểm tra định kỳ",
        "Bản đồ, sổ tay ghi chép số liệu chi tiết",
        "Thiết bị liên lạc với đồng đội",
        "Vật phẩm mang tính biểu tượng giúp tập trung"
      ],
      stats: [{ realistic: 3 }, { conventional: 3 }, { social: 3 }, { artistic: 3 }]
    },
    {
      q: "5. (CUNG THỦ) Điều gì làm nên một phát bắn hoàn hảo?",
      answers: [
        "Kỹ thuật cơ học và chất lượng công cụ",
        "Thời điểm được tính toán chính xác",
        "Góc bắn sáng tạo và bất ngờ",
        "Mục đích của phát bắn mang lại lợi ích cho tập thể"
      ],
      stats: [{ realistic: 3 }, { investigative: 3 }, { artistic: 3 }, { social: 3 }]
    },
    ...CORE_QUESTIONS
  ],

  phapsu: [  // Artistic (Sáng tạo) + Investigative
    {
      q: "1. (PHÁP SƯ) Nguồn sức mạnh ma thuật của bạn đến từ đâu?",
      answers: [
        "Trí tưởng tượng phong phú và ý tưởng sáng tạo",
        "Nghiên cứu cổ thư và công thức phức tạp",
        "Kết nối trực tiếp với năng lượng thiên nhiên",
        "Hấp thụ và chuyển hóa sức mạnh từ người khác"
      ],
      stats: [{ artistic: 3 }, { investigative: 3 }, { realistic: 3 }, { enterprising: 3 }]
    },
    {
      q: "2. (PHÁP SƯ) Khi gặp phép thuật mới, bạn làm gì?",
      answers: [
        "Thử nghiệm ngay để xem hiệu ứng hình ảnh",
        "Phân tích cấu trúc logic của câu thần chú",
        "Ghi chép công thức cẩn thận vào sổ tay cá nhân",
        "Trình diễn cho mọi người xem để thu hút sự chú ý"
      ],
      stats: [{ artistic: 3 }, { investigative: 3 }, { conventional: 3 }, { enterprising: 3 }]
    },
    {
      q: "3. (PHÁP SƯ) Phong cách sáng tạo của bạn là:",
      answers: [
        "Phá vỡ quy tắc để tạo ra thứ chưa từng có",
        "Pha trộn nguyên tố một cách có hệ thống",
        "Truyền tải cảm xúc sâu sắc vào phép thuật",
        "Tạo ảo ảnh để thao túng suy nghĩ đám đông"
      ],
      stats: [{ artistic: 3 }, { realistic: 3 }, { social: 3 }, { enterprising: 3 }]
    },
    {
      q: "4. (PHÁP SƯ) Trong nhóm khám phá, vai trò của bạn là:",
      answers: [
        "Đưa ra góc nhìn sáng tạo khi mọi người bế tắc",
        "Dịch thuật và phân tích văn bản cổ",
        "Kiểm kê và quản lý kho phép thuật",
        "Chữa lành và hồi phục cho cả đội"
      ],
      stats: [{ artistic: 3 }, { investigative: 3 }, { conventional: 3 }, { social: 3 }]
    },
    {
      q: "5. (PHÁP SƯ) Điều bạn ghét nhất là:",
      answers: [
        "Sự rập khuôn và thiếu thẩm mỹ",
        "Lý thuyết suông không thể thử nghiệm",
        "Môi trường thiếu tương tác và sáng tạo",
        "Quy trình cứng nhắc không cho phép đổi mới"
      ],
      stats: [{ artistic: 3 }, { investigative: 3 }, { social: 3 }, { conventional: 3 }]
    },
    ...CORE_QUESTIONS
  ],

  rong: [  // Enterprising (Lãnh đạo) + Conventional
    {
      q: "1. (RỒNG) Mục tiêu lớn nhất với tư cách kẻ thống trị là gì?",
      answers: [
        "Mở rộng lãnh thổ và tích lũy quyền lực",
        "Xây dựng bộ luật chặt chẽ để cai trị trật tự",
        "Bảo vệ thần dân và phát triển cộng đồng thịnh vượng",
        "Thu thập tri thức vô tận vào kho lưu trữ"
      ],
      stats: [{ enterprising: 3 }, { conventional: 3 }, { social: 3 }, { investigative: 3 }]
    },
    {
      q: "2. (RỒNG) Khi có kẻ thách thức quyền lực, bạn sẽ:",
      answers: [
        "Dùng mưu lược và chiến thuật chính trị để cô lập",
        "Đàm phán và thu phục chúng thành đồng minh",
        "Trực tiếp dùng sức mạnh áp đảo",
        "Sử dụng quy định pháp luật để trừng trị"
      ],
      stats: [{ enterprising: 3 }, { social: 3 }, { realistic: 3 }, { conventional: 3 }]
    },
    {
      q: "3. (RỒNG) Kho báu bạn trân quý nhất là:",
      answers: [
        "Vàng bạc, tài sản và quyền lực thương mại",
        "Hệ thống dữ liệu và mạng lưới tình báo",
        "Sự trung thành tuyệt đối của thuộc hạ",
        "Những cổ vật nghệ thuật độc bản"
      ],
      stats: [{ enterprising: 3 }, { investigative: 3 }, { social: 3 }, { artistic: 3 }]
    },
    {
      q: "4. (RỒNG) Phong cách lãnh đạo của bạn là:",
      answers: [
        "Giao việc rõ ràng và theo dõi qua báo cáo định kỳ",
        "Truyền cảm hứng và vạch ra tầm nhìn lớn",
        "Làm gương bằng cách xông pha tiền tuyến",
        "Cung cấp nguồn lực để cấp dưới tự do sáng tạo"
      ],
      stats: [{ conventional: 3 }, { enterprising: 3 }, { realistic: 3 }, { artistic: 3 }]
    },
    {
      q: "5. (RỒNG) Để phát triển vương quốc, bạn tập trung vào:",
      answers: [
        "Phát triển thương mại và kêu gọi đầu tư",
        "Quy chuẩn hóa hành chính và luật pháp",
        "Nâng cấp giáo dục, y tế và an sinh xã hội",
        "Đẩy mạnh nghiên cứu khoa học và công nghệ"
      ],
      stats: [{ enterprising: 3 }, { conventional: 3 }, { social: 3 }, { investigative: 3 }]
    },
    ...CORE_QUESTIONS
  ],

  hiepsi: [  // Social (Giúp đỡ) + Realistic
    {
      q: "1. (HIỆP SĨ) Lời thề hiệp sĩ của bạn tập trung vào điều gì?",
      answers: [
        "Bảo vệ kẻ yếu và chữa lành vết thương",
        "Tuân thủ tuyệt đối quy tắc danh dự",
        "Trở thành chiến binh mạnh nhất về kỹ năng",
        "Phụng sự và thuyết phục trong ngoại giao"
      ],
      stats: [{ social: 3 }, { conventional: 3 }, { realistic: 3 }, { enterprising: 3 }]
    },
    {
      q: "2. (HIỆP SĨ) Trong đội hình, bạn thường nhận trách nhiệm:",
      answers: [
        "Làm lá chắn tiên phong chịu đòn cho đồng đội",
        "Khích lệ tinh thần và giữ lửa cho team",
        "Quản lý quân nhu và phân phát lương thực",
        "Nghiên cứu bản đồ và tuyến đường an toàn"
      ],
      stats: [{ realistic: 3 }, { social: 3 }, { conventional: 3 }, { investigative: 3 }]
    },
    {
      q: "3. (HIỆP SĨ) Khi thấy người lạ bị thương, bạn sẽ:",
      answers: [
        "Sơ cứu ngay lập tức bằng kỹ năng y tế",
        "An ủi và lắng nghe để họ bình tĩnh",
        "Gọi cứu hộ chuyên nghiệp và phối hợp",
        "Điều tra nguyên nhân gây ra vết thương"
      ],
      stats: [{ realistic: 3 }, { social: 3 }, { enterprising: 3 }, { investigative: 3 }]
    },
    {
      q: "4. (HIỆP SĨ) Khí chất nào khiến người khác tôn trọng bạn?",
      answers: [
        "Sự chính trực và luôn giữ lời hứa",
        "Lòng trắc ẩn và khả năng thấu hiểu",
        "Sức mạnh thể chất và sự dẻo dai",
        "Tài ăn nói và phong thái tự tin"
      ],
      stats: [{ conventional: 3 }, { social: 3 }, { realistic: 3 }, { enterprising: 3 }]
    },
    {
      q: "5. (HIỆP SĨ) Phần thưởng xứng đáng nhất với bạn là:",
      answers: [
        "Nụ cười và lời cảm ơn từ người được giúp đỡ",
        "Huy chương danh dự từ cộng đồng",
        "Đất đai và tước vị quý tộc",
        "Vũ khí hoặc trang phục được chế tác tinh xảo"
      ],
      stats: [{ social: 3 }, { conventional: 3 }, { enterprising: 3 }, { artistic: 3 }]
    },
    ...CORE_QUESTIONS
  ],

  thoren: [  // Realistic (Thực tế, Tay chân) + Artistic
    {
      q: "1. (THỢ RÈN) Khi bắt đầu một bản thiết kế mới, bạn làm gì?",
      answers: [
        "Cầm búa thử nghiệm trực tiếp trên vật liệu",
        "Phác thảo hoa văn và họa tiết tinh xảo",
        "Tính toán thông số chịu lực và nhiệt độ",
        "Lập bảng dự toán chi phí và vật tư"
      ],
      stats: [{ realistic: 3 }, { artistic: 3 }, { investigative: 3 }, { conventional: 3 }]
    },
    {
      q: "2. (THỢ RÈN) Điều gì làm nên một món vũ khí huyền thoại?",
      answers: [
        "Chất lượng thép và công nghệ rèn ưu việt",
        "Thiết kế thẩm mỹ và hoa văn độc đáo",
        "Lịch sử và câu chuyện đằng sau nó",
        "Giá trị thương mại và khả năng bán cao"
      ],
      stats: [{ realistic: 3 }, { artistic: 3 }, { investigative: 3 }, { enterprising: 3 }]
    },
    {
      q: "3. (THỢ RÈN) Xưởng của bạn được bố trí như thế nào?",
      answers: [
        "Công cụ và máy móc đặt ở vị trí dễ lấy nhất",
        "Dụng cụ phân loại ngăn nắp, đánh nhãn rõ ràng",
        "Treo đầy bản vẽ, bảng màu và hình ảnh cảm hứng",
        "Khu vực tiếp khách VIP sang trọng để chốt deal"
      ],
      stats: [{ realistic: 3 }, { conventional: 3 }, { artistic: 3 }, { enterprising: 3 }]
    },
    {
      q: "4. (THỢ RÈN) Khi truyền nghề cho người học việc, bạn chú trọng:",
      answers: [
        "Cầm tay chỉ việc rèn luyện kỹ năng thực hành",
        "Hướng dẫn cách giao tiếp và đọc vị khách hàng",
        "Yêu cầu thuộc lòng bảng thành phần hóa học",
        "Dạy quản lý sổ sách và tồn kho"
      ],
      stats: [{ realistic: 3 }, { social: 3 }, { investigative: 3 }, { conventional: 3 }]
    },
    {
      q: "5. (THỢ RÈN) Nỗi sợ lớn nhất của bạn trong công việc là:",
      answers: [
        "Tạo ra sản phẩm kém chất lượng, dễ hỏng",
        "Sản phẩm thiếu thẩm mỹ và bị chê thô kệch",
        "Thất thoát tài chính do tính toán sai",
        "Công thức bí truyền bị đánh cắp"
      ],
      stats: [{ realistic: 3 }, { artistic: 3 }, { conventional: 3 }, { enterprising: 3 }]
    },
    ...CORE_QUESTIONS
  ],

  default: CORE_QUESTIONS
};