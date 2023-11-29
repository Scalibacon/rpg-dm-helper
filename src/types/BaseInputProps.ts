import { FormControlProps } from "@chakra-ui/react"
import { FormikContextType } from "formik"
// import Option from "./SelectOption"

type BaseInputProps = {
  name: string
  label?: string
  shouldDisable?: (formikContext: FormikContextType<object>) => boolean
  shouldReadOnly?: (formikContext: FormikContextType<object>) => boolean
  onChange?: (
      newValue: string | number | boolean  | undefined /* | Option | Option[] */,
      formikContext: FormikContextType<object>
    ) => void
} & Omit<FormControlProps, 'onChange'>

export default BaseInputProps
