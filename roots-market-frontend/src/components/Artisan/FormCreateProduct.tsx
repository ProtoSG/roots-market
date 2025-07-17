import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductCreate, productCreateSchema } from "../../models/product.model"
import { InputLabel, SecondaryButton, PrimaryButton, TextAreaLabel, SelectLabel, StepFieldset, Tag } from "../UI"
import { useProductCreateDialogStore } from "../../stores/dialogStore"
import { BoxIcon, DolarIcon, FileIcon, PhotoScanIcon, PlusIcon, StackIcon, TagIcon, XIcon } from "../../icons"
import { useCategory } from "../../hooks/useCategory"
import { useState, useEffect } from "react"
import { createProduct } from "../../api/artisans"
import { toast } from "sonner"
import { updateProduct } from "../../api/artisans"

interface FormCreateProductProps {
  product?: Partial<ProductCreate> & { id?: number }
  isEdit?: boolean
  onClose?: () => void
}

export function FormCreateProduct({ product, isEdit, onClose }: FormCreateProductProps = {}){
  const { setOpen } = useProductCreateDialogStore()
  const { register, handleSubmit, formState: {errors}, setValue, reset, watch } = useForm<ProductCreate>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: product ? {
      ...product,
      images: product.images || [],
      tags: product.tags || [],
    } : {
      images: [],
      tags: [],
    }
  })
  
  const [imageInput, setImageInput] = useState<string>("")
  const [tagInput, setTagInput] = useState<string>("")

  const { categories } = useCategory()

  const watchedImages = watch("images") || []
  const watchedTags = watch("tags") || []

  useEffect(() => {
    if (isEdit && product) {
      reset({
        ...product,
        images: product.images || [],
        tags: product.tags || [],
      })
    }
  }, [isEdit, product, reset])

  const onSubmit = async (data: ProductCreate) => {
    let response
    if(isEdit && product?.id){
      response = await updateProduct(product.id, data)
    } else {
      response = await createProduct(data)
    }
    if(response.id){
      toast.success(response.message)
      reset()
      if(onClose) onClose()
      else setOpen(false)
    } else {
      toast.error(response.message)
    }
  }

  const handleAddImage = () => {
    if (imageInput.trim()) {
      const currentImages = watchedImages
      setValue("images", [...currentImages, imageInput.trim()])
      setImageInput("")
    }
  }

  const handleRemoveImage = (index: number) => {
    const currentImages = watchedImages
    setValue("images", currentImages.filter((_, i) => i !== index))
  }

  const handleAddTag = () => {
    if (tagInput.trim()) {
      const currentTags = watchedTags
      setValue("tags", [...currentTags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (index: number) => {
    const currentTags = watchedTags
    setValue("tags", currentTags.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      action()
    }
  }

  return (
    <form 
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2">
        <InputLabel
          icon={<BoxIcon />}
          placeholder="Ingrese el nombre del producto"
          {...register("name")}
          error={errors.name?.message}
        />
      </div>

      <div className="space-y-2">
        <TextAreaLabel
          icon={<FileIcon />}
          placeholder="Cuente la historia de su producto (mínimo 10 caracteres)"
          {...register("story")}
          error={errors.story?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <InputLabel
            icon={<DolarIcon />}
            placeholder="55.50"
            type="number"
            step="0.01"
            min="0"
            {...register("price", { 
              valueAsNumber: true,
              required: "El precio es obligatorio"
            })}
            error={errors.price?.message}
          />
        </div>
        <div className="space-y-2">
          <InputLabel
            icon={<StackIcon />}
            placeholder="10"
            type="number"
            min="0"
            {...register("stock", { 
              valueAsNumber: true,
              required: "El stock es obligatorio"
            })}
            error={errors.stock?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <SelectLabel
          icon={<BoxIcon />}
          data={categories.map((category) => ({
            id: category.id.toString(),
            name: category.name
          }))}
          {...register("categoryId", { 
            valueAsNumber: true,
            required: "La categoría es obligatoria"
          })}
          error={errors.categoryId?.message}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Imágenes del producto</h3>
        
        <StepFieldset 
          visible
          className="flex-row gap-4"
        >
          <label className="flex flex-1 items-center gap-4 border border-[#323232] rounded-lg p-3 bg-white">
            <PhotoScanIcon />
            <input
              className="flex-1 bg-transparent outline-none text-gray-700"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddImage)}
            />
          </label>
          <PrimaryButton 
            type="button"
            className="flex text-nowrap text-sm items-center justify-center gap-2 px-4 py-3"
            onClick={handleAddImage}
            disabled={!imageInput.trim()}
          >
            <PlusIcon />
            Agregar imagen
          </PrimaryButton>
        </StepFieldset>

        {watchedImages.length > 0 && (
          <StepFieldset
            visible
            className="flex-row gap-4 flex-wrap"
          >
            {watchedImages.map((image, index) => (
              <span
                key={index}
                className="flex items-center gap-3 border border-[#323232] rounded-lg p-3 bg-gray-50"
              >
                <PhotoScanIcon />
                <span className="text-sm text-gray-700 truncate max-w-xs">{image}</span>
                <button
                  type="button"
                  className="cursor-pointer transition-colors hover:text-red-500 p-1"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XIcon />
                </button>
              </span>
            ))}
          </StepFieldset>
        )}
        
        {errors.images && (
          <p className="text-sm text-center text-red-500">
            {errors.images.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Etiquetas del producto</h3>
        
        <StepFieldset
          visible
          className="flex-row gap-4"
        >
          <label className="flex flex-1 items-center gap-4 border border-[#323232] rounded-lg p-3 bg-white">
            <TagIcon />
            <input
              className="flex-1 bg-transparent outline-none text-gray-700"
              type="text"
              placeholder="Ingrese la etiqueta del producto"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
            />
          </label>
          <PrimaryButton
            type="button"
            className="flex text-nowrap text-sm items-center justify-center gap-2 px-4 py-3"
            onClick={handleAddTag}
            disabled={!tagInput.trim()}
          >
            <PlusIcon />
            Agregar etiqueta
          </PrimaryButton>
        </StepFieldset>

        {watchedTags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {watchedTags.map((tag, index) => (
              <Tag
                key={index}
                name={tag}
                onRemove={() => handleRemoveTag(index)}
              />
            ))}
          </div>
        )}
        
        {errors.tags && (
          <p className="text-sm text-center text-red-500">
            {errors.tags.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
        <SecondaryButton
          type="button"
          onClick={onClose ? onClose : () => setOpen(false)}
          className="px-6 py-2"
        >
          Cancelar
        </SecondaryButton>
        <PrimaryButton 
          type="submit"
          className="px-6 py-2"
        >
          {isEdit ? "Actualizar Producto" : "Crear Producto"}
        </PrimaryButton>
      </div>
    </form>
  )
}