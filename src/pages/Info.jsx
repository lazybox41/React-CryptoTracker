import {
	Button,
	LinearProgress,
	makeStyles,
	Typography,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
	const { id } = useParams();
	const [coin, setCoin] = useState();
	const { currency, symbol, user, setAlert, watchlist } = CryptoState();

	const fetchCoin = async () => {
		const { data } = await axios.get(SingleCoin(id));

		setCoin(data);
	};

	useEffect(() => {
		fetchCoin();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const useStyles = makeStyles((theme) => ({
		container: {
			display: "flex",
			[theme.breakpoints.down("md")]: {
				flexDirection: "column",
				alignItems: "center",
			},
		},
		sidebar: {
			width: "35%",
			[theme.breakpoints.down("md")]: {
				width: "100%",
			},
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			marginTop: 25,
			borderRight: "2px solid grey",
		},
		heading: {
			fontWeight: "bold",
			marginBottom: 20,
			fontFamily: "Montserrat",
		},
		subheading: {
			marginBottom: 20,
			fontFamily: "Montserrat",
			fontSize: 20,
		},
		description: {
			width: "100%",
			fontFamily: "Montserrat",
			padding: 25,
			paddingBottom: 15,
			paddingTop: 0,
			textAlign: "justify",
		},
		marketData: {
			alignSelf: "start",
			padding: 25,
			paddingTop: 10,
			width: "100%",
			[theme.breakpoints.down("md")]: {
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			},
			[theme.breakpoints.down("sm")]: {
				flexDirection: "column",
				alignItems: "center",
			},
			[theme.breakpoints.down("xs")]: {
				alignItems: "start",
			},
		},
	}));

	const classes = useStyles();
	let navigate = useNavigate();

	if (!coin) return <LinearProgress style={{ backgroundColor: "black" }} />;

	const inWatchlist = watchlist.includes(coin?.id);

	const addToWatchlist = async () => {
		const coinRef = doc(db, "watchlist", user.uid);
		try {
			await setDoc(
				coinRef,
				{
					coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
				},
				{ merge: true }
			);

			setAlert({
				open: true,
				message: `${coin.name} Added to the Watchlist !`,
				type: "success",
			});
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
		}
	};

	const removeFromWatchlist = async () => {
		const coinRef = doc(db, "watchlist", user.uid);
		try {
			await setDoc(
				coinRef,
				{ coins: watchlist.filter((wish) => wish !== coin?.id) },
				{ merge: true }
			);

			setAlert({
				open: true,
				message: `${coin.name} Removed from the Watchlist !`,
				type: "success",
			});
		} catch (error) {
			setAlert({
				open: true,
				message: error.message,
				type: "error",
			});
		}
	};

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<div style={{ backgroundColor: "#0E0E0E" }}>
			<Button
				onClick={() => navigate(`/`)}
				style={{
					fontFamily: "Montserrat",
					margin: 20,
					padding: 10,
					fontWeight: "bold",
					backgroundColor: "teal",
				}}>
				<FaArrowLeft /> &nbsp; Back to Home
			</Button>
			<div className={classes.container}>
				<div className={classes.sidebar}>
					<img
						src={coin?.image.large}
						alt={coin?.name}
						height="60"
						style={{ marginBottom: 20 }}
					/>
					<Typography variant="h3" className={classes.heading}>
						{coin?.name}
					</Typography>
					<div className={classes.marketData}>
						<span style={{ display: "flex" }}>
							<Typography
								variant="h5"
								className={classes.subheading}>
								Rank:
							</Typography>
							&nbsp; &nbsp;
							<Typography
								variant="h5"
								style={{
									fontFamily: "Montserrat",
									fontSize: 20,
								}}>
								{coin?.market_cap_rank}
								&nbsp; &nbsp;
							</Typography>
						</span>

						<span style={{ display: "flex" }}>
							<Typography
								variant="h5"
								className={classes.subheading}>
								Current Price:
							</Typography>
							&nbsp; &nbsp;
							<Typography
								variant="h5"
								style={{
									fontFamily: "Montserrat",
									fontSize: 20,
								}}>
								{symbol}{" "}
								{numberWithCommas(
									coin?.market_data.current_price[
										currency.toLowerCase()
									]
								)}
							</Typography>
						</span>
						<span style={{ display: "flex" }}>
							<Typography
								variant="h5"
								className={classes.subheading}>
								All Time High:
							</Typography>
							&nbsp; &nbsp;
							<Typography
								variant="h5"
								style={{
									fontFamily: "Montserrat",
									fontSize: 20,
								}}>
								{symbol}
								{numberWithCommas(
									coin?.market_data.ath[
										currency.toLowerCase()
									].toString()
								)}
							</Typography>
						</span>
						<span style={{ display: "flex" }}>
							<Typography
								variant="h5"
								className={classes.subheading}>
								Market Cap:
							</Typography>
							&nbsp; &nbsp;
							<Typography
								variant="h5"
								style={{
									fontFamily: "Montserrat",
									fontSize: 20,
								}}>
								{symbol}
								{numberWithCommas(
									coin?.market_data.market_cap[
										currency.toLowerCase()
									].toString()
								)}
							</Typography>
						</span>
						<span style={{ display: "flex" }}>
							<Typography
								variant="h5"
								className={classes.subheading}>
								Total Supply:
							</Typography>
							&nbsp; &nbsp;
							<Typography
								variant="h5"
								style={{
									fontFamily: "Montserrat",
									fontSize: 20,
								}}>
								{coin?.market_data.total_supply.toString()}
							</Typography>
						</span>
						{user && (
							<Button
								variant="outlined"
								style={{
									width: "100%",
									height: 40,
									fontFamily: "Montserrat",
									fontWeight: "bold",
									backgroundColor: inWatchlist
										? "#ff0000"
										: "teal",
								}}
								onClick={
									inWatchlist
										? removeFromWatchlist
										: addToWatchlist
								}>
								{inWatchlist
									? "Remove from Watchlist"
									: "Mark as Favorite"}
							</Button>
						)}
					</div>
				</div>
				<CoinInfo coin={coin} />
			</div>
			<Typography
				variant="subtitle1"
				className={classes.description}
				style={{ marginTop: 20 }}>
				{ReactHtmlParser(coin?.description.en.split(". "))}.
			</Typography>
		</div>
	);
};

export default CoinPage;
