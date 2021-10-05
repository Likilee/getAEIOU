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

interface ProgressBarProps {
  recording: boolean;
}

function ProgressBar(props: ProgressBarProps): JSX.Element {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeOutID = setInterval(() => {
      setProgress(previous => (previous < 100 ? previous + 1 : previous));
    }, 100);
    if (progress >= 100) clearTimeout(timeOutID);
  }, [props.recording]);

  return (
    <div className="ProgressBar">
      <div className="ProgressBar-inner" style={{width: `${progress}%`}}></div>
    </div>
  );
}

interface VowelInputPanelProps {
  currentVowel: string;
  vowels: string[];
  onClick: (vowel: string) => void;
}

interface VowelInputItemProps {
  onClick: () => void;
}

function VowelInputItem(props: VowelInputItemProps) {
  return (
    <div className="VowelInputPanel-item">
      <button onClick={props.onClick}></button>
    </div>
  );
}

function VowelInputPanel(props: VowelInputPanelProps): JSX.Element {
  return (
    <div className="VowelInputPanel">
      {props.vowels.map(vowel => {
        const onClick = () => {
          props.onClick(vowel);
        };
        return <VowelInputItem key={vowel} onClick={onClick} />;
      })}
    </div>
  );
}

function Setting(): JSX.Element {
  const [vowel, setVowel] = useState('아');
  const [recording, setRecording] = useState(false);
  const vowels = ['아', '에', '이', '오', '우'];

  return (
    <div className="Setting">
      <Title />
      <Message currentVowel={vowel} />
      <ProgressBar recording={recording} />
      <VowelInputPanel
        vowels={vowels}
        currentVowel={vowel}
        onClick={setVowel}
      />
    </div>
  );
}

export default Setting;
