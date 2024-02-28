import React, {FunctionComponent} from 'react';
import {useLocale} from 'b302-frontend-library';

import {ReactComponent as Logo} from '../../assets/logo.svg';
import {ReactComponent as Mail} from '../../assets/icons/mail.svg';
import {ReactComponent as Phone} from '../../assets/icons/phone.svg';

const Footer: FunctionComponent = () => {
    const {__} = useLocale();

    return (
        <footer className={'footer'}>
            <div className={'footer__logo-container'}>
                <Logo className={'footer__logo'} onClick={() => window.open('https://www.hbo-i.nl/', '_blank')}/>
            </div>

            <div className={'footer__info'}>
                    {/*<div className={'footer__section'}>*/}
                    {/*    <span className={'footer__title footer__title--large-gap'}>{__('aboutUs')}</span>*/}

                    {/*    <div className={'footer__text-container'}>*/}
                    {/*        <span>*/}
                    {/*            The HBO-i Domain Description is a national framework for the final qualifications at Associate Degree, Bachelor and Professional master level for graduates of Dutch hbo programs in the ICT domain.*/}
                    {/*        </span>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                <div className={'footer__section'}>
                    <p className={'footer__title'}>{__('contactInfo')}</p>

                    <div className={'footer__text-container'}>
                        <span>HBO-i stichting</span>
                        <br />
                        <span>Weteringschans 223</span>
                        <span>1017 XH Amsterdam</span>
                    </div>

                    <div className={'footer__text-container'}>
                        <span>Postbus 15051</span>
                        <span>1001 MB Amsterdam</span>
                    </div>

                    <div className={'footer__text-container footer__text-container--icon'}>
                        <Phone className={'footer__icon'} />
                        <span>(020) 626 17 82</span>
                    </div>

                    <div className={'footer__text-container footer__text-container--icon'}>
                        <Mail className={'footer__icon'} />
                        <a href={'mailto:info@HBO-i.nl'}>info@HBO-i.nl</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
