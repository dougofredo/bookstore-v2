import React from 'react';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";


const Popfred = () => {
  var myvar = false;
  var fred = "";
  const simple = async () => {
    setTimeout(function(){ myvar = true;fred = "hi" }, 3000);
  };
  simple();
  const myvar2 = false;
    return (
      <Popup
        open={myvar}
        closeOnDocumentClick
        onClose={myvar2}
      >
        <div className="modal">
          <a className="close" onClick={myvar}>
            &times;
          </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
          ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
          doloribus. Odit, aut.
        </div>
      </Popup>
    )
}

export default Popfred
