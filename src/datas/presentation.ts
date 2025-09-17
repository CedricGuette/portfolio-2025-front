export type PresentationObject = {
    "fr" : PresentationSection,
    "en" : PresentationSection,
    "pt" : PresentationSection,
}

export type PresentationSection = {
    "stat": string,
    "artefact": string,
    "developer": string,
    "weapon": string,
    "quest": string,
    "languages": string,
    "title4": string,
    "content4": string,
    "myPortfolio": string,
    "myGithub": string,
    "title5": string,
    "content5": string,
    "names": string,
    "email": string,
    "question": string,
    "send": string 
}

export type PresentationType = {
    "id": number,
    "firstTitle" : string,
    "firstText": string,
    "secondTitle": string,
    "secondText": string,
    "thirdTitle": string,
    "thirdText": string,
}