export const companyInfo = {
  name: "KTalk Academy",
  founder: "Judith M.",
  headquarters: "Camobi, Santa Maria, RS, Brazil",
  email: "favy20@gmail.com",
  phone: "+55 55 92001-9028",
  copyrightYear: 2026
};

export const initialDashboardData = {
  stats: {
    totalStudents: 1284,
    totalStudentsGrowth: 12,
    activeCourses: 42,
    activeCoursesGrowth: 5,
    completionRate: 88,
  },
  pricing: {
    seasonalPromo: "25% OFF",
    promoTarget: "Global Communication Series",
    promoActive: true,
    hourlyRate: 120,
  },
  upcomingLessons: [
    {
      id: 1,
      dateMonth: "OCT",
      dateDay: "14",
      title: "Business English: Negotiation Tactics",
      time: "09:00 AM - 10:30 AM",
      studentsCount: 12,
      category: "Executive Series"
    },
    {
      id: 2,
      dateMonth: "OCT",
      dateDay: "14",
      title: "Academic Writing: IELTS Prep",
      time: "01:00 PM - 03:00 PM",
      studentsCount: 8,
      category: "Academic Series"
    },
    {
      id: 3,
      dateMonth: "OCT",
      dateDay: "15",
      title: "Executive Presentation & Pitching",
      time: "10:00 AM - 11:30 AM",
      studentsCount: 15,
      category: "Leadership"
    }
  ],
  recentFeedback: [
    {
      id: 1,
      rating: 5.0,
      quote: "Judith's method of teaching complex grammatical structures through real-world business scenarios is unparalleled. Truly empowering.",
      name: "Alessandro Moretti",
      location: "Milan, Italy",
      avatarInitials: "AM",
      avatarBg: "#DBEAFE"
    },
    {
      id: 2,
      rating: 4.0,
      quote: "The materials provided are excellent. I would love more practice on the listening modules, but overall a fantastic experience.",
      name: "Yuki Lin",
      location: "Tokyo, Japan",
      avatarInitials: "YL",
      avatarBg: "#E0E7FF"
    },
    {
      id: 3,
      rating: 5.0,
      quote: "Finally feel confident during my international client calls. KTalk Academy changed my career trajectory!",
      name: "Sarah Jenkins",
      location: "London, UK",
      avatarInitials: "SJ",
      avatarBg: "#FEF3C7"
    }
  ],
  studentsList: [
    { id: 101, name: "Lucas Ferreira", location: "São Paulo, Brazil", plan: "VIP Support", progress: 92, lastActive: "2 hours ago" },
    { id: 102, name: "Beatriz Santos", location: "Rio de Janeiro, Brazil", plan: "Premium", progress: 78, lastActive: "Yesterday" },
    { id: 103, name: "Rodrigo Almeida", location: "Belo Horizonte, Brazil", plan: "Premium", progress: 85, lastActive: "3 hours ago" },
    { id: 104, name: "Camila Rocha", location: "Curitiba, Brazil", plan: "Basic", progress: 64, lastActive: "5 mins ago" },
    { id: 105, name: "Thiago Oliveira", location: "Porto Alegre, Brazil", plan: "VIP Support", progress: 96, lastActive: "1 day ago" }
  ]
};

export const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Essential language skills for casual learners.",
    price: "49",
    period: "/month",
    isPopular: false,
    ctaText: "Select Basic",
    features: [
      { text: "Weekly Group Sessions", included: true },
      { text: "Community Access", included: true },
      { text: "Private Mentorship", included: false }
    ]
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For serious learners seeking fast-track results.",
    price: "120",
    period: "/month",
    badgeText: "POPULAR",
    isPopular: true,
    ctaText: "Select Premium",
    features: [
      { text: "All Basic Features", included: true },
      { text: "Daily Interactive Tasks", included: true },
      { text: "Priority Feedback", included: true },
      { text: "Profile Analytics", included: true }
    ]
  },
  {
    id: "vip",
    name: "VIP Support",
    tagline: "The elite experience with dedicated consultancy.",
    price: "350",
    period: "/month",
    isPopular: false,
    ctaText: "Select VIP",
    features: [
      { text: "Personal Language Coach", included: true },
      { text: "Customized Curriculum", included: true },
      { text: "24/7 Priority Support", included: true }
    ]
  }
];

export const studentPortalData = {
  studentName: "Lucas Ferreira",
  currentTrack: "Business English & Executive Pitching",
  level: "Advanced (C1)",
  assignedCoach: "Judith M.",
  roadmapSteps: [
    { title: "Diagnostic & Goal Setting", completed: true, date: "Completed Sep 12" },
    { title: "Grammar Nuances for Executives", completed: true, date: "Completed Sep 28" },
    { title: "High-Stakes Negotiation Practice", active: true, date: "In Progress (Due Oct 18)" },
    { title: "Global Boardroom Simulation", completed: false, date: "Scheduled Oct 25" }
  ],
  nextClass: {
    title: "Negotiation Tactics Live Drill",
    time: "Tomorrow, 09:00 AM BRT",
    link: "https://meet.google.com/ktalk-judith-live"
  }
};
