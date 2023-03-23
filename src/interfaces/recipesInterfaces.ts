export interface Irecipes {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    license: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: extendedIng[];
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    summary: string;
    cuisines: [];
    dishTypes: string[] | string;
    diets: [];
    occasions: [];
    instructions: string;
    analyzedInstructions: instructions[];
    winePairing: winePairing;
    spoonicularSourceUrl: string;
}

export interface winePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: productMatches[];
}

interface productMatches {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    averageRating: number;
    ratingCount: number;
    score: number;
    link: string;
}

interface extendedIng {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
        us: measure;
        metric: measure;
    };
}

type measure = {
    amount: number;
    unitShort: string;
    unitLong: string;
};

export type instructions = {
    name: string;
    steps: steps[];
};

type steps = {
    number: number;
    step: string;
    ingredients: stepIngredients[];
    equipment: equipment[];
    length: length[];
};

type stepIngredients = {
    id: number;
    name: string;
    localizedName: string;
    image: string;
};

type equipment = {
    id: number;
    name: string;
    localizedName: string;
    image: string;
    temperature: temp[];
};

type temp = {
    number: number;
    unit: string;
};

type length = {
    number: number;
    unit: string;
};
