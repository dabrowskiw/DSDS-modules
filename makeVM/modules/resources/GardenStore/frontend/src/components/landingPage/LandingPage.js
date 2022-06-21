import "../styles.css";
import Header from "../structure/Header"
import Footer from "../structure/Footer"
import List from "../product/List"

const LandingPage = (props) => {

    return (
        <div className="container">
            <Header 
            loggedIn={props.loggedIn}
            user={props.user} />
            <main>
                <List
                baseUrl={props.baseUrl} />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
