import Calendar from './Calendar';
import moment from 'moment';
import 'moment/locale/ru'
import './main.css';

function App() {

  const now = moment();
  moment.locale("ru");

  return (
    <Calendar date = {now}/>
  );
}

export default App;
