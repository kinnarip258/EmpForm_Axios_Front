import { Route, Switch} from 'react-router-dom';
import EmpForm from './component/EmpForm';
import Deshboard from "./component/Deshboard";
function App() {
  return (
    <>
      <Switch>
        <Route exact path = "/"><EmpForm/></Route>
        <Route exact path = "/deshboard"><Deshboard/></Route>
        <Route exact path = "/editEmployee/:id"><EmpForm /></Route>
      </Switch>
    </>
  );
}

export default App;
