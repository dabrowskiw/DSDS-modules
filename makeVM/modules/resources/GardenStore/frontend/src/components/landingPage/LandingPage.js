import "../styles.css";
import Header from "../structure/Header"
import Footer from "../structure/Footer"
import List from "../product/List"

const LandingPage = (props) => {

    const logout = () => {
        props.onLogout();
    };

    return (
        <div className="container">
            <Header 
            loggedIn={props.loggedIn}
            user={props.user}
            onLogout={logout} />
            <main>
                <List
                baseUrl={props.baseUrl} />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
