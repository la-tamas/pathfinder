import { useEffect, useRef, useCallback, FunctionComponent, memo } from 'react'
import Navbar from '../navbar/navbar.wrapper'
import Grid from '../grid/girdWrapper'
import ModalWrapper from '../modal/modal.wrapper'
import useDimensions from '../../hooks/useDimensions'
import useGridActions from '../../hooks/useGridActions'

const MainLayout: FunctionComponent = () => {
  const { width, height } = useDimensions()
  const navbarRef = useRef<HTMLDivElement>()
  const { createGrid } = useGridActions()

  const fillScreen = useCallback(() => {
    const difference = navbarRef.current?.offsetHeight
    if (height > difference) {
      createGrid(
        Math.floor((height - (difference === undefined ? 0 : difference)) / 25),
        Math.floor(width / 25)
      )
    }
  }, [width, height])

  useEffect(() => {
    fillScreen();
  }, [fillScreen])

  return (
    <>
      <ModalWrapper />
      <Navbar
        onReset={fillScreen}
        ref={navbarRef} />
      <Grid />
    </>
  )
}

export default memo(MainLayout)
