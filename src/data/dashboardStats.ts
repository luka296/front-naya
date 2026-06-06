export const heroStats = [
  {
    value: "2B+",
    label: "مسلم حول العالم",
    description: "حجم سوق عالمي يبحث عن قنوات موثوقة للأعمال الصالحة",
  },
  {
    value: "300M+",
    label: "مهتمون بالخير الرقمي",
    description: "شريحة كبيرة تحتاج تجربة آمنة وشفافة وسهلة",
  },
  {
    value: "100K",
    label: "مستخدم متوقع في السنة الأولى",
    description: "نمو قابل للتوسع مع إطلاق الخدمات الأساسية",
  },
] as const;

export const appServices = [
  {
    icon: "umrah",
    title: "العمرة بالنيابة",
    caption: "نؤدي العمرة عنك أو عن من تحب",
    price: "1300 ريال",
    status: "قيد التنفيذ",
    progress: 68,
  },
  {
    icon: "water",
    title: "توزيع الماء",
    caption: "سقيا الماء في المسجد الحرام",
    price: "6 ريال للعبوة",
    status: "مكتمل",
    progress: 100,
  },
  {
    icon: "dates",
    title: "توزيع التمر",
    caption: "توزيع التمر على ضيوف الرحمن",
    price: "8 ريال للعلبة",
    status: "موثق",
    progress: 100,
  },
  {
    icon: "meal",
    title: "إفطار صائم",
    caption: "وجبات موسمية داخل ساحات الحرم",
    price: "15 ريال للوجبة",
    status: "جديد",
    progress: 42,
  },
] as const;

export const phoneTimeline = [
  { label: "استلام الطلب", state: "مكتمل" },
  { label: "مراجعة الشريك", state: "مكتمل" },
  { label: "التنفيذ الميداني", state: "قيد التنفيذ" },
  { label: "إثبات الإتمام", state: "التالي" },
] as const;

export const floatingAppUpdates = [
  { icon: "check", label: "تم إرسال طلب العمرة" },
  { icon: "water", label: "اكتمل توزيع الماء" },
  { icon: "verified", label: "تم توثيق تقرير الشريك" },
  { icon: "receipt", label: "تم تتبع التبرع" },
] as const;

export const serviceCards = [
  {
    icon: "umrah",
    title: "العمرة بالنيابة",
    desc: "إدارة الطلب من النية وحتى تقرير الإتمام عبر شركاء موثوقين داخل المشاعر المقدسة.",
  },
  {
    icon: "water",
    title: "سقيا الماء",
    desc: "توزيع عبوات الماء وزمزم في مواسم الذروة مع إثبات رقمي لكل حملة.",
  },
  {
    icon: "dates",
    title: "توزيع التمر",
    desc: "حملات موسمية لتوزيع التمور على ضيوف الرحمن والفئات المستحقة.",
  },
  {
    icon: "verified",
    title: "توثيق رقمي",
    desc: "سجل عمليات وصور وتقارير حالة تمنح المستخدم ثقة واضحة في الأثر.",
  },
] as const;

export const marketStats = [
  {
    icon: "users",
    value: "2B+",
    label: "مسلم حول العالم",
    sub: "سوق عالمي ضخم ونمو مستمر",
  },
  {
    icon: "umrah",
    value: "30M+",
    label: "معتمر مستهدف سنويا",
    sub: "طلب متزايد على خدمات العمرة المنظمة",
  },
  {
    icon: "growth",
    value: "7T+",
    label: "حجم الاقتصاد الإسلامي",
    sub: "اقتصاد واسع يحتاج منتجات رقمية موثوقة",
  },
] as const;

export const marketProblems = [
  "اعتماد كبير على واتساب والتحويلات اليدوية بدون تجربة منظمة.",
  "ضعف التوثيق والمتابعة بعد الدفع أو إرسال الطلب.",
  "غياب لوحة بيانات واضحة تربط النية بالتنفيذ والأثر.",
  "عدم وجود تجربة عالمية موحدة بعدة لغات وخدمات موسمية.",
] as const;

export const solutionCards = [
  {
    icon: "timer",
    title: "طلب خلال دقائق",
    desc: "اختيار الخدمة وتحديد المستفيد والنية من شاشة واحدة داخل التطبيق.",
  },
  {
    icon: "shield",
    title: "تنفيذ موثق",
    desc: "ربط الطلب بشريك ميداني موثوق وسجل إثبات لكل مرحلة.",
  },
  {
    icon: "bell",
    title: "إشعارات لحظية",
    desc: "متابعة مباشرة لحالة العمرة أو الحملة الخيرية من داخل نية.",
  },
  {
    icon: "globe",
    title: "تجربة عالمية",
    desc: "تصميم قابل للتوسع للمسلمين حول العالم بالعربية والإنجليزية.",
  },
] as const;

export const journeySteps = [
  {
    icon: "choose",
    num: "01",
    title: "اختيار الخدمة",
    desc: "عمرة بالنيابة أو ماء أو تمر أو حملة موسمية من نفس التطبيق.",
  },
  {
    icon: "form",
    num: "02",
    title: "إرسال الطلب",
    desc: "إدخال النية وبيانات المستفيد والتفاصيل المطلوبة بطريقة واضحة.",
  },
  {
    icon: "payment",
    num: "03",
    title: "دفع آمن",
    desc: "إتمام الدفع عبر بطاقة محفوظة أو بوابات مرخصة وسجل مالي واضح.",
  },
  {
    icon: "partner",
    num: "04",
    title: "تنفيذ الشريك",
    desc: "يتسلم الشريك الميداني الطلب وينفذه وفق معايير نية.",
  },
  {
    icon: "tracking",
    num: "05",
    title: "متابعة مباشرة",
    desc: "تحديثات حالة وتنبيهات داخل التطبيق عند كل انتقال مهم.",
  },
  {
    icon: "proof",
    num: "06",
    title: "إثبات الإتمام",
    desc: "تقرير رقمي وصور أو فيديو عند توفرها وشهادة إتمام قابلة للمشاركة.",
  },
] as const;

export const trustFeatures = [
  {
    icon: "verified",
    title: "شركاء ميدانيون موثقون",
    badge: "Verified Partners",
    desc: "اعتماد مسبق للشركاء ومراجعة التقارير قبل إظهارها للمستخدم.",
  },
  {
    icon: "lock",
    title: "مدفوعات آمنة",
    badge: "Secure Payments",
    desc: "تجربة دفع مشفرة مع سجل معاملات ومراجع طلب واضحة.",
  },
  {
    icon: "tracking",
    title: "تتبع مباشر",
    badge: "Tracked Execution",
    desc: "حالة الطلب تنتقل من الاستلام إلى التنفيذ ثم التوثيق النهائي.",
  },
  {
    icon: "report",
    title: "تقارير شفافة",
    badge: "Transparent Reports",
    desc: "عرض التكلفة والأثر والصور والتحديثات في واجهة واحدة قابلة للمراجعة.",
  },
  {
    icon: "privacy",
    title: "خصوصية المستخدم",
    badge: "Protected Data",
    desc: "الحد من البيانات المعروضة للشركاء وحماية بيانات المستفيدين.",
  },
  {
    icon: "approval",
    title: "مراجعة إدارية",
    badge: "Admin Review",
    desc: "لوحة متابعة داخلية لمراجعة الطلبات والتقارير قبل الإغلاق.",
  },
] as const;

export const businessModelCards = [
  {
    icon: "payment",
    title: "رسوم الخدمة",
    desc: "نسبة واضحة على كل طلب مع قابلية توسيع الخدمات حسب السوق.",
  },
  {
    icon: "spark",
    title: "باقات دورية",
    desc: "اشتراكات شهرية وسنوية للأفراد والعائلات والمؤسسات.",
  },
  {
    icon: "report",
    title: "تقارير مميزة",
    desc: "إثباتات رقمية وشهادات وتقارير أثر قابلة للمشاركة.",
  },
  {
    icon: "globe",
    title: "انتشار عالمي",
    desc: "توسع تدريجي في الأسواق الإسلامية والمواسم عالية الطلب.",
  },
] as const;

export const dashboardKpis = [
  { label: "إجمالي المسلمين عالميا", value: "2B", trend: "+1.8%", tone: "gold" },
  { label: "مهتمون بقنوات خير موثوقة", value: "300M", trend: "+12%", tone: "teal" },
  { label: "مستخدم متوقع في السنة الأولى", value: "100K", trend: "+22%", tone: "blue" },
  { label: "طلبات عمرة متوقعة", value: "25K", trend: "+18%", tone: "gold" },
  { label: "أعمال خير موسمية", value: "60K", trend: "+31%", tone: "teal" },
  { label: "توزيعات ماء", value: "40K", trend: "+27%", tone: "blue" },
  { label: "توزيعات تمر", value: "35K", trend: "+24%", tone: "gold" },
  { label: "إجمالي أثر متوقع", value: "160K", trend: "+29%", tone: "teal" },
  { label: "شريك ميداني موثق", value: "120", trend: "+16%", tone: "blue" },
  { label: "معدل الإتمام", value: "95%", trend: "+7%", tone: "gold" },
  { label: "معدل الثقة والرضا", value: "98%", trend: "+9%", tone: "teal" },
] as const;

export const monthlyUserGrowth = [
  { month: "ينا", users: 6000 },
  { month: "فبر", users: 11200 },
  { month: "مار", users: 16800 },
  { month: "أبر", users: 23400 },
  { month: "ماي", users: 31200 },
  { month: "يون", users: 42600 },
  { month: "يول", users: 51800 },
  { month: "أغس", users: 63800 },
  { month: "سبت", users: 74400 },
  { month: "أكت", users: 85600 },
  { month: "نوف", users: 93600 },
  { month: "ديس", users: 100000 },
] as const;

export const serviceDistribution = [
  { name: "عمرة", value: 25, color: "#d4a64d" },
  { name: "ماء", value: 40, color: "#14b8a6" },
  { name: "تمر", value: 23, color: "#60a5fa" },
  { name: "أخرى", value: 12, color: "#a78bfa" },
] as const;

export const impactGrowth = [
  { month: "ينا", actions: 3200 },
  { month: "فبر", actions: 6900 },
  { month: "مار", actions: 11200 },
  { month: "أبر", actions: 18400 },
  { month: "ماي", actions: 26300 },
  { month: "يون", actions: 37700 },
  { month: "يول", actions: 51600 },
  { month: "أغس", actions: 69200 },
  { month: "سبت", actions: 88400 },
  { month: "أكت", actions: 111000 },
  { month: "نوف", actions: 135000 },
  { month: "ديس", actions: 160000 },
] as const;

export const dashboardProgress = [
  { label: "معدل الإتمام", value: "95%", percentage: 95 },
  { label: "توثيق الشركاء", value: "97%", percentage: 97 },
  { label: "رضا المستخدمين", value: "98%", percentage: 98 },
  { label: "تقارير مكتملة", value: "92%", percentage: 92 },
] as const;

export const platformActivities = [
  { title: "اكتملت عمرة بالنيابة", detail: "تم إصدار تقرير الإتمام للمستخدم", time: "قبل 8 دقائق" },
  { title: "توزيع ماء مكتمل", detail: "120 عبوة موثقة داخل الحرم", time: "قبل 22 دقيقة" },
  { title: "انتهت حملة تمر", detail: "تحديث أثر جديد في لوحة البيانات", time: "قبل 44 دقيقة" },
  { title: "تقرير شريك موثق", detail: "تمت مراجعة الصور وإغلاق الطلب", time: "قبل ساعة" },
  { title: "مستخدم جديد فعّل الدفع", detail: "بطاقة محفوظة وسجل طلب جاهز", time: "قبل ساعتين" },
] as const;

export const regionalCards = [
  { region: "السعودية", value: "42%", detail: "تنفيذ وشركاء ميدانيون" },
  { region: "مصر", value: "18%", detail: "مستخدمون ومؤسسات خيرية" },
  { region: "دول الخليج", value: "25%", detail: "طلب عائلي ومؤسسي" },
  { region: "العالم", value: "15%", detail: "جاليات ومسلمون حول العالم" },
] as const;
