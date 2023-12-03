import { SceneManager } from "@/pages/BattleMap/scripts/SceneManager"
import { Box } from "@chakra-ui/react"
import { useEffect, useRef } from 'react'

const BattleMap = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        SceneManager.initialize(
            containerRef.current?.clientWidth || 500, 
            containerRef.current?.clientHeight || 100
        )
    })

    return (
        <Box bg='deepskyblue' flex='1' h='100%' ref={containerRef}>
            <canvas id='battle-map-canvas' />
        </Box>
    )
}

export { BattleMap }