import React, { useEffect, Fragment, useRef , useState , useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './hints.css';


const Popup = ({ }) => {
    const [stepArr , setStepArr] = useState(["First step" , "Second step" , "Third step" , "Fourth step"]);
    const [currentStep , setCurrentStep] = useState(0);

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <div className="container">
                <h1>Guided tour tooltip</h1>
                <span className="close"></span>
                
                <div className="slider-container">
                    <div className="slider-turn">
                    <p>
                        Guided tour tooltip inspired by Jonathan Moreira
                    </p>

                    <p>
                        Dribbble shot visible at 
                        <a href="http://dribbble.com/shots/1216346-Guided-tour-tooltip" title="Dribbble shot" target="_blank">this link</a>
                    </p>

                    <p>
                        Codepen by Yoann Helin
                    </p>

                    <p>
                        <a href="https://twitter.com/YoannHELIN" title="Twitter" target="_blank">Twitter : @YoannHELIN</a>
                    
                    </p>

                    <p>Thank you !</p>
                    </div>
                </div>

                <div className="bottom">
                    <div className="step">
                    <span></span>
                    <ul>
                        <li data-num="1"></li>
                        <li data-num="2"></li>
                        <li data-num="3"></li>
                        <li data-num="4"></li>
                        <li data-num="5"></li>
                    </ul>
                    </div>
                    <button className="btn">Next</button>
                </div>
                </div>
                <button className="open">Open</button> 
        </Fragment>
    );
}; 

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {})(Popup);
