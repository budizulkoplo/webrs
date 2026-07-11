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

export default function HeroSectionComponent({ heroData }: HeroSectionProps) {
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
      <div className="relative h-[620px] overflow-hidden bg-gradient-to-br from-white via-[#f8fdfd] to-[#e8fbfa]">
        <div className="absolute inset-0">
          {slides.map((hero, index) => (
            <div
              key={hero.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-y-0 -right-[20%] w-[84%]">
                <Image
                  src={hero.background_image || fallbackHero.background_image!}
                  alt={hero.headline}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 84vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_25%,rgba(255,255,255,.96)_38%,rgba(255,255,255,.70)_56%,rgba(255,255,255,.08)_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#e8fbfa] via-white/80 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center px-6 lg:px-10">
          <div className="w-full max-w-[620px] pb-16">
            <div className="mb-6 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#008f8b]">
              <Heart className="h-4 w-4" />
              Melayani Dengan Hati
            </div>

            <h1 className="min-h-[104px] max-w-[560px] text-[34px] font-black leading-[1.14] tracking-normal text-slate-950 md:text-[40px] lg:text-[46px]">
              {activeSlide.headline}
            </h1>

            {activeSlide.subheading && (
              <p className="mt-7 max-w-[620px] text-lg leading-8 text-slate-700">
                {activeSlide.subheading}
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-9">
              <div className="flex items-center gap-3">
                <UserRoundCheck className="h-8 w-8 text-[#00aaa6]" />
                <span className="text-sm leading-5 text-slate-900">
                  Dokter<br />
                  <strong>Profesional</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-[#00aaa6]" />
                <span className="text-sm leading-5 text-slate-900">
                  Pelayanan<br />
                  <strong>Berkualitas</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-8 w-8 text-[#00aaa6]" />
                <span className="text-sm leading-5 text-slate-900">
                  Berlandaskan<br />
                  <strong>Nilai Islami</strong>
                </span>
              </div>
            </div>

            {slides.length > 1 && (
              <div className="mt-5 flex gap-2">
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

      <div className="relative z-20 mx-auto -mt-16 w-full max-w-[1200px] px-6 lg:px-0">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_22px_55px_rgba(15,23,42,.10)] md:grid-cols-2 lg:grid-cols-4">
          <QuickLink
            href="https://daftaronline.rspkuboja.com"
            icon={<CalendarDays className="h-9 w-9" />}
            title="Pendaftaran Online"
            description="Daftar tanpa antri lebih mudah"
          />
          <QuickLink
            href="/layanan/jadwal-dokter"
            icon={<Stethoscope className="h-9 w-9" />}
            title="Jadwal Dokter"
            description="Lihat jadwal praktik dokter kami"
          />
          <QuickLink
            href="https://pasien.rspkuboja.com"
            icon={<FlaskConical className="h-9 w-9" />}
            title="Hasil Pemeriksaan"
            description="Cek hasil pemeriksaan Anda secara online"
          />
          <QuickLink
            href="tel:0294711100"
            icon={<Phone className="h-9 w-9" />}
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
      className="group flex min-h-[136px] items-center gap-6 border-b border-slate-200 px-8 py-7 transition hover:bg-[#f2fbfb] md:border-r md:[&:nth-child(2n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2n)]:border-r lg:last:border-r-0"
    >
      <div className="text-[#00aaa6] transition group-hover:scale-105">{icon}</div>
      <div>
        <h3 className="text-lg font-black text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </Link>
  );
}
