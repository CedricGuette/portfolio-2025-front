
export type MiscObject = {
    fr: MiscLang,
    en: MiscLang,
    pt: MiscLang
}

export type MiscLang = {
    nav: MiscNav,
    portfolio: MiscPortfolio,
    footer: MiscFooter
}

export type MiscNav = {
    presentation: string,
    experience: string,
    portfolio: string,
    contact: string
}

export type MiscPortfolio = {
    view: string,
    resume: string,
    technology: string,
    github: string,
    preview: string,
    unavailable: string
}

export type MiscFooter = {
    copyright: string
}
