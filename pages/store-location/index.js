import Layout from '../../components/Layout';
import Head from 'next/head';

import ContactUs from '../../components/contactUs/contactUs';

const StoreLocation = () => {

    return (
        <>
            <Layout contactSection>
                <Head>
                    <title>Store Location | Kilimanjaro</title>
                </Head>

                <header className="store-header"></header>
                <section className="store-location">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4>You can find us here</h4>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Abia</h5>
                                <ul>
                                    <li>&ndash;Food Court, Abia Mall</li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Lagos</h5>
                                <ul>
                                    <li>&ndash;84 Ozumba Mbadiwe Street, Victoria island.</li>
                                    <li>&ndash;Murtala Muhammed International Airport Departure Lounge.</li>
                                    <li>&ndash;Food Court, Novare Mall, Sangoredo.</li>
                                    <li>&ndash;26B Admiralty way, Lekki Phase 1.</li>
                                    <li>&ndash;175 Ago-palace way, Okota.</li>
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Portharcourt</h5>
                                <ul>
                                    <li>&ndash;1 Agip Road, Agip Roundabout, Rumeme.</li>
                                    <li>&ndash;GRA Junction, Aba Road.</li>
                                    <li>&ndash;222 Onne Road, GRA Phase II.</li>
                                    <li>&ndash;YKC Junction, Woji Road.</li>
                                    <li>&ndash;Bewac Junction, T/A Road.</li>
                                    <li>&ndash;Uniport Choba</li>
                                    <li>&ndash;Onne, FOT Roundabout</li>
                                    <li>&ndash;Rumuibekwe Junction.</li>
                                    <li>&ndash;Rumuokwuta Roundabout</li>
                                    
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Abuja</h5>
                                <ul>
                                    <li>&ndash;911 Mall, 70 Usuma Street, Maitama</li>
                                    <li>&ndash;Plot 84, 3rd Avenue, Gwasrinpa</li>
                                    <li>&ndash;Aminu Kano Crescent, Wuse 2</li>
                                    <li>&ndash;Novare Mall, Wuse, Zone 5</li>
                                    <li>&ndash;Gado Nasko way, Kubwa</li>                                    
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Ogun</h5>
                                <ul>
                                    <li>&ndash;Food Court, The Palms Mall, Sango-Ota</li>                                   
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Delta</h5>
                                <ul>
                                    <li>&ndash;Food Court, Delta Mall, Efurrun</li>
                                    <li>&ndash;Food Court, Asaba Mall</li>                                   
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Onitsha</h5>
                                <ul>
                                    <li>&ndash;Food Court, Onitsha Mall, ABS junction, off Awka road, GRA.</li>                                 
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Uyo</h5>
                                <ul>
                                    <li>&ndash;165 Oron Road, Uyo.</li>
                                    <li>&ndash;189 Ikot Ekpene Road, Uyo.</li>                                 
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Enugu</h5>
                                <ul>
                                    <li>&ndash;Polo park Mall, Abakaliki Road, Old GRA.</li>
                                    <li>&ndash;Enugu Mall, Independence Layout. Enugu</li>                                 
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Owerri</h5>
                                <ul>
                                    <li>&ndash;Shirley Supremo Shopping Mall, <br/> 32 Ekwema Crescent, Ikenegbu Layout</li>
                                    <li>&ndash;Food Court, Owerri Mall, Egbu road.</li>                                 
                                </ul>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5>Yenogoa</h5>
                                <ul>
                                    <li>&ndash;Kilimanjaro Building, Opp Ekeki Park, Mbiama Road</li>                                 
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
               <ContactUs />
            </Layout>
        </>
    );
};

export default StoreLocation;