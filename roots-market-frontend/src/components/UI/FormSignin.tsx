import { useForm } from "react-hook-form";
import { LockIcon, UserIcon } from "../../icons";
import { PrimaryButton } from "./Button";
import { InputLabel } from "./InputLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, loginSchema } from "../../models/auth.model";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { uselogginDialogStore } from "../../stores/dialogStore";
import { ErrorBox } from "./ErrorBox";
import { useAuth } from "../../hooks/useAuth";

export function FormSignin() {
  const firstRun = useRef(true);
  const {setOpen} = uselogginDialogStore()
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = async (data: Login) =>  await signin(data);

  useEffect(() => {
    if (firstRun.current && isAuthenticated) {
      firstRun.current = false;
      setOpen(false);
      navigate("/artisan");
      reset()
    }
  }, [isAuthenticated, navigate, setOpen]);

  return(
    <section className="flex flex-col gap-8 ">
      {loginErrors.map((error:string, i: number) => (
        <ErrorBox key={i} error={error} />
      ))}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 mx-auto flex flex-col gap-4"
      >
        <InputLabel 
          type="text"
          placeholder="Ingrese su nombre de usuario..."
          icon={<UserIcon />}
          {...register("username", { required: true})}
          error={errors.username?.message}
        />
        <InputLabel
          placeholder="Contraseña..."
          type="password"
          icon={<LockIcon />}
          {...register("password", { required: true, minLength: 8 })}
          error={errors.password?.message}
        />
        <PrimaryButton type="submit">Ingresar</PrimaryButton>
      </form>
    </section>
  )
}
