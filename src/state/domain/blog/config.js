import fitnessPoster from 'assets/images/fitness.jpg';
import indiaPoster from 'assets/images/india.jpg';
import naturePoster from 'assets/images/nature.jpg';
import singPoster from 'assets/images/sing.jpg';

export default [
  {
    tag: 'home',
    path: '/',
    title: 'Home',
    summary: 'All the blogs!',
    background: 'linear-gradient(to right, orange , yellow, green, cyan, blue, violet)',
    posterBackground: `linear-gradient(to right, orange , yellow, green, cyan, blue, violet)`,
  },
  {
    tag: 'fitness',
    path: '/blog/fitness',
    title: 'F.W.H.',
    summary: 'Fitness with Harrison',
    background: '#1159e4',
    posterBackground: `url(${fitnessPoster})`,
  },
  {
    tag: 'india',
    href: 'http://india.harrisonthirkettle.co.uk',
    title: 'India',
    summary: 'Travelling India',
    background: '#fb9930',
    posterBackground: `url(${indiaPoster})`,
  },
  {
    tag: 'nature',
    path: '/blog/nature',
    title: 'Nature',
    summary: 'Mainly my dogs!',
    background: '#45bb45',
    posterBackground: `url(${naturePoster})`,
  },
  {
    tag: 'singing',
    path: '/blog/singing',
    title: 'Sing!',
    summary: 'Tuuuuunnne',
    background: '#fd5542',
    posterBackground: `url(${singPoster})`,
  },
];
