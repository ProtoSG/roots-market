import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Register, registerSchema } from "../../models/auth.model"
import { InputLabel } from "./InputLabel"
import { PrimaryButton, SecondaryButton } from "./Button"
import { StepsSignup } from "./StepsSignup"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { TextAreaLabel } from "./TextAreaLabel"
import { StepFieldset } from "./StepFieldset"
import {
  FileIcon,
  LoaderIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  PhotoScanIcon,
  UserIcon
} from "../../icons"
import { useNavigate } from "react-router-dom"
import { uselogginDialogStore } from "../../stores/dialogStore"
import { ErrorBox } from "./ErrorBox"
import { useAuth } from "../../hooks/useAuth"

const STEP_FIELDS: Record<number, (keyof Register)[]> = {
  0: ["username", "password", "confirmPassword"],
  1: ["name", "email", "location"],
  2: ["bio", "profileImageURL"],
};

export function FormSignup() {
  const [step, setStep] = useState<0 | 1 | 2 >(0);
  const [addTestimony, setAddTestimony] = useState(false)
  const { isAuthenticated, signup, errors: authErrors } = useAuth();
  const {setOpen} = uselogginDialogStore()

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Register>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

 const handleAddTestimonyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddTestimony(e.target.checked);
  };

  const prevStep = useCallback(() => setStep((s) => (s > 0 ? (s - 1) as typeof step : s)), []);

  const nextStep = useCallback(async () => {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => (s < 3 ? (s + 1) as typeof step : s));
  }, [step, trigger]);

  const onSubmit: SubmitHandler<Register> = async (data: Register) => {
    await signup(data);
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      setOpen(false)
      navigate("/artisan");
      reset()
      setStep(0)
    }
  }, [isAuthenticated, setOpen]);

  return(
    <section className="flex flex-col gap-8">
      {authErrors.map((error, i) => (
        <ErrorBox key={i} error={error} />
      ))  }

      <StepsSignup currentStep={step}/>

      <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-auto flex">
        <StepFieldset visible={step === 0}>
          <InputLabel
            placeholder="Nombre de usuario"
            icon={<UserIcon />}
            {...register("username")}
            error={errors.username?.message}
          />

          <InputLabel
            type="password"
            placeholder="Contraseña"
            icon={<LockIcon />}
            {...register("password")}
            error={errors.password?.message}
          />

          <InputLabel
            type="password"
            placeholder="Repite tu contraseña"
            icon={<LockIcon />}
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <PrimaryButton 
            type="button"
            onClick={nextStep}
            disabled={!!Object.keys(errors).length}
          >
            Siguiente
          </PrimaryButton>
        </StepFieldset>

        <StepFieldset visible={step === 1}>
          <InputLabel
            placeholder="Ingresa tu nombre"
            icon={<UserIcon />}
            {...register("name")}
            error={errors.name?.message}
          />

          <InputLabel
            type="email"
            placeholder="ejemplo@correo.com"
            icon={<MailIcon />}
            {...register("email")}
            error={errors.email?.message}
          />

          <InputLabel
            placeholder="Ciudad, País"
            icon={<MapPinIcon />}
            {...register("location")}
            error={errors.location?.message}
          />

          <div className="flex justify-between">
            <SecondaryButton onClick={prevStep}>
              Atrás
            </SecondaryButton>
            <PrimaryButton 
              type="button"
              onClick={nextStep}
              disabled={!!Object.keys(errors).length}
            >
              Siguiente
            </PrimaryButton>
          </div>
        </StepFieldset>

        <StepFieldset visible={step === 2}>
          <TextAreaLabel
            placeholder="Cuéntanos algo sobre ti..."
            icon={<FileIcon />}
            {...register("bio")}
            error={errors.bio?.message}
          />

          <InputLabel
            placeholder="https://..."
            icon={<PhotoScanIcon />}
            {...register("profileImageURL")}
            error={errors.profileImageURL?.message}
          />
          
          <label className="flex gap-2">
            <input 
              type="checkbox"
              checked={addTestimony}
              onChange={handleAddTestimonyChange}
            />
            <p>Agergar testimonio</p>
          </label>

          {addTestimony && (
            <TextAreaLabel
              placeholder="Tu testimonio"
              icon={<FileIcon />}
              {...register("testimony")}
              error={errors.testimony?.message}
            />
          )}

          <div className="flex justify-between">
            <SecondaryButton onClick={prevStep}>
              Atrás
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex gap-2">
                  <LoaderIcon className="mr-2 animate-spin" /> Registrando…
                </div>
              ) : (
                "Enviar"
              )}
            </PrimaryButton>
          </div>
        </StepFieldset>
      </form>
    </section>
  );
}
