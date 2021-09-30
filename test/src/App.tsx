import React from 'react';
import './App.css';
import Setting, {Formant} from './component/Setting';

const formants: Formant[] = [
  {
    label: '아',
    array: [],
    Image: null,
  },
  {
    label: '이',
    array: [],
    Image: null,
  },
  {
    label: '우',
    array: [],
    Image: null,
  },
  {
    label: '애',
    array: [],
    Image: null,
  },
  {
    label: '오',
    array: [],
    Image: null,
  },
];

function App(): JSX.Element {
  return <Setting formants={formants} />;
}

export default App;
