import {stringify} from 'querystring';
import React, {useEffect, useReducer, useRef, useState} from 'react';
import './style.css';
// interface SettingProps {
//   // formants: Formant[];
// }

function Title(): JSX.Element {
  return (
    <div className="Title">
      <h3>모음 입력</h3>
    </div>
  );
}

interface MessageProps {
  currentVowel: string;
}

function Message(props: MessageProps): JSX.Element {
  return (
    <div className="Message">
      <span>{props.currentVowel} 입력 중</span>
    </div>
  );
}

function ProgressBar(): JSX.Element {
  const [progress, setProgress] = useState(0);

  const timeOutID = setInterval(() => {
    setProgress(previous => (previous < 100 ? previous + 1 : previous));
  }, 100);
  if (progress >= 100) clearTimeout(timeOutID);
  return (
    <div className="ProgressBar">
      <div className="ProgressBar-inner" style={{width: `${progress}%`}}></div>
    </div>
  );
}

interface VowelInputPanelProps {
  currentVowel: string;
  onClick: (vowel: string) => void;
}

function VowelInputPanel(props: VowelInputPanelProps): JSX.Element {
  return (
    <div className="VowelInputPanel">
      <div className="VowelInputPanel-item">
        <button
          onClick={() => {
            props.onClick('아');
          }}
        ></button>
      </div>
      <div className="VowelInputPanel-item">
        <button
          onClick={() => {
            props.onClick('이');
          }}
        ></button>
      </div>{' '}
      <div className="VowelInputPanel-item">
        <button
          onClick={() => {
            props.onClick('우');
          }}
        ></button>
      </div>{' '}
      <div className="VowelInputPanel-item">
        <button
          onClick={() => {
            props.onClick('에');
          }}
        ></button>
      </div>{' '}
      <div className="VowelInputPanel-item">
        <button
          onClick={() => {
            props.onClick('오');
          }}
        ></button>
      </div>
    </div>
  );
}
function Setting(): JSX.Element {
  const [vowel, setVowel] = useState('아');

  return (
    <div className="Setting">
      <Title />
      <Message currentVowel={vowel} />
      <ProgressBar />
      <VowelInputPanel currentVowel={vowel} onClick={setVowel} />
    </div>
  );
}

export default Setting;
