import { React } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import {
	createTheme,
	makeStyles,
	ThemeProvider,
} from "@material-ui/core/styles";
import Auth from "./Auth/Auth";
import { CryptoState } from "../CryptoContext";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(() => ({
	Title: {
		fontFamily: "Montserrat",
		fontWeight: "bold",
		cursor: "pointer",
	},
	Select: {},
}));

const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		type: "dark",
	},
});

const Header = () => {
	const classes = useStyles();
	let navigate = useNavigate();
	const { currency, setCurrency, user } = CryptoState();

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color="transparent" position="static">
				<Toolbar style={{ justifyContent: "space-between" }}>
					<Typography
						onClick={() => {
							navigate("../", { replace: true });
						}}
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
						className={classes.Title}>
						Crypto-Pro
					</Typography>
					{user ? <Sidebar /> : <Auth />}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
};

export default Header;
