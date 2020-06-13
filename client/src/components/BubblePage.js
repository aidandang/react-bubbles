import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "./axiosAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
    axiosWithAuth().get('http://localhost:5000/api/colors')
      .then(res => {
        setColorList(...colorList, res.data);
      })
      .catch(err => {
        console.log(err)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(colorList)

  return (
    <>
      {colorList.length > 0 && <>
        <ColorList colors={colorList} updateColors={setColorList} />
        <Bubbles colors={colorList} />
      </>
      }
    </>
  );
};

export default BubblePage;
