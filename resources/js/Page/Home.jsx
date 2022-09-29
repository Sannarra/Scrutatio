import FavoriteIcon from "@mui/icons-material/Favorite";
import JobCard from "../components/JobCard";

export default function Home() {
    const heading = "Scrutatio with Laravel and React";
    return (
        <div>
            <FavoriteIcon /> {heading}
            <JobCard
                jobTitle="Shampooer"
                companyName="Wolf PLC"
                city="Boyletown"
                publication_date="29 sept 2022"
                sectors={["Architecture", "Metal Production"]}
                contract_type="CDI"
                salary="1542"
                working_time="35"
            />
        </div>
    );
}
