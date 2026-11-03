"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type LightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  children: ReactNode;
  className?: string;
};

/** 슬라이드 속 이미지를 누르면 원본 크기에 가깝게 크게 본다. */
export function Lightbox({ src, alt, width, height, caption, children, className }: LightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`${caption} 크게 보기`}
          className={cn(
            "group relative block cursor-zoom-in overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2",
            className,
          )}
        >
          {children}
          <span className="pointer-events-none absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-ink/70 px-2 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand className="size-3" />
            크게 보기
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-none gap-3 p-3 sm:max-w-none"
        style={{ width: `min(1500px, 96vw, calc((88vh - 64px) * ${(width / height).toFixed(4)} + 24px))` }}
      >
        <DialogTitle className="px-1 pt-1 text-[15px] font-bold text-navy">{caption}</DialogTitle>
        <DialogDescription className="sr-only">{alt}</DialogDescription>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="96vw"
          quality={90}
          className="h-auto w-full rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
}
