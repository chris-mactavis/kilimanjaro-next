import Layout from "../../components/Layout";
import Head from "next/head";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    //   border: '1px solid #DC042A'
    },
    heading: {
      fontSize: '15px !important',
      fontWeight: theme.typography.fontWeightRegular,
      color: '#383838 !important'
    },
}));



const Faq = () => {
    const classes = useStyles();

    return (
        <Layout>
            <Head>
                <title>Faq | Kilimanjaro</title>
            </Head>
            <header className="store-header about-us"></header>
            <section className="contact-us store-location about">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>Frequently Asked Questions</h4>
                        </div>
                        <div className="col-md-10 mx-auto">
                            <div className={classes.root}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>How many stores do you have and in what locations?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Kilimanjaro is one of Sundry Foods’ restaurant brands, operating in the Quick Service Restaurant (QSR) segment, 
                                            the brand has established itself as a market leader and one of the fastest growing restaurant brands in the country 
                                            with currently 31 stores across Nigeria and more to come.
                                        </Typography>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <Typography>
                                           Kilimanjaro caters to the unique preference of the general populace in this part of sub-Saharan Africa for their local dishes.
                                            Our unique menu consists of select popular contemporary and Nigerian offerings. Items on our menu can also be found on dining 
                                            tables in other African countries. The Kilimanjaro brand was born out the quest to satisfy both local and continental food cravings 
                                            of our people. We deliver fresh, hot and mouth-watering meals, pastries, sandwiches and beverages to thousands of customers in the finest environment each day. 
                                            Our restaurants stand out for their bright colours and lovely ambience inviting you to dine-in or grab-and-go with the best quality meals.
                                        </Typography>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <Typography>
                                            We are working to ensure there is a Kilimanjaro restaurant in every major city in the country.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>How do I order?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Simply call up our ping-a-meal service on 0700 5454 3663,  08100393579 to place your order and enjoy delicious meals delivered to your doorstep like abracadabra.
                                            You can also use our <Link href="/"><a>online ordering service.</a></Link>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div> 
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Faq;