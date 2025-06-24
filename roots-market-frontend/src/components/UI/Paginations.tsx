import { ChevronLeftIcon } from "../../icons";
import { BlurContainer } from "./BlurContainer";
import { NumberPaginations } from "./NumberPaginations";
import { useMemo } from "react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

function getWindowPages(page: number, totalPages: number, windowSize = 3): number[] {
  const size = Math.min(windowSize, totalPages);
  let start = page - Math.floor(size / 2);
  if (start < 1) start = 1;
  if (start + size - 1 > totalPages) start = totalPages - size + 1;
  return Array.from({ length: size }, (_, i) => start + i);
}

export function Paginations({ page, totalPages, onPageChange }: Props) {
  const windowPages = useMemo(
    () => getWindowPages(page, totalPages),
    [page, totalPages]
  );

  const firstPageInWindow = windowPages[0];
  const lastPageInWindow = windowPages[windowPages.length - 1];

  return (
    <div className="flex justify-center gap-4 text-primary">
      <BlurContainer>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="size-12 rounded-full flex items-center justify-center
            not-disabled:hover:bg-primary not-disabled:hover:text-white
            transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon />
        </button>
      </BlurContainer>

      <BlurContainer className="py-2 px-6 flex items-center gap-2">
        {firstPageInWindow > 1 && (
          <>
            <NumberPaginations num={1} page={page} onPageChange={onPageChange} />
          </>
        )}
        {firstPageInWindow > 2 && (
          <span>…</span>
        )}
        {windowPages.map((num) => (
          <NumberPaginations
            key={num}
            num={num}
            page={page}
            onPageChange={onPageChange}
          />
        ))}
        {lastPageInWindow < totalPages - 1 && (
          <span>…</span>
        )}
        {lastPageInWindow < totalPages && (
          <NumberPaginations
            num={totalPages}
            page={page}
            onPageChange={onPageChange}
          />
        )}
      </BlurContainer>

      <BlurContainer>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="size-12 rounded-full flex items-center justify-center
            not-disabled:hover:bg-primary not-disabled:hover:text-white
            transition-colors cursor-pointer disabled:cursor-not-allowed rotate-180"
        >
          <ChevronLeftIcon />
        </button>
      </BlurContainer>
    </div>
  );
}
