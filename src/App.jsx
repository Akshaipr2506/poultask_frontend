
import './App.css'
import Canvas from './components/Canvas'
import Excel from './components/Excel'

import Ui from './components/Ui'

import Xlsxparser from './components/Xlsxparser'

function App() {
  

  return (
    <>
    <Ui></Ui>
    
    <Canvas></Canvas>
    <Xlsxparser></Xlsxparser>
    <Excel></Excel>
    </>
  )
}

export default App
