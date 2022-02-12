import WeekSchedule from "./Components/WeekSchedule/WeekSchedule";
import Logo from "./Assets/logo.png";
import { LogoImg, MainSection } from "./App.styled";
function App() {
  return (
    <MainSection>
      <LogoImg src={Logo} alt="Lesson dnd logo" />
      <WeekSchedule />
    </MainSection>
  );
}

export default App;
