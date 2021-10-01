import React, {useEffect, useReducer, useRef, useState} from 'react';
import './style.css';
// interface SettingProps {
//   // formants: Formant[];
// }

function Title(): JSX.Element {
  return (
    <div className="Title">
      <h3>Title</h3>
    </div>
  );
}

function Message(): JSX.Element {
  return (
    <div className="Message">
      <span>Message</span>
    </div>
  );
}

function ProgressBar(): JSX.Element {
  return <div className="ProgressBar">progressbars</div>;
}

function VowelInputPanel(): JSX.Element {
  return <div className="VowelInputPanel">1</div>;
}
function Setting(): JSX.Element {
  return (
    <div className="Setting">
      <Title />
      <Message />
      <ProgressBar />
      <VowelInputPanel />
    </div>
  );
}

export default Setting;
