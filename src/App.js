import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Header from "./components/Header";
import "./App.css";
import Alert from "./components/Alert";

const useStyles = makeStyles(() => ({
	App: {
		backgroundColor: "#14161a",
		color: "white",
		minHeight: "100vh",
	},
}));

function App() {
	const classes = useStyles();
	return (
		<div className={classes.App}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} exact />
					<Route path="/info/:id" element={<Info />} exact />
				</Routes>
				<Alert />
			</BrowserRouter>
		</div>
	);
}

export default App;
