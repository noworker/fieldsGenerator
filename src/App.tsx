import { BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css";
import V1 from './pages/v1/v1'
import V2 from './pages/v2/v2'
import V3 from './pages/v3/v3'
import Test from './pages/test/test'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`/v1`} element={<V1 />}></Route>
          <Route path={`/v2`} element={<V2 />}></Route>
          <Route path={`/v3`}element={<V3 />}></Route>
          <Route index element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
