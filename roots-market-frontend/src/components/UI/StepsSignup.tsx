import { StepItem } from "./StepItem";

interface StepsSignupProps {
  currentStep: number 
}

export function StepsSignup({currentStep}: StepsSignupProps) {
  const steps = [1, 2, 3];

  return (
    <div className="w-96 mx-auto relative flex justify-around">
      {/* Full track line */}
      <span className="absolute w-full rounded-full border-2 border-zinc-400/60 top-2.5 -z-10"></span>

      {/* Progress bar */}
      <span
        className={`absolute left-0 rounded-full border-2 border-primary top-2.5 -z-10 transition-all duration-300
        ${currentStep === 0 ? "w-1/6" 
          : currentStep === 1 ? "w-3/6"
          : currentStep === 2 ? "w-5/6"
          : "w-full"
        }
      `}
      ></span>

      {steps.map((step) => (
        <StepItem key={step} step={step} currentStep={currentStep} />
      ))}
    </div>
  );
}

