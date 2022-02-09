import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/navbar/navbar-wrapper';
import Grid from './components/grid/gird-wrapper';
import useDimensions from './hooks/useDimensions';
import { createGrid } from './features/grid/gridSlice';

function App() {
  const dispatch = useDispatch();
  const { width, height } = useDimensions();
  const navbarRef = useRef();

  useEffect(() => {
    const difference = navbarRef.current?.offsetHeight;
    if (height > 0) {
      dispatch(createGrid({
        rows: Math.floor((height - (difference === undefined ? 0 : difference)) / 25),
        cols: Math.floor(width / 25)
      }));
    }
  }, [width, height, dispatch]);

  return (
    <Fragment>
      <Navbar
        dimensions={{
          width: width,
          height: height
        }} 
        ref={navbarRef} />
      <Grid />
    </Fragment>
  );
}

export default App;
