import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	banner: {
		background: "url(./bg.jpg)",
		backgroundSize: "cover",
	},
	bannerContent: {
		height: 400,
		display: "flex",
		flexDirection: "column",
		paddingTop: 25,
		justifyContent: "space-around",
	},
	tagline: {
		display: "flex",
		height: "40%",
		flexDirection: "column",
		justifyContent: "center",
		textAlign: "center",
	},
	carousel: {
		height: "50%",
		display: "flex",
		alignItems: "center",
	},
}));

const Banner = () => {
	const classes = useStyles();
	return (
		<div className={classes.banner}>
			<Container className={classes.bannerContent}>
				<div className={classes.tagline}>
					<Typography
						variant="h2"
						style={{
							fontWeight: "bold",
							marginBottom: 15,
							fontFamily: "Montserrat",
						}}>
						Crypto-Pro
					</Typography>
					<Typography
						variant="subtitle5"
						style={{
							color: "darkgrey",
							textTransform: "capitalize",
							fontFamily: "Montserrat",
							fontSize: 24,
						}}>
						Get accurate and real-time prices of cryptocurrencies
						along with all the relevant information!
					</Typography>
				</div>
				{/* <Carousel /> */}
			</Container>
		</div>
	);
};

export default Banner;
