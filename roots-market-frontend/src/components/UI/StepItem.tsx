import { CheckIcon } from "../../icons";

interface StepItemProps {
  step: number;
  currentStep: number;
}

export function StepItem({ step, currentStep }: StepItemProps) {
  const isCompleted = step <= currentStep;
  const isActive = step === currentStep + 1;

  return (
    <span
      className={`
        size-6 flex items-center justify-center font-semibold border-2 rounded-full z-10 
        ${isActive ? "border-primary bg-zinc-300" :
        isCompleted ? "bg-primary border-primary" : "bg-zinc-300 border-zinc-300"}
      `}
    >
      {isCompleted && <CheckIcon className="text-white" />}
    </span>
  );
}

