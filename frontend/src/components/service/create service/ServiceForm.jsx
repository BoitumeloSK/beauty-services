import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
export default function ServiceForm({ changeFunction }) {
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<InputLabel id="demo-simple-select-label">Service</InputLabel>
					<Select
						style={{ width: "150px" }}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="Service"
						name="category"
						autoFocus
						defaultValue="skin"
						onChange={changeFunction}
					>
						<MenuItem value="skin">Skin</MenuItem>
						<MenuItem value="hair">Hair</MenuItem>
						<MenuItem value="body">Body</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						style={{ width: "400px" }}
						label="Title"
						name="title"
						autoComplete="title"
						onChange={changeFunction}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="outlined-multiline-static"
						label="Description"
						name="description"
						multiline
						rows={4}
						onChange={changeFunction}
					/>
				</Grid>
				<Grid item xs={4}>
					<InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
					<OutlinedInput
						id="outlined-adornment-amount"
						startAdornment={<InputAdornment position="start">R</InputAdornment>}
						label="Amount"
						name="price"
						onChange={changeFunction}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox color="secondary" name="visibility" value="yes" />
						}
						label="Show service to all after adding it?"
						onChange={changeFunction}
					/>
				</Grid>
			</Grid>
		</>
	);
}
