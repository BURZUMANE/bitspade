import React from 'react'
import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  background-color: transparent;
  padding: 10px 20px;
  color: #ffffff;
  border: none;
  font-size: 1.9em;
  transform: none;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:after {
  content: "";
  height: 100%;
  width: calc(100% + 20px);
  position: absolute;
  top: -2px;
  left: -10px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transition: 1s;
}

&:before {
  content:"";
  height: calc(100% + 20px);
  width: 100%;
  position: absolute; 
  top: -10px;
  left: -2px;
  border-left: 2px solid #fff;
  border-right: 2px solid #fff;
  transition: 1s;
}

&:hover:before {
  transform: rotateY(180deg);
}

&:hover:after {
  transform: rotateX(180deg);
}


.button:hover:after {
  transform: rotateX(180deg);
}

`;

function ButtonComponent({text, cb}) {
  return (
      <Button onClick={() => {
        cb();
      }}
      >
        {text}
      </Button>
  );
}

export default ButtonComponent;
