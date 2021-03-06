import './App.css';
import Rect from "./components/Rect"
import Counter from "./components/Counter"
import Message from "./components/Message"
import SimpleForm from './components/SimpleForm';
import Title from './components/Title';
import Message2 from './components/Message2';
import SampleContext from './components/context/SampleContext';
import CalcTotalApp from './components/CalcTotalApp';
import CalcTotalApp2 from "./components/CalcTotalApp2"
import CalcTaxApp from './components/app/CalcTaxApp';
import PersistApp from './components/app/PersistApp';
import MemoApp from "./components/app/Memo/MemoApp";

function App() {
  const data = [
    {text: "First Item"},
    {text: "Second Item"},
    {text: "Third Item"},
    {text: "Forth Item"},
    {text: "Fifth Item"}
  ]
  return (
    <div className="App">
        <h1 className="bg-primary text-white display-4">React Simple Page</h1>
        <div className="container mt-3"></div>
        <ul className="list-group">
          {data.map((value, key) => (
            <li className="list-group-item" key={key}>{value.text}</li>
          ))}
        </ul>
        <Rect x="200" y="200" w="200" h="200" c="#6ff9" r="25"/>
        <Rect x="300" y="300" w="200" h="200" c="#f6f9" r="75" />
        <Rect x="400" y="400" w="200" h="200" c="#6669" r="100" />

        <Counter />
        <Message>これはテスト用のテキストです｡句読点がでてくるたびに新しいアイテムとして分割されます｡この文章はMessageコンポーネントの中に書かれており､これはprops.childを通じてMessageコンポーネントに渡されています｡</Message>

        <SimpleForm title="Simple Form Example" />

        <div className='container'>
          <Title />
          <Message2 />
        </div>

        <div className='container'>
          <SampleContext.Provider value={{title: "new title", message: "new message"}}>
            <Title />
            <Message2 />
          </SampleContext.Provider>
        </div>

        <div className='container'>
          <CalcTotalApp />
        </div>

        <div className='container'>
          <CalcTotalApp2 />
        </div>

        <div className='container'>
          <CalcTaxApp />
        </div>

        <div className='container'>
          <PersistApp />
        </div>

        <div className='container'>
          <MemoApp />
        </div>
    </div>
  );
}

export default App;
