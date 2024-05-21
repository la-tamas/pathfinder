import { FunctionComponent } from 'react'
import GridContextProvider from './provider/GridContextProvider'
import MainLayout from './components/layout/main.layout'

const App: FunctionComponent = () => {
  return (
    <GridContextProvider>
      <MainLayout />
    </GridContextProvider>
  )
}

export default App;
