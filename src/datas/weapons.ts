export type WeaponsLanguage = {
    "fr" : WeaponsCategory,
    "en" : WeaponsCategory,
    "pt" : WeaponsCategory,
}

export type WeaponsCategory = {
    "possesed": WeaponsArray,
    "quest": WeaponsArray
}

export type WeaponsArray = {
    [key: number] : [WeaponsUnit]
}

export type WeaponsUnit = {

    "imageUrl" : string,
    "text": string
}
