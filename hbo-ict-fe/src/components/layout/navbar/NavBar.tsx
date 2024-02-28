import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {route, useForm, useLocale} from 'b302-frontend-library';

// import {ReactComponent as Logo} from '../../../assets/logo.svg';
import {ReactComponent as Logo} from '../../../assets/KUBUS.svg';
import {ReactComponent as WorldIcon} from '../../../assets/icons/globe.svg';
import MenuButton from './MenuButton';
import ToggleButton from '../../partials/ToggleButton';
import Dropdown, {DropdownItem} from '../../partials/Dropdown';
import {isDesktop} from '../../../utils/MediaQuery';
import Input from '../../partials/Input';
import {useFilter} from '../../contexts/FilterContext';
import {URLS} from '../../../config/Url';
import {useFilterIndexQuery} from '../../../data/query/Query';

interface Props {}

const NavBar: FunctionComponent<Props> = (props) => {
    const { __, setLocale } = useLocale();
    const filter = useFilter();
    const location = useLocation();
    const navigate = useNavigate();
    const query = useFilterIndexQuery();

    const ref = useRef<HTMLDivElement>(null);

    const [form, onFormChange] = useForm<{ en: boolean, search: string }>(f => ({
        en: f.check(false),
        search: f.input('')
    }));

    const [searchTimeout, setSearchTimeout] = useState<any>();
    const [open, setOpen] = useState<boolean>(isDesktop());

    // useEffect(() => {
    //     setLocale(
    //         form.values.en ? 'en' : 'nl'
    //     );
    // }, [form.values.en]);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (isDesktop())
                return;

            if (e.target instanceof Node && !ref.current?.contains(e.target))
                setOpen(false);
        });
    }, []);

    const toggleMenu = () => {
        setOpen(open => !open);
    };

    const goTo = (page: string) => () => navigate(route(page));

    const enterSearch = () => {
        filter.setData({
            ...filter.data,
            levels: query.data?.levels.map(i => i.id) ?? [],
            architecture_layers: query.data?.architecture_layers.map(i => i.id) ?? [],
            activities: query.data?.activities.map(i => i.id) ?? [],
            search: form.values.search
        });

        navigate(route('tasks'));
    };

    useEffect(() => {
        if (!filter.active)
            return;

        if (location.pathname !== route('tasks'))
            return;

        clearTimeout(searchTimeout);
        setSearchTimeout(
            setTimeout(enterSearch, 700)
        );
    }, [form.values.search]);

    const openExternPage = (path: string) => {
        window.open(path, '_blank');
    };

    return (
        <div className={'navbar'} ref={ref}>
            <div className={'navbar__left'}>
                <Logo className={'navbar__logo'} onClick={goTo('home')} />
            </div>

            <div className={'navbar__right'}>
                <div className={'navbar__menu-button'}>
                    <MenuButton active={open} onClick={toggleMenu} />
                </div>

                <div className={`navbar__menu ${open ? 'navbar__menu--open' : ''}`}>
                    <div className={'navbar__locale'}>
                        <WorldIcon className={'navbar__icon'} />
                        <ToggleButton id={'en'} form={form} onFormChange={onFormChange} labels={['EN', 'NL']} />
                    </div>

                    <div>
                        <span className={'navbar__menu-item'} onClick={goTo('universities')}>{__('hboIMembers')}</span>

                        <Dropdown title={__('export')}>
                            <DropdownItem onClick={() => openExternPage(URLS.PDF_FILE)}>PDF</DropdownItem>
                            <DropdownItem onClick={() => openExternPage(URLS.EXCEL_SHEET)}>Excel</DropdownItem>
                            <DropdownItem onClick={() => openExternPage(URLS.JSON)}>JSON</DropdownItem>
                            <DropdownItem onClick={() => openExternPage(URLS.DOCS)}>API</DropdownItem>
                        </Dropdown>

                        <div className={'navbar__input'}>
                            <Input
                                id={'search'}
                                form={form}
                                onChange={onFormChange}
                                hint={__('searchInDomainDescription')}
                                onKeyUp={e => e.key === 'Enter' && enterSearch()}
                                icon={'search'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;

