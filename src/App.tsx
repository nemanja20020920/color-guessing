import { useMemo, useState } from 'react';
import './App.css';

type TMessage = {
  color: 'red' | 'green';
  content: string;
};

function App() {
  //State
  const [color, setColor] = useState<string>(getRandomColor);
  const [message, setMessage] = useState<TMessage | null>(null);

  //Const
  //When the color changes we render new answer options
  const renderOptions = useMemo(() => {
    const options = [color, getRandomColor(color), getRandomColor(color)];

    return shuffle(options).map((option) => (
      <button className="btn" key={option} onClick={() => clickHandler(option)}>
        {option}
      </button>
    ));
  }, [color]);

  //Functions
  //Function which returns a random hexadecimal color code
  function getRandomColor(colorToExclude?: string): string {
    let randomColor = (Math.random() * 0xfffff * 1000000).toString(16);
    while (randomColor === colorToExclude) {
      randomColor = (Math.random() * 0xfffff * 1000000).toString(16);
    }
    return '#' + randomColor.slice(0, 6);
  }

  //Function which shuffles an array of strings
  function shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //Function which checks if user chose the correct answer
  const clickHandler = (answer: string) => {
    if (answer === color) {
      setMessage({
        color: 'green',
        content: 'Correct!',
      });
      setColor(getRandomColor);
    } else
      setMessage({
        color: 'red',
        content: 'Incorrect!',
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="color-box" style={{ backgroundColor: color }}></div>
        <div>{renderOptions}</div>
        {message && <p style={{ color: message.color }}>{message.content}</p>}
      </div>
    </>
  );
}

export default App;
