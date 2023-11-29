import { Char } from "@/types/Char.type"
import { Box, Grid, GridItem, Image } from "@chakra-ui/react"
import { Edit } from "iconsax-react"
import { ModalManageChar } from "../ModalManageChar"

interface CharCardProps {
    char: Char
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
                <ModalManageChar
                    context="edit"
                    char={char}
                    triggerButton={
                        <Box
                            cursor={'pointer'}
                            transition={'opacity 0.2s ease'}
                            _hover={{
                                opacity: '0.7'
                            }}
                        >
                            <Edit variant="TwoTone" />
                        </Box>
                    }
                />
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
        </Grid>
    )
}

export { CharCard }