import Typed from 'typed.js';

const loadDynamicBannerText = () => {

  new Typed('#banner-typed-text', {
    strings: ["Ministère de la culture", "Vive Atlas Culture"],
    typeSpeed: 50,
    loop: true
  });

}

export { loadDynamicBannerText };
