import { Box, FormControl, FormLabel, HStack, Image, InputProps } from '@chakra-ui/react'
import { useField } from 'formik'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Trash } from 'iconsax-react'
import { fileToBase64 } from '@/utils/fileUtils'

interface ImageInputProps extends InputProps {
    label?: string
    name: string
}

const ImageInput = ({
    label,
    multiple = false,
    height = '100px',
    name,
    //   ...props
}: ImageInputProps) => {
    const [imagePathes, setImagePathes] = useState<string[]>([])
    const [field, meta, fieldHelpers] = useField<File[]>(name)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach(async acceptedFile => {
            try {
                const base64 = await fileToBase64(acceptedFile)
                if (typeof base64 !== 'string') return

                if (multiple) {
                    fieldHelpers.setValue(field.value.concat(acceptedFile))
                    setImagePathes(prev => [...prev, base64])
                } else {
                    fieldHelpers.setValue([acceptedFile])
                    setImagePathes([base64])
                }

            } catch (error) {
                if (error instanceof Error)
                    console.log('Error trying to upload image: ', error.message)
            }
        })
    }, [field.value, fieldHelpers, multiple])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg'],
        }
    })

    return (
        <FormControl
            {...getRootProps()}
            {...field}
            w='500px'
        >
            {label && <FormLabel>{label}</FormLabel>}
            <Box
                height={height}
                border='dashed 1px'
                borderColor={isDragActive ? 'cyan' : 'gray'}
                display='flex'
                alignItems={'center'}
                justifyContent='center'
            // bg='pink'
            >
                <input {...getInputProps()} id={name} />
                {
                    isDragActive
                        ? <p>Drop the image here...</p>
                        : <p>Drag 'n' drop or click to upload image</p>
                }
            </Box>
            <HStack flexWrap='wrap'>
                {imagePathes.map((imagePath, key) => (
                    <Box
                        key={key}
                        position={'relative'}
                        _hover={{
                            '& .trashButton': {
                                display: 'block'
                            }
                        }}
                    >
                        <Image
                            src={imagePath}
                            h='100px'
                            w='100px'
                            m='0.5rem'
                        />
                        <Box
                            position={'absolute'}
                            right='5px'
                            top='5px'
                            bg='white'
                            padding='5px'
                            borderRadius={'100%'}
                            border='solid 1px gray'
                            cursor={'pointer'}
                            className='trashButton'
                            display='none'
                            onClick={(event) => {
                                setImagePathes(imagePathes.filter(imagePathFilter =>
                                    imagePathFilter !== imagePath
                                ))
                                event.stopPropagation()
                            }}
                        >
                            <Trash color='red' size={'20px'} />
                        </Box>
                    </Box>
                ))}
            </HStack>

        </FormControl>
    )
}

export { ImageInput }
