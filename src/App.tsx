import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Route, Switch, useParams, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

const Component = () => {
  const { username }: { username: string } = useParams();
  console.log("params:", username);
  return (
    <div>
      <iframe
        title="asd"
        src={`https://cht.xxx/affiliates/in/?tour=9oGW&campaign=nna9W&track=TFC_livechatroom&room=${username}&disable_sound=0&embed_video_only=010`}
        height={600}
        width={1000}
        style={{ border: "0" }}
      ></iframe>
    </div>
  );
};

const App = () => {
  const [time, setTime] = useState<any>(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState<string | null>("");
  const changeHandler = ({ target: { value } }: any) => {
    clearInterval(time);
    setTime(
      setTimeout(() => {
        fetch(
          `https://camspider.com/api/search?search=${value}&f=no&m=no&c=no&t=no&`
        )
          .then((res) => {
            res
              .json()
              .then((data) =>
                setOptions(data.map((user: any) => user.username_url))
              );
          })
          .catch((e) => e);
      }, 500)
    );
  };
  return (
    <>
      <header>
        <Autocomplete
          onChange={(event, value) => setSelected(value)}
          options={options}
          renderInput={(props) => (
            <TextField
              {...props}
              onChange={(event) => changeHandler(event)}
              label="debug"
              margin="normal"
            />
          )}
        />
      </header>
      <Router>
        {selected && <Redirect to={`/${selected}`} />}
        <Switch>
          <Route path="/:username" component={Component} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
