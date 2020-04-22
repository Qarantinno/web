import { ITranslateParams, ITranslates } from '../interfaces/ITranslates';
import { Language } from '../enums/Language';

export class Translator {
  private static instance: Translator;
  private translates: ITranslates;
  private language: string;

  private constructor() {
    this.language = Language.EN;
  }

  public static getInstance(): Translator {
    if (!Translator.instance) {
      Translator.instance = new Translator();
    }

    return Translator.instance;
  }

  public use(language: Language, translates: ITranslates): void {
    this.language = language;
    this.translates = translates;
  }

  public translate(path: string, params: ITranslateParams = {}): string {
    if (this.translates && this.translates.hasOwnProperty(path)) {
      const keys = Object.keys(params);

      if (keys.length > 0) {
        let result = this.translates[path];
        keys.forEach(key => result = result.replace(new RegExp(`{{${key}}}`, 'g'), params[key]));

        return result;
      }

      return this.translates[path];
    }

    return path;
  }
}

export default Translator.getInstance();
