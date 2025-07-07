import { zodResolver } from "@hookform/resolvers/zod";
import { FileIcon, MailIcon, MapPinIcon, PhotoScanIcon, UserIcon } from "../../icons";
import { InputLabel, PrimaryButton, SecondaryButton, TextAreaLabel } from "../UI";
import { useForm } from "react-hook-form";
import { ArtisanUpdate, artisanUpdateSchema } from "../../models/artisan.model";
import { useEffect } from "react";
import { putArtisanInfo } from "../../api/artisans";
import { toast } from "sonner";
import { useArtisanUpdateStore } from "../../stores/itemStore";
import { useArtisanPrivate } from "../../hooks/useArtisan";
import { useInfoArtisanDialogStore } from "../../stores/dialogStore";
import { SubTitleForms } from "./SubTitleForms";

export function FormUpdateInfoArtisan() {
  const { setOpen } = useInfoArtisanDialogStore()
  const { item: artisan } = useArtisanUpdateStore()
  const { invalidateArtisanInfo } = useArtisanPrivate()

  const {register, handleSubmit, reset, formState: {errors}} = useForm<ArtisanUpdate>({
    resolver: zodResolver(artisanUpdateSchema),
  })

  useEffect(() => {
    if (artisan){
      reset({
        name: artisan.name,
        email: artisan.email,
        profileImageURL: artisan.profileImageURL,
        location: artisan.location,
        bio: artisan.bio,
      })
    }
  },[artisan, reset])

  const onSubmit = async (data: ArtisanUpdate) => {
    const res = await putArtisanInfo(data)
    if (!res.id) {
      toast.error(res.message)
      setOpen(false)
      return
    }

    invalidateArtisanInfo()

    toast.success(res.message)
    setOpen(false)
  }

  return(
    <main>
      <SubTitleForms>Actualizar Información Personal</SubTitleForms>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex gap-4">
          <InputLabel 
            icon={<UserIcon />}
            {...register("name")}
            error={errors.name?.message}
          />
          <InputLabel 
            icon={<MapPinIcon />}
            {...register("location")}
            error={errors.location?.message}
          />
        </fieldset>
        <InputLabel 
          icon={<PhotoScanIcon />}
          {...register("profileImageURL")}
          error={errors.profileImageURL?.message}
        />
        <InputLabel 
          icon={<MailIcon />}
          {...register("email")}
          error={errors.email?.message}
        />
        <TextAreaLabel
          icon={<FileIcon />}
          {...register("bio")}
          error={errors.bio?.message}
        />
        <div className="flex justify-end gap-4">
          <SecondaryButton
            type="button"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </SecondaryButton>
          <PrimaryButton type="submit">
            Actualizar Datos
          </PrimaryButton>
        </div>
      </form>
    </main>
  )
}
