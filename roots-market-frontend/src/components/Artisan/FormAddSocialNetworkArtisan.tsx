import { useForm } from "react-hook-form";
import { InputLabel, PrimaryButton, SecondaryButton } from "../UI";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { LinkIcon, SocialIcon } from "../../icons";
import { useAddRSArtisanDialogStore } from "../../stores/dialogStore";
import { BaseSocialNetwork, baseSocialNetworkSchema } from "../../models/socialNetwork.model";
import { createSocialNetwork } from "../../api/artisans";
import { toast } from "sonner";
import { useArtisanPrivate } from "../../hooks/useArtisan";

export function FormAddSocialNetworkArtisan() {
  const { setOpen } = useAddRSArtisanDialogStore()
  const { invalidateArtisanInfo } = useArtisanPrivate()

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(baseSocialNetworkSchema)
  })

  const onSubmit = async (data: BaseSocialNetwork) => {
    console.log({data})
    const { id, message } = await createSocialNetwork(data)
    if (!id){
      toast.error(message)
      return
    }
    invalidateArtisanInfo()
    setOpen(false)
    toast.success(message)
  }

  return(
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputLabel
        icon={<SocialIcon />}
        placeholder="Ingrese el tipo de red social... (Youtube, Instagrama ...)"
        {...register("type")}
        error={errors.type?.message}
      />
      <InputLabel
        icon={<LinkIcon />}
        placeholder="https://yotube.com"
        {...register("url")}
        error={errors.url?.message}
      />
      <div className="flex justify-end gap-4">
        <SecondaryButton
          type="button"
          onClick={() => setOpen(false)}
        >
          Cancelar
        </SecondaryButton>
        <PrimaryButton type="submit">
          Agregar
        </PrimaryButton>
      </div>
    </form>
  )
}
