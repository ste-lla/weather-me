import React from 'react';
import SearchNav from "./SearchNav";
import Footer from "./Footer";


const Weekend = () => {
    //const [lati, setLatitude] = useState(Number(localStorage.getItem('lat')));
    //const [long, setLongitude] = useState(Number(localStorage.getItem('lon')));

    return(
        <div className="pageContainer d-flex flex-column">
            <div className="nonFooterWrapper">
                {/* setLat and setLon are props equal to a function that calls your state functions, setLatitude and setLongitude */}
                <SearchNav />

                <main>
                    <section className="">
                       
                    </section>
                </main>
            </div>

            <Footer />
        </div>
     
    )
}
export default Weekend; 