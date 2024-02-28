import React, {createContext, FunctionComponent, useContext, useEffect, useState} from 'react';
import {
    FormAccessor,
    FormChangedEvent,
    OnFormChangeCallback,
    route,
    useForm,
    useLocale
} from 'b302-frontend-library';
import {useNavigate} from 'react-router-dom';

import {ReactComponent as SwitchIcon} from '../../../assets/icons/switch-vertical.svg';
import {ReactComponent as XMark} from '../../../assets/icons/xmark.svg';

import Cube, {CubeFace} from '../Cube/Cube';
import {ModalController} from '../Modal';
import HBOFilterFace from './HBOFilterFace';
import Title from '../Title';
import HBOFilterActions from './HBOFilterActions';
import Checkbox from '../Checkbox';
import Button from '../Button';
import {useFilterIndexQuery} from '../../../data/query/Query';
import HBOFilterTaskOrder from './HBOFilterTaskOrder';
import Tooltip, {TooltipContainer} from '../Tooltip';
import {useFilter} from '../../contexts/FilterContext';

export interface HBOFilterForm {
    allOn: boolean;
    allOff: boolean;
}

export interface HBOFilterData {
    activities: number[];
    architecture_layers: number[];
    levels: number[];
}

interface HBOFilter {
    cubeFace: number;
    next: () => void;
    previous: () => void;
    setFace: (face: number) => void;
    form: FormAccessor<HBOFilterForm>;
    onFormChange: OnFormChangeCallback<HBOFilterForm>;
    toggle: (key: keyof HBOFilterData, id: number) => void;
    data: HBOFilterData;
}

const HBOFilterContext = createContext({} as HBOFilter);
export const useHBOFilter = () => useContext<HBOFilter>(HBOFilterContext);

type CheckForm = { allOn: boolean, allOff: boolean };

interface Props {
    modalController: ModalController;
}

const HBOFilter: FunctionComponent<Props> = (props) => {
    const {__} = useLocale();
    const navigate = useNavigate();

    const { data } = useFilterIndexQuery();
    const filter = useFilter();

    const [cubeFace, setCubeFace] = useState<number>(1);
    const [idle, setIdle] = useState(true);

    const [form, onFormChange] = useForm<CheckForm>(f => ({
        allOff: f.check(false),
        allOn: f.check(true)
    }));

    // const [filterData, setFilterData] = useState<Omit<HBOFilterData, 'search'>>({
    //     activities: [],
    //     architecture_layers: [],
    //     levels: [],
    // });

    const activeData = filter.data;

    const setActiveFilterData = (data: Omit<HBOFilterData, 'search'>) => {
        filter.setData({...activeData, ...data});
    };

    useEffect(() => {
        setIdle(false);

        const timeout = setTimeout(() => setIdle(true), 600);
        return () => clearTimeout(timeout);
    }, [cubeFace]);

    useEffect(() => {
        if (!data)
            return;

        if (form.values.allOff)
            filter.empty();

        if (form.values.allOn) {
            filter.setData({
                ...filter.data,
                activities: data?.activities.map(a => a.id),
                levels: data?.levels.map(a => a.id),
                architecture_layers: data?.architecture_layers.map(a => a.id),
            });
        }
    }, [form.values.allOff, form.values.allOn, data]);

    useEffect(() => {
        if (filter.filtersSelected && form.values.allOff)
            form.set({
                allOff: false
            });
    }, [filter.filtersSelected]);
    // useEffect(() => {
    //     if (filter.active)
    //         return;
    //
    //     setFilterData({
    //         activities: [],
    //         architecture_layers: [],
    //         levels: [],
    //     });
    // }, [filter.active ?? false]);

    useEffect(() => {
        const { open, finishedAnimating } = props.modalController;

        if (!finishedAnimating || open)
            return;

        setCubeFace(1);

        // if (filter.active)
        //     return;
        //
        // filter.reset();
        // setFilterData({
        //     levels: [],
        //     architecture_layers: [],
        //     activities: []
        // });
    }, [props.modalController.finishedAnimating, props.modalController.open]);

    const nextFace = () => {
        setCubeFace(face => Math.min(face + 1, 4));
    };

    const prevFace = () => {
        setCubeFace(face => Math.max(face - 1, 0));
    };

    const toggleValue = (key: keyof HBOFilterData, value: number) => {
        const newData = {...activeData};

        const index = newData[key].findIndex(i => i === value);

        if (index === -1) {
            newData[key].push(value);
        } else {
            newData[key].splice(index, 1);
        }

        setActiveFilterData(newData);
    };

    const hboFilter: HBOFilter = {
        cubeFace,
        next: nextFace,
        previous: prevFace,
        setFace: setCubeFace,
        form,
        onFormChange,
        data: activeData,
        toggle: toggleValue
    };

    const onCheckboxChange = (e: FormChangedEvent<CheckForm>) => {
        let otherKey: keyof CheckForm = e.id === 'allOn' ? 'allOff' : 'allOn';
        form.set({
            [e.id]: e.value,
            [otherKey]: false
        });
    };

    const doFilter = () => {
        filter.setActive(true);
        // filter.setData({ ...filter.data, ...filterData });

        props.modalController.toggle(false);

        navigate(route('tasks'));
        window.scrollTo({top: 0});
    };

    return (
        <HBOFilterContext.Provider value={hboFilter}>
            <div className={`hbo-filter ${idle ? 'hbo-filter--idle' : ''} hbo-filter--face${cubeFace}`}>
                <Cube face={cubeFace}>
                    <CubeFace front>
                        <XMark className={'hbo-filter__icon hbo-filter__icon--close'} onClick={() => props.modalController.toggle()}/>

                        <Title small>{__('filter.welcomeToFilter')}</Title>

                        <div className={'hbo-filter__text-box'}>{__('filter.welcomeText')}</div>

                        <HBOFilterActions>
                            <Checkbox form={hboFilter.form} onFormChange={onCheckboxChange} id={'allOn'} hint={__('allOn')}/>
                            <Checkbox form={hboFilter.form} onFormChange={onCheckboxChange} id={'allOff'} hint={__('allOff')} />
                        </HBOFilterActions>

                        <div className={'flex--d flex--justify-end'}>
                            <Button onClick={() => hboFilter.next()}>{__('filter.configure')}</Button>
                        </div>

                        <div className={'hbo-filter__order'}>
                            <div>
                                <span className={'hbo-filter__text--order'}>
                                    Volgorde van<br />beroepstaken:

                                    <div className={'hbo-filter__tooltip hbo-filter__tooltip--top'}>
                                        <Tooltip content={'Door te slepen met de 3 zwarte knoppen bepaal je de volgorde waarin de gevonden beroepstaken getoond worden.'} />
                                    </div>
                                </span>
                            </div>

                            <div>
                                <HBOFilterTaskOrder onOrderChange={() => null} />
                                <SwitchIcon className={'hbo-filter__icon--switch'} />
                            </div>
                        </div>

                        <div className={'flex--d flex--justify-end flex--align-center'}>
                            { !filter.filtersSelected &&
                                <span className={'hbo-filter__text--warning'}>Er zijn geen filters geselecteerd.</span>
                            }
                            <Button onClick={doFilter} disabled={!filter.filtersSelected}>GO!</Button>
                        </div>
                    </CubeFace>

                    <CubeFace right>
                        <HBOFilterFace
                            title={__('architectureLayers')}
                            dataKey={'architecture_layers'}
                            items={data?.architecture_layers ?? []}
                            hint={<>
                                De 5 architectuurlagen geven aan binnen welke context een ict-er aan het werk is:
                                <ul>
                                    <li>Gebruikersinteractie: communicatie tussen (eind)gebruiker en ict-systeem.</li>
                                    <li>Organisatieprocessen: faciliteren van organisatieprocessen door middel van ict-systemen.</li>
                                    <li>Infrastructuur: het geheel aan ict-systemen waarmee organisatieprocessen gefaciliteerd worden.</li>
                                    <li>Software: het ontwikkelen van diverse soorten software die opgenomen kan worden in de ict-infrastructuur.</li>
                                    <li>Hardware interfacing: software die interactie aangaat met beschikbare hardware.</li>
                                </ul>
                            </>}
                            navigation={{
                                prevLabel: __('filter.backToFilter'),
                                nextLabel: __('activities'),
                            }} />
                    </CubeFace>

                    <CubeFace back>
                        <HBOFilterFace
                            title={__('activities')}
                            dataKey={'activities'}
                            items={data?.activities ?? []}
                            hint={<>
                                De 5 activiteiten zijn gebaseerd op de ‘system en software development life cycle’:
                                <ul>
                                    <li>Analyseren van processen, producten en informatiestromen in hun onderlinge samenhang en context</li>
                                    <li>Adviseren over de inrichting van processen en/of informatie voor een nieuw te ontwikkelen, aan te schaffen of aan te passen ict-systeem</li>
                                    <li>Ontwerpen van een (deel van een) ict-systeem op basis van requirements</li>
                                    <li>Realiseren en testen van een (deel van een) ict-systeem op basis van een ontwerp</li>
                                    <li>Manage & control & optimaliseren van de ontwikkeling, de ingebruikname en het gebruik van ict-systemen</li>
                                </ul>
                            </>}
                            navigation={{
                                prevLabel: __('architectureLayers'),
                                nextLabel: __('courseLevels'),
                            }} />
                    </CubeFace>

                    <CubeFace left>
                        <HBOFilterFace
                            title={__('courseLevels')}
                            dataKey={'levels'}
                            items={data?.levels.map((l, i) => ({ ...l, value: __('level', l.value) })) ?? []}
                            hint={<>
                                Het beheersingsniveau wordt bepaald door de complexiteit van de context, de complexiteit van de inhoud en de zelfstandigheid bij de uitvoering van een beroepstaak.
                                <br />
                                <br />
                                Om binnen de diversiteit vergelijkbaarheid mogelijk te maken onderscheiden we vier beheersingsniveaus, conform de definities in het Zelcommodel.
                            </>}
                            navigation={{
                                prevLabel: __('activities'),
                                nextLabelRaw: __('setOrder'),
                                onNextClick: () => setCubeFace(1)
                            }} />
                    </CubeFace>
                </Cube>
            </div>
        </HBOFilterContext.Provider>
    );
};

export default HBOFilter;
