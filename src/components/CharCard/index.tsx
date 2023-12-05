import { Char } from "@/types/Char.type"
import { Box, Grid, GridItem, Image, Menu, MenuButton, MenuItem, MenuItemProps, MenuList, Text } from "@chakra-ui/react"
import { Edit, More, ProfileAdd, Trash } from "iconsax-react"
import { ModalManageChar } from "../ModalManageChar"
import { ModalDeleteChar } from "../DialogDeleteChar"

interface CharCardProps {
    char: Char
}

const menuItemProps: MenuItemProps = {
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    bg: 'gray.900',
    color: 'white',
    _hover: {
        bg: 'gray.700'
    }
}

const CharCard = ({
    char,
}: CharCardProps) => {
    return (
        <Grid
            gridTemplateColumns='auto 1fr auto'
            gridTemplateRows={'1fr 1fr'}
            columnGap={4}
            flexFlow={'column wrap'}
            alignItems={'center'}
            width='100%'
            height={'100px'}
            padding='8px'
            fontSize={'14px'}
            border={'solid 1px turquoise'}
        >
            <GridItem rowSpan={3}>
                <Image src={char.charImage} width='75px' height='75px' bg='cyan' />
            </GridItem>
            <GridItem
                whiteSpace='nowrap'
                overflow={'hidden'}
                textOverflow='ellipsis'
                display={'flex'}
                alignItems={'center'}
                justifyContent={'flex-start'}
            >
                {char.characterName}
            </GridItem>
            <GridItem
                display={'flex'}
                justifyContent={'flex-end'}
            >
                <Menu>
                    <MenuButton
                        p='3px'
                        transition='all 0.2s'
                        borderRadius='100%'
                        _hover={{ bg: 'gray.600' }}
                        _expanded={{ bg: 'turquoise' }}
                    >
                        <More size="32" />
                    </MenuButton>
                    <MenuList
                        bg='gray.900'
                        border='solid 1px cyan'
                    >
                        <ModalManageChar
                            context="edit"
                            char={char}
                            triggerButton={
                                <MenuItem {...menuItemProps}>
                                    <Edit variant="TwoTone" />
                                    <Text>Edit card</Text>
                                </MenuItem>
                            }
                        />
                        <ModalDeleteChar
                            char={char}
                            triggerButton={
                                <MenuItem {...menuItemProps}>
                                    <Trash variant="TwoTone" />
                                    <Text>Delete char</Text>
                                </MenuItem>
                            }
                        />
                        <MenuItem
                            {...menuItemProps}
                            onClick={() => {

                            }}
                        >
                            <ProfileAdd variant="TwoTone" />
                            Add to map
                        </MenuItem>
                    </MenuList>
                </Menu>
            </GridItem>
            <GridItem
                whiteSpace='nowrap'
                overflow={'hidden'}
                textOverflow='ellipsis'
                display={'flex'}
                alignItems={'center'}
            >
                {char.playerName}
            </GridItem>
            <GridItem
                display={'flex'}
                justifyContent={'flex-end'}
            >
            </GridItem>
        </Grid>
    )
}

export { CharCard }