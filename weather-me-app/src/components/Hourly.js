import React from 'react';
import SearchNav from "./SearchNav";
import Footer from "./Footer";

const Hourly = () => {
    return(
        <div className="pageContainer d-flex flex-column">
            <div className="nonFooterWrapper">
                <SearchNav />

                <main>
                
                </main>
            </div>

            <Footer/>
        </div>
    )
}

export default Hourly;

