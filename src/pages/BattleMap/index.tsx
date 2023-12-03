import { BattleMap } from "@/components/BattleMap"
import { CharCard } from "@/components/CharCard"
import { ImageInput } from "@/components/ImageInput"
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
import { Formik } from "formik"
import { useContext } from "react"
import { SceneManager } from "./scripts/SceneManager"

const BattleMapPage = () => {
    const { appState } = useContext(AppContext)

    console.log(appState)
    return (
        <Flex
            height='100vh'
            color='white'
        >
            <BattleMap />
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
                    <TabPanels
                        overflowX={'auto'}
                    >
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
                                        <CharCard key={index} char={char} />
                                    )
                                })}
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <Formik
                                initialValues={{
                                    mapBackground: ''
                                }}
                                onSubmit={() => { return }}
                            >
                                {() => (
                                    <ImageInput 
                                        name='mapBackground' 
                                        maxSize={false}
                                        onImageLoad={(imageBase64) => {
                                            SceneManager.battleMapScene.setBackgroundImage(imageBase64)
                                        }}
                                    />

                                )}
                            </Formik>
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

export { BattleMapPage }