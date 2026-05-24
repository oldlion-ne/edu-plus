import en from './en.json';

export function useTranslation() {
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = en;
    for (const part of parts) {
      if (current && typeof current === 'object') {
        current = Reflect.get(current, part);
      } else {
        return key;
      }
    }
    return typeof current === 'string' ? current : key;
  };

  return { t };
}
