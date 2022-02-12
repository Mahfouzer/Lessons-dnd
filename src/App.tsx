import WeekSchedule from './Components/WeekSchedule/WeekSchedule'
import Logo from "./Assets/logo.png"
import { LogoImg } from './App.styled';
function App() {
  return (
    <div className="App">
      <LogoImg src={Logo} alt="Lesson dnd logo"/>
     <WeekSchedule/>
    </div>
  );
}

export default App;
