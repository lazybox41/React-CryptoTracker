import axios from "axios";
import React, { useState, useEffect } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
	createTheme,
	makeStyles,
	ThemeProvider,
} from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import {
	Chart as ChartJS,
	LineElement,
	PointElement,
	LinearScale,
	Title,
	CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const CoinInfo = ({ coin }) => {
	const [histData, setHistData] = useState();
	const [duration, setDuration] = useState(1);
	const [flag, setflag] = useState(false);

	const { currency } = CryptoState();

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});

	const fetchData = async () => {
		const { data } = await axios.get(
			HistoricalChart(coin.id, duration, currency)
		);
		setflag(true);
		setHistData(data.prices);
	};

	useEffect(() => {
		fetchData();
	}, [duration]);

	const useStyles = makeStyles((theme) => ({
		container: {
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			marginTop: 25,
			padding: 40,
			width: "60%",
			display: "flex",

			[theme.breakpoints.down("md")]: {
				width: "100%",
				marginTop: 0,
				padding: 20,
				paddingTop: 0,
			},
		},
	}));

	const classes = useStyles();

	return (
		<ThemeProvider theme={darkTheme}>
			<div className={classes.container}>
				{!histData | (flag === false) ? (
					<CircularProgress
						style={{ color: "teal" }}
						size={250}
						thickness={1}
					/>
				) : (
					<>
						<Line
							data={{
								labels: histData.map((coin) => {
									let date = new Date(coin[0]);
									let time =
										date.getHours() > 12
											? `${
													date.getHours() - 12
											  }: ${date.getMinutes()} PM`
											: `${date.getHours()}:${date.getMinutes()} AM`;
									return duration === 1
										? time
										: date.toLocaleDateString();
								}),
								datasets: [
									{
										data: histData.map((coin) => coin[1]),

										label: `abc`,

										borderColor: "white",
									},
								],
							}}
							options={{
								elements: {
									point: {
										radius: 1,
									},
								},
								plugins: {
									title: {
										display: true,
										text: "Historical Data",
										padding: {
											top: 10,
											bottom: 20,
										},
										font: {
											family: "Montserrat",
											size: 20,
										},
									},
								},
							}}
						/>
						<div
							style={{
								display: "flex",
								marginTop: 20,
								justifyContent: "space-around",
								width: "100%",
							}}>
							{chartDays.map((day) => (
								<SelectButton
									key={day.value}
									onClick={() => {
										setDuration(day.value);
										setflag(false);
									}}
									selected={day.value === duration}>
									{day.label}
								</SelectButton>
							))}
						</div>
					</>
				)}
			</div>
		</ThemeProvider>
	);
};

export default CoinInfo;
