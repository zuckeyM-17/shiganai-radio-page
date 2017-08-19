import { Guest } from '../guest';

const EMPTY_URL = '/guest#';
export const GUESTS: Guest[] = [
  {
    'name': 'murasaki',
    'url': EMPTY_URL,
    'img': '../../assets/image/default.png',
    'no_url': true,
  },
  {
    'name': 'mittuntun',
    'url': 'https://twitter.com/mittuntun?lang=ja',
    'img': '../../assets/image/mittuntun.png',
    'no_url': false,
  },
  {
    'name': 'HKDnet',
    'url': 'https://twitter.com/HKDnet?lang=ja',
    'img': '../../assets/image/HKDnet.jpg',
    'no_url': false,
  },
  {
    'name': 'ta__miyan',
    'url': 'https://twitter.com/ta__miyan?lang=ja',
    'img': '../../assets/image/ta__miyan.jpg',
    'no_url': false,
  },
];
