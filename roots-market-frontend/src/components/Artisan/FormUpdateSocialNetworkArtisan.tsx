import { useForm } from "react-hook-form"
import { BaseSocialNetwork, baseSocialNetworkSchema } from "../../models/socialNetwork.model"
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { useEffect } from "react"
import { useSNUpdateStore } from "../../stores/itemStore"
import { InputLabel, PrimaryButton, SecondaryButton } from "../UI"
import { LinkIcon, SocialIcon } from "../../icons"
import { useInfoArtisanDialogStore, useUpdateSNDialogStore } from "../../stores/dialogStore"
import { updateSocialNetwork } from "../../api/artisans"
import { toast } from "sonner"
import { useArtisanPrivate } from "../../hooks/useArtisan"

export function FormUpdateSocialNetworkArtisan(){
  const { item: socialNetwork } = useSNUpdateStore()
  const { setOpen: setOpenDialogUpdateSN } = useUpdateSNDialogStore()
  const { setOpen: setOpenDialogInfoArtisan } = useInfoArtisanDialogStore()

  const { invalidateArtisanInfo } = useArtisanPrivate()

  const  { register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: zodResolver(baseSocialNetworkSchema)
  }) 

  useEffect(() => {
    if(socialNetwork){
      reset({
        type: socialNetwork.type,
        url: socialNetwork.url
      })
    }
  }, [socialNetwork, reset])

  const onSubmit = async (data: BaseSocialNetwork) => {
    if(socialNetwork){
      const { id, message } = await updateSocialNetwork(socialNetwork.id, data)
      if (!id) {
        toast.error(message)
        return
      }
      invalidateArtisanInfo()
      setOpenDialogUpdateSN(false)
      setOpenDialogInfoArtisan(false)
      
      toast.success(message)
    }
  }

  return(
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <InputLabel
        icon={<SocialIcon />}
        {...register("type")}
        error={errors.type?.message}
      />
      <InputLabel
        icon={<LinkIcon />}
        {...register("url")}
        error={errors.url?.message}
      />
      <div className="flex justify-end gap-4">
        <SecondaryButton
          type="button"
          onClick={() => setOpenDialogUpdateSN(false)}
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
