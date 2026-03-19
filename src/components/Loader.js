function Loader ({ text = "Loading..." }) {
    return(
        <div style={styles.container}>
            <div style={styles.spinner}></div>
            <p style={styles.text}>{text}</p>
        </div>
    );
}

const styles = {
    container : {
        height : "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
    },

    spinner : {
        width: "50px",
        height: "50px",
        border: "5px solid #ccc",
        borderTop: "5px solid #333",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    
    text: {
    fontSize: "16px",
    color: "#555",
    fontWeight: "500",
  },
};

export default Loader;
