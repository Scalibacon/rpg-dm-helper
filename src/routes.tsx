import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BattleMap } from "./pages/BattleMap"

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<BattleMap />} />
            </Routes>
        </Router>
    )
}

export { AppRouter }