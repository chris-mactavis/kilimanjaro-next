import Head from "next/head";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    const classes = useStyles();

    const createMarkup = (html) => ({__html: html});

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
                                {faqs.map((faq)=> {
                                    
                                    return <Accordion key={faq.id}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <Typography className={classes.heading}>{faq.question}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <div  dangerouslySetInnerHTML={createMarkup(faq.answer)}></div>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                })}
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
         return {faqs: data};
        
    } catch  (error) {
        console.log(error);
        return {faqs: []};
    }
};

export default Faq;