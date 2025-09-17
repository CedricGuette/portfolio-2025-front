
export type MiscObject = {
    fr: MiscLang,
    en: MiscLang,
    pt: MiscLang
}

export type MiscLang = {
    nav: MiscNav,
    portfolio: MiscPortfolio,
    legalMentions: MiscLegalMentions,
    footer: MiscFooter
}

export type MiscNav = {
    presentation: string,
    experience: string,
    portfolio: string,
    contact: string,
    legalMentions: string
}

export type MiscPortfolio = {
    view: string,
    resume: string,
    technology: string,
    github: string,
    preview: string,
    unavailable: string
}

export type MiscLegalMentions = {
    owned: string,
    contact: string,
    hosted: string,
}

export type MiscFooter = {
    copyright: string
}
