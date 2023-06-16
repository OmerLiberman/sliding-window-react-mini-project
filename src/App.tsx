import React from 'react';
import './App.css';

const fetchPropsals = async (text?: string) => {
  console.log('text', text);
  return [
    'propsal 1',
    'propsal 2',
    'propsal 3',
  ]
}

function App() {
  const [propsals, setPropsals] = React.useState<Array<string>>([]);
  const [position, setPosition] = React.useState<{top?: number, left?: number}>({});

  React.useEffect(() => {
    document.addEventListener("selectionchange", () => {
      const selection = document.getSelection();
      const selectedText = selection?.toString();

      const lowerRange = selection?.focusOffset;
      const higherRange = selection?.anchorOffset;
      const existingText = selection?.anchorNode?.textContent;

      const rect = selection?.getRangeAt(0).getBoundingClientRect();
      setPosition({top: rect?.top, left: rect?.left! + rect?.width!})
      fetchPropsals(selectedText).then(res => setPropsals(res))
    });

    document.addEventListener('pointerdown', (event) => {
      document.getSelection()?.removeAllRanges();
      event.stopPropagation();
    });
  }, []);

  return (
    <div className="App">
      <div contentEditable className='editor'>
        Some editable content here ff
      </div>
      {position && <div style={{background: 'blue', position: 'absolute', ...position}}>
          {propsals.map(propsal => <div> {propsal} </div>)}
      </div>}
    </div>
  );
}

export default App;
