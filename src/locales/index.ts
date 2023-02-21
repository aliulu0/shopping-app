import languages from './language.json';

export const translate = (key : string, language:string) => {
    let languageData:{[key:string]:string} = {};
    if (language === "en") {
        languageData = languages.en;
    }else{
        languageData = languages.tr;
    };
    return languageData[key];
}