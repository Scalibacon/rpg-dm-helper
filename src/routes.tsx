import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BattleMapPage } from "./pages/BattleMap"

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<BattleMapPage />} />
            </Routes>
        </Router>
    )
}

export { AppRouter }