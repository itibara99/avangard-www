export const productToCategory: Record<string, string> = {
  // Standard profiles
  'bp': 'standard',
  'sten': 'standard',
  'razdel': 'standard',
  'univ': 'standard',
  'potoloch': 'standard',
  'z': 'standard',

  // Cornices
  'b2': 'cornices',
  'cor-1': 'cornices',
  'pk15': 'cornices',
  'pk12': 'cornices',
  'b1': 'cornices',

  // Contour/Components
  'cont-1': 'contour',
  'cont-2': 'contour',
  'cont-3': 'contour',
  'cont-4': 'contour',
};

export const categoryTitles: Record<string, string> = {
  standard: 'Стандартные профили',
  cornices: 'Карнизы',
  contour: 'Комплектующие'
};

export function getCategoryForProduct(productId: string): string | null {
  return productToCategory[productId] || null;
}

export function isValidCategory(categoryId: string): boolean {
  return categoryId in categoryTitles;
}

export function isValidProduct(productId: string): boolean {
  return productId in productToCategory;
}
