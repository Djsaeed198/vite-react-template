export const PATHWAY_DATA = {
  rwr: {
    name: 'مهاجرت کاری (RWR Card)',
    questions: [
      { id: 'job_title', label: 'عنوان شغلی مورد نظر در اتریش', type: 'text' },
      { id: 'work_experience', label: 'میزان سابقه کار مرتبط (سال)', type: 'number' },
      { id: 'has_job_offer', label: 'آیا پیشنهاد شغلی (Job Offer) دارید؟', type: 'select', options: ['بله', 'خیر'] },
      { id: 'education', label: 'میزان تحصیلات', type: 'select', options: ['دیپلم', 'لیسانس', 'فوق لیسانس', 'دکتری'] },
      { id: 'language_level', label: 'سطح زبان آلمانی/انگلیسی', type: 'select', options: ['مبتدی', 'متوسط', 'پیشرفته', 'عالی'] }
    ]
  },
  company_self: {
    name: 'ثبت شرکت و خوداشتغالی (Key Worker)',
    questions: [
      { id: 'business_type', label: 'نوع کسب‌وکار', type: 'text' },
      { id: 'investment_amount', label: 'میزان سرمایه در دسترس (یورو)', type: 'number' },
      { id: 'has_business_plan', label: 'آیا بیزینس‌پلن آماده دارید؟', type: 'select', options: ['بله', 'خیر'] },
      { id: 'business_value', label: 'آیا کسب‌وکار شما برای اقتصاد اتریش آورده‌ای دارد؟', type: 'text' }
    ]
  },
  ict: {
    name: 'انتقال درون‌شرکتی (ICT)',
    questions: [
      { id: 'current_company', label: 'نام شرکت فعلی شما', type: 'text' },
      { id: 'has_branch_austria', label: 'آیا شرکت شما در اتریش شعبه دارد؟', type: 'select', options: ['بله', 'خیر'] },
      { id: 'position', label: 'سمت فعلی شما در شرکت', type: 'text' },
      { id: 'duration', label: 'مدت زمان حضور در شرکت فعلی', type: 'text' }
    ]
  },
  jobseeker: {
    name: 'ویزای جستجوی کار (Job Seeker Visa)',
    questions: [
      { id: 'degree_major', label: 'رشته تحصیلی و دانشگاه', type: 'text' },
      { id: 'nostrification', label: 'آیا مدرک تحصیلی شما در اتریش معتبر است؟', type: 'select', options: ['بله', 'خیر', 'اطلاعی ندارم'] },
      { id: 'years_experience', label: 'تعداد سال‌های سابقه کار تخصصی', type: 'number' },
      { id: 'german_level', label: 'سطح زبان آلمانی (حداقل B1)', type: 'select', options: ['ندارم', 'A1', 'A2', 'B1', 'B2', 'C1'] }
    ]
  },
  startup: {
    name: 'ویزای استارتاپ',
    questions: [
      { id: 'startup_description', label: 'نام و شرح کوتاه استارتاپ', type: 'textarea' },
      { id: 'is_accelerated', label: 'آیا توسط انکوباتورهای اتریشی پذیرش شده؟', type: 'select', options: ['بله', 'خیر'] },
      { id: 'seed_money', label: 'میزان سرمایه اولیه اختصاص یافته (یورو)', type: 'number' },
      { id: 'team_size', label: 'آیا تیم همراه دارید؟ (تعداد نفرات)', type: 'number' }
    ]
  },
  student: {
    name: 'ویزای تحصیلی',
    questions: [
      { id: 'degree_level', label: 'مقطع مورد نظر', type: 'select', options: ['کارشناسی', 'ارشد', 'دکتری'] },
      { id: 'major', label: 'رشته مورد نظر در اتریش', type: 'text' },
      { id: 'has_admission', label: 'آیا پذیرش تحصیلی دارید؟', type: 'select', options: ['بله', 'در حال اقدام'] },
      { id: 'language_level', label: 'سطح زبان آلمانی یا انگلیسی', type: 'select', options: ['مبتدی', 'متوسط', 'عالی'] }
    ]
  },
  privatier: {
    name: 'استقلال مالی (Privatier)',
    questions: [
      { id: 'monthly_income', label: 'میزان درآمد ماهانه غیرفعال (خارج از اتریش)', type: 'select', options: ['کمتر از 2000', '2000 تا 4000', 'بیش از 4000'] },
      { id: 'income_source', label: 'منبع اصلی درآمد', type: 'select', options: ['اجاره ملک', 'سهام', 'بازنشستگی'] },
      { id: 'bank_balance', label: 'میزان موجودی حساب بانکی (برای اثبات تمکن)', type: 'number' }
    ]
  },
  family: {
    name: 'پیوست خانواده',
    questions: [
      { id: 'relative_status', label: 'وضعیت اقامت فرد اصلی در اتریش', type: 'text' },
      { id: 'relationship', label: 'نسبت با فرد مقیم', type: 'select', options: ['همسر', 'فرزند'] },
      { id: 'arrival_date', label: 'تاریخ دقیق ورود فرد اصلی به اتریش', type: 'date' }
    ]
  },
  gmbh: {
    name: 'ثبت شرکت در اتریش (عمومی)',
    questions: [
      { id: 'company_type', label: 'نوع شرکت', type: 'select', options: ['GmbH', 'سایر'] },
      { id: 'field', label: 'زمینه فعالیت', type: 'text' },
      { id: 'is_buying', label: 'آیا خواهان خرید شرکت آماده هستید؟', type: 'select', options: ['بله', 'ثبت شرکت جدید'] }
    ]
  },
  general: {
    name: 'مشاوره عمومی',
    questions: [
      { id: 'challenges', label: 'سوالات یا چالش‌های اصلی شما در مسیر مهاجرت', type: 'textarea' },
      { id: 'contact_pref', label: 'ترجیح می‌دهید از چه طریقی با شما تماس گرفته شود؟', type: 'select', options: ['واتساپ', 'ایمیل', 'تلفن'] }
    ]
  }
};
