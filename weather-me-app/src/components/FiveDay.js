import React from 'react';
import SearchNav from "./SearchNav";
import Footer from "./Footer";
import Accordion from 'react-bootstrap/Accordion';

const FiveDay = () => {
    return(
        <div className="pageContainer d-flex flex-column">
            <div className="nonFooterWrapper">
                <SearchNav />

                <main>
                    <section>
                        <Accordion className ="accordion mt-4 mb-4">
                            <Accordion.Item eventKey="0" className="mb-2">
                                <Accordion.Header>
                                    Accordion Item #1
                                </Accordion.Header>
                                
                                <Accordion.Body>
                                    Some random body text. Some random body text. Some random body text.
                                    Some random body text. Some random body text. Some random body text.
                                    Some random body text. Some random body text. Some random body text.
                                </Accordion.Body>
                            </Accordion.Item>
                            
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    Accordion Item #2
                                </Accordion.Header>
                                
                                <Accordion.Body>
                                    Some random body text. Some random body text. Some random body text.
                                    Some random body text. Some random body text. Some random body text.
                                    Some random body text. Some random body text. Some random body text.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </section>
                </main>

            </div>

            <Footer />
        </div>
    )
}

export default FiveDay;


