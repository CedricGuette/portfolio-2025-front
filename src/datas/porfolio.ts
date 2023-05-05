export type PortfolioObject = {
    [key: number] : [PortfolioLanguage]
}

export type PortfolioLanguage = {
    "fr" : PortfolioProject,
    "en" : PortfolioProject,
    "pt" : PortfolioProject,
    "int" : PortfolioProjectInt
}

export type PortfolioProject = {
    "title": string,
    "resume": string,
    "technology": string
}

export type PortfolioProjectInt = {
    "name": string,
    "image": Array<string>,
    "git": string,
    "live": string,
    "beforeLive": boolean
}

