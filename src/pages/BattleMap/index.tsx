import { CharCard } from "@/components/CharCard"
import { ModalManageChar } from "@/components/ModalManageChar"
import { AppContext } from "@/contexts/AppContext"
import {
    Button,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from "@chakra-ui/react"
import { useContext } from "react"

const BattleMap = () => {
    const { appState } = useContext(AppContext)

    console.log(appState)
    return (
        <Flex
            height='100vh'
            color='white'
        >
            <Flex
                flexDirection={'column'}
                height='100%'
                width='350px'
                padding='12px'
                backgroundColor={'rgb(26,32,44)'}
                marginLeft={'auto'}
            >
                <Tabs variant={'enclosed'}>
                    <TabList>
                        <Tab>Chars</Tab>
                        <Tab>Settings</Tab>
                        <Tab>Logs</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <VStack>
                                <ModalManageChar
                                    context="create"
                                    triggerButton={
                                        <Button
                                            colorScheme="teal"
                                            variant={'outline'}
                                        >
                                            Add Char
                                        </Button>
                                    }
                                />

                                {appState.chars.map((char, index) => {
                                    return (
                                        <CharCard key={index} char={char}/>
                                    )
                                })}
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <p>Settings!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>Logs!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    )
}

export { BattleMap }