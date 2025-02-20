import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import axios from  'axios'
import {useState} from 'react'

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [aiAnswer,setAiAnswer] = useState("");
  async function generateAnswer(){
    const response  = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC4fM2Ce32LgazefDFGdVte0hihAGxkGr8",
      method : 'POST',
      data : {
        "contents": [{
        "parts":[{"text": transcript+" Identify and extract Basic meeting details (date, time) Key discussion points Do not add anything extra and give in paragraph. Also give to-do list in para only and create basic meeting summary notes"}]
        }]
      }
    })
    setAiAnswer(response.data.candidates[0].content.parts[0].text)
    console.log(response.data.candidates[0].content.parts[0].text);
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="App">
      <h1>AI ASSISTANT</h1>
      <div className='mainClass'>
        <textarea value = {transcript} placeholder='Speak Something...' rows='7' cols='50'></textarea>
        <div className='innerClass'>
        <button onClick = {()=>SpeechRecognition.startListening({ language: 'EN-IN',continuous:true })}>Start Listen</button>
        <button onClick = {()=>{
          SpeechRecognition.stopListening()
          generateAnswer();
        }}>Stop Listen</button>
        <button onClick={()=>{resetTranscript() 
          setAiAnswer("")}}>Reset</button>
        <button onClick={()=>generateAnswer()}>Submit</button>
        </div>
          <div className='ansBox'>
            Answer :- {aiAnswer}
          </div>
        </div>
    </div>
  );
}

export default App;

