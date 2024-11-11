import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";

interface CardProps extends VariantProps<typeof cardStyles> {
  text: string;
  className?: string;
}

const cardStyles = cva(["font-bold uppercase grid place-items-center h-20 rounded-lg"], {
  variants: {
    textSize: {
      small: ["text-base"],
      medium: ["text-xl"],
    },
    backgroundColor: {
      inherit: ["bg-inherit"],
      plain: ["bg-[#EFEFE7]"],
      blue: ["bg-[#3B82F6]"],
      purple: ["bg-[#8B5CF6]"],
      green: ["bg-[#A7C268]"],
      yellow: ["bg-[#F5E07E]"],
    },
  },
  defaultVariants: {
    backgroundColor: "plain",
    textSize: "medium",
  },
});

export default function Card({ text, className, ...props }: CardProps) {
  return <div className={cx(className, cardStyles({ ...props }))}>{text}</div>;
}
