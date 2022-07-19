import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";

const Login = ({ handleClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setAlert } = CryptoState();

	const handleSubmit = async () => {
		if (!email || !password) {
			setAlert({
				open: true,
				message: "All fields are required!",
				type: "error",
			});
		}

		try {
			const result = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			setAlert({
				open: true,
				message: `Login Successful!`,
				type: "success",
			});

			handleClose();
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
		}
	};
	return (
		<Box
			p={3}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "20px",
			}}>
			<TextField
				variant="outlined"
				type="email"
				label="Enter Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				fullWidth
			/>
			<TextField
				variant="outlined"
				label="Enter Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				fullWidth
			/>

			<Button
				variant="contained"
				size="large"
				style={{ backgroundColor: "#14161a", color: "white" }}
				onClick={handleSubmit}>
				Login
			</Button>
		</Box>
	);
};

export default Login;
