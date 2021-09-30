import React, {useEffect, useRef, useState} from 'react';

export interface Formant {
  label: string;
  array: number[];
  Image: HTMLImageElement | null;
}

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

interface VowelInputProps {
  vowel: string;
  setVowels: (arg0: number[]) => void;
  smad: number[];
}

function VowelInput(props: VowelInputProps) {
  const [isShow, setIsShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resetClick = () => {
    props.setVowels([]);
  };
  const doneClick = () => {
    console.log(props.smad);
    props.setVowels([...props.smad]);
  };
  const showClick = () => {
    setIsShow(!isShow);
  };
  useEffect(() => {
    if (canvasRef.current && isShow) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const animationCb = () => {
        formants.forEach(value => {
          if (value.label === props.vowel) {
            value.array.forEach((val, idx) => {
              ctx.beginPath();
              ctx.moveTo(idx, canvas.clientHeight);
              ctx.lineTo(idx, canvas.clientHeight - val);
              ctx.stroke();
            });
          }
        });
        requestAnimationFrame(animationCb);
      };
      requestAnimationFrame(animationCb);
    }
  });

  return (
    <>
      {isShow ? (
        <canvas
          style={{border: '1px solid black'}}
          width={1024}
          height={190}
          ref={canvasRef}
        ></canvas>
      ) : null}
      <div>
        {props.vowel}
        <button onClick={resetClick}>reset</button>
        <button onClick={doneClick}>done</button>
        <button onClick={showClick}>show</button>
      </div>
    </>
  );
}

interface SettingProps {
  formants: Formant[];
}

function Setting(props: SettingProps): JSX.Element {
  const smad: number[] = [];
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({audio: true, video: false})
      .then(stream => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        console.log(audioContext.sampleRate);
        analyser.smoothingTimeConstant = 0.6;
        analyser.fftSize = 2048; //
        const byteFrequencyDataArray = new Uint8Array(
          analyser.frequencyBinCount / 3,
        );
      });
  }, []);

  return (
    <>
      {formants.map((value, idx) => {
        const setVowels = (arg0: number[]) => {
          formants[idx].array = arg0;
        };
        return (
          <VowelInput
            key="tmp"
            vowel={value.label}
            setVowels={setVowels}
            smad={smad}
          ></VowelInput>
        );
      })}
    </>
  );
}

export default Setting;
