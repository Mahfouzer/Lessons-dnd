import WeekSchedule from "./Components/WeekSchedule/WeekSchedule";
import Logo from "./Assets/logo.png";
import { LogoImg, MainSection } from "./App.styled";
import 'react-toastify/dist/ReactToastify.css';
import ToastNotifier from "./Components/ToastNotifier/ToastNotifier";
function App() {
  return (
    <MainSection>
      <LogoImg src={Logo} alt="Lesson dnd logo" />
      <WeekSchedule />
      <ToastNotifier/>
    </MainSection>
  );
}

export default App;
