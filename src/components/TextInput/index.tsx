import type BaseInputProps from '@/types/BaseInputProps'

// import { useState } from 'react'
import {
    InputProps,
    Input,
    FormLabel,
    FormControl,
    InputGroup,
    //  InputRightElement,
    //  Text,
    FormErrorMessage
} from "@chakra-ui/react"
import { useField, useFormikContext } from 'formik'

type TextInputProps = BaseInputProps & InputProps

const TextInput = ({
    label,
    isRequired,
    variant = 'flushed',
    name,
    shouldDisable,
    shouldReadOnly,
    ...props
}: TextInputProps) => {
    // const [show, setShow] = useState(false)
    const [field, fieldMetaProps] = useField(name)
    const formikContext = useFormikContext<object>();

    const errorMessage = fieldMetaProps.error
    const isTouched = fieldMetaProps.touched
    const hasError = !!(errorMessage && isTouched)

    return (
        <FormControl
            mb='1rem'
            isRequired={isRequired}
            isInvalid={hasError}
            isDisabled={
                shouldDisable
                    ? shouldDisable(formikContext)
                    : false
            }
            isReadOnly={
                shouldReadOnly
                    ? shouldReadOnly(formikContext)
                    : false
            }
        >
            {!!label &&
                <FormLabel
                    color={hasError ? 'red.500' : 'inherit'}
                >
                    {label}
                </FormLabel>
            }
            <InputGroup>
                <Input
                    colorScheme={hasError ? 'red' : 'main'}
                    // size='lg'
                    variant={variant}
                    // type={!show ? type : 'text'}
                    isRequired
                    borderColor={hasError ? 'red' : undefined}
                    {...field}
                    {...props}
                />

                {/* {type === 'password' &&
                    <InputRightElement cursor='pointer'
                        onClick={() => setShow(prev => !prev)}
                    >
                        {!show
                            ? <EyeSlash size={24} />
                            : <Eye size={24} />
                        }
                    </InputRightElement>
                } */}
            </InputGroup>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>

    )
}

export default TextInput
