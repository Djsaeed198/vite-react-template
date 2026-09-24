import React, { useState, useEffect } from "react";
import { collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../utils/firebase';
import { useFirebase } from '../utils/firebaseContext';
import { PlaneTakeoff, Plus, LogIn, Loader2, Heart, Award } from "lucide-react";

interface CarpoolTrip {
  id: string;
  traveler: string;
  travelerId: string;
  origin: string;
  destination: string;
  date: string;
  spaceAvailable: string;
  notes: string;
  contact: string;
  likes: number;
}

interface HonoraryHost {
  id: string;
  name: string;
  hostId: string;
  city: string;
  periodInSpain: string;
  expertise: string;
  notes: string;
  contactMethod: string;
  rating: number;
}

const INITIAL_CARPOOLS: CarpoolTrip[] = [
  {
    id: "cp1",
    traveler: "کیان افشار",
    travelerId: "seeded_author",
    origin: "تهران (IKA)",
    destination: "وین (VIE)",
    date: "2026-06-12",
    spaceAvailable: "چمدان خالی (۵ کیلو مجاز جهت مدارک تحصیلی و ترجمه رسمی)",
    notes: "پرواز مستقیم ایران‌ایر / اتریشی دارم. می‌توانم مدارک تحصیلی مهرشده، شناسنامه آپوستیل یا نامه‌های اداری شما را با کارمزد ناچیز آورده و در ایستگاه مرکزی وین (Hauptbahnhof) حضوری تحویل دهم.",
    contact: "@kian_vienna",
    likes: 7
  },
  {
    id: "cp2",
    traveler: "مژگان صفری",
    travelerId: "seeded_author",
    origin: "اصفهان (IFN)",
    destination: "وین (VIE)",
    date: "2026-06-25",
    spaceAvailable: "همسفر ترانزیت استانبول مایل به هم‌پیمایی",
    notes: "پرواز پگاسوس دو تکه دارم. اگر کسی اولین بارشه سفر میکنه و مایل به همراهی در ترانزیت فرودگاه صبیحه استانبوله، خوشحال میشم با هم مسیر رو طی کنیم.",
    contact: "@mozhgan_at",
    likes: 9
  }
];

const INITIAL_HOSTS: HonoraryHost[] = [
  {
    id: "host1",
    name: "آرش بهرامی",
    hostId: "seeded_author",
    city: "وین - ساکن منطقه ۱۰ Favoriten",
    periodInSpain: "۶ سال اقامت کاری (مهندس ارشد آمار)",
    expertise: "مسائل تمدید MA 35، فعال‌سازی ID Austria، مهدکودک‌های دولتی اتریش",
    notes: "خوشحال میشم به همکاران تازه‌وارد در وین کمک کنم. یکشنبه‌ها عصر در کافه دنج منطقه ۱۰ وین مهمان من به صرف یک قهوه اسپرسو اتریشی (Wiener Melange) باشید تا دغدغه‌های شروع فرآیندهای اداری را با هم بررسی کنیم.",
    contactMethod: "پیام در تلگرام @Arash_Vienna_Melange",
    rating: 5.0
  },
  {
    id: "host2",
    name: "دکتر المیرا صالحی",
    hostId: "seeded_author",
    city: "گراتس - نزدیک دانشگاه پزشکی",
    periodInSpain: "۴ سال اقامت تحصیلی و معادل‌سازی",
    expertise: "فرآیند نوستریفیکاسیون دندان‌پزشکی و پزشکی MedUni، بیمه تامین اجتماعی ÖGK",
    notes: "دانشجوهای پزشکی یا فارغ‌التحصیلانی که برای آزمون‌های تاییدیه مدارک به بستر گراتس وارد میشن، میتونم تا حد امکان تجربیاتم رو برای قبولی بدون چالش درس‌ها به اشتراک بگذارم.",
    contactMethod: "ایمیل e.salehi@grazmed.at",
    rating: 4.9
  }
];

export default function CarpoolNetworking() {
  const { user, profile, signIn } = useFirebase();
  const [activeTab, setActiveTab] = useState<"carpool" | "hosts">("carpool");
  const [carpools, setCarpools] = useState<CarpoolTrip[]>([]);
  const [hosts, setHosts] = useState<HonoraryHost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPostForm, setShowPostForm] = useState<boolean>(false);

  // Carpool Form states
  const [travelerName, setTravelerName] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [tripDate, setTripDate] = useState<string>("");
  const [spaceAvail, setSpaceAvail] = useState<string>("");
  const [notesInput, setNotesInput] = useState<string>("");
  const [contactInput, setContactInput] = useState<string>("");

  // Host Form States
  const [hostName, setHostName] = useState<string>("");
  const [hostCity, setHostCity] = useState<string>("");
  const [hostPeriod, setHostPeriod] = useState<string>("");
  const [hostExpertise, setHostExpertise] = useState<string>("");
  const [hostNotes, setHostNotes] = useState<string>("");
  const [hostContact, setHostContact] = useState<string>("");

  // Read carpools from Cloud Firestore with auto-seeding
  useEffect(() => {
    let unmounted = false;
    const unsubscribe = onSnapshot(collection(db, "carpools"), async (snapshot) => {
      if (unmounted) return;
      if (snapshot.empty) {
        console.log("Seeding initial flights to Firestore...");
        try {
          for (const trip of INITIAL_CARPOOLS) {
            await setDoc(doc(db, "carpools", trip.id), trip);
          }
        } catch (e) {
          console.error("Carpool seed error:", e);
        }
      } else {
        const list = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        })) as CarpoolTrip[];
        list.sort((a, b) => b.date.localeCompare(a.date));
        setCarpools(list);
        setLoading(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "carpools");
      setLoading(false);
    });

    return () => {
      unmounted = true;
      unsubscribe();
    };
  }, []);

  // Read hosts from Cloud Firestore with auto-seeding
  useEffect(() => {
    let unmounted = false;
    const unsubscribe = onSnapshot(collection(db, "honorary_hosts"), async (snapshot) => {
      if (unmounted) return;
      if (snapshot.empty) {
        console.log("Seeding initial honorary hosts to Firestore...");
        try {
          for (const host of INITIAL_HOSTS) {
            await setDoc(doc(db, "honorary_hosts", host.id), host);
          }
        } catch (e) {
          console.error("Hosts seed error:", e);
        }
      } else {
        const list = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        })) as HonoraryHost[];
        setHosts(list);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "honorary_hosts");
    });

    return () => {
      unmounted = true;
      unsubscribe();
    };
  }, []);

  const handleLikeTrip = async (id: string, currentLikes: number) => {
    try {
      await updateDoc(doc(db, "carpools", id), {
        likes: currentLikes + 1
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `carpools/${id}`);
    }
  };

  const handleCreateCarpool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("لطفاً ابتدا با حساب گوگل خود وارد سایت شوید.");
      signIn();
      return;
    }
    if (!travelerName.trim() || !contactInput.trim() || !notesInput.trim()) return;

    const carpoolId = `cp_${Date.now()}`;
    const newCp: CarpoolTrip = {
      id: carpoolId,
      traveler: travelerName,
      travelerId: user.uid,
      origin: origin || "تهران (IKA)",
      destination: destination || "وین (VIE)",
      date: tripDate || new Date().toISOString().split("T")[0],
      spaceAvailable: spaceAvail || "پاکت سبک اداری",
      notes: notesInput,
      contact: contactInput,
      likes: 1
    };

    try {
      await setDoc(doc(db, "carpools", carpoolId), newCp);
      setTravelerName("");
      setOrigin("");
      setDestination("");
      setTripDate("");
      setSpaceAvail("");
      setNotesInput("");
      setContactInput("");
      setShowPostForm(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `carpools/${carpoolId}`);
    }
  };

  const handleCreateHost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("لطفاً ابتدا با حساب گوگل خود وارد سایت شوید.");
      signIn();
      return;
    }
    if (!hostName.trim() || !hostContact.trim() || !hostNotes.trim()) return;

    const hostId = `host_${Date.now()}`;
    const newHost: HonoraryHost = {
      id: hostId,
      name: hostName,
      hostId: user.uid,
      city: hostCity || "وین - ساکن اتریش",
      periodInSpain: hostPeriod || "۲ سال",
      expertise: hostExpertise || "امور عمومی اداری و ملدینگ",
      notes: hostNotes,
      contactMethod: hostContact,
      rating: 5.0
    };

    try {
      await setDoc(doc(db, "honorary_hosts", hostId), newHost);
      setHostName("");
      setHostCity("");
      setHostPeriod("");
      setHostExpertise("");
      setHostNotes("");
      setHostContact("");
      setShowPostForm(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `honorary_hosts/${hostId}`);
    }
  };

  return (
    <div id="carpooling-networking-module font-sans" className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm overflow-hidden relative text-right">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-red-650 via-white to-red-650 bg-red-600"></div>

      {/* Header block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-lg">
            👥
          </div>
          <div>
            <h3 className="font-extrabold text-stone-850 text-lg flex items-center gap-2">
              <span>باشگاه همسفران و میزبان‌های افتخاری اتریش</span>
              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">ابری</span>
            </h3>
            <p className="text-xs text-stone-400 font-bold mt-1">همسفریابی، ارسال پاکت‌های سبک ترجمه رسمی به وین + مشاوره دوستانه رایگان دورهمی</p>
          </div>
        </div>

        {/* Toggle navigation */}
        <div className="flex bg-stone-100 p-0.5 rounded-xl border border-stone-200 self-start">
          <button
            onClick={() => { setActiveTab("carpool"); setShowPostForm(false); }}
            className={`text-xs px-4 py-2 rounded-lg font-black transition-all cursor-pointer ${
              activeTab === "carpool" ? "bg-white text-red-700 shadow-xs" : "text-stone-500 hover:text-stone-805"
            }`}
          >
            ✈️ همسفران تهران - وین
          </button>
          <button
            onClick={() => { setActiveTab("hosts"); setShowPostForm(false); }}
            className={`text-xs px-4 py-2 rounded-lg font-black transition-all cursor-pointer ${
              activeTab === "hosts" ? "bg-white text-red-700 shadow-xs" : "text-stone-500 hover:text-stone-805"
            }`}
          >
            🏡 میزبان‌های افتخاری بومی
          </button>
        </div>
      </div>

      {/* Main Container description & post request button */}
      <div className="bg-stone-50 border border-stone-150 p-4 rounded-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 space-y-1 text-right">
          <h4 className="font-black text-stone-800 text-xs sm:text-sm">
            {activeTab === "carpool" ? "امکان جابجایی تاییدیه مدارک تحصیلی یا تحویل بسته‌های ممهور ویزا در مقصد" : "آشنایی، گپ به صرف Wiener Melange و مشاوره بدون تضاد منافع"}
          </h4>
          <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
            {activeTab === "carpool"
              ? "انتقال اصل ترجمه‌های قسم‌خورده یا پاسپورت‌های لیبل‌دار از ایران به اتریش همواره یکی از چالش‌های بزرگ دانشجویان کانون در روزهای نخست ورود است."
              : "همکاران مقیمی که دغدغه‌های تمدید پرونده های MA 35 وین را با موفقیت سپری کرده‌اند، به رایگان نیم ساعت وقت کافه خود را در اختیار شما می‌گذارند."}
          </p>
        </div>

        <button
          onClick={() => {
            if (!user) {
              alert("لطفاً ابتدا وارد حساب گوگل خود شوید.");
              signIn();
              return;
            }
            setShowPostForm(!showPostForm);
          }}
          className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 self-start md:self-center flex items-center gap-1"
        >
          <span>{activeTab === "carpool" ? "ثبت اعلامیه سفر جدید" : "درخواست عضویت داوطلبانه"}</span>
        </button>
      </div>

      {showPostForm && user && (
        <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl mb-6 animate-fade-in">
          {activeTab === "carpool" ? (
            /* CARPOOL FORM */
            <form onSubmit={handleCreateCarpool} className="space-y-4">
              <h4 className="font-black text-xs text-stone-805 border-b border-stone-200 pb-2">ثبت سفر جدید به اتریش (پرواز وین / قطر / ترکیش)</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">نام کامل مسافر:</label>
                  <input
                    type="text"
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    placeholder="مثال: بردیا افشار"
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">فرودگاه مبدا:</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="تهران (IKA)"
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">فرودگاه مقصد:</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="وین (VIE) / گراتس"
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">تاریخ پرواز:</label>
                  <input
                    type="date"
                    value={tripDate}
                    onChange={(e) => setTripDate(e.target.value)}
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">میزان حجم یا فضای خالی:</label>
                  <input
                    type="text"
                    value={spaceAvail}
                    onChange={(e) => setSpaceAvail(e.target.value)}
                    placeholder="کتاب سبک، مدارک تحصیلی در پاکت، چمدان کامل..."
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">شناسه ارتباطی (آی‌دی تلگرام):</label>
                  <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder="@ID_Telegram یا ایمیل..."
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-500 block mb-1">توضیحات تکمیلی مسافرت:</label>
                <textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="محدودیت‌های وزنی، شرایط تحویل در ایستگاه قطار وین یا خوابگاه..."
                  className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none h-20 text-stone-800"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowPostForm(false)} className="text-xs text-stone-500 hover:bg-stone-200 px-4 py-2 rounded-xl">انصراف</button>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2 rounded-xl">ثبت و انتشار پرواز</button>
              </div>
            </form>
          ) : (
            /* HOST FORM */
            <form onSubmit={handleCreateHost} className="space-y-4">
              <h4 className="font-black text-xs text-stone-805 border-b border-stone-200 pb-2">عضویت داوطلبانه همکار بومی ساکن اتریش</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">نام و نام خانوادگی:</label>
                  <input
                    type="text"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="امیر مسعودی"
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">شهر محل اقامت در اتریش:</label>
                  <input
                    type="text"
                    value={hostCity}
                    onChange={(e) => setHostCity(e.target.value)}
                    placeholder="وین - منطقه ۹ Alsergrund"
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">مدت زمان زندگی در اتریش:</label>
                  <input
                    type="text"
                    value={hostPeriod}
                    onChange={(e) => setHostPeriod(e.target.value)}
                    placeholder="۵ سال"
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">حوزه تخصص مشاوره شروع اقامت:</label>
                  <input
                    type="text"
                    value={hostExpertise}
                    onChange={(e) => setHostExpertise(e.target.value)}
                    placeholder="معادل‌سازی مدارک مهندسی، ثبت Meldezettel، تمدید MA 35..."
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-500 block mb-1">نحوه ارتباط دوستانه:</label>
                  <input
                    type="text"
                    value={hostContact}
                    onChange={(e) => setHostContact(e.target.value)}
                    placeholder="موبایل یا کانال تلگرام"
                    className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-stone-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-500 block mb-1">درباره خودتان و شرایط مشاوره:</label>
                <textarea
                  value={hostNotes}
                  onChange={(e) => setHostNotes(e.target.value)}
                  placeholder="من بیشتر روزهای یکشنبه در کافه دنج فلان آزاد هستم..."
                  className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none h-20 text-stone-800"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowPostForm(false)} className="text-xs text-stone-500 hover:bg-stone-200 px-4 py-2 rounded-xl">انصراف</button>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2 rounded-xl">ثبت و ارائه خدمت داوطلبانه</button>
              </div>
            </form>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-stone-400">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
          <span className="text-xs font-bold">درحال همگام‌سازی ابری باشگاه پرواز اتریش...</span>
        </div>
      ) : (
        /* Grid listing */
        activeTab === "carpool" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-right animate-fade-in">
            {carpools.map((trip) => (
              <div key={trip.id} className="bg-stone-50/65 border border-stone-200/80 p-5 rounded-2xl flex flex-col justify-between hover:border-red-300 hover:bg-white transition-all shadow-3xs">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[10px] text-stone-400 font-mono">پرواز: {trip.date}</span>
                    <span className="font-extrabold text-red-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <PlaneTakeoff className="w-3.5 h-3.5" />
                      <span>{trip.origin} ← {trip.destination}</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-xs text-stone-805">مسافر: {trip.traveler}</h4>
                    <p className="text-[10px] text-red-600 font-bold bg-rose-50 inline-block px-2 py-0.5 rounded-md">
                      حجم بار: {trip.spaceAvailable}
                    </p>
                  </div>

                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                    {trip.notes}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-150 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => handleLikeTrip(trip.id, trip.likes)}
                    className="flex items-center gap-1.5 font-bold font-mono text-stone-450 hover:text-red-600 cursor-pointer transition-colors"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-red-550" />
                    <span>تایید اعتبار ({trip.likes})</span>
                  </button>

                  <a
                    href={`https://t.me/${trip.contact.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-stone-900 hover:bg-stone-850 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-lg inline-block transition-colors"
                  >
                    ارتباط تلگرامی {trip.contact}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-right animate-fade-in">
            {hosts.map((host) => (
              <div key={host.id} className="bg-stone-50/60 border border-stone-200/80 p-5 rounded-2xl flex flex-col justify-between hover:border-red-300 hover:bg-white transition-all shadow-3xs">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-black text-[10px] bg-rose-50 text-red-700 px-2 py-0.5 rounded flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>★ {host.rating.toFixed(1)} همیار برتر کانون</span>
                    </span>
                    <span className="font-bold text-stone-500 font-mono">
                      📍 {host.city}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-stone-850 text-sm">میزبان: {host.name}</h4>
                    <p className="text-[10px] text-stone-400 font-bold">{host.periodInSpain}</p>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-stone-150 space-y-1">
                    <span className="text-[9px] bg-rose-50 text-red-805 font-black px-1.5 py-0.5 rounded">زمینه‌های قوی تجربی:</span>
                    <p className="text-[10px] font-bold text-stone-700 leading-relaxed">{host.expertise}</p>
                  </div>

                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                    {host.notes}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-150 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-stone-400 font-extrabold">{host.contactMethod}</span>
                  <button
                    type="button"
                    onClick={() => alert(`پیام درخواست همفکری و قهوه با ${host.name} به درگاه ارسال شد!`)}
                    className="bg-red-600 hover:bg-red-700 text-white font-black text-[10px] px-4 py-2 rounded-xl cursor-pointer transition-colors"
                  >
                    رزرو قهوه دوستانه ☕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}