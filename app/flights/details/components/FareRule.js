import React, {  useState } from 'react';
import { connect } from 'react-redux';
import { arabic_translation } from '@/lib/constants';
import TitleCard from '../../../shared/components/TitleCard';
import { useAppSelector } from '@/lib/hooks';

const FareRule = (props) => {
    const { fareRule } = props;
    const [accordionOpen, setAccordionOpen] = useState(false);
    const toggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    };
    const { selectedLanguageAndCountry } = useAppSelector(state => state.sharedState)
    return (
        <TitleCard className='mt-4'
            title={
                <div onClick={toggleAccordion} className="flex items-center justify-between cursor-pointer">
                    <h3 className='font-semibold '>{selectedLanguageAndCountry?.language?.code === 'ar' ? arabic_translation.fare_rule : 'Fare Rule'}</h3>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transform ${accordionOpen ? 'rotate-0' : '-rotate-180'} transition-transform duration-300`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            }
        >
            {accordionOpen && (
                <div className="flex flex-col items-start justify-start py-5 border-b sm:flex-row sm:gap-5">
                    <ul className='flex flex-col gap-5'>
                        {fareRule?.map((item, index) => (
                            <li key={index} className='text-sm font-medium text-font-gray '>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </TitleCard>
    );
};

function mapStateToProps(state) {
    return {
        fareRule: state?.flightState?.flightDetails?.fareRule,
    }
}

export default connect(mapStateToProps, null)(FareRule);
