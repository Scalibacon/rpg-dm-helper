import { AppContext } from "@/contexts/AppContext"
import { AppActionKind } from "@/reducers/AppReducer"
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react"
import { useContext } from "react"
import { Char } from "@/types/Char.type"

interface ModalDeleteCharProps {
    char: Char
    triggerButton?: JSX.Element
}

const ModalDeleteChar = ({
    char,
    triggerButton,
}: ModalDeleteCharProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { appDispatch } = useContext(AppContext)

    return (
        <>
            {triggerButton &&
                <Box onClick={onOpen}>
                    {triggerButton}
                </Box>
            }

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent width='400px' maxWidth={'85vw'}>
                    <ModalHeader textTransform={'capitalize'}>
                        Delete char
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Do you really want to delete this char?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='red'
                            mr={3}
                            onClick={() => {
                                appDispatch({
                                    type: AppActionKind.REMOVE_CHAR,
                                    payload: {
                                        char: char
                                    }
                                })
                                onClose()
                            }}
                        >
                            Delete
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export { ModalDeleteChar }