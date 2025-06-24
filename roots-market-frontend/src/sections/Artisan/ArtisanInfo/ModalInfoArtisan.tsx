import { useForm } from "react-hook-form";
import { DialogContainer, InputLabel, PrimaryButton, SecondaryButton, TextAreaLabel } from "../../../components/UI";
import { useInfoArtisanDialog } from "../../../hooks/useDialog";
import { useInfoArtisanDialogStore } from "../../../stores/dialogStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArtisanUpdate, artisanUpdateSchema } from "../../../models/artisan.model";
import { FileIcon, MailIcon, MapPinIcon, PhotoScanIcon, UserIcon } from "../../../icons";
import { useArtisanUpdateStore } from "../../../stores/itemStore";
import { useEffect } from "react";

export function ModaInfoArtisan() {
  const { isOpen, setOpen } = useInfoArtisanDialogStore()
  const {item: artisan} = useArtisanUpdateStore()

  const dialogRef = useInfoArtisanDialog(isOpen)

  console.log({artisan})

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

  return (
    <DialogContainer
      dialogRef={dialogRef}
      setOpen={setOpen}
    >
      <header className="flex gap-4 ">
        <span className="border-b-2 px-4 border-zinc-600">Info</span>
        <span className="border-b-2 px-4 border-zinc-600">Redes Sociales</span>
      </header>
      <h3 className="font-medium text-2xl">Actualizar Información Personal</h3>
      <form className="flex flex-col gap-4">
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
          <SecondaryButton>
            Cancelar
          </SecondaryButton>
          <PrimaryButton>
            Actualizar Datos
          </PrimaryButton>
        </div>
      </form>
    </DialogContainer>
  )
}
