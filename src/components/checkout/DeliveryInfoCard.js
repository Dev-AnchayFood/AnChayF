import React from "react";
import { Stack } from "@mui/system";
import { Typography, useTheme } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";

const DeliveryInfoCard = ({
	title,
	name,
	phone,
	address,
	houseNumber,
	floor,
	roadNumber,
}) => {
	const theme = useTheme();
	return (
		<CustomStackFullWidth spacing={0.5}>
			<Stack width="100%">
				<Typography fontWeight="500">{title}</Typography>
			</Stack>
			<Stack
				width="100%"
				padding=".9rem"
				backgroundColor={theme.palette.neutral[300]}
				borderRadius="7px"
				spacing={0.5}
			>
				<Typography>{name}</Typography>
				<Stack direction="row" spacing={1.3} alignItems="center">
					<LocalPhoneIcon
						sx={{
							width: "14.5px",
							height: "14.5px",
							color: (theme) => theme.palette.primary.main,
						}}
					/>
					<Typography
						fontSize="12px"
						color={theme.palette.neutral[500]}
					>
						{phone}
					</Typography>
				</Stack>
				<Stack direction="row" spacing={1.3} alignItems="center">
					<RoomIcon
						sx={{
							width: "14.5px",
							height: "14.5px",
							color: (theme) => theme.palette.primary.main,
						}}
					/>
					<Typography
						fontSize="12px"
						color={theme.palette.neutral[500]}
					>
						{address}
					</Typography>
				</Stack>
				<Typography fontSize="12px" color={theme.palette.neutral[500]}>
					Road: {roadNumber ?? 0} House : {houseNumber ?? 0},Floor:{" "}
					{floor ?? 0}
				</Typography>
			</Stack>
		</CustomStackFullWidth>
	);
};

export default DeliveryInfoCard;
