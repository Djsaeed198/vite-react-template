export interface MethodSample {
  id: string;
  methodKey: 
    | "startup"
    | "permanent-eu"
    | "artist"
    | "self-employed-key"
    | "family"
    | "student"
    | "blue-card"
    | "skilled-workers"
    | "highly-qualified"
    | "job-seeker";
  methodTitleFa: string;
  cardTypeFa: string;
  titleFa: string;
  titleDe: string;
  applicantProfile: string;
  authority: string;
  state: "Wien" | "Steiermark" | "Oberösterreich" | "Salzburg" | "Tirol" | "Kärnten" | "Vorarlberg" | "Niederösterreich";
  issueDate: string;
  validity: string;
  caseRef: string;
  workPermitClause: string;
  legalParagraph: string;
  badgeHighlight?: string;
  mrz1: string;
  mrz2: string;
  cardVariant: "rwr" | "rwr-plus" | "student" | "blue-card" | "permanent" | "artist" | "visa-d" | "family";
  keyConditions: string[];
  anatomyTips: { label: string; desc: string }[];
  holderMasked: string;
  dobMasked: string;
  cardNoMasked: string;
}

export const VISA_METHODS = [
  {
    key: "startup",
    title: "🚀 خوداشتغالی و استارتاپ",
    subtitle: "Start-up & Self-Employment",
    color: "from-rose-500/20 to-orange-500/10 border-rose-500/30 text-rose-400",
    badge: "نوآوری و سرمایه",
    legalNote: "§ 24 Abs 2 AuslBG (Start-up-Gründer)"
  },
  {
    key: "permanent-eu",
    title: "🇪🇺 اقامت بلندمدت دائم",
    subtitle: "Daueraufenthalt – EU",
    color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400",
    badge: "۵ ساله نامحدود",
    legalNote: "§ 45 NAG (Dauerhafter Aufenthalt)"
  },
  {
    key: "artist",
    title: "🎨 اقامت هنرمندان",
    subtitle: "Niederlassungsbewilligung – Künstler",
    color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400",
    badge: "مستقل یا وابسته",
    legalNote: "§ 43a NAG (Künstlerische Tätigkeit)"
  },
  {
    key: "self-employed-key",
    title: "💼 کارگران کلیدی خوداشتغال",
    subtitle: "Self-employed Key Workers (RWR)",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
    badge: "انتقال سرمایه ۱۰۰K+",
    legalNote: "§ 24 AuslBG (Selbständige Schlüsselkraft)"
  },
  {
    key: "family",
    title: "👨‍👩‍👧‍👦 پیوستن به خانواده",
    subtitle: "Family Reunification (RWR Plus)",
    color: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400",
    badge: "کار آزاد و بدون سهمیه",
    legalNote: "§ 46 NAG (Familienangehörige)"
  },
  {
    key: "student",
    title: "🎓 اقامت دانشجویی",
    subtitle: "Aufenthaltsbewilligung – Student",
    color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400",
    badge: "۲۰ ساعت کار قانونی",
    legalNote: "§ 64 NAG (Universitätsstudium)"
  },
  {
    key: "blue-card",
    title: "💎 کارت آبی اتحادیه اروپا",
    subtitle: "Blaue Karte EU",
    color: "from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400",
    badge: "حقوق مصوب اتحادیه",
    legalNote: "§ 42 NAG iVm § 12c AuslBG"
  },
  {
    key: "skilled-workers",
    title: "⚙️ کارمندان متخصص و مشاغل کمبود",
    subtitle: "Skilled Workers (Mangelberufe & Key)",
    color: "from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400",
    badge: "لیست کمبود نیرو ۵۵ امتیاز",
    legalNote: "§ 12a AuslBG (Mangelberufe)"
  },
  {
    key: "highly-qualified",
    title: "🏆 افراد بسیار متخصص",
    subtitle: "Very Highly Qualified (Besonders Hochqualifizierte)",
    color: "from-red-500/20 to-amber-500/10 border-red-500/30 text-red-400",
    badge: "کسب ۷۰ امتیاز نخبگان",
    legalNote: "§ 12 AuslBG (Besonders Hochqualifizierte)"
  },
  {
    key: "job-seeker",
    title: "🔍 ویزای جستجوی کار ۶ ماهه",
    subtitle: "Job Seeker Visa (Visum D)",
    color: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400",
    badge: "ورود قانونی برای کاریابی",
    legalNote: "§ 24a FPG (Visum D Arbeitsplatzsuche)"
  }
] as const;

export const ALL_METHOD_SAMPLES: MethodSample[] = [
  // =========================================================================
  // METHOD 1: 🚀 اتریش خوداشتغالی و استارتاپ (Self-Employment & Start-up) - 4 نمونه
  // =========================================================================
  {
    id: "startup-sample-1-fintech",
    methodKey: "startup",
    methodTitleFa: "استارتاپ و خوداشتغالی نوآورانه",
    cardTypeFa: "کارت قرمز-سفید-قرمز (استارتاپ)",
    titleFa: "کارت اقامت استارتاپی فین‌تک هوش مصنوعی در وین",
    titleDe: "Rot-Weiß-Rot – Karte (Start-up-Gründer gem. § 24 Abs 2 AuslBG)",
    applicantProfile: "بنیان‌گذار پلتفرم هوش مصنوعی مدیریت ریسک مالی با سرمایه اولیه ۳۵٬۰۰۰ یورو و تاییدیه AWS",
    authority: "MA 35 Wien + Austria Wirtschaftsservice (aws)",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۴/۱۰",
    validity: "۲ ساله (تا ۲۰۲۶/۰۴/۰۹)",
    caseRef: "MA35-AWS/2024-0491-STARTUP",
    workPermitClause: "خوداشتغالی بر اساس بیزنس‌پلن مصوب aws",
    legalParagraph: "§ 41 Abs 2 NAG iVm § 24 Abs 2 AuslBG",
    badgeHighlight: "تایید صلاحیت نوآوری در گواهی مکتوب Austria Wirtschaftsservice",
    mrz1: "ARAUTW9401827S4IRN9105142M2604098<<<<<<<<<<<<<<02",
    mrz2: "NAZARI<<KAVEH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "NAZARI, K***H",
    dobMasked: "14.05.1991",
    cardNoMasked: "W9401827S",
    keyConditions: [
      "کسب حداقل ۵۰ امتیاز در جدول امتیازات استارتاپ اتریش",
      "ارائه بیزنس‌پلن نوآورانه و معرفی محصول جدید به بازار",
      "تامین سرمایه اولیه حداقل ۳۰٬۰۰۰ یورو با حداقل ۵۰٪ سهام شرکت",
      "گواهی مثبت از Austria Wirtschaftsservice (aws)"
    ],
    anatomyTips: [
      { label: "عنوان روی کارت", desc: "درج عنوان Start-up-Gründer بر روی تراشه و پشت کارت با قید عدم نیاز به استخدام کارمندی." },
      { label: "مسیر تبدیل به RWR Plus", desc: "پس از ۲ سال با استخدام حداقل دو کارمند یا سرمایه‌گذاری ۵۰K یورو، مستقیماً به کارت Plus آزاد تبدیل می‌شود." }
    ]
  },
  {
    id: "startup-sample-2-medtech",
    methodKey: "startup",
    methodTitleFa: "استارتاپ و خوداشتغالی نوآورانه",
    cardTypeFa: "کارت قرمز-سفید-قرمز (استارتاپ مدیکال)",
    titleFa: "کارت اقامت استارتاپ تجهیزات پزشکی و سلامت در گراتس",
    titleDe: "Rot-Weiß-Rot – Karte (MedTech Start-up Gründerin)",
    applicantProfile: "فارغ‌التحصیل مهندسی پزشکی با ثبت اختراع دستگاه پایش ضربان قلب نوزادان در اشتایرمارک",
    authority: "Amt der Steiermärkischen Landesregierung (Graz)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۲/۱۸",
    validity: "۲ ساله (تا ۲۰۲۶/۰۲/۱۷)",
    caseRef: "STMK-AWS/2024-0018-MEDTECH",
    workPermitClause: "فعالیت در شرکت دانش‌بنیان ثبت‌شده در گراتس",
    legalParagraph: "§ 24 Abs 2 AuslBG (Innovative Produkte)",
    badgeHighlight: "استقرار در پارک فناوری گراتس (Science Park Graz)",
    mrz1: "ARAUTG4189023S1IRN9308224F2602175<<<<<<<<<<<<<<06",
    mrz2: "MOHAMMADI<<MINA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "MOHAMMADI, M***A",
    dobMasked: "22.08.1993",
    cardNoMasked: "G4189023S",
    keyConditions: [
      "ثبت رسمی شرکت GmbH یا FlexCo جدید در اتریش",
      "نامه حمایتی از شتاب‌دهنده‌های معتبر استانی اتریش",
      "مدرک زبان انگلیسی B2 یا آلمانی B1"
    ],
    anatomyTips: [
      { label: "مزیت شرکت انعطاف‌پذیر (FlexCo)", desc: "امکان ثبت شرکت نوپای FlexKapG طبق قانون ۲۰۲۴ اتریش با حداقل سرمایه ۱۰٬۰۰۰ یورو." },
      { label: "حمایت FFG و AWS", desc: "امکان دریافت گرنت‌های تحقیق و توسعه بدون کسر مالکیت سهام." }
    ]
  },
  {
    id: "startup-sample-3-greentech",
    methodKey: "startup",
    methodTitleFa: "استارتاپ و خوداشتغالی نوآورانه",
    cardTypeFa: "کارت قرمز-سفید-قرمز (استارتاپ انرژی سبز)",
    titleFa: "کارت استارتاپی نرم‌افزار بهینه‌سازی انرژی خورشیدی در لینتس",
    titleDe: "Rot-Weiß-Rot – Karte für GreenTech-Gründer",
    applicantProfile: "متخصص هوش مصنوعی با طرح پلتفرم مدیریت شبکه‌های هوشمند انرژی تجدیدپذیر",
    authority: "Landeshauptmann von Oberösterreich (Linz)",
    state: "Oberösterreich",
    issueDate: "۲۰۲۳/۱۱/۰۴",
    validity: "۲ ساله (تا ۲۰۲۵/۱۱/۰۳)",
    caseRef: "OOE-ST-2023-7721-SOLAR",
    workPermitClause: "اداره و مدیریت شرکت استارتاپی ثبت شده در اتریش",
    legalParagraph: "§ 41 Abs 2 NAG iVm § 24 Abs 2 AuslBG",
    badgeHighlight: "کسب تاییدیه کامل ایجاد اشتغال محلی از اداره کار AMS اتریش",
    mrz1: "ARAUTL8810293S9IRN8911046M2511032<<<<<<<<<<<<<<01",
    mrz2: "SALIMI<<PEYMAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "SALIMI, P***N",
    dobMasked: "04.11.1989",
    cardNoMasked: "L8810293S",
    keyConditions: [
      "اثبات نقش کلیدی متقاضی در هیئت مدیره شرکت نوپا",
      "ایجاد حداقل ۲ فرصت شغلی جدید در اتریش در طول ۲۴ ماه",
      "بیمه سلامت کارآفرینان (SVS) و سکونت رسمی"
    ],
    anatomyTips: [
      { label: "کارت استارتاپی دو ساله", desc: "کارت RWR اولیه استارتاپ دقیقا ۲ سال اعتبار دارد و برخلاف ویزای کاری به یک کارفرما وابسته نیست." },
      { label: "بیمه کارآفرینان SVS", desc: "برخلاف کارمندان، بیمه متقاضی از نوع Gewerbliche Sozialversicherung است." }
    ]
  },
  {
    id: "startup-sample-4-edtech",
    methodKey: "startup",
    methodTitleFa: "استارتاپ و خوداشتغالی نوآورانه",
    cardTypeFa: "کارت قرمز-سفید-قرمز (استارتاپ گردشگری و هتل)",
    titleFa: "کارت استارتاپ رزرواسیون هوشمند گردشگری آلپ در اینسبروک",
    titleDe: "Rot-Weiß-Rot – Karte (Alpin Tourism Tech Startup)",
    applicantProfile: "تیم نرم‌افزاری با محصول بومی‌سازی شده رزرواسیون پیست‌های اسکی و هتل‌های تیرول",
    authority: "Bezirkshauptmannschaft Innsbruck (Tirol)",
    state: "Tirol",
    issueDate: "۲۰۲۴/۰۱/۱۵",
    validity: "۲ ساله (تا ۲۰۲۶/۰۱/۱۴)",
    caseRef: "TIR-ST-2024-0199-TOURISM",
    workPermitClause: "خوداشتغالی نوآورانه در بخش فناوری گردشگری تیرول",
    legalParagraph: "§ 24 Abs 2 AuslBG (Tirol Innovation)",
    badgeHighlight: "حمایت اتاق بازرگانی تیرول (WKO Tirol) و توافق هتلداران",
    mrz1: "ARAUTI3391024S5IRN9203157F2601149<<<<<<<<<<<<<<08",
    mrz2: "ROSHAN<<SHADI<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "ROSHAN, S***I",
    dobMasked: "15.03.1992",
    cardNoMasked: "I3391024S",
    keyConditions: [
      "اثبات ارزش افزوده ملموس برای اقتصاد محلی ایالت تیرول",
      "ثبت کد اقتصادی مالیاتی (Steuernummer) و شناسه Firmenbuch",
      "ارزیابی صلاحیت کارآفرینی توسط هیئت خبرگان اقتصادی"
    ],
    anatomyTips: [
      { label: "تاییدیه اتاق بازرگانی", desc: "Wirtschaftskammer اتریش به عنوان مشاور تخصصی نظر نهایی را به اداره مهاجرت اعلام می‌کند." },
      { label: "بیمه درمانی تکمیلی", desc: "پوشش جامع بیماری‌ها از طریق اتاق بیمه بازرگانان اتریش." }
    ]
  },

  // =========================================================================
  // METHOD 2: 🇪🇺 کارت اقامت بلندمدت - اتحادیه اروپا (Daueraufenthalt – EU) - 4 نمونه
  // =========================================================================
  {
    id: "permanent-sample-1-vienna-it",
    methodKey: "permanent-eu",
    methodTitleFa: "اقامت بلندمدت اتحادیه اروپا",
    cardTypeFa: "کارت اقامت دائم ۵ ساله (Daueraufenthalt – EU)",
    titleFa: "کارت ۵ ساله دائم اتحادیه اروپا پس از ۵ سال کار مهندسی در وین",
    titleDe: "Daueraufenthalt – EU gem. § 45 NAG (5 Jahre Niederlassung)",
    applicantProfile: "مهندس ارشد نرم‌افزار پس از ۲ سال RWR و ۳ سال RWR Plus در پایتخت",
    authority: "Magistratsabteilung 35 Wien (Daueraufenthalt)",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۱/۲۵",
    validity: "۵ ساله (تا ۲۰۲۹/۰۱/۲۴ - قابل تمدید)",
    caseRef: "MA35-DA/2024-91023-EU",
    workPermitClause: "دسترسی ۱۰۰٪ آزاد و نامحدود به سراسر بازار کار اتریش و شنگن",
    legalParagraph: "§ 45 NAG (Daueraufenthalt - EU Richtlinie 2003/109/EG)",
    badgeHighlight: "بالاترین سطح اقامت پیش از درخواست پاسپورت سرخ اتریش",
    mrz1: "ARAUTW8819024D2IRN8701258M2901246<<<<<<<<<<<<<<05",
    mrz2: "KAZEMI<<REZA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "permanent",
    holderMasked: "KAZEMI, R***A",
    dobMasked: "25.01.1987",
    cardNoMasked: "W8819024D",
    keyConditions: [
      "۵ سال اقامت قانونی و بدون وقفه در قلمرو اتریش (با غیبت مجاز کمتر از ۱۰ ماه)",
      "مدرک زبان آلمانی B1 با گواهی رسمی ادغام (ÖIF Integrationsprüfung B1)",
      "اثبات تمکن مالی و درآمد مستقل بدون استفاده از کمک‌های معیشتی Sozialhilfe",
      "گواهی عدم سوءپیشینه از دادگستری اتریش (Strafregisterbescheinigung)"
    ],
    anatomyTips: [
      { label: "تمدید صرفاً عکس‌محور", desc: "هر ۵ سال یکبار مانند پاسپورت تنها با یک قطعه عکس جدید تمدید شده و حقوق آن باطل نمی‌شود." },
      { label: "حق کار در اتحادیه اروپا", desc: "حق نقل مکان و کار در ۲۷ کشور اتحادیه اروپا طبق قانون مصوب کمیسیون اروپا." }
    ]
  },
  {
    id: "permanent-sample-2-salzburg-family",
    methodKey: "permanent-eu",
    methodTitleFa: "اقامت بلندمدت اتحادیه اروپا",
    cardTypeFa: "کارت اقامت دائم ۵ ساله (Daueraufenthalt – EU)",
    titleFa: "کارت اقامت دائم ۵ ساله اتحادیه اروپا برای سرپرست خانواده در سالزبورگ",
    titleDe: "Daueraufenthalt – EU (Familienniederlassung Salzburg)",
    applicantProfile: "مدیر حسابداری بین‌المللی با ۵ سال سابقه بیمه بدون قطعی در سالزبورگ",
    authority: "Bezirkshauptmannschaft Salzburg-Umgebung",
    state: "Salzburg",
    issueDate: "۲۰۲۳/۱۲/۱۰",
    validity: "۵ ساله (تا ۲۰۲۸/۱۲/۰۹)",
    caseRef: "BHS-DA-2023-4109-PERM",
    workPermitClause: "اشتغال و کارآفرینی کاملاً آزاد در تمام اصناف",
    legalParagraph: "§ 45 NAG iVm § 17 NAG (Erfüllung Modul 2)",
    badgeHighlight: "قبولی با نمره ممتاز در آزمون ارزش‌های دموکراتیک و زبان B1 اتریش",
    mrz1: "ARAUTS7192048D6IRN8409121F2812093<<<<<<<<<<<<<<01",
    mrz2: "HASSANI<<LEILA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "permanent",
    holderMasked: "HASSANI, L***A",
    dobMasked: "12.09.1984",
    cardNoMasked: "S7192048D",
    keyConditions: [
      "اثبات داشتن مسکن مناسب برای کل اعضای خانواده مطابق استانداردهای محلی",
      "گواهی درآمد خانوادگی بالاتر از نرخ معافیت قانون تامین اجتماعی (ASVG)",
      "ثبت ۶۰ ماه کسورات بازنشستگی در سازمان بیمه اتریش (ÖGK)"
    ],
    anatomyTips: [
      { label: "عبارت Daueraufenthalt – EU", desc: "در قسمت مشخصات کارت این عبارت حک شده که بالاترین اعتبار شنگن را داراست." },
      { label: "ثبات حقوق مدنی", desc: "برخورداری از تمامی حقوق شهروندان اتریش به جز حق رأی در انتخابات پارلمان ملی." }
    ]
  },
  {
    id: "permanent-sample-3-linz-bluecard",
    methodKey: "permanent-eu",
    methodTitleFa: "اقامت بلندمدت اتحادیه اروپا",
    cardTypeFa: "کارت اقامت دائم ۵ ساله (مسیر بلوکارت)",
    titleFa: "کارت دائم اتحادیه اروپا پس از ۲۱ ماه بلوکارت و زبان B1 در لینتس",
    titleDe: "Daueraufenthalt – EU für Inhaber einer Blauen Karte EU",
    applicantProfile: "متخصص امنیت سایبری و داده‌های صنعتی کارخانجات لینتس",
    authority: "Amt der Oö. Landesregierung (Linz)",
    state: "Oberösterreich",
    issueDate: "۲۰۲۴/۰۳/۰۱",
    validity: "۵ ساله (تا ۲۰۲۹/۰۲/۲۸)",
    caseRef: "OOE-BC-DA-2024-5120",
    workPermitClause: "آزاد و نامحدود در کل صنایع اتحادیه اروپا",
    legalParagraph: "§ 45 Abs 12 NAG (Sonderregelung Blaue Karte EU)",
    badgeHighlight: "استفاده از ماده قانونی ویژه تسریع اقامت دائم برای دارندگان کارت آبی",
    mrz1: "ARAUTL5529104D3IRN9002148M2902287<<<<<<<<<<<<<<09",
    mrz2: "EBRAHIMI<<ALIREZA<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "permanent",
    holderMasked: "EBRAHIMI, A***A",
    dobMasked: "14.02.1990",
    cardNoMasked: "L5529104D",
    keyConditions: [
      "داشتن کارت آبی اتحادیه اروپا به مدت حداقل ۲۱ ماه در اتریش",
      "ارائه مدرک زبان آلمانی B1 یا ۳۳ ماه با مدرک زبان آلمانی A2",
      "پرداخت منظم بیمه و مالیات بر درآمد بدون وقفه"
    ],
    anatomyTips: [
      { label: "ماده ۴۵ بند ۱۲ NAG", desc: "قانون اتریش به نخبگان کارت آبی اجازه می‌دهد بسیار زودتر از ۵ سال به اقامت دائم برسند." },
      { label: "معافیت از بررسی مجدد تمکن", desc: "پس از صدور کارت دائم، دیگر نیازی به تاییدیه سالانه کارفرما یا قرارداد نیست." }
    ]
  },
  {
    id: "permanent-sample-4-graz-phd",
    methodKey: "permanent-eu",
    methodTitleFa: "اقامت بلندمدت اتحادیه اروپا",
    cardTypeFa: "کارت اقامت دائم ۵ ساله (مسیر پژوهشگر دانشگاهی)",
    titleFa: "کارت اقامت دائم اتحادیه اروپا برای استاد پژوهشگر دانشگاه فنی گراتس",
    titleDe: "Daueraufenthalt – EU (Forscher und Wissenschaftler)",
    applicantProfile: "پژوهشگر ارشد نانوفناوری با سوابق مقالات و تدریس رسمی در ایالت اشتایرمارک",
    authority: "BH Graz-Umgebung (Steiermark)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۵/۱۴",
    validity: "۵ ساله (تا ۲۰۲۹/۰۵/۱۳)",
    caseRef: "STMK-DA-2024-0824-RESEARCH",
    workPermitClause: "پژوهش و اشتغال بدون محدودیت در تمامی موسسات آموزش عالی و بخش خصوصی",
    legalParagraph: "§ 45 NAG iVm § 43c NAG (Forscher)",
    badgeHighlight: "انتقال سابقه بیمه تحقیقاتی دانشگاهی به سوابق رسمی بازنشستگی فدرال",
    mrz1: "ARAUTG9102834D7IRN8607213M2905131<<<<<<<<<<<<<<04",
    mrz2: "SHAMS<<FARHAD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "permanent",
    holderMasked: "SHAMS, F***D",
    dobMasked: "21.07.1986",
    cardNoMasked: "G9102834D",
    keyConditions: [
      "مجموعاً ۵ سال اقامت به عنوان محقق رسمی (§ 43c) یا کارت کارگری",
      "قرارداد دانشگاهی یا کرسی تدریس پژوهشی با درآمد ثابت",
      "ارزیابی مثبت پلیس اتباع خارجی در خصوص یکپارچگی اجتماعی"
    ],
    anatomyTips: [
      { label: "حفاظت در برابر اخراج", desc: "دارندگان این کارت از بالاترین درجه حمایت قانونی حقوق شهروندی شنگن برخوردارند." },
      { label: "تسهیل ویزای بستگان", desc: "امکان دعوت از والدین و فرزندان تحت تکفل با تشریفات اداری به مراتب ساده‌تر." }
    ]
  },

  // =========================================================================
  // METHOD 3: 🎨 هنرمندان (Artists) اتریش: مجوز اقامت (Niederlassungsbewilligung – Künstler) - 4 نمونه
  // =========================================================================
  {
    id: "artist-sample-1-musician-vienna",
    methodKey: "artist",
    methodTitleFa: "مجوز اقامت هنرمندان",
    cardTypeFa: "مجوز اقامت هنرمند (مستقل)",
    titleFa: "کارت اقامت هنرمندی نوازنده و آهنگساز ارکستر در وین",
    titleDe: "Niederlassungsbewilligung – Künstler (Selbständige Musikerin)",
    applicantProfile: "فارغ‌التحصیل کنسرواتوار موسیقی وین با قراردادهای متعدد اجرا در تالارهای موسیقی اتریش",
    authority: "MA 35 Wien - Referat Künstler & Kulturschaffende",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۳/۱۲",
    validity: "۱ ساله (تا ۲۰۲۵/۰۳/۱۱ - تمدید سالانه)",
    caseRef: "MA35-ART/2024-1102-MUSIK",
    workPermitClause: "منحصراً فعالیت‌های هنری و اجرای موسیقی به صورت مستقل",
    legalParagraph: "§ 43a Abs 1 NAG (Künstlerische Tätigkeit)",
    badgeHighlight: "تاییدیه رسمی کیفیت هنری توسط آکادمی هنرهای وین و کارشناس رسمی دادگستری",
    mrz1: "ARAUTW3190284K8IRN9403126F2503114<<<<<<<<<<<<<<03",
    mrz2: "TEHRANI<<NILOUFAR<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "artist",
    holderMasked: "TEHRANI, N***R",
    dobMasked: "12.03.1994",
    cardNoMasked: "W3190284K",
    keyConditions: [
      "اثبات فعالیت هنری عمدتاً خلاقانه به عنوان هنرمند حرفه‌ای (Künstlereigenschaft)",
      "قراردادهای کار با تالارهای موسیقی، گالری‌ها یا کنسرواتوارها (Werkverträge)",
      "اثبات درآمد مستقل کافی از هنر برای پوشش هزینه‌های معیشتی و اجاره",
      "بیمه درمانی ویژه هنرمندان در اتریش (KSVF - Künstler-Sozialversicherungsfonds)"
    ],
    anatomyTips: [
      { label: "عبارت Künstler", desc: "بر روی کارت مشخصاً قید شده که اقامت تنها برای خلق اثر هنری معتبر است." },
      { label: "حمایت صندوق KSVF", desc: "دولت اتریش نیمی از هزینه‌های بیمه تامین اجتماعی هنرمندان واجد شرایط را پرداخت می‌کند." }
    ]
  },
  {
    id: "artist-sample-2-visual-arts",
    methodKey: "artist",
    methodTitleFa: "مجوز اقامت هنرمندان",
    cardTypeFa: "مجوز اقامت هنرمند (طراح و نقاش)",
    titleFa: "کارت اقامت هنرمندی نقاش و طراح هنرهای تجسمی در سالزبورگ",
    titleDe: "Niederlassungsbewilligung – Künstler (Bildende Kunst)",
    applicantProfile: "هنرمند نقاش با سوابق نمایشگاه‌های انفرادی در اروپا و گالری‌های هنری معتبر",
    authority: "Bezirkshauptmannschaft Salzburg-Stadt",
    state: "Salzburg",
    issueDate: "۲۰۲۳/۱۰/۰۵",
    validity: "۱ ساله (تا ۲۰۲۴/۱۰/۰۴)",
    caseRef: "SBG-KUNST-2023-0491-GALLERY",
    workPermitClause: "خلق آثار تجسمی و فروش تابلوها و آثار هنری",
    legalParagraph: "§ 43a NAG iVm Gutachten der Kunstuniversität",
    badgeHighlight: "معافیت کامل از الزام حداقل حقوق قانون کارگری به دلیل ماهیت فریلنسری هنر",
    mrz1: "ARAUTS8190234K1IRN8806143M2410048<<<<<<<<<<<<<<07",
    mrz2: "RABBANI<<SOHRAB<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "artist",
    holderMasked: "RABBANI, S***B",
    dobMasked: "14.06.1988",
    cardNoMasked: "S8190234K",
    keyConditions: [
      "رزومه مستند هنری (Portfolio)، کاتالوگ نمایشگاه‌ها و نقدهای مطبوعاتی معتبر",
      "گواهی مثبت کارشناسی از دانشگاه‌های هنر اتریش (Universität für angewandte Kunst)",
      "اجاره‌نامه رسمی آتلیه یا کارگاه هنری و منزل در سالزبورگ"
    ],
    anatomyTips: [
      { label: "بدون نیاز به آزمون بازار کار AMS", desc: "برخلاف ویزای کاری، نیازی به اثبات نبود کارمند اتریشی برای خلق هنر نیست." },
      { label: "عدم نیاز به اسپانسر شرکتی", desc: "هنرمند شخصاً متقاضی کارت خود است و نیازی به شرکت ثبت شده ندارد." }
    ]
  },
  {
    id: "artist-sample-3-theatre-actor",
    methodKey: "artist",
    methodTitleFa: "مجوز اقامت هنرمندان",
    cardTypeFa: "مجوز اقامت هنرمند (وابسته قراردادی)",
    titleFa: "کارت اقامت بازیگر تئاتر و اپرا با قرارداد رسمی تالار شهر گراتس",
    titleDe: "Niederlassungsbewilligung – Künstler (Unselbständige Erwerbstätigkeit)",
    applicantProfile: "بازیگر تئاتر و تئاتر موزیکال با قرارداد فصلی با اپرای اشتایرمارک (Oper Graz)",
    authority: "Amt der Steiermärkischen Landesregierung (Graz)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۱/۲۰",
    validity: "۱ ساله (تا ۲۰۲۵/۰۱/۱۹)",
    caseRef: "STMK-ART-2024-0033-THEATRE",
    workPermitClause: "فعالیت هنری قراردادی برای موسسه فرهنگی مشخص",
    legalParagraph: "§ 43a Abs 2 NAG iVm § 12d AuslBG",
    badgeHighlight: "امکان همراهی سریع اعضای خانواده همزمان با پرونده هنرمند",
    mrz1: "ARAUTG2209183K5IRN9509172M2501193<<<<<<<<<<<<<<02",
    mrz2: "AFSHAR<<DANIYAL<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "artist",
    holderMasked: "AFSHAR, D***L",
    dobMasked: "17.09.1995",
    cardNoMasked: "G2209183K",
    keyConditions: [
      "قرارداد رسمی استخدام با تئاتر، اپرا یا خانه فرهنگی دولتی اتریش",
      "تایید دستمزد ماهانه بر اساس قرارداد جمعی کارکنان تئاتر (Kollektivvertrag)",
      "بیمه درمانی کارمندی از طریق سازمان تامین اجتماعی اتریش"
    ],
    anatomyTips: [
      { label: "هنرمند وابسته (Unselbständig)", desc: "مالیات و بیمه توسط نهاد فرهنگی کسر شده و حقوق ثابت ماهانه واریز می‌شود." },
      { label: "پاداش‌های ماه ۱۳ و ۱۴", desc: "هنرمندان تحت استخدام مشمول عیدی تابستانه و زمستانه (Urlaubsgeld/Weihnachtsgeld) هستند." }
    ]
  },
  {
    id: "artist-sample-4-photographer-filmmaker",
    methodKey: "artist",
    methodTitleFa: "مجوز اقامت هنرمندان",
    cardTypeFa: "مجوز اقامت هنرمند (سینما و عکاسی)",
    titleFa: "کارت اقامت هنرمند کارگردان مستند و عکاس بین‌المللی در تیرول",
    titleDe: "Niederlassungsbewilligung – Künstler (Dokumentarfilm & Fotografie)",
    applicantProfile: "کارگردان و عکاس مستند با جایزه از فستیوال‌های اروپایی و پروژه عکاسی کوهستان آلپ",
    authority: "Bezirkshauptmannschaft Kitzbühel (Tirol)",
    state: "Tirol",
    issueDate: "۲۰۲۳/۰۹/۱۴",
    validity: "۱ ساله (تا ۲۰۲۴/۰۹/۱۳)",
    caseRef: "TIR-KUNST-2023-0182-FILM",
    workPermitClause: "پروژه‌های فیلم‌سازی مستند و عکاسی حرفه‌ای در قلمرو اتریش",
    legalParagraph: "§ 43a NAG (Künstlerische Filmprojekte)",
    badgeHighlight: "همکاری با بنیاد فیلم تیرول (Cine Tirol Film Commission)",
    mrz1: "ARAUTI7710294K2IRN8905209M2409137<<<<<<<<<<<<<<06",
    mrz2: "MANSOURI<<BABAK<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "artist",
    holderMasked: "MANSOURI, B***K",
    dobMasked: "20.05.1989",
    cardNoMasked: "I7710294K",
    keyConditions: [
      "معرفی‌نامه از شرکت‌های پخش یا فستیوال‌های فیلم اتریش",
      "حساب بانکی با موجودی کافی جهت پوشش هزینه‌های تولید و معیشت",
      "تایید صلاحیت اصالت هنری توسط هیئت کارشناسان فرهنگی تیرول"
    ],
    anatomyTips: [
      { label: "تسهیل سفرهای تصویربرداری شنگن", desc: "تردد آزادانه در کل اتحادیه بدون نیاز به ویزای جدید برای پروژه‌های برون‌مرزی." },
      { label: "تمدید دو ساله در مرحله دوم", desc: "پس از دو سال تمدید موفق سالانه، کارت بعدی می‌تواند برای مدت ۲ سال صادر گردد." }
    ]
  },

  // =========================================================================
  // METHOD 4: 💼 کارت قرمز-سفید-قرمز برای "کارگران کلیدی خوداشتغال" (Self-employed Key Workers) - 4 نمونه
  // =========================================================================
  {
    id: "selfemployed-sample-1-export-import",
    methodKey: "self-employed-key",
    methodTitleFa: "کارگران کلیدی خوداشتغال (RWR)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (خوداشتغال کلیدی)",
    titleFa: "کارت اقامت RWR تاسیس شرکت بازرگانی بین‌المللی تجهیزات پزشکی در وین",
    titleDe: "Rot-Weiß-Rot – Karte für selbständige Schlüsselkräfte (§ 24 AuslBG)",
    applicantProfile: "مدیر عامل با انتقال سرمایه ۱۲۰٬۰۰۰ یورو و راه‌اندازی خط زنجیره تامین دارو و کیت‌های تشخیصی",
    authority: "MA 35 Wien + AMS Wien Landesgeschäftsstelle",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۲/۰۵",
    validity: "۲ ساله (تا ۲۰۲۶/۰۲/۰۴)",
    caseRef: "MA35-RWR-SELBST/2024-0091",
    workPermitClause: "اداره شرکت بازرگانی به عنوان مدیرعامل و سهامدار عمده (Geschäftsführer)",
    legalParagraph: "§ 41 Abs 2 NAG iVm § 24 AuslBG",
    badgeHighlight: "تایید اثر مثبت کلان اقتصادی برای اتریش در گزارش جامع اداره کار AMS",
    mrz1: "ARAUTW6610928S3IRN8301194M2602048<<<<<<<<<<<<<<05",
    mrz2: "BAHRAMI<<CYRUS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "BAHRAMI, C***S",
    dobMasked: "19.01.1983",
    cardNoMasked: "W6610928S",
    keyConditions: [
      "انتقال سرمایه پایدار حداقل ۱۰۰٬۰۰۰ یورو به اقتصاد اتریش",
      "ایجاد یا تثبیت مشاغل جدید برای افراد مقیم اتریش",
      "ارائه بیزنس‌پلان دقیق و ارزیابی اقتصادی مثبت توسط AMS اتریش",
      "عدم وجود وابستگی به استخدام توسط اشخاص ثالث"
    ],
    anatomyTips: [
      { label: "ارزیابی کلان AMS (Volkswirtschaftlicher Nutzen)", desc: "برخلاف استارتاپ، در این روش حجم سرمایه، انتقال دانش فنی و اشتغال‌زایی ملاک اصلی است." },
      { label: "مدیرعاملی رسمی شرکت GmbH", desc: "دارنده کارت شخصاً مدیرعامل ثبت‌شده در دادگاه ثبت شرکت‌ها (Firmenbuch) خواهد بود." }
    ]
  },
  {
    id: "selfemployed-sample-2-engineering-linz",
    methodKey: "self-employed-key",
    methodTitleFa: "کارگران کلیدی خوداشتغال (RWR)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (خوداشتغال کلیدی)",
    titleFa: "کارت RWR شرکت مهندسی اتوماسیون صنعتی و رباتیک در اوبراسترایش",
    titleDe: "Rot-Weiß-Rot – Karte für selbständige Schlüsselkräfte (Industrie)",
    applicantProfile: "مهندس کنترل و اتوماسیون با ثبت شرکت مهندسی و قرارداد همکاری با صنایع فولاد لینتس",
    authority: "Landeshauptmann von Oberösterreich (Linz)",
    state: "Oberösterreich",
    issueDate: "۲۰۲۳/۱۱/۲۰",
    validity: "۲ ساله (تا ۲۰۲۵/۱۱/۱۹)",
    caseRef: "OOE-SELBST-2023-8812-ROBOTICS",
    workPermitClause: "مدیریت دفتر مهندسی و مشاوره اتوماسیون صنعتی",
    legalParagraph: "§ 24 AuslBG (Transfer von Know-how)",
    badgeHighlight: "انتقال دانش فنی پیشرفته رباتیک با سرمایه‌گذاری اولیه ۱۵۰K یورو",
    mrz1: "ARAUTL4419203S7IRN8504102M2511196<<<<<<<<<<<<<<02",
    mrz2: "DADGAR<<HAMID<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "DADGAR, H***D",
    dobMasked: "10.04.1985",
    cardNoMasked: "L4419203S",
    keyConditions: [
      "تاییدیه انتقال دانش نوین (Transfer von Know-how) به منطقه صنعتی لینتس",
      "پیش‌قراردادهای مشاوره B2B با کارخانجات معتبر اتریشی",
      "اجاره دفتر کار تجاری رسمی و بیمه تجاری SVS"
    ],
    anatomyTips: [
      { label: "تسهیل ویزای خانواده", desc: "همسر و فرزندان متقاضی همزمان کارت RWR Plus با حق اشتغال آزاد دریافت می‌کنند." },
      { label: "تمدید به کارت Plus", desc: "پس از ۲ سال فعالیت تجاری موفق و سوددهی، متقاضی کارت RWR Plus سه ساله دریافت می‌کند." }
    ]
  },
  {
    id: "selfemployed-sample-3-health-clinic",
    methodKey: "self-employed-key",
    methodTitleFa: "کارگران کلیدی خوداشتغال (RWR)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (خوداشتغال کلیدی)",
    titleFa: "کارت RWR تاسیس مرکز فیزیوتراپی و توانبخشی مدرن در گراتس",
    titleDe: "Rot-Weiß-Rot – Karte selbständige Schlüsselkraft (Gesundheit)",
    applicantProfile: "پزشک و سرمایه‌گذار در بخش درمان با ایجاد مرکز فیزیوتراپی و استخدام ۴ کادر درمانی محلی",
    authority: "Amt der Steiermärkischen Landesregierung (Graz)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۱/۱۱",
    validity: "۲ ساله (تا ۲۰۲۶/۰۱/۱۰)",
    caseRef: "STMK-SELBST-2024-0104-CLINIC",
    workPermitClause: "مدیریت موسسه خدمات سلامت و درمان توانبخشی",
    legalParagraph: "§ 24 AuslBG (Schaffung neuer Arbeitsplätze)",
    badgeHighlight: "ایجاد ۴ شغل مستقیم برای پرستاران و فیزیوتراپ‌های اتریشی",
    mrz1: "ARAUTG7719024S9IRN8112056M2601103<<<<<<<<<<<<<<08",
    mrz2: "JALILI<<MAHMOUD<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "JALILI, M***D",
    dobMasked: "05.12.1981",
    cardNoMasked: "G7719024S",
    keyConditions: [
      "کسب مجوزهای بهداشتی و درمانی از سازمان نظام پزشکی یا وزارت بهداشت اتریش",
      "تامین تجهیزات پیشرفته پزشکی وارداتی با گواهینامه CE اروپا",
      "گزارش رضایت‌بخش مالیاتی از سازمان امور مالیاتی اتریش (Finanzamt)"
    ],
    anatomyTips: [
      { label: "اهمیت حفظ پرسنل اتریشی", desc: "تعهد ایجاد شغل باید حداقل در طول دو سال اعتبار کارت حفظ گردد." },
      { label: "امکان شراکت با اتریشی‌ها", desc: "متقاضی می‌تواند سهامدار حداکثری باشد و مدیر فنی اتریشی استخدام نماید." }
    ]
  },
  {
    id: "selfemployed-sample-4-consulting-tirol",
    methodKey: "self-employed-key",
    methodTitleFa: "کارگران کلیدی خوداشتغال (RWR)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (خوداشتغال کلیدی)",
    titleFa: "کارت RWR شرکت مشاوره سرمایه‌گذاری بین‌المللی و املاک تجاری در اینسبروک",
    titleDe: "Rot-Weiß-Rot – Karte selbständige Schlüsselkraft (Investments)",
    applicantProfile: "متخصص ارشد تامین مالی پروژه با جذب سرمایه‌گذاران خارجی در زیرساخت‌های هتلداری اتریش",
    authority: "Bezirkshauptmannschaft Innsbruck-Land",
    state: "Tirol",
    issueDate: "۲۰۲۳/۱۰/۱۵",
    validity: "۲ ساله (تا ۲۰۲۵/۱۰/۱۴)",
    caseRef: "TIR-SELBST-2023-0982-FINANCE",
    workPermitClause: "مشاوره اقتصادی و مدیریت دارایی‌های ثبت‌شده",
    legalParagraph: "§ 41 Abs 2 NAG iVm § 24 AuslBG",
    badgeHighlight: "جذب سرمایه خارجی بیش از ۵۰۰K یورو برای پروژه‌های هتلداری تیرول",
    mrz1: "ARAUTI1109284S2IRN8008149M2510144<<<<<<<<<<<<<<01",
    mrz2: "SADR<<HASSAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "SADR, H***N",
    dobMasked: "14.08.1980",
    cardNoMasked: "I1109284S",
    keyConditions: [
      "اثبات گردش مالی شفاف و منشا قانونی تمامی سرمایه‌ها",
      "ثبت رسمی در اتاق بازرگانی تیرول (WKO) رسته خدمات مالی",
      "تاییدیه معتبر عدم بدهی مالیاتی و تامین اجتماعی"
    ],
    anatomyTips: [
      { label: "عدم نیاز به سیستم امتیازبندی", desc: "خوداشتغالی کلیدی نیازی به جدول امتیازات ندارد؛ تاییدیه کیفی AMS ملاک است." },
      { label: "پوشش سراسری در اتریش", desc: "با ثبت شرکت در یک ایالت، امکان افتتاح شعب در وین یا سالزبورگ فراهم است." }
    ]
  },

  // =========================================================================
  // METHOD 5: 👨‍👩‍👧‍👦 پیوستن به خانواده (Family Reunification) - 4 نمونه
  // =========================================================================
  {
    id: "family-sample-1-spouse-rwr",
    methodKey: "family",
    methodTitleFa: "پیوستن به خانواده (الحاق همسر)",
    cardTypeFa: "کارت قرمز-سفید-قرمز پلاس (همسر)",
    titleFa: "کارت RWR Plus همسر مهندس شاغل با حق کار کاملاً آزاد در وین",
    titleDe: "Rot-Weiß-Rot – Karte Plus für Familienangehörige (§ 46 NAG)",
    applicantProfile: "همسر دارنده کارت RWR با مدرک لیسانس و مدرک زبان آلمانی A1",
    authority: "MA 35 Wien - Referat Familienzusammenführung",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۳/۲۰",
    validity: "هم‌زمان با انقضای کارت همسر (تا ۲۰۲۶/۰۳/۱۹)",
    caseRef: "MA35-FAM/2024-81920-PLUS",
    workPermitClause: "دسترسی ۱۰۰٪ آزاد به بازار کار اتریش بدون نیاز به مجوز کارفرما",
    legalParagraph: "§ 46 Abs 1 NAG (Familienangehörige von RWR-Inhabern)",
    badgeHighlight: "معافیت کامل از سهمیه اقامتی و حق اشتغال آزاد از روز نخست ورود",
    mrz1: "ARAUTW5190283P8IRN9405204F2603192<<<<<<<<<<<<<<07",
    mrz2: "MORADI<<ELHAM<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "family",
    holderMasked: "MORADI, E***M",
    dobMasked: "20.05.1994",
    cardNoMasked: "W5190283P",
    keyConditions: [
      "داشتن کارت معتبر RWR، کارت آبی یا RWR Plus توسط همسر سرپرست",
      "سند ازدواج رسمی ترجمه شده با تاییدات سفارت اتریش در تهران",
      "مدرک زبان آلمانی سطح A1 در زمان ثبت درخواست اولیه در سفارت",
      "مسکن متناسب با ابعاد خانوار و درآمد خانواده بالاتر از حداقل نرخ مصوب ASVG"
    ],
    anatomyTips: [
      { label: "کلمه PLUS روی کارت همسر", desc: "همسر دارنده RWR حتی اگر خودش سابقه کاری نداشته باشد مستقیماً کارت Plus دریافت می‌کند." },
      { label: "کار در هر حوزه دلخواه", desc: "همسر می‌تواند استخدام شرکت شود یا کسب‌وکار خود را بدون مانع اداری راه‌اندازی کند." }
    ]
  },
  {
    id: "family-sample-2-child-reunification",
    methodKey: "family",
    methodTitleFa: "پیوستن به خانواده (الحاق فرزند)",
    cardTypeFa: "کارت قرمز-سفید-قرمز پلاس (فرزند زیر ۱۸ سال)",
    titleFa: "کارت اقامت RWR Plus فرزند دانش‌آموز در اوبراسترایش (لینتس)",
    titleDe: "Rot-Weiß-Rot – Karte Plus für minderjährige Kinder (§ 46 NAG)",
    applicantProfile: "فرزند ۱۱ ساله مهندس ارشد شاغل در لینتس، ثبت‌نام شده در مدرسه دولتی اتریش",
    authority: "Landeshauptmann von Oberösterreich (Linz)",
    state: "Oberösterreich",
    issueDate: "۲۰۲۳/۱۲/۱۵",
    validity: "تا ۲۰۲۵/۱۲/۱۴",
    caseRef: "OOE-FAM-2023-3190-KIND",
    workPermitClause: "تحصیل در مدارس اتریش + بیمه درمانی تحت تکفل والدین (Mitversicherung)",
    legalParagraph: "§ 46 Abs 1 NAG iVm § 2 Abs 1 Z 9 NAG",
    badgeHighlight: "معافیت کامل کودکان زیر ۱۴ سال از هرگونه مدرک زبان آلمانی ورودی",
    mrz1: "ARAUTL1192847P3IRN1308151M2512146<<<<<<<<<<<<<<02",
    mrz2: "REZAEI<<KIAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "family",
    holderMasked: "REZAEI, K***N",
    dobMasked: "15.08.2013",
    cardNoMasked: "L1192847P",
    keyConditions: [
      "سن زیر ۱۸ سال در زمان ثبت درخواست و مجرد بودن فرزند",
      "شناسنامه رسمی ترجمه شده با تاییدیه دادگستری و وزارت خارجه و سفارت",
      "پوشش رایگان بیمه سلامت تحت پرونده پدر یا مادر در سازمان بیمه ÖGK"
    ],
    anatomyTips: [
      { label: "تحصیل رایگان", desc: "حق تحصیل در کلیه مدارس دولتی اتریش و دریافت کمک‌هزینه فرزند (Familienbeihilfe)." },
      { label: "عدم نیاز به اثر انگشت برای کودکان خردسال", desc: "کودکان زیر ۶ سال از ثبت بیومتریک اثر انگشت معاف هستند." }
    ]
  },
  {
    id: "family-sample-3-bluecard-spouse",
    methodKey: "family",
    methodTitleFa: "پیوستن به خانواده (همسر دارنده کارت آبی)",
    cardTypeFa: "کارت قرمز-سفید-قرمز پلاس (همسر بلوکارت)",
    titleFa: "کارت اقامت RWR Plus همسر پزشک دارنده کارت آبی اتحادیه اروپا در گراتس",
    titleDe: "Rot-Weiß-Rot – Karte Plus (Familie von Blaue-Karte-Inhabern)",
    applicantProfile: "همسر پزشک متخصص با ویزای ورود سریع الحاق خانواده از سفارت تهران",
    authority: "Amt der Steiermärkischen Landesregierung (Graz)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۱/۱۸",
    validity: "۲ ساله (تا ۲۰۲۶/۰۱/۱۷)",
    caseRef: "STMK-FAM-2024-0092-BLUECARD",
    workPermitClause: "اشتغال ۱۰۰٪ آزاد در سراسر بازار کار بدون نیاز به کارفرمای مشخص",
    legalParagraph: "§ 46 Abs 1 Z 2 NAG iVm Richtlinie 2009/50/EG",
    badgeHighlight: "تسریع فرآیند ویزای ورود در سفارت تهران در کمتر از ۲ ماه",
    mrz1: "ARAUTG8810293P4IRN9102187F2601173<<<<<<<<<<<<<<05",
    mrz2: "DAVOODI<<MARYAM<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "family",
    holderMasked: "DAVOODI, M***M",
    dobMasked: "18.02.1991",
    cardNoMasked: "G8810293P",
    keyConditions: [
      "داشتن کارت آبی اتحادیه اروپا توسط متقاضی اصلی",
      "گواهی تمکن مالی بر مبنای فیش حقوقی همسر بدون نیاز به سپرده اضافی",
      "گواهی سلامت و بیمه درمانی اتریش"
    ],
    anatomyTips: [
      { label: "حق کار مستقل و استخدامی", desc: "همسر می‌تواند در شرکت‌های فناوری، دانشگاه‌ها یا کارهای پروژه‌ای فریلنسری مشغول شود." },
      { label: "امکان خروج از شنگن", desc: "امکان سفر تا ۶ ماه در سال بدون به خطر افتادن وضعیت اقامت." }
    ]
  },
  {
    id: "family-sample-4-austrian-citizen-spouse",
    methodKey: "family",
    methodTitleFa: "پیوستن به خانواده (همسر شهروند اتریش)",
    cardTypeFa: "کارت اقامت پیوست به شهروند اتریش (Familienangehöriger)",
    titleFa: "کارت اقامت همسر شهروند اتریش در سالزبورگ",
    titleDe: "Aufenthaltstitel »Familienangehöriger« gem. § 47 NAG",
    applicantProfile: "همسر ایرانی یک تبعه اتریشی پس از ثبت ازدواج رسمی در اتریش",
    authority: "Bezirkshauptmannschaft Salzburg-Umgebung",
    state: "Salzburg",
    issueDate: "۲۰۲۳/۰۸/۲۲",
    validity: "۱ ساله (بار اول) سپس ۳ ساله (تا ۲۰۲۴/۰۸/۲۱)",
    caseRef: "BHS-FAM-2023-1192-AUSTRIAN",
    workPermitClause: "آزادی کامل اشتغال، تجارت و خدمات دولتی",
    legalParagraph: "§ 47 Abs 1 NAG (Zusammenführung mit Österreichern)",
    badgeHighlight: "مسیر سریع به تابعیت و پاسپورت اتریش تنها پس از ۶ سال ازدواج پایدار",
    mrz1: "ARAUTS3301928F6IRN9304118F2408219<<<<<<<<<<<<<<03",
    mrz2: "MOHSENI<<NEDA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "family",
    holderMasked: "MOHSENI, N***A",
    dobMasked: "11.04.1993",
    cardNoMasked: "S3301928F",
    keyConditions: [
      "سند ازدواج رسمی اتریشی (Heiratsurkunde) صادره از Standesamt",
      "مدرک زبان آلمانی A1 با اعتبار انستیتو گوته یا ÖSD",
      "اثبات رابطه و زندگی مشترک واقعی در آدرس ثبت شده (Meldezettel)"
    ],
    anatomyTips: [
      { label: "عنوان Familienangehöriger", desc: "این عنوان نشان‌دهنده نسبت درجه یک با تبعه اتریش است و حقوق ارتقایافته دارد." },
      { label: "تمدید ۳ ساله در مرحله دوم", desc: "پس از گذشت ۱ سال نخست، تمدید بعدی مستقیم به مدت ۳ سال انجام می‌گردد." }
    ]
  },

  // =========================================================================
  // METHOD 6: 🎓 مجوز اقامت: مجوز اقامت موقت - دانشجو (Aufenthaltsbewilligung – Student) - 4 نمونه
  // =========================================================================
  {
    id: "student-sample-1-uni-wien-master",
    methodKey: "student",
    methodTitleFa: "مجوز اقامت دانشجویی",
    cardTypeFa: "مجوز اقامت موقت - دانشجو (کارشناسی ارشد)",
    titleFa: "کارت اقامت دانشجویی کارشناسی ارشد علوم کامپیوتر دانشگاه وین",
    titleDe: "Aufenthaltsbewilligung »Student« (Universität Wien Master)",
    applicantProfile: "دانشجوی مقطع کارشناسی ارشد دانشگاه وین با ۲۰ ساعت حق اشتغال قانونی",
    authority: "MA 35 Wien - Referat 1.2 Universitäten",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۹/۰۱",
    validity: "۱ ساله (تا ۲۰۲۵/۰۹/۰۱ - تمدید سالانه)",
    caseRef: "MA35-STU/2024-55410-UNIWIEN",
    workPermitClause: "اشتغال غیرمستقل تا سقف ۲۰ ساعت در هفته مجاز است",
    legalParagraph: "§ 64 NAG (Aufenthaltsbewilligung Student)",
    badgeHighlight: "تمدید آسان سالانه با کسب حداقل ۱۶ واحد ECTS در سال",
    mrz1: "ARAUTW4829103S1IRN0105037M2509018<<<<<<<<<<<<<<04",
    mrz2: "HOSSEINI<<POUYA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "student",
    holderMasked: "HOSSEINI, P***A",
    dobMasked: "03.05.2001",
    cardNoMasked: "W4829103S",
    keyConditions: [
      "برگه پذیرش قطعی یا مشروط از دانشگاه دولتی وین (Zulassungsbescheid)",
      "اثبات تمکن مالی برای یک سال زندگی در حساب بانکی شخصی در اتریش",
      "قرارداد رسمی خوابگاه دانشجویی یا اجاره مسکن تایید شده (Wohnrechtsvereinbarung)",
      "بیمه درمانی دانشجویی دولتی اتریش با هزینه بسیار پایین ماهانه (ÖGK Selbstversicherung)"
    ],
    anatomyTips: [
      { label: "کار دانشجویی ۲۰ ساعته", desc: "امکان کار پاره‌وقت در شرکت‌های نرم‌افزاری یا رستوران‌ها با حداقل دستمزد قانون کار." },
      { label: "کارت تخفیف دانشجویی", desc: "امکان دریافت بلیت ارزان حمل و نقل عمومی دانشجویی و بلیت سراسری KlimaTicket." }
    ]
  },
  {
    id: "student-sample-2-tu-graz-bachelor",
    methodKey: "student",
    methodTitleFa: "مجوز اقامت دانشجویی",
    cardTypeFa: "مجوز اقامت موقت - دانشجو (کارشناسی)",
    titleFa: "کارت اقامت دانشجویی مهندسی مکانیک دانشگاه صنعتی گراتس (TU Graz)",
    titleDe: "Aufenthaltsbewilligung »Student« (TU Graz Bachelor)",
    applicantProfile: "دانشجوی کارشناسی مهندسی با پذیرش مستقیم از دانشگاه صنعتی گراتس در اشتایرمارک",
    authority: "Amt der Steiermärkischen Landesregierung (Graz)",
    state: "Steiermark",
    issueDate: "۲۰۲۳/۱۰/۱۵",
    validity: "۱ ساله (تا ۲۰۲۴/۱۰/۱۴)",
    caseRef: "STMK-STU-2023-0914-TUGRAZ",
    workPermitClause: "کار دانشجویی تا ۲۰ ساعت هفتگی با تاییدیه کارفرما",
    legalParagraph: "§ 64 NAG iVm § 4b AuslBG",
    badgeHighlight: "استفاده از خوابگاه مدرن دانشجویی OeAD با قرارداد رسمی",
    mrz1: "ARAUTG7190283S4IRN0203119M2410143<<<<<<<<<<<<<<01",
    mrz2: "KAZEMPOUR<<SINA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "student",
    holderMasked: "KAZEMPOUR, S***A",
    dobMasked: "11.03.2002",
    cardNoMasked: "G7190283S",
    keyConditions: [
      "ثبت‌نام ترمی به عنوان دانشجوی رسمی (Ordentlicher Hörer)",
      "پرداخت شهریه دانشجویان بین‌المللی حدود ۷۶۳ یورو در هر ترم",
      "گزارش پیشرفت تحصیلی با حداقل ۸ ساعت درس ترمیک برای تمدید"
    ],
    anatomyTips: [
      { label: "تبدیل پس از فارغ‌التحصیلی", desc: "پس از اتمام دوره، ۱۲ ماه مهلت کاریابی و تبدیل مستقیم به کارت RWR Plus آزاد وجود دارد." },
      { label: "تردد شنگن برای کارآموزی", desc: "حق شرکت در دوره‌های کارآموزی اراسموس در سراسر اتحادیه اروپا." }
    ]
  },
  {
    id: "student-sample-3-vwu-language-course",
    methodKey: "student",
    methodTitleFa: "مجوز اقامت دانشجویی",
    cardTypeFa: "مجوز اقامت موقت - دانشجو (کالج زبان VWU)",
    titleFa: "کارت اقامت دانشجویی دوره مقدماتی کالج زبان اتریش (Vorstudienlehrgang)",
    titleDe: "Aufenthaltsbewilligung »Student« (Außerordentlicher Hörer VWU)",
    applicantProfile: "دانشجوی ورودی دوره زبان آلمانی جهت آمادگی ورود به دانشکده داروسازی وین",
    authority: "MA 35 Wien - Referat Universitäten",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۲/۰۱",
    validity: "۱ ساله (تا ۲۰۲۵/۰۲/۰۱)",
    caseRef: "MA35-VWU/2024-00192-SPRACHE",
    workPermitClause: "دانشجوی غیررسمی کالج با حق اشتغال دانشجویی",
    legalParagraph: "§ 64 Abs 1 NAG (Vorstudienlehrgang der Wiener Universitäten)",
    badgeHighlight: "دریافت کارت اقامت رسمی اتریش از روز اول حتی با مدرک زبان A2",
    mrz1: "ARAUTW8819203S6IRN0307185F2502014<<<<<<<<<<<<<<09",
    mrz2: "MIRZAEI<<MARYAM<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "student",
    holderMasked: "MIRZAEI, M***M",
    dobMasked: "18.07.2003",
    cardNoMasked: "W8819203S",
    keyConditions: [
      "پذیرش مشروط به زبان از یکی از دانشگاه‌های دولتی وین",
      "ثبت‌نام رسمی در کالج زبان وابسته به دانشگاه‌های وین (VWU)",
      "حضور منظم در کلاس‌های ترمی کالج و آزمون پایانی EPD"
    ],
    anatomyTips: [
      { label: "همان کارت اقامت دانشگاهی", desc: "کارت اقامت دوره زبان دقیقاً کارت Aufenthaltsbewilligung Student است و فرقی با دانشگاه ندارد." },
      { label: "مهلت ۴ ترمه کالج", desc: "دانشجو تا ۴ ترم فرصت دارد مدرک زبان C1 یا آزمون EPD را با موفقیت پاس کند." }
    ]
  },
  {
    id: "student-sample-4-meduni-innsbruck-phd",
    methodKey: "student",
    methodTitleFa: "مجوز اقامت دانشجویی",
    cardTypeFa: "مجوز اقامت موقت - دانشجو (دکترای پزشکی)",
    titleFa: "کارت اقامت دانشجویی دکترای تخصصی دانشگاه علوم پزشکی اینسبروک",
    titleDe: "Aufenthaltsbewilligung »Student« (Medizinische Universität Innsbruck)",
    applicantProfile: "پژوهشگر دکترای علوم اعصاب با بورسیه پژوهشی در ایالت تیرول",
    authority: "Bezirkshauptmannschaft Innsbruck-Stadt",
    state: "Tirol",
    issueDate: "۲۰۲۳/۱۱/۱۰",
    validity: "۱ ساله (تا ۲۰۲۴/۱۱/۰۹)",
    caseRef: "TIR-STU-2023-0481-MEDUNI",
    workPermitClause: "پژوهش علمی و قرارداد کاری تحقیقاتی نیمه‌وقت",
    legalParagraph: "§ 64 NAG iVm Universitätsgesetz 2002",
    badgeHighlight: "معافیت کامل از شهریه ترمیک به دلیل دستیاری پژوهشی دانشگاه",
    mrz1: "ARAUTI4410294S8IRN9604121M2411095<<<<<<<<<<<<<<02",
    mrz2: "KARIMI<<FARZIN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "student",
    holderMasked: "KARIMI, F***N",
    dobMasked: "12.04.1996",
    cardNoMasked: "I4410294S",
    keyConditions: [
      "قرارداد استاد راهنما و تاییدیه موضوع پایان‌نامه دکترا (Dissertationsvereinbarung)",
      "اثبات فاند دانشگاهی یا تمکن مالی کافی شخصی",
      "بیمه کامل درمانی بیمارستان‌های دانشگاهی"
    ],
    anatomyTips: [
      { label: "همراهی همسر با کارت RWR Plus", desc: "دانشجویان دکترا که قرارداد پژوهشی دارند می‌توانند خانواده را به راحتی ملحق کنند." },
      { label: "محاسبه سابقه جهت اقامت دائم", desc: "نیمی از سال‌های اقامت دانشجویی برای درخواست کارت اقامت دائم ۵ ساله محاسبه می‌شود." }
    ]
  },

  // =========================================================================
  // METHOD 7: 💎 کارت دریافتی: اتریش کارت آبی اتحادیه اروپا (Blaue Karte EU) - 4 نمونه
  // =========================================================================
  {
    id: "bluecard-sample-1-vienna-cloud-architect",
    methodKey: "blue-card",
    methodTitleFa: "کارت آبی اتحادیه اروپا",
    cardTypeFa: "کارت آبی اروپا (Blaue Karte EU)",
    titleFa: "کارت آبی اتحادیه اروپا معمار ارشد رایانش ابری در بانک وین",
    titleDe: "Blaue Karte EU gem. § 42 NAG (Cloud Solution Architect)",
    applicantProfile: "متخصص ارشد زیرساخت با مدرک فوق‌لیسانس و قرارداد حقوق سالانه ۷۲٬۰۰۰ یورو در وین",
    authority: "MA 35 Wien + AMS Wien",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۲/۱۵",
    validity: "۲ ساله (تا ۲۰۲۶/۰۲/۱۴)",
    caseRef: "MA35-BC/2024-00129-BANK",
    workPermitClause: "اشتغال تخصصی در شرکت استخدام‌کننده مطابق قانون AuslBG",
    legalParagraph: "§ 42 NAG iVm § 12c AuslBG",
    badgeHighlight: "حقوق قراردادی بالاتر از حد آستانه درآمدی اتحادیه اروپا با مزایای انتقال شنگن",
    mrz1: "ARAUTW9910283B4IRN8809183M2602148<<<<<<<<<<<<<<01",
    mrz2: "DAVOODI<<NIMA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "blue-card",
    holderMasked: "DAVOODI, N***A",
    dobMasked: "18.09.1988",
    cardNoMasked: "W9910283B",
    keyConditions: [
      "مدرک دانشگاهی حداقل کارشناسی معتبر یا معادل ۵ سال تجربه کاری اثبات‌شده",
      "قرارداد کاری حداقل ۶ ماهه با حداقل حقوق تعیین‌شده در قانون کارت آبی (حدود ۴۵K تا ۵۵K یورو سالانه)",
      "تاییدیه اولیه اداره کار اتریش (AMS) بدون نیاز به آزمون وقت‌گیر بازار کار"
    ],
    anatomyTips: [
      { label: "طراحی ویژه کارت آبی اروپایی", desc: "کارت دارای پس‌زمینه آبی متمایز با نماد رسمی پرچم ستاره‌های اتحادیه اروپا است." },
      { label: "اقامت دائم در ۲۱ ماهگی", desc: "با ارائه مدرک زبان آلمانی B1 پس از کمتر از ۲ سال کارت اقامت دائم ۵ ساله صادر می‌شود." }
    ]
  },
  {
    id: "bluecard-sample-2-linz-hospital-doctor",
    methodKey: "blue-card",
    methodTitleFa: "کارت آبی اتحادیه اروپا",
    cardTypeFa: "کارت آبی اروپا (پزشک مقیم)",
    titleFa: "کارت آبی اتحادیه اروپا پزشک عمومی و دستیار تخصص در بیمارستان کپلر لینتس",
    titleDe: "Blaue Karte EU (Assistenzarzt am Kepler Universitätsklinikum)",
    applicantProfile: "پزشک با مدرک معادل‌سازی شده در نظام پزشکی اتریش (Nostrifizierung) و زبان آلمانی C1 پزشکی",
    authority: "Landeshauptmann von Oberösterreich (Linz)",
    state: "Oberösterreich",
    issueDate: "۲۰۲۳/۱۲/۰۱",
    validity: "۲ ساله (تا ۲۰۲۵/۱۱/۳۰)",
    caseRef: "OOE-BC-2023-7719-MED",
    workPermitClause: "طبابت و اشتغال به عنوان پزشک در بیمارستان‌های دولتی اتریش",
    legalParagraph: "§ 42 NAG (Ärztliche Tätigkeit iVm Ärztegesetz)",
    badgeHighlight: "استفاده از معافیت‌های ویژه کمبود شدید کادر درمان در استان اوبراسترایش",
    mrz1: "ARAUTL2291048B7IRN8906154M2511302<<<<<<<<<<<<<<05",
    mrz2: "ROUSTA<<PEYMAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "blue-card",
    holderMasked: "ROUSTA, P***N",
    dobMasked: "15.06.1989",
    cardNoMasked: "L2291048B",
    keyConditions: [
      "تاییدیه ارزشیابی مدرک پزشکی توسط یکی از دانشگاه‌های علوم پزشکی اتریش",
      "گواهی قبولی در آزمون تخصصی زبان پزشکی Fachsprachprüfung C1",
      "قرارداد استخدام رسمی با بیمارستان با حقوق پایه پزشکی اتریش"
    ],
    anatomyTips: [
      { label: "امنیت شغلی ممتاز", desc: "پزشکان دارای کارت آبی در صورت تغییر بخش یا بیمارستان به آسانی کارت خود را تمدید می‌کنند." },
      { label: "پیوست سریع اعضای خانواده", desc: "صدور همزمان کارت اقامت برای همسر و فرزندان در کوتاه‌ترین زمان اداری." }
    ]
  },
  {
    id: "bluecard-sample-3-graz-automotive-ai",
    methodKey: "blue-card",
    methodTitleFa: "کارت آبی اتحادیه اروپا",
    cardTypeFa: "کارت آبی اروپا (صنعت خودرو)",
    titleFa: "کارت آبی اروپا مهندس هوش مصنوعی خودروهای خودران در مگنا گراتس",
    titleDe: "Blaue Karte EU (Senior Autonomous Driving Engineer - Magna Steyr)",
    applicantProfile: "پژوهشگر ارشد بینایی ماشین با قرارداد صنعتی در خوشه خودروسازی اشتایرمارک",
    authority: "Amt der Steiermärkischen Landesregierung (Graz)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۱/۱۰",
    validity: "۲ ساله (تا ۲۰۲۶/۰۱/۰۹)",
    caseRef: "STMK-BC-2024-0044-MAGNA",
    workPermitClause: "فعالیت در پروژه‌های تحقیق و توسعه خودروهای خودران",
    legalParagraph: "§ 42 NAG iVm § 12c AuslBG",
    badgeHighlight: "دریافت کارت در کمتر از ۳ هفته با هماهنگی مستقیم واحد مهاجرت صنعتی",
    mrz1: "ARAUTG6619028B2IRN9201198M2601096<<<<<<<<<<<<<<03",
    mrz2: "YAZDANI<<ARASH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "blue-card",
    holderMasked: "YAZDANI, A***H",
    dobMasked: "19.01.1992",
    cardNoMasked: "G6619028B",
    keyConditions: [
      "مدرک کارشناسی ارشد مهندسی برق، کامپیوتر یا مکانیک",
      "حقوق سالانه بالاتر از حد نصاب کارت آبی اروپا (حداقل ۵۴K یورو)",
      "ثبت قرارداد با یکی از بزرگترین شرکت‌های صنعتی بین‌المللی اتریش"
    ],
    anatomyTips: [
      { label: "انتقال بین کشورهای اروپایی", desc: "پس از ۱۲ ماه کار در اتریش، دارنده می‌تواند به آلمان، هلند یا سوئد بدون ابطال سوابق مهاجرت کند." },
      { label: "معافیت از شرط زبان آلمانی در ابتدا", desc: "کارت آبی بر مبنای قرارداد انگلیسی صادر می‌شود و نیازی به مدرک آلمانی در ورود نیست." }
    ]
  },
  {
    id: "bluecard-sample-4-salzburg-supply-chain",
    methodKey: "blue-card",
    methodTitleFa: "کارت آبی اتحادیه اروپا",
    cardTypeFa: "کارت آبی اروپا (مدیریت لجستیک)",
    titleFa: "کارت آبی اتحادیه اروپا مدیر زنجیره تامین بین‌المللی در سالزبورگ",
    titleDe: "Blaue Karte EU (Head of Global Supply Chain Operations)",
    applicantProfile: "مدیر ارشد لجستیک با سابقه مدیریت هاب‌های کالایی اروپا در هلدینگ تجاری سالزبورگ",
    authority: "Bezirkshauptmannschaft Salzburg-Stadt",
    state: "Salzburg",
    issueDate: "۲۰۲۳/۰۹/۲۸",
    validity: "۲ ساله (تا ۲۰۲۵/۰۹/۲۷)",
    caseRef: "SBG-BC-2023-0912-LOGISTICS",
    workPermitClause: "مدیریت ارشد عملیات لجستیک و انبارداری منطقه‌ای",
    legalParagraph: "§ 42 NAG (Hochqualifizierte Führungskraft)",
    badgeHighlight: "امکان سفر تجاری نامحدود در سراسر ۲۹ کشور عضو منطقه شنگن",
    mrz1: "ARAUTS4419208B9IRN8603142F2509271<<<<<<<<<<<<<<08",
    mrz2: "ANVARI<<SANAZ<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "blue-card",
    holderMasked: "ANVARI, S***Z",
    dobMasked: "14.03.1986",
    cardNoMasked: "S4419208B",
    keyConditions: [
      "قرارداد کارشناسی با مسئولیت مدیریت تیم بین‌المللی",
      "بیمه درمانی تکمیلی و حقوق منطبق بر قانون کار فدرال اتریش",
      "ارائه تاییدیه عدم سوءپیشینه و گواهی سلامت"
    ],
    anatomyTips: [
      { label: "بیکاری موقت مجاز تا ۶ ماه", desc: "در صورت اتمام پروژه، دارنده تا ۶ ماه مهلت دارد در اتریش بماند و شغل جدید بیابد." },
      { label: "ارتقا سریع به RWR Plus", desc: "امکان تغییر به کارت قرمز-سفید-قرمز پلاس پس از ۲ سال کار قانونی." }
    ]
  },

  // =========================================================================
  // METHOD 8: ⚙️ برای کارمندان متخصص (Skilled Workers - Mangelberufe & Key Workers) - 4 نمونه
  // =========================================================================
  {
    id: "skilled-sample-1-mangelberuf-software",
    methodKey: "skilled-workers",
    methodTitleFa: "کارمندان متخصص و مشاغل کمبود نیرو",
    cardTypeFa: "کارت قرمز-سفید-قرمز (شغل کمبود نیرو)",
    titleFa: "کارت RWR توسعه‌دهنده نرم‌افزار فول‌استک (لیست رسمی مشاغل کمبود)",
    titleDe: "Rot-Weiß-Rot – Karte für Fachkräfte in Mangelberufen (§ 12a AuslBG)",
    applicantProfile: "برنامه‌نویس با مدرک دانشگاهی و کسب ۶۵ امتیاز در سیستم امتیازبندی مشاغل کمبود",
    authority: "MA 35 Wien + AMS Wien",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۳/۱۵",
    validity: "۲ ساله (تا ۲۰۲۶/۰۳/۱۴)",
    caseRef: "MA35-EWR/2024-98412-RWR",
    workPermitClause: "اشتغال به عنوان Software Engineer در شرکت استخدام‌کننده",
    legalParagraph: "§ 41 Abs 1 NAG iVm § 12a AuslBG",
    badgeHighlight: "کسب حداقل ۵۵ امتیاز مورد نیاز لیست مشاغل کمبود فدرال اتریش",
    mrz1: "ARAUTW8349102X9IRN9207144M2603140<<<<<<<<<<<<<<02",
    mrz2: "MORADI<<ARMIN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "MORADI, A***N",
    dobMasked: "14.07.1992",
    cardNoMasked: "W8349102X",
    keyConditions: [
      "عنوان شغلی منطبق بر لیست سالانه مشاغل با کمبود نیروی کار فدرال یا استانی (Bundesweite Mangelberufe)",
      "کسب حداقل ۵۵ امتیاز از جدول امتیازبندی تحصیلی، سابقه کار، زبان و سن",
      "قرارداد کاری با حداقل حقوق مصوب قانون کار جمعی اتریش (Kollektivvertrag)",
      "تاییدیه اولیه اداره کار اتریش (AMS Gutachten) بدون تست جایگزینی نیروی کار محلی"
    ],
    anatomyTips: [
      { label: "معافیت از آزمون جایگزینی بازار کار", desc: "چون شغل در لیست کمبود است، اداره کار بررسی نمی‌کند که آیا فرد بیکار اتریشی وجود دارد یا خیر." },
      { label: "اتصال دو ساله به کارفرما", desc: "در دو سال اول تغییر شرکت نیازمند درخواست مجدد است اما پس از ۲۱ ماه به RWR Plus تبدیل می‌شود." }
    ]
  },
  {
    id: "skilled-sample-2-mangelberuf-nursing",
    methodKey: "skilled-workers",
    methodTitleFa: "کارمندان متخصص و مشاغل کمبود نیرو",
    cardTypeFa: "کارت قرمز-سفید-قرمز (پرستاری و درمان)",
    titleFa: "کارت RWR کارشناس ارشد پرستاری در بیمارستان عمومی وین (AKH Wien)",
    titleDe: "Rot-Weiß-Rot – Karte für diplomierte Pflegefachkräfte",
    applicantProfile: "پرستار با تاییدیه معادل‌سازی مدرک پرستاری (Anerkennung) و مدرک زبان آلمانی B2",
    authority: "MA 35 Wien + AKH Wien",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۱/۰۸",
    validity: "۲ ساله (تا ۲۰۲۶/۰۱/۰۷)",
    caseRef: "MA35-PFLEGE-2024-0019-AKH",
    workPermitClause: "اشتغال در کادر درمان و خدمات پرستاری بیمارستان دولتی",
    legalParagraph: "§ 12a AuslBG (Mangelberuf Pflege)",
    badgeHighlight: "استفاده از قانون تسهیل استخدام کادر درمان مصوب ۲۰۲۳ اتریش",
    mrz1: "ARAUTW3319028X1IRN9408197F2601074<<<<<<<<<<<<<<06",
    mrz2: "NAJAFI<<SAHAR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "NAJAFI, S***R",
    dobMasked: "19.08.1994",
    cardNoMasked: "W3319028X",
    keyConditions: [
      "مدرک پرستاری ارزشیابی شده در اتریش با ثبت در دفتر کادر بهداشت (Gesundheitsberuferegister)",
      "مدرک زبان آلمانی سطح B2 جهت تعامل با بیماران",
      "قرارداد استخدامی رسمی با بیمارستان یا مرکز مراقبت سالمندان اتریش"
    ],
    anatomyTips: [
      { label: "پوشش هزینه‌های انتقال توسط اتریش", desc: "بسیاری از ایالت‌ها کمک‌هزینه مسکن اولیه و زبان تکمیلی به کادر درمان اعطا می‌کنند." },
      { label: "مسیر سریع به RWR Plus", desc: "کادر درمان به محض پایان دوره ۲۱ ماهه بدون معطلی کارت کار آزاد دریافت می‌نمایند." }
    ]
  },
  {
    id: "skilled-sample-3-sonstige-key-worker",
    methodKey: "skilled-workers",
    methodTitleFa: "کارگران کلیدی دیگر (Sonstige Schlüsselkräfte)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (کارگر کلیدی عمومی)",
    titleFa: "کارت RWR تحلیلگر ارشد کسب‌وکار و مالی در شرکت سرمایه‌گذاری سالزبورگ",
    titleDe: "Rot-Weiß-Rot – Karte für sonstige Schlüsselkräfte (§ 12b AuslBG)",
    applicantProfile: "متخصص تحلیل داده‌های مالی و ریسک اعتباری با مدرک MBA و کسب ۶۰ امتیاز",
    authority: "Bezirkshauptmannschaft Salzburg-Stadt",
    state: "Salzburg",
    issueDate: "۲۰۲۳/۱۰/۱۸",
    validity: "۲ ساله (تا ۲۰۲۵/۱۰/۱۷)",
    caseRef: "SBG-KEY-2023-8819-FIN",
    workPermitClause: "فعالیت به عنوان Financial Risk Analyst در شرکت مربوطه",
    legalParagraph: "§ 41 Abs 1 NAG iVm § 12b AuslBG",
    badgeHighlight: "تامین حداقل حقوق مصوب قانون کارگران کلیدی (بالای ۳٬۱۰۰ یورو ناخالص ماهانه)",
    mrz1: "ARAUTS6610293X5IRN8909124M2510178<<<<<<<<<<<<<<03",
    mrz2: "KAMALI<<VAHID<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "KAMALI, V***D",
    dobMasked: "12.09.1989",
    cardNoMasked: "S6610293X",
    keyConditions: [
      "کسب حداقل ۵۵ امتیاز در سیستم امتیازات کارگران کلیدی",
      "حداقل حقوق ماهانه ناخالص مصوب برای سنین زیر ۳۰ سال یا بالای ۳۰ سال",
      "انجام موفق آزمون بازار کار AMS (Ersatzkraftverfahren) توسط کارفرما"
    ],
    anatomyTips: [
      { label: "روش Sonstige Schlüsselkraft", desc: "برای مشاغلی مناسب است که در لیست رسمی کمبود نیستند اما فرد تخصص ارشد دارد." },
      { label: "اهمیت شرط حقوق", desc: "قرارداد نباید به هیچ عنوان حتی یک یورو از حداقل مصوب قانون AuslBG کمتر باشد." }
    ]
  },
  {
    id: "skilled-sample-4-mangelberuf-mechatronics",
    methodKey: "skilled-workers",
    methodTitleFa: "کارمندان متخصص و مشاغل کمبود نیرو",
    cardTypeFa: "کارت قرمز-سفید-قرمز (مکاترونیک و برق)",
    titleFa: "کارت RWR مهندس مکاترونیک و تکنسین توربین‌های بادی در بورگن‌لاند و نیدراسترایش",
    titleDe: "Rot-Weiß-Rot – Karte (Techniker für erneuerbare Energien)",
    applicantProfile: "تکنسین مکاترونیک با سابقه ۵ سال نصب و اورهال سیستم‌های تولید برق پایدار",
    authority: "Bezirkshauptmannschaft Mödling (Niederösterreich)",
    state: "Niederösterreich",
    issueDate: "۲۰۲۴/۰۲/۲۸",
    validity: "۲ ساله (تا ۲۰۲۶/۰۲/۲۷)",
    caseRef: "NOE-RWR-2024-0012-WIND",
    workPermitClause: "خدمات فنی و راه‌اندازی نیروگاه‌های تجدیدپذیر",
    legalParagraph: "§ 12a AuslBG (Mangelberuf Mechatronik)",
    badgeHighlight: "امتیاز کامل سابقه کار تخصصی معادل سنوات رسمی اتریش",
    mrz1: "ARAUTN4410294X2IRN9106208M2602271<<<<<<<<<<<<<<05",
    mrz2: "SOLEYMANI<<AMIR<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "SOLEYMANI, A***R",
    dobMasked: "20.06.1991",
    cardNoMasked: "N4410294X",
    keyConditions: [
      "مدرک فنی‌حرفه‌ای یا دیپلم هنرستان مورد تایید به همراه سابقه کار معتبر بیمه‌ای",
      "کسب حداقل امتیاز زبان آلمانی A2 یا انگلیسی B1",
      "قرارداد کار مطابق با اشل حقوقی صنایع فلزی و الکترونیک اتریش"
    ],
    anatomyTips: [
      { label: "مشاغل فنی غیردانشگاهی", desc: "افرادی که لیسانس ندارند ولی مدرک فنی و سابقه کار قوی دارند نیز مشمول کارت RWR هستند." },
      { label: "امتیازدهی سابقه کار", desc: "هر سال سابقه کار تخصصی ۲ امتیاز و در صورت مرتبط بودن تا ۴ امتیاز اختصاص می‌یابد." }
    ]
  },

  // =========================================================================
  // METHOD 9: 🏆 برای افراد بسیار متخصص (Very Highly Qualified Workers) - 4 نمونه
  // =========================================================================
  {
    id: "highqual-sample-1-biotech-patents",
    methodKey: "highly-qualified",
    methodTitleFa: "افراد بسیار متخصص (نخبگان)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (بسیار متخصص)",
    titleFa: "کارت RWR پژوهشگر ارشد بیوتکنولوژی و ژنتیک با ثبت اختراع بین‌المللی در وین",
    titleDe: "Rot-Weiß-Rot – Karte für besonders Hochqualifizierte (§ 12 AuslBG)",
    applicantProfile: "دکترای بیوشیمی با ۳ ثبت اختراع پتنت، مقالات متعدد ISI و کسب ۸۵ امتیاز نخبگان",
    authority: "MA 35 Wien + Austrian Business Agency (ABA)",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۳/۰۴",
    validity: "۲ ساله (تا ۲۰۲۶/۰۳/۰۳)",
    caseRef: "MA35-HOCH/2024-0018-BIOTECH",
    workPermitClause: "پژوهش علمی و هدایت آزمایشگاه تحقیقاتی داروسازی",
    legalParagraph: "§ 41 Abs 1 NAG iVm § 12 AuslBG",
    badgeHighlight: "کسب ۸۵ امتیاز از مجموع ۱۰۰ امتیاز جدول نخبگان بدون نیاز به کارفرمای از پیش تعیین‌شده در مرحله اول",
    mrz1: "ARAUTW1102948X7IRN8404153M2603039<<<<<<<<<<<<<<01",
    mrz2: "ROOSTAEE<<FARZAD<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "ROOSTAEE, F***D",
    dobMasked: "15.04.1984",
    cardNoMasked: "W1102948X",
    keyConditions: [
      "کسب حداقل ۷۰ امتیاز از جدول اختصاصی افراد با صلاحیت بسیار بالا (Besonders Hochqualifizierte)",
      "امتیاز ویژه برای مقالات، پژوهش‌ها، جوایز علمی بین‌المللی و پتنت‌های ثبت‌شده",
      "پیشنهاد شغلی متناسب با تحصیلات با حقوق مکفی در بالاترین رده تخصصی اتریش",
      "معافیت کامل از آزمون بازار کار AMS و تسریع فوق‌العاده رسیدگی پرونده"
    ],
    anatomyTips: [
      { label: "بالاترین سطح کارت قرمز-سفید-قرمز", desc: "نخبگان دارای این کارت در اولویت نخست صدور روادید و خدمات سرمایه‌گذاری اتریش هستند." },
      { label: "امکان شروع با ویزای جستجوی کار", desc: "نخبگان می‌توانند ابتدا بدون قرارداد کاری، ویزای ۶ ماهه جستجوی کار گرفته و در خاک اتریش کارت بگیرند." }
    ]
  },
  {
    id: "highqual-sample-2-cto-executive",
    methodKey: "highly-qualified",
    methodTitleFa: "افراد بسیار متخصص (نخبگان)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (بسیار متخصص)",
    titleFa: "کارت RWR مدیر ارشد فناوری (CTO) در هلدینگ چندملیتی فناوری اطلاعات اتریش",
    titleDe: "Rot-Weiß-Rot – Karte für besonders Hochqualifizierte (Executive)",
    applicantProfile: "مدیر ارشد فنی با سابقه رهبری پروژه‌های کلان زیرساخت ابری اروپا و کسب ۷۸ امتیاز",
    authority: "MA 35 Wien + ABA Work in Austria",
    state: "Wien",
    issueDate: "۲۰۲۳/۱۱/۱۲",
    validity: "۲ ساله (تا ۲۰۲۵/۱۱/۱۱)",
    caseRef: "MA35-ABA-2023-7712-CTO",
    workPermitClause: "رهبری فنی و راهبری سیستم‌های استراتژیک در اتریش",
    legalParagraph: "§ 12 AuslBG (Führungskraft / Top-Qualifiziert)",
    badgeHighlight: "رسیدگی در کانال اکسپرس ABA در مدت رکورد ۲۴ روز کاری",
    mrz1: "ARAUTW7109283X5IRN8211091M2511114<<<<<<<<<<<<<<08",
    mrz2: "GOLSHANI<<KEYVAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "GOLSHANI, K***N",
    dobMasked: "09.11.1982",
    cardNoMasked: "W7109283X",
    keyConditions: [
      "حداقل مدرک کارشناسی ارشد مهندسی از دانشگاه معتبر بین‌المللی",
      "حداقل حقوق سالانه بالای ۸۰٬۰۰۰ یورو همراه با پاداش‌های مدیریتی",
      "رزومه مستند سوابق مدیریتی ارشد در شرکت‌های معتبر جهانی"
    ],
    anatomyTips: [
      { label: "کانال Fast-Track آژانس تجاری اتریش (ABA)", desc: "شرکت‌های متقاضی نخبگان از مسیر اختصاصی دولتی پرونده را پیگیری می‌کنند." },
      { label: "الحاق همزمان کل اعضای خانواده", desc: "خانواده بدون معطلی ویزای ورود مستقیم گرفته و همزمان کارت RWR Plus می‌گیرند." }
    ]
  },
  {
    id: "highqual-sample-3-university-professor",
    methodKey: "highly-qualified",
    methodTitleFa: "افراد بسیار متخصص (نخبگان)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (بسیار متخصص دانشگاهی)",
    titleFa: "کارت RWR استاد تمام و محقق ارشد هوش مصنوعی در دانشگاه صنعتی گراتس",
    titleDe: "Rot-Weiß-Rot – Karte besonders Hochqualifizierte (Universität)",
    applicantProfile: "پژوهشگر ارشد با مدرک دکترا و Post-Doc با قرارداد هیئت علمی رسمی و کسب ۸۲ امتیاز",
    authority: "Amt der Steiermärkischen Landesregierung (Graz)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۱/۳۰",
    validity: "۲ ساله (تا ۲۰۲۶/۰۱/۲۹)",
    caseRef: "STMK-HOCH-2024-0021-UNIV",
    workPermitClause: "تدریس دانشگاهی و اجرای پروژه‌های بنیاد علوم اتریش (FWF)",
    legalParagraph: "§ 12 AuslBG iVm § 65 NAG",
    badgeHighlight: "معافیت کامل از هرگونه آزمون بازار کار و محدودیت‌های فصلی",
    mrz1: "ARAUTG9910283X1IRN8508216M2601292<<<<<<<<<<<<<<04",
    mrz2: "ZANDI<<KOUROSH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "ZANDI, K***H",
    dobMasked: "21.08.1985",
    cardNoMasked: "G9910283X",
    keyConditions: [
      "قرارداد پژوهشی یا عضویت هیئت علمی در دانشگاه‌های دولتی اتریش",
      "کسب بیش از ۷۰ امتیاز از معیارهای تحصیلی، مقالات و زبان",
      "تاییدیه دانشگاه در خصوص ضرورت حضور استاد"
    ],
    anatomyTips: [
      { label: "ارتقا سریع به اقامت دائم", desc: "اساتید و دانشمندان با داشتن زبان B1 ظرف ۲ سال می‌توانند اقامت دائم درخواست کنند." },
      { label: "معافیت‌های مالیاتی ویژه نخبگان", desc: "قانون اتریش برای نخبگان علمی تخفیف‌های ویژه مالیات بر درآمد در نظر می‌گیرد." }
    ]
  },
  {
    id: "highqual-sample-4-aerospace-engineer",
    methodKey: "highly-qualified",
    methodTitleFa: "افراد بسیار متخصص (نخبگان)",
    cardTypeFa: "کارت قرمز-سفید-قرمز (بسیار متخصص هوافضا)",
    titleFa: "کارت RWR معمار سیستم‌های پیشرفته ناوبری ماهواره‌ای در اتریش علیا (لینتس)",
    titleDe: "Rot-Weiß-Rot – Karte für besonders Hochqualifizierte (Aerospace)",
    applicantProfile: "مهندس هوافضا با تخصص در سیستم‌های راداری و حسگرهای فضاپایه با کسب ۷۶ امتیاز",
    authority: "Landeshauptmann von Oberösterreich (Linz)",
    state: "Oberösterreich",
    issueDate: "۲۰۲۳/۱۲/۱۴",
    validity: "۲ ساله (تا ۲۰۲۵/۱۲/۱۳)",
    caseRef: "OOE-HOCH-2023-9102-SPACE",
    workPermitClause: "فعالیت در کنسرسیوم فضایی و سیستم‌های راداری اتریش",
    legalParagraph: "§ 12 AuslBG (Spezialisten von strategischer Bedeutung)",
    badgeHighlight: "استفاده از آفر همکاری در پروژه‌های آژانس فضایی اروپا (ESA) در اتریش",
    mrz1: "ARAUTL8819024X4IRN8710043M2512137<<<<<<<<<<<<<<07",
    mrz2: "SADEGHI<<BEHNAM<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    cardVariant: "rwr",
    holderMasked: "SADEGHI, B***M",
    dobMasked: "04.10.1987",
    cardNoMasked: "L8819024X",
    keyConditions: [
      "مدرک دکترای مهندسی یا کارشناسی ارشد ممتاز هوافضا",
      "سابقه کار در پروژه‌های پیشرفته با استانداردهای کیفیت اروپایی",
      "تایید صلاحیت امنیتی و عدم سوءپیشینه از اینترپل و پلیس فدرال اتریش"
    ],
    anatomyTips: [
      { label: "امتیاز استراتژیک ملی", desc: "پروژه‌های استراتژیک صنعتی از بالاترین امتیازات تسهیل مهاجرت برخوردارند." },
      { label: "امکان خروج آزاد برای همایش‌ها", desc: "سفرهای کاری تحقیقاتی به سراسر دنیا بدون ایجاد وقفه در پرونده اقامتی." }
    ]
  },

  // =========================================================================
  // METHOD 10: 🔍 ویزای جستجوی کار ۶ ماهه (Job Seeker Visa D) - 4 نمونه
  // =========================================================================
  {
    id: "jobseeker-sample-1-embassy-tehran-phd",
    methodKey: "job-seeker",
    methodTitleFa: "ویزای جستجوی کار ۶ ماهه (Job Seeker)",
    cardTypeFa: "برچسب ویزای شنگن نوع D (جستجوی کار)",
    titleFa: "ویزای D جستجوی کار ۶ ماهه صادره از سفارت اتریش در تهران برای فارغ‌التحصیل دکترا",
    titleDe: "Visum D zur Arbeitsplatzsuche gem. § 24a FPG (Besonders Hochqualifizierte)",
    applicantProfile: "فارغ‌التحصیل دکترای هوش مصنوعی با کسب ۷۲ امتیاز، بدون داشتن کارفرما در لحظه اقدام",
    authority: "Österreichische Botschaft Teheran + AMS Wien",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۱/۱۵",
    validity: "۶ ماهه (تا ۲۰۲۴/۰۷/۱۴)",
    caseRef: "TEH-VISA-D/2024-00192-JS",
    workPermitClause: "ورود قانونی به خاک اتریش جهت مصاحبه حضوری و عقد قرارداد کاری",
    legalParagraph: "§ 24a Fremdenpolizeigesetz 2005 (FPG) iVm § 12 AuslBG",
    badgeHighlight: "مجوز حضور ۶ ماهه در اتریش با تبدیل مستقیم به کارت RWR به محض دریافت قرارداد",
    mrz1: "VD<<<<<<<<<<IRN<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    mrz2: "D091248102IRN8807154M2407146AUT<<<<<<<<<<<<<04",
    cardVariant: "visa-d",
    holderMasked: "EBRAHIMIAN, M***D",
    dobMasked: "15.07.1988",
    cardNoMasked: "D09124810",
    keyConditions: [
      "کسب حداقل ۷۰ امتیاز از جدول اختصاصی افراد بسیار متخصص (Besonders Hochqualifizierte)",
      "ثبت درخواست در سفارت اتریش در تهران بدون نیاز به دعوت‌نامه شرکتی یا کارفرما",
      "ارزیابی مدارک توسط اداره کار اتریش (AMS) و صدور گواهی صلاحیت اولیه (Anrechnungsbescheid)",
      "اثبات تمکن مالی برای ۶ ماه اقامت در اتریش (حدود ۷٬۰۰۰ الی ۹٬۰۰۰ یورو) و بیمه مسافرتی شنگن"
    ],
    anatomyTips: [
      { label: "لیبل رسمی ویزای تایپ D اتریش", desc: "برچسب رسمی الصاقی در پاسپورت با هولوگرام نقره‌ای عقاب اتریش و درج عبارت Arbeitsplatzsuche." },
      { label: "تبدیل بدون خروج از اتریش", desc: "به محض امضای قرارداد با شرکتی در اتریش، پرونده در اداره MA35 به کارت RWR قرمز-سفید-قرمز تبدیل می‌شود." }
    ]
  },
  {
    id: "jobseeker-sample-2-senior-mechanical-engineer",
    methodKey: "job-seeker",
    methodTitleFa: "ویزای جستجوی کار ۶ ماهه (Job Seeker)",
    cardTypeFa: "برچسب ویزای شنگن نوع D (جستجوی کار)",
    titleFa: "ویزای جستجوی کار ۶ ماهه مهندس ارشد مکانیک و شبیه‌سازی عددی در لینتس",
    titleDe: "Visum D zur Arbeitsplatzsuche (Senior Mechanical Engineer)",
    applicantProfile: "مهندس مکانیک با مدرک فوق‌لیسانس و سابقه ۸ سال کار تخصصی با کسب ۷۴ امتیاز نخبگان",
    authority: "Österreichische Botschaft Teheran + AMS Oberösterreich",
    state: "Oberösterreich",
    issueDate: "۲۰۲۳/۱۱/۰۵",
    validity: "۶ ماهه (تا ۲۰۲۴/۰۵/۰۴)",
    caseRef: "TEH-VISA-D/2023-8819-MECH",
    workPermitClause: "حضور در اتریش برای شرکت در جلسات مصاحبه و تست‌های تخصصی کارخانجات",
    legalParagraph: "§ 24a FPG (Visum zur Arbeitsplatzsuche)",
    badgeHighlight: "دریافت ۳ پیشنهاد کاری رسمی ظرف ۴۵ روز پس از ورود به اتریش",
    mrz1: "VD<<<<<<<<<<IRN<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    mrz2: "D881920314IRN8604108M2405041AUT<<<<<<<<<<<<<02",
    cardVariant: "visa-d",
    holderMasked: "PASHAEI, K***N",
    dobMasked: "10.04.1986",
    cardNoMasked: "D88192031",
    keyConditions: [
      "مدرک دانشگاهی مرتبط با مهندسی همراه با تاییدیه مدارک تحصیلی",
      "مدرک زبان انگلیسی C1 یا آلمانی B2 با مدارک رسمی بین‌المللی",
      "گواهی سلامت پزشکی و تمکن بانکی به یورو"
    ],
    anatomyTips: [
      { label: "حق تردد آزاد در شنگن", desc: "با ویزای D اتریش دارنده می‌تواند برای مصاحبه به آلمان و سایر کشورهای شنگن نیز سفر کند." },
      { label: "عدم نیاز به استخدام قبل از سفر", desc: "بزرگترین مزیت این روش، مصاحبه چهره‌به‌چهره در خاک اتریش است که شانس قبولی را چند برابر می‌کند." }
    ]
  },
  {
    id: "jobseeker-sample-3-data-scientist-graz",
    methodKey: "job-seeker",
    methodTitleFa: "ویزای جستجوی کار ۶ ماهه (Job Seeker)",
    cardTypeFa: "برچسب ویزای شنگن نوع D (جستجوی کار)",
    titleFa: "ویزای ۶ ماهه کاریابی دانشمند داده و هوش مصنوعی در استانی اشتایرمارک",
    titleDe: "Visum D zur Arbeitsplatzsuche (Lead Data Scientist)",
    applicantProfile: "متخصص یادگیری ماشین و کلان‌داده با سابقه پروژه‌های بین‌المللی و ۷۱ امتیاز در سیستم AMS",
    authority: "Österreichische Botschaft Teheran + AMS Steiermark",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۲/۲۰",
    validity: "۶ ماهه (تا ۲۰۲۴/۰۸/۱۹)",
    caseRef: "TEH-VISA-D/2024-0492-DATA",
    workPermitClause: "شرکت در رویدادهای جذب نیروی کار و جلسات ارزیابی فنی",
    legalParagraph: "§ 24a FPG iVm § 12 AuslBG",
    badgeHighlight: "ارزیابی مثبت مدارک توسط هیئت کارشناسی AMS وین در کمتر از ۲۵ روز",
    mrz1: "VD<<<<<<<<<<IRN<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    mrz2: "D441029381IRN9309224F2408197AUT<<<<<<<<<<<<<08",
    cardVariant: "visa-d",
    holderMasked: "TABATABAEI, N***N",
    dobMasked: "22.09.1993",
    cardNoMasked: "D44102938",
    keyConditions: [
      "گواهی تمکن مالی شخصی ۶ ماهه و رزرو مسکن یا هاستل اولیه در گراتس",
      "ترجمه رسمی ریزنمرات و دانشنامه و مقالات علمی",
      "بیمه درمانی مسافرتی با سقف پوشش حداقل ۳۰٬۰۰۰ یورو در شنگن"
    ],
    anatomyTips: [
      { label: "انقضای ویزا و تمدید", desc: "این ویزا تمدیدشدنی نیست؛ متقاضی باید ظرف ۶ ماه قرارداد ببندد تا به کارت RWR تبدیل گردد." },
      { label: "تبدیل فوری به کارت اقامت", desc: "به محض ثبت قرارداد کاری، رسید رسمی MA35 به عنوان اقامت موقت صادر می‌شود." }
    ]
  },
  {
    id: "jobseeker-sample-4-energy-project-manager",
    methodKey: "job-seeker",
    methodTitleFa: "ویزای جستجوی کار ۶ ماهه (Job Seeker)",
    cardTypeFa: "برچسب ویزای شنگن نوع D (جستجوی کار)",
    titleFa: "ویزای جستجوی کار ۶ ماهه مدیر ارشد پروژه‌های انرژی و نفت و گاز در سالزبورگ و تیرول",
    titleDe: "Visum D zur Arbeitsplatzsuche (Renewable Energy Project Manager)",
    applicantProfile: "مدیر پروژه PMP با ۱۵ سال سابقه پروژه‌های بزرگ صنعتی و کسب ۷۷ امتیاز در سیستم اتریش",
    authority: "Österreichische Botschaft Teheran + AMS Salzburg",
    state: "Salzburg",
    issueDate: "۲۰۲۳/۱۰/۰۲",
    validity: "۶ ماهه (تا ۲۰۲۴/۰۴/۰۱)",
    caseRef: "TEH-VISA-D/2023-1102-ENERGY",
    workPermitClause: "ورود جهت بررسی فرصت‌های شغلی و نهایی‌سازی قراردادهای مدیریتی",
    legalParagraph: "§ 24a FPG (Besonders Hochqualifizierte Arbeitsuche)",
    badgeHighlight: "تبدیل موفق به کارت قرمز-سفید-قرمز در ماه سوم حضور در اتریش",
    mrz1: "VD<<<<<<<<<<IRN<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    mrz2: "D119284719IRN7905183M2404015AUT<<<<<<<<<<<<<06",
    cardVariant: "visa-d",
    holderMasked: "HOSSEINPOUR, K***H",
    dobMasked: "18.05.1979",
    cardNoMasked: "D11928471",
    keyConditions: [
      "مدرک مدیریت پروژه حرفه‌ای یا مدرک مهندسی مورد تایید",
      "سوابق شفاف بیمه و سوابق مدیریت در شرکت‌های معتبر صنعتی",
      "ارائه بیانیه هدف و رزومه با ساختار استاندارد اروپایی (Europass CV)"
    ],
    anatomyTips: [
      { label: "امتیاز سن و سابقه", desc: "افراد دارای سابقه کار ارشد حتی در سنین بالاتر با تکیه بر تجربه مدیریتی امتیاز کامل را کسب می‌کنند." },
      { label: "پشتیبانی شبکه متخصصان", desc: "امکان شرکت در گردهمایی‌های صنعتی و نمایشگاه‌های بازرگانی وین و سالزبورگ." }
    ]
  }
];
