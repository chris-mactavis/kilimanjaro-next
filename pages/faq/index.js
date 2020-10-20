import Head from "next/head";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';

import axiosInstance from '../../config/axios';
import Layout from "../../components/Layout";


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



const Faq = ({faqs}) => {
    console.log(faqs);
    // const newFaqs = faqs.data.data;
    // console.log(newFaqs);

    // const newFaq = faqs.map((faq) => {
    //     return faq;
    // });

    // const latestArray = newFaq.map((arr) => {
    //     return arr;
    // });
    // console.log(latestArray);
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
                                {/* {latestArray.map((faq)=> {
                                    
                                    return <Accordion key={faq.id}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <Typography className={classes.heading}>{faq.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {faq.answer}
                                        </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                })} */}


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

Faq.getInitialProps = async() => {

    try {
        const {data: {data}} = await axiosInstance.get('faqs');
         console.log(data);
         return {faqs: data};
        
    } catch  (error) {
        console.log(error);
        return {faqs: []};
    }
};

export default Faq;