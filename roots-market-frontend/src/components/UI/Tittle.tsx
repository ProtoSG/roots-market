import { ElementType } from "react";

type TitleProps = {
  level?: 1 | 2 | 3;
};

const sizeClasses = {
  1: "text-8xl sm:text-9xl",
  2: "text-6xl sm:text-7xl",
  3: "text-4xl sm:text-5xl",
};

export function Title({ level = 1 }: TitleProps) {
  const Tag = `h${level}` as ElementType
  const sizeClass = sizeClasses[level]

  return (
    <Tag className={`${sizeClass} text-center text-primary font-rochester`}>
      Roots Market
    </Tag>
  );
}
