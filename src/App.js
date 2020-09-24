// read https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer
// https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster
// https://kentcdodds.com/blog/colocation

// https://github.com/tannerlinsley/react-query for reat api call

import React, { useEffect, useState, useLayoutEffect } from "react";
import "./style.css";

const counterFuncMaker = start => () => start++;
const getRandomNum = () => Math.round(Math.random() * 100 + 1);
const counterCompARender = counterFuncMaker(0);
const counterCompBRender = counterFuncMaker(0);
const counterFunc = counterFuncMaker(0);

const CompB = ({ prop1, prop2 }) => {
  const [afterUseEffect, setAfterUseEffect] = useState(0);
  const [state1, setState1] = useState(1000);
  const numRender = counterCompBRender();

  useEffect(() => {
    console.log("compB useEffect start", numRender);
    // setAfterUseEffect(counterFunc())
  }, []);

  useLayoutEffect(() => {
    console.log('compB useLayoutEffect vals=', prop1, prop2)
  })

  useEffect(() => {
    console.log("compB useEffect prop change " + afterUseEffect);
    //  console.log("compB useEffect prop change " + afterUseEffect);
    setAfterUseEffect(counterFunc());
  }, [prop1, prop2]);

  return (
    <div>
      <h3>Comp b</h3>
      <p>prop1 {prop1}</p>
      <p>prop2 {prop2}</p>
      <p>counterCompBRender {numRender}</p>
      <p>afterUseEffect {afterUseEffect}</p>
    </div>
  );
};

const CompA = () => {
  const [prop1, setProp1] = useState(0);
  const [prop2, setProp2] = useState(0); 
  const numRender = counterCompARender(); 

  useEffect(() => {
    console.log("compA useEffect start");
  }, []);
  
  useEffect(() => {
    console.log("compA useEffect change props ", prop1, prop2);
  }, [prop1, prop2]);

  useLayoutEffect(() => {
    console.log('compA useLayoutEffect vals=', prop1, prop2)
  })

  const onClickProp = propName => {
    const num = getRandomNum();
     console.log('-----------');
      console.log(' ')
    if (propName === "prop1") {
      setProp1(num);
    }
    if (propName === "prop2") { 
      setProp2(num);
    }
  };
  return (
    <div>
      <h3>Comp a</h3>
      <span>numRender {numRender}</span>
      <div>
        <button onClick={() => onClickProp("prop1")}>Set prop1</button>
        <button onClick={() => onClickProp("prop2")}>Set prop2</button>
      </div>
      <div className="marginB">
        <CompB prop1={prop1} prop2={prop2} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <CompA />
    </div>
  );
}
