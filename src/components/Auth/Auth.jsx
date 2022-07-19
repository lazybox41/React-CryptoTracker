import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fade from "@material-ui/core/Fade";
import { TabPanel } from "@material-ui/lab";
import Login from "./Login";
import Register from "./Register";
import { CryptoState } from "../../CryptoContext.js";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function Auth() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<button
				style={{
					fontWeight: "bold",
					cursor: "pointer",
					fontFamily: "Montserrat",
					padding: 10,
					fontSize: 16,

					borderRadius: 10,
				}}
				type="button"
				onClick={handleOpen}>
				Login
			</button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<AppBar
							position="static"
							style={{
								backgroundColor: "#14161a",
								color: "white",
							}}>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label="simple tabs example">
								<Tab label="Register" />
								<Tab label="Login" />
							</Tabs>
						</AppBar>
						<Typography
							style={{
								textAlign: "center",
								fontFamily: "Montserrat",
								marginTop: 5,
								fontSize: 16,
								fontWeight: "bold",
							}}>
							test email: test@gmail.com
						</Typography>
						<Typography
							style={{
								textAlign: "center",
								fontFamily: "Montserrat",
								fontWeight: "bold",

								fontSize: 16,
							}}>
							test password: password
						</Typography>

						{value === 0 && <Register handleClose={handleClose} />}
						{value === 1 && <Login handleClose={handleClose} />}
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
