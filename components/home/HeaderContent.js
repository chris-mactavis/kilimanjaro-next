import Select from 'react-select';

const HeaderContent = (props) => {
    const states = [
        {value: 'Lagos', label: 'Lagos'}
    ];

    const restaurants = [
        {value: 'Kilimanjaro Lagos', label: 'Kilimanjaro Lagos'}
    ];


    return (
      <>
        <section className="header-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="headtext-container">
                            <h1>
                                Enjoy tasty meals, <br/>
                                from wherever you are.
                            </h1>
                            <p>Ordering from:</p>
                            <form className="select-state">
                                <Select options={states} className="select-tool" placeholder='Select State' instanceId="stateId" />
                                <Select options={restaurants} className="select-tool" placeholder='Select Restaurant' instanceId="restaurantId" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <img className="left-banner-image" src="/images/left-banner-image.svg" alt=""/>
            <img className="right-banner-image" src="/images/right-banner-image.svg" alt=""/>
        </section>
      </>  
    );
};

export default HeaderContent;