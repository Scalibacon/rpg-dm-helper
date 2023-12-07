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
import TextInput from "@/components/TextInput"
import { initialConfig } from "./scripts/BattleMapScene"

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
                                initialValues={initialConfig}
                                onSubmit={(_values) => { return }}
                            >
                                {() => (
                                    <>
                                        <ImageInput
                                            name='mapBackground'
                                            label='Map Image'
                                            maxSize={false}
                                            maxW={'300px'}
                                            onImageLoad={(imageBase64) => {
                                                SceneManager.battleMapScene.config = {
                                                    mapBackground: imageBase64,
                                                }
                                            }}
                                        />
                                        <TextInput
                                            name='squareSize'
                                            label='Square size'
                                            type="number"
                                            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                                                SceneManager.battleMapScene.config = {
                                                    squareSize: Number(event.target.value || 50),
                                                }
                                            }}
                                        />
                                        <TextInput
                                            name='paddingTop'
                                            label='Padding top'
                                            type="number"
                                            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                                                SceneManager.battleMapScene.config = {
                                                    paddingTop: Number(event.target.value || 0),
                                                }
                                            }}
                                        />
                                        <TextInput
                                            name='paddingLeft'
                                            label='Padding left'
                                            type="number"
                                            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                                                SceneManager.battleMapScene.config = {
                                                    paddingLeft: Number(event.target.value || 0),
                                                }
                                            }}
                                        />
                                        <TextInput
                                            name='squareOpacity'
                                            label='Square opacity'
                                            type="number"
                                            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                                                SceneManager.battleMapScene.config = {
                                                    squareOpacity: Number(event.target.value || 0),
                                                }
                                            }}
                                        />
                                    </>
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