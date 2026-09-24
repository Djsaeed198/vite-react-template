import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../utils/firebase';
import { useFirebase } from '../utils/firebaseContext';
import { INITIAL_FORUM_POSTS } from '../data';
import { ForumPost, ForumReply } from '../types';
import {
  MessageSquare, Plus, ChevronDown, LogIn, LogOut, Loader2, Sparkles,
  Users, TrendingUp, Star, Award, Heart, ShieldCheck, Clock, CheckCircle2,
  ThumbsUp, Eye, Filter, Search, X, Hash, BookOpen, GraduationCap, Home,
  Briefcase, Stethoscope, Gift, MapPin, Send, MessageCircle, Quote, Info,
  Lightbulb, Flame, Rocket, Zap, BadgeCheck, Calendar, Link2, Globe,
  ExternalLink, Phone, HeartHandshake, Coffee, PartyPopper, Crown, Target
} from 'lucide-react';
import SEO from './SEO';
import { toast } from '../utils/toast';

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۲,۴۰۰+", label: "کاربر فعال", icon: "👥", sub: "فارسی‌زبان در اتریش" },
  { value: "۵۸۰+", label: "گفتگوی فعال", icon: "💬", sub: "در تمام دسته‌بندی‌ها" },
  { value: "۱۲,۰۰۰+", label: "پاسخ تخصصی", icon: "📝", sub: "از هموطنان متخصص" },
  { value: "< ۳h", label: "میانگین پاسخ", icon: "⚡", sub: "سرعت بالای جامعه" },
];

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  {
    id: "all",
    label: "کلیه تالارها",
    icon: Globe,
    emoji: "🌐",
    color: "from-stone-600 to-stone-800",
    bg: "bg-stone-100",
    text: "text-stone-800",
    description: "همه گفتگوها و موضوعات اتریش‌نشین",
  },
  {
    id: "students",
    label: "تحصیل و امور دانشجویی",
    icon: GraduationCap,
    emoji: "🎓",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-800",
    description: "دانشگاه، اقامت تحصیلی، بورسیه، ÖH",
  },
  {
    id: "housing",
    label: "مسکن و خوابگاه (WG)",
    icon: Home,
    emoji: "🏠",
    color: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    description: "اجاره، WG، خوابگاه، Wohnbeihilfe",
  },
  {
    id: "jobs",
    label: "کار و مارکت کار اتریش",
    icon: Briefcase,
    emoji: "💼",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-800",
    description: "RWR کارت، AMS، فرصت‌های شغلی",
  },
  {
    id: "nostrifizierung",
    label: "نوستریفیکاسیون و ارزشیابی مدرک",
    icon: Stethoscope,
    emoji: "👔",
    color: "from-indigo-500 to-purple-600",
    bg: "bg-indigo-50",
    text: "text-indigo-800",
    description: "معادل‌سازی مدرک پزشکی، دندان، مهندسی",
  },
  {
    id: "kindness",
    label: "دیوار مهربانی و اهدا",
    icon: Gift,
    emoji: "🌸",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-800",
    description: "اهدای رایگان لوازم به هموطنان تازه‌وارد",
  },
];

// ==========================================
// FORUM RULES
// ==========================================
const FORUM_RULES = [
  { icon: HeartHandshake, title: "احترام و همدلی", text: "با هموطنان مهربان باشید. همه ما روزی تازه‌وارد بوده‌ایم." },
  { icon: BadgeCheck, title: "تجربه واقعی", text: "فقط تجربیات واقعی خود را به اشتراک بگذارید — نه شنیده‌ها." },
  { icon: ShieldCheck, title: "حریم خصوصی", text: "اطلاعات شخصی خود یا دیگران را منتشر نکنید." },
  { icon: Lightbulb, title: "پاسخ کاربردی", text: "اگر می‌دانید، به دیگران کمک کنید. جامعه با هم رشد می‌کند." },
];

// ==========================================
// FORUM FAQ
// ==========================================
const FAQS = [
  {
    q: "چگونه در تالار گفتگوی اتریش‌نشین عضو شوم؟",
    a: "برای عضویت، کافی است روی دکمه «ورود با گوگل» در بالای صفحه کلیک کنید. پس از ورود با حساب گوگل خود، می‌توانید پرسش جدید مطرح کنید، به دیگران پاسخ دهید و رأی مثبت ثبت کنید. عضویت کاملاً رایگان است.",
  },
  {
    q: "آیا باید اطلاعات واقعی خود را وارد کنم؟",
    a: "خیر. فقط نام نمایشی گوگل شما استفاده می‌شود. برای حریم خصوصی بیشتر، می‌توانید در تنظیمات گوگل خود یک نام مستعار تنظیم کنید. اتریش‌نشین هیچ‌گاه ایمیل یا اطلاعات شخصی شما را منتشر نمی‌کند.",
  },
  {
    q: "چرا پست من نمایش داده نمی‌شود یا رد می‌شود؟",
    a: "تمامی پست‌ها به صورت زنده در Firestore ذخیره می‌شوند و بلافاصله منتشر می‌گردند. اگر پست شما نمایش داده نمی‌شود، احتمالاً مرورگر شما کش کرده است. یک بار صفحه را Refresh کنید یا از حالت Incognito استفاده کنید.",
  },
  {
    q: "آیا می‌توانم درخواست حذف پست یا پاسخم را ثبت کنم؟",
    a: "بله. از طریق تلگرام یا واتس‌اپ با شناسه پست یا پاسخ، درخواست حذف خود را ارسال کنید. تیم مدیریت اتریش‌نشین در کمتر از ۴۸ ساعت رسیدگی خواهد کرد. پست‌های خلاف قوانین (تبلیغات، توهین، اطلاعات نادرست) بدون اطلاع قبلی حذف می‌شوند.",
  },
  {
    q: "تفاوت تالار گفتگو با گروه‌های تلگرام چیست؟",
    a: "تالار گفتگوی اتریش‌نشین به صورت آرشیوی و ماندگار عمل می‌کند: همه‌ی تجربیات گذشته در دسترس هستند و با ابزار جستجو سریع پیدا می‌شوند. برخلاف گروه‌های تلگرام، اطلاعات با گذشت زمان از بین نمی‌رود و به صورت ساخت‌یافته (دسته‌بندی و برچسب‌گذاری شده) ارائه می‌شود.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "ÖH Bundesvertretung", url: "https://www.oeh.ac.at", desc: "اتحادیه دانشجویان اتریش" },
  { name: "AMS Job Room", url: "https://www.ams.at", desc: "پورتال رسمی کاریابی" },
  { name: "MedUni Wien Nostrifizierung", url: "https://www.meduniwien.ac.at", desc: "ارزشیابی مدارک پزشکی" },
  { name: "Wien Wohnen", url: "https://www.wienerwohnen.at", desc: "خوابگاه و مسکن وین" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function ForumDiscussion() {
  const { user, profile, signIn, signOut } = useFirebase();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [activeReplies, setActiveReplies] = useState<Record<string, ForumReply[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState<string>('');
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostCategory, setNewPostCategory] = useState<'students' | 'housing' | 'jobs' | 'general'>('general');
  const [showNewPostForm, setShowNewPostForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [donationItems, setDonationItems] = useState([
    { id: 1, title: "میز کار و صندلی ایکیا (کاملاً نو)", city: "وین - منطقه ۲۰ (Brigittenau)", status: "ready", desc: "بسیار تمیز، مناسب برای دانشجوهای همکار اسکان در خوابگاه" },
    { id: 2, title: "کتاب‌های آلمانی آمادگی آزمون ÖSD سطح B2", city: "گراتس - میدان مرکزی", status: "donated", desc: "همراه با یادداشت‌های کلیدی گرامر فارسی ارزشمند" },
    { id: 3, title: "اتو بخار فیلیپس ایستاده (سالم)", city: "وین - منطقه ۲۱ (Floridsdorf)", status: "ready", desc: "مناسب اتوی پیراهن‌ها و کت‌وشلوارهای رسمی RWR" },
  ]);

  // ==========================================
  // FIREBASE: Load Posts
  // ==========================================
  useEffect(() => {
    let unmounted = false;
    const unsubscribe = onSnapshot(
      collection(db, "forum_posts"),
      async (snapshot) => {
        if (unmounted) return;

        if (snapshot.empty) {
          console.log("Seeding initial forum posts into cloud Firestore...");
          try {
            for (const post of INITIAL_FORUM_POSTS) {
              const postRef = doc(db, "forum_posts", post.id);
              const { replies, ...postData } = post;
              await setDoc(postRef, { ...postData, authorId: "seeded_author" });
              for (const rep of replies) {
                await setDoc(doc(db, "forum_posts", post.id, "replies", rep.id), {
                  ...rep,
                  authorId: "seeded_author",
                });
              }
            }
          } catch (err) {
            console.error("Auto-seeding error:", err);
          }
        } else {
          const postsList = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            replies: [],
          })) as ForumPost[];
          postsList.sort((a, b) => b.date.localeCompare(a.date));
          setPosts(postsList);
          setLoading(false);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "forum_posts");
        setLoading(false);
      }
    );

    return () => {
      unmounted = true;
      unsubscribe();
    };
  }, []);

  // ==========================================
  // FIREBASE: Load Replies
  // ==========================================
  useEffect(() => {
    if (!activePostId) return;

    const repliesRef = collection(db, "forum_posts", activePostId, "replies");
    const unsubscribe = onSnapshot(
      repliesRef,
      (snapshot) => {
        const repsList = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as ForumReply[];
        repsList.sort((a, b) => a.date.localeCompare(b.date));
        setActiveReplies((prev) => ({ ...prev, [activePostId]: repsList }));
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, `forum_posts/${activePostId}/replies`);
      }
    );

    return () => unsubscribe();
  }, [activePostId]);

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleUpvote = async (id: string, currentVotes: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateDoc(doc(db, "forum_posts", id), { upvotes: currentVotes + 1 });
      toast.success("رأی مثبت ثبت شد 👍");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `forum_posts/${id}`);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("لطفاً ابتدا وارد شوید");
      signIn();
      return;
    }
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const postId = `p_${Date.now()}`;
    const newPostData = {
      id: postId,
      title: newPostTitle,
      content: newPostContent,
      author: profile?.displayName || user.displayName || 'کاربر همکار',
      authorId: user.uid,
      upvotes: 1,
      repliesCount: 0,
      category: newPostCategory,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      await setDoc(doc(db, "forum_posts", postId), newPostData);
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPostForm(false);
      toast.success("پرسش شما با موفقیت منتشر شد 🎉");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `forum_posts/${postId}`);
    }
  };

  const handleAddReply = async (
    postId: string,
    currentRepliesCount: number,
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (!user) {
      toast.error("لطفاً ابتدا وارد شوید");
      signIn();
      return;
    }
    if (!replyInput.trim()) return;

    const replyId = `rep_${Date.now()}`;
    const replyData = {
      id: replyId,
      author: profile?.displayName || user.displayName || 'کاربر همکار',
      authorId: user.uid,
      content: replyInput,
      upvotes: 1,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      await setDoc(doc(db, "forum_posts", postId, "replies", replyId), replyData);
      await updateDoc(doc(db, "forum_posts", postId), {
        repliesCount: currentRepliesCount + 1,
      });
      setReplyInput('');
      toast.success("پاسخ شما ثبت شد ✅");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `forum_posts/${postId}/replies/${replyId}`);
    }
  };

  // ==========================================
  // FILTERED POSTS
  // ==========================================
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategory);

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      headline: "تالار گفتگوی ایرانیان و دانشجویان در اتریش",
      description:
        "جامعه آنلاین فارسی‌زبانان مقیم اتریش برای تبادل تجربه درباره تحصیل، مسکن، کار، نوستریفیکاسیون مدارک پزشکی و اهدای لوازم به تازه‌واردان.",
      url: "https://otrish-iran.ir/forum",
      inLanguage: "fa",
      author: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        url: "https://otrish-iran.ir",
      },
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/CommentAction",
          userInteractionCount: posts.reduce((acc, p) => acc + (p.repliesCount || 0), 0) || 12000,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: posts.reduce((acc, p) => acc + (p.upvotes || 0), 0) || 2400,
        },
      ],
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "اتریش‌نشین", item: "https://otrish-iran.ir" },
          { "@type": "ListItem", position: 2, name: "تالار گفتگو", item: "https://otrish-iran.ir/forum" },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "QAPage",
      name: "پرسش و پاسخ جامعه ایرانیان اتریش",
      description: "پرسش‌های متداول و پاسخ‌های تخصصی جامعه فارسی‌زبان اتریش درباره تحصیل، مسکن، کار و نوستریفیکاسیون",
      mainEntity: filteredPosts.slice(0, 5).map((p) => ({
        "@type": "Question",
        name: p.title,
        text: p.content,
        answerCount: p.repliesCount || 1,
        upvoteCount: p.upvotes || 1,
        author: { "@type": "Person", name: p.author },
        dateCreated: p.date,
        suggestedAnswer: (activeReplies[p.id] || []).slice(0, 1).map((r) => ({
          "@type": "Answer",
          text: r.content,
          author: { "@type": "Person", name: r.author },
          upvoteCount: r.upvotes || 1,
          dateCreated: r.date,
        })),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      sameAs: [
        "https://t.me/OTRISH_IRAN",
        "https://instagram.com/otrish__iran",
        "https://www.facebook.com/otrish.neshin",
      ],
    },
  ], [filteredPosts, activeReplies]);

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <>
      <SEO
        title="تالار گفتگوی ایرانیان و دانشجویان در اتریش | اتریش‌نشین"
        description="جامعه آنلاین فارسی‌زبانان مقیم اتریش: پرسش و پاسخ درباره تحصیل، خوابگاه، کار، نوستریفیکاسیون مدرک پزشکی، مسکن و اهدای لوازم به هموطنان تازه‌وارد. پاسخ متخصصان در کمتر از ۳ ساعت."
        keywords="تالار گفتگو ایرانیان اتریش, فروم فارسی اتریش, پرسش و پاسخ اتریش, خوابگاه دانشجویی وین, کارت RWR, نوستریفیکاسیون پزشکی, دیوار مهربانی اتریش, فروم دانشجویان ایرانی, جامعه فارسی زبانان وین"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/forum.jpg"
        type="article"
      />

      <div className="space-y-8 font-sans" dir="rtl">

        {/* ========================================== */}
        {/* HERO SECTION */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            💬
          </div>
          <div className="absolute top-8 left-1/3 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 shadow-2xl">
                <img
                  src={otrishLogo}
                  alt="تالار گفتگوی اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>حافظه ابری زنده — همگام‌سازی لحظه‌ای</span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                تالار گفتگوی اتریش‌نشین
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  جامعه فارسی‌زبانان اتریش
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                جایی که تجربه زیسته‌ی هموطنان مقیم اتریش به اشتراک گذاشته می‌شود. از پرسش‌های
                تمدید MA35 وین، تا نکات خوابگاه دانشجویی، کارت RWR، نوستریفیکاسیون مدرک
                دندان‌پزشکی و حتی دیوار مهربانی برای اهدای لوازم — همه در یک جامعه‌ی معتبر و
                پاسخگو.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ورود با گوگل (۱۰ ثانیه)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Users className="w-3.5 h-3.5" />
                  <span>۲,۴۰۰+ کاربر فعال</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Zap className="w-3.5 h-3.5" />
                  <span>پاسخ میانگین زیر ۳ ساعت</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-lg font-black text-[#c8102e]">{s.value}</div>
              <div className="text-[10px] text-stone-700 font-black mt-0.5 leading-tight">{s.label}</div>
              <div className="text-[9px] text-stone-400 mt-0.5 leading-tight">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ========================================== */}
        {/* MAIN FORUM MODULE */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-right">

          {/* ============ HEADER ============ */}
          <div className="p-6 border-b border-stone-100">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-stone-900 text-base sm:text-lg flex items-center gap-2 flex-wrap">
                  <MessageSquare className="w-5 h-5 text-[#c8102e]" />
                  تالار گفتگوی زنده
                  <span className="text-[10px] bg-gradient-to-r from-emerald-500 to-green-600 text-white px-2.5 py-1 rounded-full font-black flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    ONLINE
                  </span>
                </h2>
                <p className="text-xs text-stone-500 font-bold mt-1.5 leading-relaxed">
                  تجربیات زیسته مهاجرین، سوالات تمدید MA35 وین و حلقه‌های علمی به صورت همزمان
                </p>
              </div>

              {/* Auth + Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                {user ? (
                  <div className="flex items-center gap-2 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl px-3 py-2 text-xs">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || ""}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full ring-2 ring-emerald-200"
                      />
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center font-bold text-white text-[10px]">
                        👤
                      </span>
                    )}
                    <span className="font-black text-stone-800 hidden sm:inline">
                      {profile?.displayName || user.displayName || "کاربر همکار"}
                    </span>
                    <button
                      onClick={signOut}
                      className="text-red-600 font-black hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-lg cursor-pointer transition-all flex items-center gap-1"
                      title="خروج از حساب"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">خروج</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={signIn}
                    className="bg-gradient-to-br from-stone-800 to-stone-900 hover:from-stone-700 hover:to-stone-800 text-white text-xs font-black px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <LogIn className="w-4 h-4" />
                    ورود با گوگل
                  </button>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    if (!user) {
                      toast.error("لطفاً ابتدا وارد شوید");
                      signIn();
                      return;
                    }
                    setShowNewPostForm(!showNewPostForm);
                  }}
                  className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:opacity-90 text-white text-xs font-black px-4 py-2.5 rounded-2xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  پرسش جدید
                </motion.button>
              </div>
            </div>
          </div>

          {/* ============ CONTENT ============ */}
          <div className="p-6">

            {/* New Post Form */}
            <AnimatePresence>
              {showNewPostForm && user && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreatePost}
                  className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-5 mb-6 space-y-4 overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="font-black text-stone-800 text-sm">
                      طرح پرسش یا انتقال تجربه جدید
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black text-stone-500 mb-1.5 block">
                        عنوان پرسش:
                      </label>
                      <input
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="مثال: هزینه غذا در خوابگاه‌های وین چقدر است؟"
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]/40 outline-none text-right font-bold text-stone-800 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-stone-500 mb-1.5 block">
                        دسته‌بندی:
                      </label>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value as any)}
                        className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]/40 outline-none font-bold text-stone-800 transition"
                      >
                        <option value="general">عمومی (General)</option>
                        <option value="students">دانشجویی (Students)</option>
                        <option value="housing">مسکن و خوابگاه (Housing)</option>
                        <option value="jobs">کارت RWR و مارکت کار</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-stone-500 mb-1.5 block">
                      جزئیات و توضیحات:
                    </label>
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="جزئیات و توضیحات را به فارسی بنویسید..."
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-xs h-24 focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]/40 outline-none font-bold text-right text-stone-800 transition resize-none"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowNewPostForm(false)}
                      className="text-stone-600 px-4 py-2 text-xs font-black hover:bg-stone-100 rounded-xl transition"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:opacity-90 text-white px-5 py-2 text-xs font-black rounded-xl cursor-pointer transition shadow-md"
                    >
                      🚀 انتشار پرسش
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Search + Categories */}
            <div className="space-y-4 mb-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو در عنوان، محتوا یا نویسنده..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-11 pl-10 py-3 text-xs font-bold text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]/40 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-stone-600" />
                  </button>
                )}
              </div>

              {/* Category chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? `bg-gradient-to-br ${cat.color} text-white shadow-md`
                          : `${cat.bg} ${cat.text} hover:opacity-80 border border-current/10`
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Active category description */}
              {activeCategory && activeCategory.id !== "all" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${activeCategory.bg} border border-current/10 rounded-2xl p-3 flex items-center gap-2`}
                >
                  <Info className={`w-4 h-4 ${activeCategory.text} shrink-0`} />
                  <span className={`text-[11px] font-black ${activeCategory.text}`}>
                    {activeCategory.description}
                  </span>
                </motion.div>
              )}
            </div>

            {/* ============ LOADING ============ */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="relative">
                  <Loader2 className="w-12 h-12 animate-spin text-[#c8102e]" />
                  <div className="absolute inset-0 animate-ping">
                    <Loader2 className="w-12 h-12 text-[#c8102e]/30" />
                  </div>
                </div>
                <span className="text-xs font-black text-stone-500">
                  در حال همگام‌سازی لحظه‌ای تالار گفتگو...
                </span>
                <span className="text-[10px] font-bold text-stone-400">
                  اتصال به پایگاه داده Firestore اتریش‌نشین
                </span>
              </div>
            ) : (
              <div className="space-y-4">

                {/* ========================================== */}
                {/* SPECIAL: NOSTRIFIZIERUNG */}
                {/* ========================================== */}
                {selectedCategory === 'nostrifizierung' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Warning */}
                    <div className="bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200 text-amber-950 p-5 rounded-2xl leading-relaxed text-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                          <Stethoscope className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <strong className="font-black text-sm block mb-1">
                            👔 تالار نوستریفیکاسیون (معادل‌سازی مدرک درمانی)
                          </strong>
                          <p className="font-bold leading-relaxed">
                            برای دندان‌پزشکان، پزشکان و پرستاران فارغ‌التحصیل خارج از اتحادیه
                            اروپا، گذراندن فرآیند معادل‌سازی مدرک (Nostrifizierung) در دانشگاه
                            علوم پزشکی وین (MedUni Wien) برای گرفتن پروانه اجباری است.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Two group cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white border-2 border-amber-200 hover:border-amber-300 rounded-3xl p-5 space-y-3 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black px-2.5 py-1 rounded-full">
                            پزشکی عمومی و تخصص
                          </span>
                          <Stethoscope className="w-4 h-4 text-amber-600" />
                        </div>
                        <h5 className="font-black text-sm text-stone-900 leading-snug">
                          آزمون ارزشیابی دانشگاه علوم پزشکی وین (MedUni Wien)
                        </h5>
                        <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
                          گروه همفکری و اشتراک تجارب خرید کتاب‌های آزمون کلینیکی، گواهی زبان
                          آلمانی کادر درمان (Fachsprachenprüfung) سطح C1.
                        </p>
                        <button
                          type="button"
                          onClick={() => toast.success("لینک دعوت به کانال پزشکان ارسال شد")}
                          className="w-full bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
                        >
                          <Users className="w-3.5 h-3.5" />
                          ورود به گروه پزشکان ایرانی اتریش
                        </button>
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white border-2 border-rose-200 hover:border-rose-300 rounded-3xl p-5 space-y-3 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-gradient-to-br from-rose-500 to-red-600 text-white font-black px-2.5 py-1 rounded-full">
                            دندان‌پزشکان
                          </span>
                          <Award className="w-4 h-4 text-rose-600" />
                        </div>
                        <h5 className="font-black text-sm text-stone-900 leading-snug">
                          فرآیند همسانی مدارک دندان‌پزشکی در اتریش
                        </h5>
                        <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
                          جدول دروس پیش‌نیاز و امتحانات عملی دندان‌پزشکی MedUni و تاییدیه انجمن
                          دندان‌پزشکی اتریش (Österreichische Zahnärztekammer).
                        </p>
                        <button
                          type="button"
                          onClick={() => toast.success("لینک دعوت به کانال دندان‌پزشکان ارسال شد")}
                          className="w-full bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-black text-[11px] py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
                        >
                          <Users className="w-3.5 h-3.5" />
                          ورود به حلقه تلگرامی دندانپزشکی
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ========================================== */}
                {/* SPECIAL: WALL OF KINDNESS */}
                {/* ========================================== */}
                {selectedCategory === 'kindness' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-l from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <strong className="font-black text-sm text-rose-950 block mb-1">
                            🌸 دیوار مهربانی و اهدای لوازم اتریش‌نشین
                          </strong>
                          <p className="text-[11px] text-rose-800 font-bold leading-relaxed">
                            بجای دور انداختن لوازم کمددار خود موقع جابجایی از خوابگاه یا سوئیت،
                            آن‌ها را رایگان به هموطنان تازه‌وارد اتریش واگذار نمایید و امتیاز
                            کانون بگیرید.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {donationItems.map((it) => (
                        <motion.div
                          key={it.id}
                          whileHover={{ y: -3 }}
                          className={`bg-white border-2 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                            it.status === "ready"
                              ? "border-emerald-200 hover:border-emerald-300"
                              : "border-stone-200 opacity-70"
                          }`}
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                                  it.status === "ready"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-stone-200 text-stone-500"
                                }`}
                              >
                                {it.status === "ready" ? "✓ آماده اهدا" : "✓ واگذار شد"}
                              </span>
                              <h5 className="font-black text-xs text-stone-900">
                                {it.title}
                              </h5>
                            </div>
                            <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                              {it.desc}
                            </p>
                            <span className="text-[10px] text-stone-400 font-bold flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {it.city}
                            </span>
                          </div>

                          {it.status === "ready" && (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              type="button"
                              onClick={() => {
                                setDonationItems((prev) =>
                                  prev.map((item) =>
                                    item.id === it.id
                                      ? { ...item, status: "donated" }
                                      : item
                                  )
                                );
                                toast.success("درخواست دریافت ثبت شد — آی‌دی اهداکننده ارسال شد");
                              }}
                              className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:opacity-90 text-white font-black text-[11px] px-5 py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap shadow-md"
                            >
                              📬 درخواست دریافت
                            </motion.button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ========================================== */}
                {/* REGULAR POSTS */}
                {/* ========================================== */}
                {selectedCategory !== "nostrifizierung" &&
                  selectedCategory !== "kindness" && (
                    <>
                      {filteredPosts.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-16 bg-gradient-to-br from-stone-50 to-white border-2 border-dashed border-stone-200 rounded-3xl"
                        >
                          <div className="w-16 h-16 mx-auto bg-stone-100 rounded-2xl flex items-center justify-center mb-3">
                            <MessageSquare className="w-8 h-8 text-stone-400" />
                          </div>
                          <h3 className="text-sm font-black text-stone-700 mb-1">
                            هیچ گفتگویی یافت نشد
                          </h3>
                          <p className="text-[11px] text-stone-400 font-bold">
                            اولین نفری باشید که در این دسته موضوع جدیدی مطرح می‌کند!
                          </p>
                        </motion.div>
                      ) : (
                        <div className="space-y-3">
                          {filteredPosts.map((post) => {
                            const isExpanded = activePostId === post.id;
                            const replies = activeReplies[post.id] || [];
                            const catMeta = CATEGORIES.find(
                              (c) => c.id === post.category
                            ) || CATEGORIES[0];

                            return (
                              <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`border-2 rounded-3xl overflow-hidden transition-all ${
                                  isExpanded
                                    ? "border-[#c8102e]/30 bg-gradient-to-br from-[#c8102e]/[0.02] to-transparent shadow-lg"
                                    : "border-stone-200 bg-white hover:border-stone-300 hover:shadow-md"
                                }`}
                              >
                                {/* Post Header */}
                                <div
                                  onClick={() =>
                                    setActivePostId(isExpanded ? null : post.id)
                                  }
                                  className="p-5 cursor-pointer flex items-start gap-4 hover:bg-stone-50/40 transition"
                                  id={`post-summary-${post.id}`}
                                >
                                  {/* Vote Panel */}
                                  <div className="flex flex-col items-center bg-gradient-to-b from-stone-50 to-white border-2 border-stone-200 rounded-2xl p-2 shrink-0 min-w-[48px]">
                                    <motion.button
                                      whileTap={{ scale: 0.85 }}
                                      onClick={(e) =>
                                        handleUpvote(post.id, post.upvotes, e)
                                      }
                                      className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#c8102e]/10 text-stone-400 hover:text-[#c8102e] transition-all cursor-pointer"
                                      title="رأی مثبت"
                                    >
                                      <ThumbsUp className="w-3.5 h-3.5" />
                                    </motion.button>
                                    <span className="text-sm font-black font-mono text-stone-800 my-1">
                                      {post.upvotes}
                                    </span>
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 text-right min-w-0">
                                    {/* Meta row */}
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                      <span
                                        className={`text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 ${catMeta.bg} ${catMeta.text}`}
                                      >
                                        <catMeta.icon className="w-3 h-3" />
                                        {catMeta.label}
                                      </span>
                                      <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-bold">
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-[10px]">
                                          👤
                                        </div>
                                        <span className="text-stone-700">
                                          {post.author}
                                        </span>
                                      </div>
                                      <span className="text-[10px] text-stone-300">
                                        •
                                      </span>
                                      <span className="text-[10px] text-stone-400 font-mono">
                                        {post.date}
                                      </span>
                                    </div>

                                    <h4 className="font-black text-stone-900 text-sm leading-snug mb-2">
                                      {post.title}
                                    </h4>
                                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed font-bold">
                                      {post.content}
                                    </p>

                                    {/* Footer actions */}
                                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                                      <div className="flex items-center gap-1.5 text-[10px] font-black text-[#c8102e]">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>{post.repliesCount} پاسخ</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400">
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>نمایش</span>
                                      </div>
                                      <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        className="ml-auto text-[#c8102e]"
                                      >
                                        <ChevronDown className="w-4 h-4" />
                                      </motion.div>
                                    </div>
                                  </div>
                                </div>

                                {/* Replies Section */}
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-t border-stone-200 bg-gradient-to-br from-stone-50/60 to-white p-5 space-y-4 overflow-hidden"
                                    >
                                      {/* Full content */}
                                      <div className="bg-white border border-stone-200 p-4 rounded-2xl text-xs text-stone-800 leading-relaxed font-bold">
                                        <div className="flex items-start gap-2">
                                          <Quote className="w-4 h-4 text-[#c8102e]/40 shrink-0 mt-0.5" />
                                          <p>{post.content}</p>
                                        </div>
                                      </div>

                                      <h5 className="font-black text-stone-700 text-xs pb-2 border-b border-stone-100 flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-[#c8102e]" />
                                        پاسخ‌های هموطنان متخصص
                                        {replies.length > 0 && (
                                          <span className="text-[9px] bg-[#c8102e]/10 text-[#c8102e] px-2 py-0.5 rounded-full font-black">
                                            {replies.length}
                                          </span>
                                        )}
                                      </h5>

                                      {replies.length > 0 ? (
                                        <div className="space-y-3 pr-3 border-r-2 border-[#c8102e]/20">
                                          {replies.map((reply, idx) => (
                                            <motion.div
                                              key={reply.id}
                                              initial={{ opacity: 0, x: 10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ delay: idx * 0.05 }}
                                              className="bg-white p-4 rounded-2xl border border-stone-200 hover:border-stone-300 transition"
                                            >
                                              <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center text-[10px]">
                                                    👤
                                                  </div>
                                                  <span className="text-[11px] font-black text-stone-700">
                                                    {reply.author}
                                                  </span>
                                                </div>
                                                <span className="text-[10px] font-mono text-stone-400 font-bold">
                                                  {reply.date}
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-stone-700 leading-relaxed font-bold pr-8">
                                                {reply.content}
                                              </p>
                                            </motion.div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="text-center py-6 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                                          <div className="text-3xl mb-2">💭</div>
                                          <p className="text-[11px] text-stone-500 font-black">
                                            هنوز پاسخی ثبت نشده — اولین نفر باشید!
                                          </p>
                                        </div>
                                      )}

                                      {/* Reply form */}
                                      <form
                                        onSubmit={(e) =>
                                          handleAddReply(
                                            post.id,
                                            post.repliesCount,
                                            e
                                          )
                                        }
                                        className="flex gap-2 pt-2"
                                      >
                                        <input
                                          type="text"
                                          value={replyInput}
                                          onChange={(e) =>
                                            setReplyInput(e.target.value)
                                          }
                                          placeholder={
                                            user
                                              ? "پاسخ تخصصی یا تجربه کاربردی خود را بنویسید..."
                                              : "جهت ثبت دیدگاه ابتدا وارد شوید."
                                          }
                                          className="flex-1 bg-white border-2 border-stone-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-[#c8102e]/40 focus:ring-2 focus:ring-[#c8102e]/10 text-right text-stone-800 font-bold transition"
                                          required
                                          disabled={!user}
                                        />
                                        {user ? (
                                          <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            type="submit"
                                            className="bg-gradient-to-br from-stone-800 to-stone-900 hover:from-stone-700 hover:to-stone-800 text-white px-5 py-3 rounded-2xl text-xs font-black cursor-pointer transition-all shadow-md flex items-center gap-2"
                                          >
                                            <Send className="w-3.5 h-3.5" />
                                            ثبت نظر
                                          </motion.button>
                                        ) : (
                                          <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            type="button"
                                            onClick={signIn}
                                            className="bg-gradient-to-br from-sky-500 to-blue-600 hover:opacity-90 text-white px-5 py-3 rounded-2xl text-xs font-black cursor-pointer transition-all shadow-md whitespace-nowrap flex items-center gap-2"
                                          >
                                            <LogIn className="w-3.5 h-3.5" />
                                            ورود
                                          </motion.button>
                                        )}
                                      </form>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* FORUM RULES */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#c8102e]" />
              قوانین طلایی جامعه اتریش‌نشین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چهار اصل اساسی که فضای گفتگو را سالم، مفید و قابل اعتماد نگه می‌دارد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FORUM_RULES.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group"
                >
                  <div className="absolute top-2 left-3 text-6xl font-black text-stone-100 group-hover:text-stone-200 transition-colors select-none">
                    {i + 1}
                  </div>
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">
                    {rule.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {rule.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره تالار گفتگو
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین پرسش‌های کاربران
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* OFFICIAL SOURCES */}
        {/* ========================================== */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">
                منابع رسمی مورد استناد جامعه
              </h3>
              <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                برای راستی‌آزمایی مستقل اطلاعات به‌اشتراک‌گذاشته‌شده
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOURCES.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white hover:bg-white border border-stone-200 hover:border-indigo-300 rounded-2xl p-4 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-stone-800 truncate">
                    {s.name}
                  </div>
                  <div className="text-[9px] text-stone-500 font-bold">{s.desc}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-indigo-500 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* FINAL CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Rocket className="w-3.5 h-3.5 text-amber-300" />
              همین حالا عضو جامعه شوید
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوالی دارید که پاسخش را نمی‌دانید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              ۲,۴۰۰ فارسی‌زبان مقیم اتریش آماده پاسخ به پرسش شما هستند. از تمدید اقامت
              و مالیات، تا خرید خانه، ثبت شرکت و پیدا کردن مدرسه برای فرزندان — هیچ سوالی
              بی‌پاسخ نمی‌ماند.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => {
                  if (!user) signIn();
                  else setShowNewPostForm(true);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                مطرح کردن پرسش
              </button>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
                پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ۱۰۰٪ رایگان
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                حریم خصوصی محفوظ
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                ساخته‌شده با عشق برای هموطنان
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* DISCLAIMER */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">
              یادآوری حقوقی مهم
            </h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              محتوای تالار گفتگوی اتریش‌نشین، تجربیات شخصی کاربران است و نه مشاوره رسمی.
              اتریش‌نشین مسئولیت صحت اطلاعات به‌اشتراک‌گذاشته‌شده توسط کاربران را نمی‌پذیرد.
              برای تصمیم‌های حقوقی، مالیاتی یا پزشکی، همیشه با منابع رسمی (BMF، BMI، ÖGK،
              وکیل مهاجرت) مشورت کنید. در صورت مشاهده اطلاعات نادرست، از طریق دکمه‌های
              گزارش یا تلگرام به ما اطلاع دهید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// FAQ ITEM
// ==========================================
function FaqItem({
  q, a, isOpen, onToggle, index,
}: {
  q: string; a: string; isOpen: boolean; onToggle: () => void; index: number; key?: React.Key;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border transition-all overflow-hidden ${
        isOpen ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md" : "border-stone-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition"
      >
        <span className="flex items-center gap-3 flex-1">
          <span
            className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${
              isOpen
                ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {index + 1}
          </span>
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-[#c8102e]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}