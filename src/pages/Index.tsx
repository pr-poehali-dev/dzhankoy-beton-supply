import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/4eaed147-9789-478a-991e-1fa456bada94/files/6805ff7b-b774-484d-a849-533976798f6a.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "about", label: "О нас" },
  { id: "services", label: "Услуги" },
  { id: "calculator", label: "Калькулятор" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
];

const CATEGORIES = ["Все", "Плиты перекрытия", "Сваи", "Колонны", "Фундаментные блоки", "Балки", "Лестничные марши"];

const PRODUCTS = [
  { id: 1, name: "Плита перекрытия ПК 60-15-8", category: "Плиты перекрытия", price: "от 12 500 ₽", weight: "4.2 т", size: "6000×1500×220", badge: "Хит" },
  { id: 2, name: "Свая С120-30", category: "Сваи", price: "от 8 900 ₽", weight: "2.9 т", size: "300×300×12000", badge: null },
  { id: 3, name: "Колонна КС-3", category: "Колонны", price: "от 15 200 ₽", weight: "3.1 т", size: "400×400×6000", badge: "Новинка" },
  { id: 4, name: "Фундаментный блок ФБС 24-4-6", category: "Фундаментные блоки", price: "от 4 100 ₽", weight: "1.4 т", size: "2380×400×580", badge: null },
  { id: 5, name: "Балка Б-1-60", category: "Балки", price: "от 18 700 ₽", weight: "5.6 т", size: "6000×200×450", badge: null },
  { id: 6, name: "Лестничный марш ЛМФ-1", category: "Лестничные марши", price: "от 22 000 ₽", weight: "2.8 т", size: "2870×1200×150", badge: "Хит" },
  { id: 7, name: "Плита перекрытия ПК 42-12-8", category: "Плиты перекрытия", price: "от 7 800 ₽", weight: "2.6 т", size: "4200×1200×220", badge: null },
  { id: 8, name: "Фундаментный блок ФБС 12-6-6", category: "Фундаментные блоки", price: "от 6 300 ₽", weight: "1.96 т", size: "1180×600×580", badge: null },
];

const SERVICES = [
  { icon: "Truck", title: "Доставка", desc: "Собственный парк спецтехники. Доставка по всему региону в течение 1–3 дней.", color: "bg-orange-500" },
  { icon: "Wrench", title: "Монтаж", desc: "Бригады сертифицированных монтажников. Работаем с любыми объектами.", color: "bg-blue-600" },
  { icon: "Phone", title: "Консультация", desc: "Бесплатный выезд инженера на объект. Подберём оптимальное решение.", color: "bg-slate-700" },
  { icon: "ClipboardList", title: "Проектирование", desc: "Разработка проекта под ваши задачи. Согласование с надзорными органами.", color: "bg-orange-600" },
];

const FAQ_ITEMS = [
  { q: "Какие сроки доставки?", a: "Доставка осуществляется в течение 1–3 рабочих дней в зависимости от расстояния и наличия товара на складе. При заказе до 12:00 — отгрузка в тот же день." },
  { q: "Как происходит оплата?", a: "Принимаем оплату наличными, банковским переводом для юрлиц и физлиц. Возможна частичная предоплата 30% для крупных заказов. Предоставляем все закрывающие документы." },
  { q: "Есть ли минимальный заказ?", a: "Минимальный заказ — 1 единица товара. Для расчёта стоимости доставки воспользуйтесь нашим калькулятором выше." },
  { q: "Предоставляете ли вы гарантию?", a: "Все изделия изготавливаются по ГОСТ и проходят лабораторный контроль качества. Гарантия на продукцию — 24 месяца с момента отгрузки." },
  { q: "Работаете ли вы с физическими лицами?", a: "Да, работаем как с физическими лицами, так и с организациями. Для юрлиц возможна работа по договору с НДС." },
  { q: "Можно ли забрать товар самовывозом?", a: "Да, самовывоз возможен с нашего склада. Адрес: г. Москва, Промышленная ул., 15. Режим работы: пн–пт 8:00–18:00, сб 9:00–14:00." },
];

const STATS = [
  { value: "25+", label: "Лет на рынке" },
  { value: "15 000", label: "Выполненных заказов" },
  { value: "200+", label: "Видов продукции" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [calcVolume, setCalcVolume] = useState(10);
  const [calcDistance, setCalcDistance] = useState(50);

  const baseRate = 450;
  const distanceRate = 18;
  const minFee = 3500;
  const calcResult = Math.max(minFee, calcVolume * baseRate + calcDistance * distanceRate);

  const filteredProducts = activeCategory === "Все"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(n => document.getElementById(n.id));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= scrollY) { setActiveSection(NAV_ITEMS[i].id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-golos">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F97316] rounded flex items-center justify-center">
              <span className="font-oswald font-bold text-white text-sm">Б</span>
            </div>
            <span className="font-oswald font-bold text-white text-lg tracking-wide">БЕТОНСТРОЙ</span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors font-golos ${activeSection === item.id ? "text-[#F97316] active" : "text-white/80 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+78001234567" className="hidden md:flex items-center gap-2 text-white text-sm font-medium hover:text-[#F97316] transition-colors">
              <Icon name="Phone" size={16} className="text-[#F97316]" />
              8 800 123-45-67
            </a>
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-[#F97316] hover:bg-orange-400 text-white px-4 py-2 rounded text-sm font-semibold transition-colors"
            >
              Заказать
            </button>
            <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F172A] border-t border-white/10 animate-slide-down">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#F97316]/20 border border-[#F97316]/40 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <div className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              <span className="text-[#F97316] text-sm font-medium">Завод работает с 1961 года</span>
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up delay-100">
              ЖЕЛЕЗОБЕТОН
              <br />
              <span className="text-[#F97316]">ВЫСШЕГО</span>
              <br />
              КЛАССА
            </h1>

            <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up delay-200">
              Производство и поставка ЖБИ — плиты, сваи, колонны, блоки.
              Доставка по всему региону. Гарантия качества по ГОСТ.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button
                onClick={() => scrollTo("catalog")}
                className="bg-[#F97316] hover:bg-orange-400 text-white px-8 py-4 rounded font-oswald font-semibold text-lg tracking-wide transition-all hover:scale-105"
              >
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("calculator")}
                className="border-2 border-white/40 hover:border-white text-white px-8 py-4 rounded font-oswald font-semibold text-lg tracking-wide transition-all hover:bg-white/10"
              >
                Рассчитать доставку
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-[#F97316]">
          <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-oswald font-bold text-white text-2xl md:text-3xl">{s.value}</div>
                <div className="text-white/80 text-xs md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimSection>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Продукция</span>
                <h2 className="font-oswald text-4xl md:text-5xl font-bold text-[#0F172A] mt-1">КАТАЛОГ ЖБИ</h2>
              </div>
              <div className="hidden md:block w-24 h-1 bg-[#F97316] mb-2" />
            </div>
          </AnimSection>

          <AnimSection>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-[#F97316] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <AnimSection key={p.id}>
                <div className="product-card bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group cursor-pointer">
                  <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    {p.badge && (
                      <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded ${p.badge === "Хит" ? "bg-[#F97316] text-white" : "bg-blue-600 text-white"}`}>
                        {p.badge}
                      </span>
                    )}
                    <Icon name="Box" size={64} className="text-slate-300 group-hover:text-[#F97316] transition-colors" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-[#F97316] font-medium uppercase tracking-wide">{p.category}</span>
                    <h3 className="font-oswald font-semibold text-[#0F172A] text-base mt-1 mb-2 leading-tight">{p.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Icon name="Scale" size={12} />{p.weight}</span>
                      <span className="flex items-center gap-1"><Icon name="Ruler" size={12} />{p.size} мм</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-oswald font-bold text-[#0F172A] text-lg">{p.price}</span>
                      <button
                        onClick={() => scrollTo("contacts")}
                        className="bg-[#F97316] hover:bg-orange-400 text-white text-xs px-3 py-1.5 rounded font-medium transition-colors"
                      >
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">О предприятии</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
                НАДЁЖНОСТЬ,<br />ПРОВЕРЕННАЯ<br /><span className="text-[#F97316]">ВРЕМЕНЕМ</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                БетонСтрой — один из крупнейших производителей железобетонных изделий в регионе. С 1961 года мы поставляем продукцию на объекты жилищного, промышленного и инфраструктурного строительства.
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Собственное производство площадью 15 000 м², современное оборудование и строгий контроль качества позволяют нам гарантировать соответствие всех изделий требованиям ГОСТ.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Factory", label: "Собственное производство 15 000 м²" },
                  { icon: "Award", label: "Сертификация ISO 9001" },
                  { icon: "Users", label: "Более 500 активных клиентов" },
                  { icon: "ShieldCheck", label: "Гарантия качества по ГОСТ" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="w-8 h-8 bg-[#F97316]/20 rounded flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon} size={18} className="text-[#F97316]" />
                    </div>
                    <span className="text-white/80 text-sm leading-tight">{f.label}</span>
                  </div>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#F97316]/10 rounded-2xl" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="font-oswald font-bold text-white/20 text-8xl leading-none mb-4">1961</div>
                  <h3 className="font-oswald font-bold text-white text-2xl mb-4">Производственные мощности</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Производство плит", pct: 92 },
                      { label: "Производство свай", pct: 78 },
                      { label: "Производство колонн", pct: 65 },
                      { label: "Производство блоков", pct: 88 },
                    ].map((bar, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/70">{bar.label}</span>
                          <span className="text-[#F97316] font-semibold">{bar.pct}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#F97316] to-orange-300 rounded-full"
                            style={{ width: `${bar.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <AnimSection className="text-center mb-16">
            <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Что мы предлагаем</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-[#0F172A] mt-2">НАШИ УСЛУГИ</h2>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <AnimSection key={i}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <div className={`w-14 h-14 ${s.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon name={s.icon} size={28} className="text-white" />
                  </div>
                  <h3 className="font-oswald font-bold text-[#0F172A] text-xl mb-3">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  <button
                    onClick={() => scrollTo("contacts")}
                    className="mt-4 text-[#F97316] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 bg-[#F97316] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <AnimSection className="text-center mb-12">
            <span className="text-white/70 font-semibold text-sm uppercase tracking-widest">Онлайн-инструмент</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mt-2">КАЛЬКУЛЯТОР<br />СТОИМОСТИ ДОСТАВКИ</h2>
          </AnimSection>

          <AnimSection>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <label className="font-oswald font-semibold text-[#0F172A] text-lg">Объём груза</label>
                      <span className="text-[#F97316] font-bold text-2xl font-oswald">{calcVolume} м³</span>
                    </div>
                    <input
                      type="range"
                      min={1} max={100} value={calcVolume}
                      onChange={e => setCalcVolume(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#F97316]"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1 м³</span><span>100 м³</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <label className="font-oswald font-semibold text-[#0F172A] text-lg">Расстояние</label>
                      <span className="text-blue-600 font-bold text-2xl font-oswald">{calcDistance} км</span>
                    </div>
                    <input
                      type="range"
                      min={5} max={500} value={calcDistance}
                      onChange={e => setCalcDistance(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>5 км</span><span>500 км</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Объём", val: `${calcVolume} м³` },
                      { label: "Расстояние", val: `${calcDistance} км` },
                      { label: "Базовая ставка", val: `${(calcVolume * baseRate).toLocaleString("ru")} ₽` },
                      { label: "Доставка", val: `${(calcDistance * distanceRate).toLocaleString("ru")} ₽` },
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-400">{item.label}</div>
                        <div className="font-semibold text-[#0F172A] text-sm">{item.val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-[#0F172A] to-blue-900 rounded-2xl p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-20" />
                    <div className="relative z-10">
                      <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Стоимость доставки</p>
                      <div className="font-oswald font-bold text-white text-5xl mb-2">
                        {calcResult.toLocaleString("ru-RU")} ₽
                      </div>
                      <p className="text-white/50 text-xs mb-6">Примерный расчёт. Точная стоимость — по заявке</p>
                      <button
                        onClick={() => scrollTo("contacts")}
                        className="w-full bg-[#F97316] hover:bg-orange-400 text-white py-3 rounded-xl font-oswald font-semibold text-lg transition-all hover:scale-105"
                      >
                        Оформить заявку
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <AnimSection className="text-center mb-16">
            <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Часто спрашивают</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-[#0F172A] mt-2">ВОПРОСЫ И ОТВЕТЫ</h2>
          </AnimSection>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AnimSection key={i}>
                <div className={`border rounded-xl overflow-hidden transition-all ${openFaq === i ? "border-[#F97316] shadow-sm" : "border-gray-200 hover:border-gray-300"}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-oswald font-semibold text-[#0F172A] text-lg pr-4">{item.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? "bg-[#F97316] text-white" : "bg-gray-100 text-gray-500"}`}>
                      <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 animate-slide-down">
                      <div className="h-px bg-gray-100 mb-4" />
                      <p className="text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <AnimSection>
              <span className="text-[#F97316] font-semibold text-sm uppercase tracking-widest">Связаться с нами</span>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mt-2 mb-8">ЗАКАЗАТЬ<br />ПРОДУКЦИЮ</h2>

              <div className="space-y-5 mb-8">
                {[
                  { icon: "Phone", label: "Телефон", val: "8 800 123-45-67 (бесплатно)", href: "tel:+78001234567" },
                  { icon: "Mail", label: "Email", val: "info@betonstroy.ru", href: "mailto:info@betonstroy.ru" },
                  { icon: "MapPin", label: "Адрес", val: "г. Москва, Промышленная ул., 15", href: "#" },
                  { icon: "Clock", label: "Режим работы", val: "Пн–Пт 8:00–18:00, Сб 9:00–14:00", href: "#" },
                ].map((c, i) => (
                  <a key={i} href={c.href} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[#F97316]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#F97316] transition-colors">
                      <Icon name={c.icon} size={20} className="text-[#F97316] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs uppercase tracking-wide">{c.label}</div>
                      <div className="text-white font-medium">{c.val}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex gap-3">
                {[
                  { icon: "MessageSquare", label: "WhatsApp" },
                  { icon: "Send", label: "Telegram" },
                ].map((s, i) => (
                  <button key={i} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-lg text-sm transition-all">
                    <Icon name={s.icon} size={16} />{s.label}
                  </button>
                ))}
              </div>
            </AnimSection>

            <AnimSection>
              <div className="bg-white rounded-2xl p-8">
                <h3 className="font-oswald font-bold text-[#0F172A] text-2xl mb-6">Оставить заявку</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Ваше имя *</label>
                    <input
                      value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      placeholder="Иван Иванов"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Телефон *</label>
                    <input
                      value={formData.phone}
                      onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Сообщение</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      placeholder="Опишите ваш запрос или задайте вопрос..."
                      rows={4}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#F97316] transition-colors resize-none"
                    />
                  </div>
                  <button
                    onClick={() => alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.")}
                    className="w-full bg-[#F97316] hover:bg-orange-400 text-white py-4 rounded-xl font-oswald font-bold text-lg transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/30"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#F97316] rounded flex items-center justify-center">
              <span className="font-oswald font-bold text-white text-sm">Б</span>
            </div>
            <span className="font-oswald font-bold text-white">БЕТОНСТРОЙ</span>
          </div>
          <p className="text-white/30 text-sm text-center">© 2024 БетонСтрой. Завод железобетонных изделий. Все права защищены.</p>
          <button className="text-white/40 text-xs hover:text-white/70 transition-colors">
            Политика конфиденциальности
          </button>
        </div>
      </footer>
    </div>
  );
}