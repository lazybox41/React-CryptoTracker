import React, { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import { CryptoState } from "../../CryptoContext.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";

const Register = ({ handleClose }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPw, setConfirmPw] = useState("");

	const { setAlert } = CryptoState();

	const handleSubmit = async () => {
		if (!email || !password || !name) {
			setAlert({
				open: true,
				message: "All fields are required!",
				type: "error",
			});
		}

		if (password !== confirmPw) {
			setAlert({
				open: true,
				message: "Passwords don't match!",
				type: "error",
			});
			return;
		}

		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			setAlert({
				open: true,
				message: `Sign Up Successful. Welcome ${name}!`,
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
		return;
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
				type="text"
				label="Enter Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				fullWidth
			/>
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
			<TextField
				variant="outlined"
				label="Confirm Password"
				type="password"
				value={confirmPw}
				onChange={(e) => setConfirmPw(e.target.value)}
				fullWidth
			/>
			<Button
				variant="contained"
				size="large"
				style={{ backgroundColor: "#14161a", color: "white" }}
				onClick={handleSubmit}>
				Register
			</Button>
		</Box>
	);
};

export default Register;
