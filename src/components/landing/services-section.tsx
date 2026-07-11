/* components/services-section.tsx */
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ambulance,
  ArrowRight,
  Bone,
  Eye,
  FlaskConical,
  HeartPulse,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Venus,
} from 'lucide-react';
import { FeatureBlock } from '@/types/public';

interface ServicesSectionProps {
  services: FeatureBlock[];
}

const featuredServices = [
  {
    title: 'IGD 24 Jam',
    description: 'Instalasi Gawat Darurat siap melayani 24 jam dengan cepat, tanggap, dan tepat.',
    image: '/images/services/igd.jpg',
    icon: Ambulance,
  },
  {
    title: 'Poli Penyakit Dalam',
    description: 'Pelayanan penyakit dalam untuk diagnosis dan terapi pasien dewasa secara menyeluruh.',
    image: '/images/services/penyakit-dalam-new.png',
    icon: Stethoscope,
  },
  {
    title: 'Syaraf',
    description: 'Layanan kesehatan saraf dengan pemeriksaan dan penanganan oleh dokter spesialis.',
    image: '/images/services/syaraf.jpg',
    icon: HeartPulse,
  },
  {
    title: 'Obgyn',
    description: 'Pelayanan kebidanan dan kandungan untuk kesehatan ibu dan reproduksi wanita.',
    image: '/images/services/obgyn.jpg',
    icon: Venus,
  },
  {
    title: 'Mata',
    description: 'Pemeriksaan dan penanganan gangguan kesehatan mata secara profesional.',
    image: '/images/services/poli-mata.png',
    icon: Eye,
  },
  {
    title: 'Orthopaedi & Traumatologi',
    description: 'Layanan tulang, sendi, cedera, dan gangguan muskuloskeletal.',
    image: '/images/services/orthopaedi-new.png',
    icon: Bone,
  },
  {
    title: 'Radiologi',
    description: 'Pemeriksaan radiologi untuk menunjang diagnosis secara lebih akurat.',
    image: '/images/services/radiologi-unit.png',
    icon: ImageIcon,
  },
  {
    title: 'Laboratorium Klinis',
    description: 'Pemeriksaan laboratorium klinis untuk menunjang diagnosis dan monitoring kesehatan.',
    image: '/images/services/laboratorium.jpg',
    icon: FlaskConical,
  },
  {
    title: 'Bedah',
    description: 'Layanan tindakan bedah dengan dukungan dokter dan peralatan yang memadai.',
    image: '/images/services/bedah.jpg',
    icon: Stethoscope,
  },
];

export default function ServicesSection({ services: _services }: ServicesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const carousel = scrollRef.current;
    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 4);
    setCanScrollRight(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 4);
  };

  const scrollServices = (direction: 'left' | 'right') => {
    const carousel = scrollRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === 'right' ? 336 : -336,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const carousel = scrollRef.current;
    if (!carousel) return;

    updateScrollState();
    carousel.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    const interval = window.setInterval(() => {
      if (!scrollRef.current) return;

      const current = scrollRef.current;
      const reachedEnd = current.scrollLeft + current.clientWidth >= current.scrollWidth - 8;

      current.scrollTo({
        left: reachedEnd ? 0 : current.scrollLeft + 336,
        behavior: 'smooth',
      });
    }, 5000);

    return () => {
      carousel.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="bg-white py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-9 grid items-end gap-6 lg:grid-cols-[1fr_1fr_auto]">
          <div>
            <span className="text-sm font-black uppercase tracking-wide text-[#07b8b2]">
              Layanan Kami
            </span>
            <h2 className="mt-2 text-3xl font-black leading-tight text-slate-950">
              Layanan Unggulan
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-slate-600">
            Berbagai layanan kesehatan lengkap dengan dukungan fasilitas modern dan tenaga profesional.
          </p>
          <Link
            href="/layanan"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#07b8b2] px-5 text-sm font-black text-[#007a76] transition hover:bg-[#07b8b2] hover:text-white"
          >
            Lihat Semua Layanan
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollServices('left')}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-[#07b8b2] shadow-lg transition hover:shadow-xl disabled:pointer-events-none disabled:opacity-40 md:grid md:-translate-x-6 lg:-translate-x-12 xl:-translate-x-16"
            aria-label="Scroll layanan ke kiri"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden pb-5 [scroll-behavior:smooth] [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#07b8b2]/45 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#eef6f6]"
          >
            <div className="flex w-max gap-6">
              {featuredServices.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    className="group relative w-[min(312px,calc(100vw-2rem))] shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white transition duration-200 [scroll-snap-align:start] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,.12)]"
                  >
                    <div className="relative h-[178px] w-full overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="312px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="relative z-10 ml-6 -mt-[29px] grid h-[58px] w-[58px] place-items-center rounded-full bg-[#07b8b2] text-white shadow-[0_12px_24px_rgba(0,170,166,.25)]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="px-6 pb-6 pt-5">
                      <h3 className="mb-3 text-lg font-black leading-snug text-slate-950">
                        {service.title}
                      </h3>
                      <p className="mb-5 text-sm leading-7 text-slate-600">
                        {service.description}
                      </p>
                      <Link
                        href="/layanan"
                        className="inline-flex items-center gap-2 text-sm font-black text-[#007a76]"
                      >
                        Selengkapnya
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollServices('right')}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-[#07b8b2] shadow-lg transition hover:shadow-xl disabled:pointer-events-none disabled:opacity-40 md:grid md:translate-x-6 lg:translate-x-12 xl:translate-x-16"
            aria-label="Scroll layanan ke kanan"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => scrollServices('left')}
            disabled={!canScrollLeft}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-[#07b8b2] shadow-md transition disabled:pointer-events-none disabled:opacity-40"
            aria-label="Scroll layanan ke kiri"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollServices('right')}
            disabled={!canScrollRight}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-[#07b8b2] shadow-md transition disabled:pointer-events-none disabled:opacity-40"
            aria-label="Scroll layanan ke kanan"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
