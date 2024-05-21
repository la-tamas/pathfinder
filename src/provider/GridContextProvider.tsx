import { FunctionComponent, ReactNode } from 'react'
import GridContext from '../context/GridContext'
import useGridSubscription from '../hooks/useGridSubscription'

type GridContextProviderProps = {
    children: ReactNode | ReactNode[] | JSX.Element
}

const GridContextProvider: FunctionComponent<GridContextProviderProps> = ({ children }) => {
    const store = useGridSubscription()
    
    return (
        <GridContext.Provider value={store}>
            {children}
        </GridContext.Provider>
    )
}

export default GridContextProvider
