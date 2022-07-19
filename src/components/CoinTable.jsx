import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext.js";
import { FaLink } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Container,
	Typography,
	TextField,
	MenuItem,
	Select,
	LinearProgress,
} from "@material-ui/core";
import {
	createTheme,
	makeStyles,
	ThemeProvider,
} from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
	heading: {
		fontFamily: "Montserrat",
		fontSize: 36,
		marginTop: 20,
	},
	thead: {
		fontFamily: "Montserrat",
		fontWeight: "bold",
		fontSize: 18,
	},
	subheading: {
		fontFamily: "Montserrat",
		fontSize: 24,
		marginBottom: 18,
	},
	table: {
		fontSize: 32,
	},
	trow: {
		"&:hover": {
			backgroundColor: "teal",
			boxShadow: "none",
			cursor: "pointer",
		},
	},
}));

const darkTheme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		type: "dark",
	},
});

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinTable = () => {
	const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	let navigate = useNavigate();

	const classes = useStyles();
	const { currency, symbol, setCurrency } = CryptoState();

	const fetch = async () => {
		setLoading(true);
		const { data } = await axios.get(CoinList(currency));
		setCoins(data);
		setLoading(false);
	};

	useEffect(() => {
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency]);

	const handleSearch = () => {
		return coins.filter(
			(coin) =>
				coin.name.toLowerCase().includes(search) ||
				coin.symbol.toLowerCase().includes(search)
		);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Container style={{ textAlign: "center" }}>
				<Typography className={classes.heading}>
					Cryptocurrency Prices
				</Typography>
				<Typography className={classes.subheading}>
					(Ranked according to market cap)
				</Typography>
				<div style={{ display: "flex" }}>
					<TextField
						label="Search"
						style={{ width: "80%", marginBottom: 18 }}
						variant="filled"
						onChange={(e) => {
							setSearch(e.target.value);
						}}></TextField>
					<Typography style={{ marginTop: 0, fontSize: 20 }}>
						Select Currency
					</Typography>
					<Select
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
						style={{
							width: 120,
							height: 55,
							marginLeft: 15,
							padding: 10,
							fontSize: 20,
						}}>
						<MenuItem value={"USD"}>USD</MenuItem>
						<MenuItem value={"INR"}>INR</MenuItem>
						<MenuItem value={"EUR"}>EUR</MenuItem>
					</Select>
				</div>
			</Container>
			<TableContainer component={Paper}>
				{loading ? (
					<LinearProgress style={{ backgroundColor: "black" }} />
				) : (
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.thead}>
									Rank
								</TableCell>
								<TableCell className={classes.thead}>
									Coin
								</TableCell>
								<TableCell className={classes.thead}>
									Symbol
								</TableCell>
								<TableCell className={classes.thead}>
									Image
								</TableCell>
								<TableCell className={classes.thead}>
									Current Price
								</TableCell>
								<TableCell className={classes.thead}>
									24h Change
								</TableCell>
								<TableCell className={classes.thead}>
									All Time High
								</TableCell>
								<TableCell className={classes.thead}>
									Market Cap
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody
							style={{
								backgroundColor: "black",
							}}>
							{handleSearch()
								.slice((page - 1) * 10, (page - 1) * 10 + 10)
								.map((coin) => (
									<TableRow
										className={classes.trow}
										onClick={() => {
											navigate(`/info/${coin.id}`);
										}}>
										<TableCell
											style={{
												fontSize: 18,
												fontFamily: "Montserrat",
											}}>
											{coin.market_cap_rank}
										</TableCell>
										<TableCell
											style={{
												fontSize: 18,

												fontFamily: "Montserrat",
											}}
											className={classes.row}
											key={coin.name}>
											{coin.name + " "}
											<FaLink />
										</TableCell>
										<TableCell
											style={{
												textTransform: "uppercase",
												fontSize: 18,
												fontFamily: "Montserrat",
											}}>
											{coin.symbol}
										</TableCell>
										<TableCell
											style={{
												fontSize: 18,
												fontFamily: "Montserrat",
											}}>
											<img
												src={coin.image}
												style={{ width: 40 }}
												alt={coin.name}></img>
										</TableCell>
										<TableCell
											style={{
												fontSize: 18,
												fontFamily: "Montserrat",
											}}>
											{symbol +
												" " +
												numberWithCommas(
													coin.current_price
												)}
										</TableCell>
										{coin.price_change_percentage_24h >
										0 ? (
											<TableCell
												style={{
													fontSize: 18,
													color: "green",
													fontFamily: "Montserrat",
												}}>
												{"+" +
													coin.price_change_percentage_24h.toFixed(
														2
													) +
													"%"}
											</TableCell>
										) : (
											<TableCell
												style={{
													fontSize: 18,
													color: "red",
													fontFamily: "Montserrat",
												}}>
												{coin.price_change_percentage_24h.toFixed(
													2
												) + "%"}
											</TableCell>
										)}

										<TableCell
											style={{
												fontSize: 18,
												fontFamily: "Montserrat",
											}}>
											{symbol +
												" " +
												numberWithCommas(coin.ath)}
										</TableCell>
										<TableCell
											style={{
												fontSize: 18,
												fontFamily: "Montserrat",
											}}>
											{symbol +
												" " +
												numberWithCommas(
													coin.market_cap
												)}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				)}
			</TableContainer>

			<Pagination
				count={(handleSearch()?.length / 10).toFixed(0)}
				classes={{ ul: classes.pagination }}
				style={{
					justifyContent: "center",
					padding: 15,
					width: "100%",
					display: "flex",
				}}
				onChange={(_, value) => {
					setPage(value);
					window.scroll(0, 565);
				}}
			/>
		</ThemeProvider>
	);
};

export default CoinTable;
