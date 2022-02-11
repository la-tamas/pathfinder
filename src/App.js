import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/navbar/navbar-wrapper';
import Grid from './components/grid/gird-wrapper';
import useDimensions from './hooks/useDimensions';
import { createGrid } from './features/grid/gridSlice';

function App() {
  const dispatch = useDispatch();
  const { width, height } = useDimensions();
  const navbarRef = useRef();

  const fillScreen = useCallback(() => {
    const difference = navbarRef.current?.offsetHeight;
    if (height > difference) {
      dispatch(createGrid({
        rows: Math.floor((height - (difference === undefined ? 0 : difference)) / 25),
        cols: Math.floor(width / 25)
      }));
    }
  }, [width, height, dispatch]);

  useEffect(() => {
    fillScreen();
  }, [fillScreen]);

  return (
    <Fragment>
      <Navbar
        onReset={fillScreen}
        ref={navbarRef} />
      <Grid />
    </Fragment>
  );
}

export default App;
