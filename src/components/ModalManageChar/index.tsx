import { AppContext } from "@/contexts/AppContext"
import { AppActionKind } from "@/reducers/AppReducer"
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure
} from "@chakra-ui/react"
import { Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import TextInput from "../TextInput"
import { Char } from "@/types/Char.type"
import { ImageInput } from "../ImageInput"
import { dataUrlToFile, fileToBase64 } from "@/utils/fileUtils"

interface ModalManageCharProps {
    context: 'create' | 'edit'
    char?: Char
    triggerButton?: JSX.Element
}

const ModalManageChar = ({
    context,
    char,
    triggerButton,
}: ModalManageCharProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { appState, appDispatch } = useContext(AppContext)
    const [imageFile, setImageFile] = useState<File | undefined>()

    useEffect(() => {
        async function convertToFile() {
            if (!char || !char.charImage) return

            const file = await dataUrlToFile(char.charImage, 'filename')
            setImageFile(file)
        }

        convertToFile()
    }, [char])

    return (
        <>
            {triggerButton &&
                <Box onClick={onOpen}>
                    {triggerButton}
                </Box>
            }

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent width='auto' maxWidth={'85vw'}>
                    <Formik
                        initialValues={
                            char ? {
                                ...char,
                                charImage: imageFile
                                    ? [imageFile]
                                    : []
                            } : {
                                id: 0,
                                characterName: '',
                                playerName: '',
                                charImage: [],
                            }}
                        onSubmit={async (values) => {
                            console.log('values', values)
                            const imageToBase64 = values.charImage[0]
                                ? await fileToBase64(values.charImage[0])
                                : undefined

                            if (context === 'create') {
                                appDispatch({
                                    type: AppActionKind.ADD_CHAR,
                                    payload: {
                                        char: {
                                            ...values,
                                            charImage: typeof imageToBase64 === 'string'
                                                ? imageToBase64
                                                : undefined,
                                            id: Date.now(),
                                        }
                                    }
                                })
                            }

                            if (context === 'edit') {
                                appDispatch({
                                    type: AppActionKind.UPDATE_CHAR,
                                    payload: {
                                        char: {
                                            ...values,
                                            charImage: typeof imageToBase64 === 'string'
                                                ? imageToBase64
                                                : undefined,
                                        }
                                    }
                                })
                            }
                            onClose()
                        }}
                    >
                        {(formikProps) => (
                            <>
                                <ModalHeader textTransform={'capitalize'}>
                                    Manage char
                                </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody paddingY='1' paddingX={'4'}>
                                    <Tabs variant={'enclosed'}>
                                        <TabList>
                                            <Tab>Lore</Tab>
                                            <Tab>Skills</Tab>
                                            <Tab>Talents</Tab>
                                            <Tab>Inventory</Tab>
                                            <Tab>Notes</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel width={'700px'}>
                                                <Grid>
                                                    <TextInput name="characterName" label="Character name" />
                                                    <TextInput name="playerName" label="Player name" />
                                                    <ImageInput name="charImage" label="Character image" />
                                                </Grid>
                                            </TabPanel>
                                            <TabPanel width={'700px'}>

                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                        colorScheme='blue'
                                        mr={3}
                                        onClick={formikProps.submitForm}
                                    >
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </>
                        )}
                    </Formik>
                </ModalContent>
            </Modal>
        </>
    )
}

export { ModalManageChar }