import FavoriteIcon from "@mui/icons-material/Favorite";
import JobCard from "../components/JobCard";
import Stack from "@mui/material/Stack";

export default function Home() {
    const heading = "Scrutatio with Laravel and React";
    return (
        <Stack spacing={3} sx={{ alignItems: "center" }}>
            <JobCard
                jobTitle="Shampooer"
                companyName="Wolf PLC"
                city="Boyletown"
                publication_date="29 sept 2022"
                sectors={["Public service"]}
                contract_type="CDI"
                salary="1542"
                working_time="35"
                company_icon="https://cdn.discordapp.com/icons/768816677491965973/89de8e72c08e16e921810da2a0fc5f19.webp"
            />

            <JobCard
                jobTitle="Maintenance Worker"
                companyName="Hermiston Inc"
                city="Langton"
                publication_date="27 sept 2022"
                sectors={["Metal Production", "Mining"]}
                contract_type="CDI"
                salary="1342"
                working_time="25"
            />
        </Stack>
    );
}
