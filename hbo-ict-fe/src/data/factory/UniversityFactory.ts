import Avans from '../../assets/universities/avans_logo.png';
import CHE from '../../assets/universities/che_logo.jpg';
import Fontsy from '../../assets/universities/fontys_logo.png';
import DHH from '../../assets/universities/hhs_logo.jpg';
import HAN from '../../assets/universities/HAN_logo.png';
import Hanze from '../../assets/universities/hanze_logo.png';
import InH from '../../assets/universities/inholland_logo.jpg';
import Leiden from '../../assets/universities/leiden_logo.png';
import Rott from '../../assets/universities/rotterdam_logo.jpg';
import Utrecht from '../../assets/universities/utrecht_logo.jpg';
import HA from '../../assets/universities/hva_logo.png';
import HZ from '../../assets/universities/hz_logo.jpg';
import Saxion from '../../assets/universities/saxion_logo.jpg';
import NHL from '../../assets/universities/nhlstenden_logo.jpg';
import Windesheim from '../../assets/universities/windesheim_logo.jpg';
import ZUYD from '../../assets/universities/zuyd_logo.jpg';

export interface University {
    name: string;
    image: string;
    websiteURL: string;
}

export class UniversityFactory {

    static getAll(): University[] {
        return [
            { name: 'Avans Hogeschool', image: Avans, websiteURL: 'http://www.avans.nl' },
            { name: 'Christelijke Hogeschool Ede',  image: CHE, websiteURL: 'https://www.che.nl' },
            { name: 'Fontsy',  image: Fontsy, websiteURL: 'http://www.fontys.nl' },
            { name: 'De Haagse Hogeschool', websiteURL: 'https://www.dehaagsehogeschool.nl/', image: DHH },
            { name: 'Hogeschool van Arnhem en Nijmegen',  image: HAN, websiteURL: ' http://www.han.nl/' },
            { name: 'Hanzehogeschool Groningen',  image: Hanze, websiteURL: 'http://www.hanze.nl' },
            { name: 'Hogeschool Inholland',  image: InH, websiteURL: 'http://www.inholland.nl' },
            { name: 'Hogeschool Leiden',  image: Leiden, websiteURL: 'http://www.hsleiden.nl' },
            { name: 'Hogeschool Rotterdam',  image: Rott, websiteURL: 'http://www.hogeschoolrotterdam.nl' },
            { name: 'Hogeschool Utrecht',  image: Utrecht, websiteURL: 'http://www.hu.nl' },
            { name: 'Hogeschool van Amsterdam',  image: HA, websiteURL: 'http://www.hva.nl' },
            { name: 'HZ University of Applied Sciences', websiteURL: 'http://www.hz.nl', image: HZ },
            { name: 'Saxion',  image: Saxion, websiteURL: 'http://www.saxion.nl' },
            { name: 'NHL Stenden Hogeschool',  image: NHL, websiteURL: 'http://www.stenden.com' },
            { name: 'Hogeschool Windesheim',  image: Windesheim, websiteURL: 'http://www.windesheim.nl' },
            { name: 'ZUYD',  image: ZUYD, websiteURL: 'http://www.zuyd.nl' },
        ];
    }
}
