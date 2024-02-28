import React, {FunctionComponent, useState} from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import {ReactComponent as ArrowCircleIcon} from '../../../assets/icons/arrow-circle-left.svg';

import {University} from '../../../data/factory/UniversityFactory';
import UniversityCard from './UniversityCard';
import {isDesktop} from '../../../utils/MediaQuery';

interface Props {
    universities: University[];
}

const UniversitySlider: FunctionComponent<Props> = (props) => {

    const [swiper, setSwiper] = useState<any>();
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [slideCount, setSlideCount] = useState<number>(0);

    const next = () => {
        swiper.slideNext();
    };

    const prev = () => {
        swiper.slidePrev();
    };

    const onSwiper = (swiper: SwiperClass) => {
        setSwiper(swiper);
        setSlideCount(swiper.slides.length);
    };

    return (
        <div className={'university-slider'}>
            { (activeSlide > 0) &&
                <ArrowCircleIcon className={'university-slider__arrow'} onClick={prev} />
            }

            { (activeSlide < slideCount - 3) &&
                <ArrowCircleIcon className={'university-slider__arrow university-slider__arrow--right'} onClick={next} />
            }

            <Swiper
                slidesPerView={isDesktop() ? 3 : 1}
                spaceBetween={100}
                className={'university-slider__slider'}
                onSlideChange={(swiper: SwiperClass) => setActiveSlide(swiper.activeIndex)}
                onSwiper={onSwiper}>
                { props.universities.map(university => (
                    <SwiperSlide key={university.name}>
                        {/*<div className={''}>*/}
                            <UniversityCard university={university} />
                        {/*</div>*/}
                    </SwiperSlide>
                )) }
            </Swiper>
        </div>
    );
};

export default UniversitySlider;
