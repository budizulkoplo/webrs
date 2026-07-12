// components/hero-section.tsx
'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  FlaskConical,
  Heart,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
} from 'lucide-react';
import { HeroSection } from '@/types/public';

interface HeroSectionProps {
  heroData: HeroSection[];
  quickLinks?: {
    daftaronline?: string | null;
    pemeriksaan_pasien?: string | null;
  };
}

const fallbackHero: HeroSection = {
  id: 0,
  headline: 'Kesehatan Anda, Amanah Kami',
  subheading:
    'RS PKU Muhammadiyah Boja berkomitmen memberikan pelayanan kesehatan yang profesional, islami, dan berkualitas untuk Anda dan keluarga.',
  background_image: '/images/hero-rs.jpeg',
  cta_button_text_1: null,
  cta_button_link_1: null,
  cta_button_text_2: null,
  cta_button_link_2: null,
};

export default function HeroSectionComponent({ heroData, quickLinks }: HeroSectionProps) {
  const slides = useMemo(() => {
    const data = heroData?.length ? heroData : [fallbackHero];

    return data.map((item) => ({
      ...item,
      headline: fallbackHero.headline,
      subheading: fallbackHero.subheading,
      background_image: item.background_image || fallbackHero.background_image,
      cta_button_text_1: null,
      cta_button_link_1: null,
      cta_button_text_2: null,
      cta_button_link_2: null,
    }));
  }, [heroData]);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[currentSlide] || fallbackHero;

  return (
    <section className="relative overflow-visible bg-white">
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#f8fdfd] to-[#e8fbfa] pb-16 md:h-[620px] md:pb-0">
        <div className="absolute inset-0">
          {slides.map((hero, index) => (
            <div
              key={hero.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-[230px] md:inset-y-0 md:left-auto md:-right-[20%] md:h-auto md:w-[84%]">
                <Image
                  src={hero.background_image || fallbackHero.background_image!}
                  alt={hero.headline}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 84vw, 100vw"
                  className="object-cover object-[62%_center] md:object-center"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 h-[270px] bg-gradient-to-b from-white/10 via-white/35 to-white md:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_25%,rgba(255,255,255,.96)_38%,rgba(255,255,255,.70)_56%,rgba(255,255,255,.08)_78%)] md:block" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#e8fbfa] via-white/80 to-transparent md:h-48" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] px-5 pt-[205px] md:h-full md:items-center md:px-6 md:pt-0 lg:px-10">
          <div className="w-full max-w-[620px] md:pb-16">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-[#008f8b] shadow-sm md:mb-6 md:bg-transparent md:px-0 md:py-0 md:text-sm md:shadow-none">
              <Heart className="h-3.5 w-3.5 md:h-4 md:w-4" />
              Melayani Dengan Hati
            </div>

            <h1 className="max-w-[560px] text-[30px] font-black leading-[1.12] tracking-normal text-slate-950 md:min-h-[104px] md:text-[40px] md:leading-[1.14] lg:text-[46px]">
              {activeSlide.headline}
            </h1>

            {activeSlide.subheading && (
              <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-slate-700 md:mt-7 md:text-lg md:leading-8">
                {activeSlide.subheading}
              </p>
            )}

            <div className="mt-6 grid grid-cols-3 gap-3 md:mt-10 md:flex md:flex-wrap md:gap-9">
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
                <UserRoundCheck className="h-6 w-6 shrink-0 text-[#00aaa6] md:h-8 md:w-8" />
                <span className="text-[11px] leading-4 text-slate-900 md:text-sm md:leading-5">
                  Dokter<br />
                  <strong>Profesional</strong>
                </span>
              </div>
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
                <ShieldCheck className="h-6 w-6 shrink-0 text-[#00aaa6] md:h-8 md:w-8" />
                <span className="text-[11px] leading-4 text-slate-900 md:text-sm md:leading-5">
                  Pelayanan<br />
                  <strong>Berkualitas</strong>
                </span>
              </div>
              <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
                <HeartHandshake className="h-6 w-6 shrink-0 text-[#00aaa6] md:h-8 md:w-8" />
                <span className="text-[11px] leading-4 text-slate-900 md:text-sm md:leading-5">
                  Berlandaskan<br />
                  <strong>Nilai Islami</strong>
                </span>
              </div>
            </div>

            {slides.length > 1 && (
              <div className="mt-4 flex gap-2 md:mt-5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentSlide ? 'w-8 bg-[#00aaa6]' : 'w-4 bg-slate-400'
                    }`}
                    aria-label={`Tampilkan slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-10 w-full max-w-[1200px] px-4 md:-mt-16 md:px-6 lg:px-0">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,.10)] md:rounded-3xl lg:grid-cols-4 lg:shadow-[0_22px_55px_rgba(15,23,42,.10)]">
          <QuickLink
            href={quickLinks?.daftaronline || 'https://daftaronline.rspkuboja.com'}
            icon={<CalendarDays className="h-6 w-6 md:h-9 md:w-9" />}
            title="Pendaftaran Online"
            description="Daftar tanpa antri lebih mudah"
          />
          <QuickLink
            href="/layanan/jadwal-dokter"
            icon={<Stethoscope className="h-6 w-6 md:h-9 md:w-9" />}
            title="Jadwal Dokter"
            description="Lihat jadwal praktik dokter kami"
          />
          <QuickLink
            href={quickLinks?.pemeriksaan_pasien || 'https://pasien.rspkuboja.com'}
            icon={<FlaskConical className="h-6 w-6 md:h-9 md:w-9" />}
            title="Hasil Pemeriksaan"
            description="Cek hasil pemeriksaan Anda secara online"
          />
          <QuickLink
            href="tel:0294711100"
            icon={<Phone className="h-6 w-6 md:h-9 md:w-9" />}
            title="Emergency"
            description="(029) 46103005"
          />
        </div>
      </div>
    </section>
  );
}

function QuickLink({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex min-h-[108px] flex-col items-start justify-center gap-3 border-b border-r border-slate-200 px-4 py-4 transition hover:bg-[#f2fbfb] even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 md:min-h-[136px] md:flex-row md:items-center md:justify-start md:gap-6 md:px-8 md:py-7 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
    >
      <div className="text-[#00aaa6] transition group-hover:scale-105">{icon}</div>
      <div>
        <h3 className="text-[13px] font-black leading-5 text-slate-950 md:text-lg">{title}</h3>
        <p className="mt-1 text-[11px] leading-4 text-slate-600 md:mt-2 md:text-sm md:leading-6">{description}</p>
      </div>
    </Link>
  );
}
