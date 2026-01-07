import { Translations } from '../types/global';
import en from './english'
import id from './indonesian';

const translations: Translations = { en, id };

const locales = [
    {
        tag: 'en',
        name: 'English',
        image: require('../../assets/images/united_kingdom.png'),
    },
    {
        tag: 'id',
        name: 'Indonesia',
        image: require('../../assets/images/indonesia.png'),
    },
];

export { translations, locales };