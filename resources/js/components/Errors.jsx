export default function Errors(errors) {
    if (!errors) return null;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
                color: "red",
            }}
        >
            <ul>
                {errors.map((error, idx) => {
                    return <li key={idx}>{error} &#x26A0;</li>;
                })}
            </ul>
        </div>
    );
}
