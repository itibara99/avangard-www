export const categorySlugMap: Record<string, string> = {
  standard: 'standartnie-profili',
  cornices: 'karnizy',
  contour: 'komplektuyushie'
};

export const categoryIdMap: Record<string, string> = {
  'standartnie-profili': 'standard',
  'karnizy': 'cornices',
  'komplektuyushie': 'contour'
};

export const productSlugMap: Record<string, string> = {
  'std-1': 'brus-40x40',
  'std-2': 'profil-stenovoy',
  'std-3': 'razdelitel',
  'std-4': 'profil-universalniy',
  'std-5': 'profil-potolochniy',
  'std-6': 'otboynik-z',
  'b2': 'karniz-b2-pro',
  'cor-1': 'karniz-pk14-standart',
  'cor-2': 'karniz-pk14-oblegchenniy',
  'cor-3': 'karniz-pk15',
  'cor-4': 'karniz-pk12',
  'cor-5': 'karniz-b1-odnoryadniy',
  'light-1': 'svetovaya-liniya-sl40',
  'cont-1': 'p-vstavka',
  'cont-2': 'zaglushki-b2-pro',
  'cont-3': 'zaglushki-b1',
  'cont-4': 'bandazhnaya-lenta'
};

export const productIdMap: Record<string, string> = {
  'brus-40x40': 'std-1',
  'profil-stenovoy': 'std-2',
  'razdelitel': 'std-3',
  'profil-universalniy': 'std-4',
  'profil-potolochniy': 'std-5',
  'otboynik-z': 'std-6',
  'karniz-b2-pro': 'b2',
  'karniz-pk14-standart': 'cor-1',
  'karniz-pk14-oblegchenniy': 'cor-2',
  'karniz-pk15': 'cor-3',
  'karniz-pk12': 'cor-4',
  'karniz-b1-odnoryadniy': 'cor-5',
  'svetovaya-liniya-sl40': 'light-1',
  'p-vstavka': 'cont-1',
  'zaglushki-b2-pro': 'cont-2',
  'zaglushki-b1': 'cont-3',
  'bandazhnaya-lenta': 'cont-4'
};

export function getCategorySlug(categoryId: string): string {
  return categorySlugMap[categoryId] || categoryId;
}

export function getCategoryId(slug: string): string | null {
  return categoryIdMap[slug] || null;
}

export function getProductSlug(productId: string): string {
  return productSlugMap[productId] || productId;
}

export function getProductId(slug: string): string | null {
  return productIdMap[slug] || null;
}
