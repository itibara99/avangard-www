// Placeholder функция для изображений
const createPlaceholder = (text: string, width = 800, height = 600) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"%3E%3Crect width="${width}" height="${height}" fill="%23444"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial" font-size="24"%3E${encodeURIComponent(text)}%3C/text%3E%3C/svg%3E`;

const logo = createPlaceholder('Logo', 200, 200);
const bp40 = createPlaceholder('BP40');
const bp40_ch = createPlaceholder('BP40 CH');
const stenvoy = createPlaceholder('Stenovoy');
const sten_1 = createPlaceholder('Sten 1');
const sten_2 = createPlaceholder('Sten 2');
const sten_3 = createPlaceholder('Sten 3');
const razdelitel = createPlaceholder('Razdelitel');
const razdelitel_ch = createPlaceholder('Razdelitel CH');
const universal = createPlaceholder('Universal');
const universal_ch = createPlaceholder('Universal CH');
const potoloch = createPlaceholder('Potoloch');
const potoloch_ch = createPlaceholder('Potoloch CH');
const z = createPlaceholder('Z');
const z_ch = createPlaceholder('Z CH');
const b2 = createPlaceholder('B2');
const pk14_ch = createPlaceholder('PK14 CH');
const cornices = createPlaceholder('Cornices');
const pk15 = createPlaceholder('PK15');
const pk15_ch = createPlaceholder('PK15 CH');
const pk12 = createPlaceholder('PK12');
const pk12_ch = createPlaceholder('PK12 CH');
const am1 = createPlaceholder('AM1');
const furnitures = createPlaceholder('Furnitures');
const light_lines = createPlaceholder('Light Lines');
const ceilingSlide = createPlaceholder('Ceiling', 1920, 1080);

export {
    bp40, bp40_ch, stenvoy, sten_1, sten_2, sten_3, razdelitel,
    razdelitel_ch, universal, universal_ch, potoloch, potoloch_ch,
    z, z_ch, b2, pk14_ch, cornices, pk15, pk15_ch, pk12, pk12_ch,
    am1, furnitures, logo, light_lines, ceilingSlide
}