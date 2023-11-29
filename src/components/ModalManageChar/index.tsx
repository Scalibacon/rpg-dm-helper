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
import { useContext } from "react"
import TextInput from "../TextInput"
import { Char } from "@/types/Char.type"

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
                        initialValues={{
                            characterName: '',
                            playerName: '',
                        }}
                        onSubmit={(values) => {
                            if (context === 'create') {
                                appDispatch({
                                    type: AppActionKind.ADD_CHAR,
                                    payload: {
                                        char: {
                                            ...values,
                                            id: Date.now(),
                                            coordinates: { x: 0, y: 0 },
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