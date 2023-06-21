import { Home } from "./pages";
import { AppLayout } from "./layouts/AppLayout";

import { Route, Switch } from "wouter";

const test = () => <>s26</>;

function App() {
  return (
    <>
      <AppLayout>
        <Switch>
          <Route path="" component={Home} />
          <Route path="/s26" component={test} />
        </Switch>
      </AppLayout>
    </>
  );
}

export default App;
