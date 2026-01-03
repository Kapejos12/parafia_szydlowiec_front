// utils/liturgicalHelper.ts

// Typy dla okresów liturgicznych
export type LiturgicalSeason =
    | 'advent'
    | 'christmas'
    | 'ordinary-winter'
    | 'lent'
    | 'easter'
    | 'ordinary-summer';

// Typy dla kategorii świąt
export type FeastCategory =
    | 'miriam' // Maryjne
    | 'triduum' // Triduum Paschalne
    | 'solemnity' // Uroczystości
    | 'feast' // Święta
    | 'memorial' // Wspomnienia
    | 'optional-memorial' // Wspomnienia fakultatywne
    | 'special'; // Inne ważne dni

// Interfejs dla konfiguracji okresu
export interface LiturgicalSeasonInfo {
    season: LiturgicalSeason;
    name: string;
    gradient: string;
    textColor: 'white' | 'dark';
}

// Interfejs dla konfiguracji świąt
export interface FeastColorConfig {
    gradient: string;
    textColor: 'white' | 'dark';
    primaryColor: string;
    secondaryColor?: string;
}

// Interfejs dla świąt liturgicznych
export interface LiturgicalFeast {
    name: string;
    date: Date;
    category: FeastCategory;
    rank: 'solemnity' | 'feast' | 'memorial' | 'optional-memorial' | 'special';
    description?: string;
    isMoveable: boolean; // czy data zależy od Wielkanocy
}

// Konfiguracja gradientów dla każdego okresu
const seasonConfigs: Record<LiturgicalSeason, Omit<LiturgicalSeasonInfo, 'season'>> = {
    advent: {
        name: 'Adwent',
        gradient: 'linear-gradient(135deg, #BA68C8 0%, #9C27B0 25%, #673AB7 75%, #4A148C 100%)',
        textColor: 'white'
    },
    christmas: {
        name: 'Okres Bożego Narodzenia',
        gradient: 'linear-gradient(135deg, #FFFFFF 0%, #FFF8E1 25%, #FFD700 75%, #FFC107 100%)',
        textColor: 'dark'
    },
    'ordinary-winter': {
        name: 'Okres zwykły',
        gradient: 'linear-gradient(135deg, #1B5E20 0%, #388E3C 25%, #4CAF50 75%, #81C784 100%)',
        textColor: 'white'
    },
    lent: {
        name: 'Wielki Post',
        gradient: 'linear-gradient(135deg, #311B92 0%, #512DA8 25%, #673AB7 75%, #9575CD 100%)',
        textColor: 'white'
    },
    easter: {
        name: 'Okres Wielkanocny',
        gradient: 'linear-gradient(135deg, #FFC107 0%, #FFEB3B 25%, #FFF9C4 75%, #FAFAFA 100%)',
        textColor: 'dark'
    },
    'ordinary-summer': {
        name: 'Okres zwykły',
        gradient: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 25%, #8BC34A 75%, #CDDC39 100%)',
        textColor: 'white'
    }
};

// Konfiguracja kolorów dla kategorii świąt
const feastColorConfigs: Record<FeastCategory, FeastColorConfig> = {
    miriam: {
        gradient: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 25%, #BBDEFB 75%, #E3F2FD 100%)',
        textColor: 'white',
        primaryColor: '#1976D2',
        secondaryColor: '#E3F2FD'
    },
    triduum: {
        gradient: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 25%, #F44336 75%, #B71C1C 100%)',
        textColor: 'white',
        primaryColor: '#B71C1C',
        secondaryColor: '#FFEBEE'
    },
    solemnity: {
        gradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 25%, #FF9800 75%, #E65100 100%)',
        textColor: 'white',
        primaryColor: '#E65100',
        secondaryColor: '#FFF3E0'
    },
    feast: {
        gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 25%, #AB47BC 75%, #6A1B9A 100%)',
        textColor: 'white',
        primaryColor: '#6A1B9A',
        secondaryColor: '#F3E5F5'
    },
    memorial: {
        gradient: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 25%, #66BB6A 75%, #2E7D32 100%)',
        textColor: 'white',
        primaryColor: '#2E7D32',
        secondaryColor: '#E8F5E8'
    },
    'optional-memorial': {
        gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 25%, #9E9E9E 75%, #424242 100%)',
        textColor: 'white',
        primaryColor: '#424242',
        secondaryColor: '#F5F5F5'
    },
    special: {
        gradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 25%, #E91E63 75%, #AD1457 100%)',
        textColor: 'white',
        primaryColor: '#AD1457',
        secondaryColor: '#FCE4EC'
    }
};

// Konfiguracja kolorów dla rang świąt
const feastRankConfigs: Record<'solemnity' | 'feast' | 'memorial' | 'optional-memorial' | 'special', FeastColorConfig> = {
    solemnity: {
        gradient: 'linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 25%, #FFEB3B 75%, #F57F17 100%)',
        textColor: 'dark',
        primaryColor: '#F57F17',
        secondaryColor: '#FFFDE7'
    },
    feast: {
        gradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 25%, #FFC107 75%, #FF8F00 100%)',
        textColor: 'dark',
        primaryColor: '#FF8F00',
        secondaryColor: '#FFF8E1'
    },
    memorial: {
        gradient: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 25%, #8BC34A 75%, #558B2F 100%)',
        textColor: 'white',
        primaryColor: '#558B2F',
        secondaryColor: '#F1F8E9'
    },
    'optional-memorial': {
        gradient: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 25%, #BDBDBD 75%, #616161 100%)',
        textColor: 'white',
        primaryColor: '#616161',
        secondaryColor: '#FAFAFA'
    },
    special: {
        gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 25%, #9C27B0 75%, #4A148C 100%)',
        textColor: 'white',
        primaryColor: '#4A148C',
        secondaryColor: '#F3E5F5'
    }
};

/**
 * Oblicza datę Wielkanocy astronomicznie - pierwsza niedziela po pierwszej wiosennej pełni księżyca po 21 marca
 * Używamy algorytmu Meeusa/Jonesa/Butchera, który jest bardzo dokładny
 */
function calculateEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
}

/**
 * Oblicza kluczowe daty liturgiczne dla danego roku
 */
function calculateLiturgicalDates(year: number) {
    const easter = calculateEaster(year);

    // Środa Popielcowa - 46 dni przed Wielkanocą
    const ashWednesday = new Date(easter);
    ashWednesday.setDate(easter.getDate() - 46);

    // Zesłanie Ducha Świętego - 49 dni po Wielkanocy
    const pentecost = new Date(easter);
    pentecost.setDate(easter.getDate() + 49);

    // Boże Narodzenie
    const christmas = new Date(year, 11, 25);

    // Pierwszy Adwent (4 niedziele przed Bożym Narodzeniem)
    const christmasDay = christmas.getDay();
    const daysToFirstAdvent = christmasDay === 0 ? 28 : (28 - christmasDay);
    const firstAdvent = new Date(year, 11, 25 - daysToFirstAdvent);

    // Chrzest Pański - pierwsza niedziela po Objawieniu Pańskim (6 stycznia)
    // Jeśli 6 stycznia wypada w niedzielę, to Chrzest Pański jest następnej niedzieli
    const epiphany = new Date(year, 0, 6);
    const epiphanyDay = epiphany.getDay();
    let baptismOfLord: Date;

    if (epiphanyDay === 0) {
        // Jeśli Objawienie jest w niedzielę, Chrzest jest następnej niedzieli (7 dni później)
        baptismOfLord = new Date(year, 0, 13);
    } else {
        // Pierwsza niedziela po Objawieniu
        baptismOfLord = new Date(year, 0, 6 + (7 - epiphanyDay));
    }

    // Uroczystość Chrystusa Króla (ostatnia niedziela roku liturgicznego - niedziela przed I Adwentem)
    const christTheKing = new Date(firstAdvent);
    christTheKing.setDate(firstAdvent.getDate() - 7);

    // Triduum Paschalne
    const holyThursday = new Date(easter);
    holyThursday.setDate(easter.getDate() - 3);

    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);

    const holySaturday = new Date(easter);
    holySaturday.setDate(easter.getDate() - 1);

    // Inne ważne daty ruchome
    const palmSunday = new Date(easter);
    palmSunday.setDate(easter.getDate() - 7);

    const ascension = new Date(easter);
    ascension.setDate(easter.getDate() + 39);

    const corpusChristi = new Date(easter);
    corpusChristi.setDate(easter.getDate() + 60);

    const sacredHeart = new Date(easter);
    sacredHeart.setDate(easter.getDate() + 68);

    return {
        easter,
        ashWednesday,
        pentecost,
        firstAdvent,
        christmas,
        baptismOfLord,
        christTheKing,
        holyThursday,
        goodFriday,
        holySaturday,
        palmSunday,
        ascension,
        corpusChristi,
        sacredHeart,
        epiphany
    };
}

/**
 * Generuje wszystkie święta liturgiczne dla danego roku
 */
function generateLiturgicalFeasts(year: number): LiturgicalFeast[] {
    const dates = calculateLiturgicalDates(year);
    const feasts: LiturgicalFeast[] = [];

    // Święta stałe - Maryjne
    feasts.push(
        {
            name: 'Świętej Bożej Rodzicielki Maryi',
            date: new Date(year, 0, 1),
            category: 'miriam',
            rank: 'solemnity',
            description: 'Uroczystość Świętej Bożej Rodzicielki Maryi',
            isMoveable: false
        },
        {
            name: 'Ofiarowanie Pańskie',
            date: new Date(year, 1, 2),
            category: 'miriam',
            rank: 'feast',
            description: 'Ofiarowanie Pańskie - Matki Bożej Gromnicznej',
            isMoveable: false
        },
        {
            name: 'Zwiastowanie Pańskie',
            date: new Date(year, 2, 25),
            category: 'miriam',
            rank: 'solemnity',
            description: 'Zwiastowanie Pańskie',
            isMoveable: false
        },
        {
            name: 'Najświętsza Maryja Panna z Fatimy',
            date: new Date(year, 4, 13),
            category: 'miriam',
            rank: 'optional-memorial',
            description: 'Najświętsza Maryja Panna z Fatimy',
            isMoveable: false
        },
        {
            name: 'Nawiedzenie Najświętszej Maryi Panny',
            date: new Date(year, 4, 31),
            category: 'miriam',
            rank: 'feast',
            description: 'Nawiedzenie Najświętszej Maryi Panny',
            isMoveable: false
        },
        {
            name: 'Wniebowzięcie Najświętszej Maryi Panny',
            date: new Date(year, 7, 15),
            category: 'miriam',
            rank: 'solemnity',
            description: 'Wniebowzięcie Najświętszej Maryi Panny',
            isMoveable: false
        },
        {
            name: 'Narodzenie Najświętszej Maryi Panny',
            date: new Date(year, 8, 8),
            category: 'miriam',
            rank: 'feast',
            description: 'Narodzenie Najświętszej Maryi Panny',
            isMoveable: false
        },
        {
            name: 'Niepokalane Poczęcie Najświętszej Maryi Panny',
            date: new Date(year, 11, 8),
            category: 'miriam',
            rank: 'solemnity',
            description: 'Niepokalane Poczęcie Najświętszej Maryi Panny',
            isMoveable: false
        }
    );

    // Triduum Paschalne
    feasts.push(
        {
            name: 'Wielki Czwartek',
            date: dates.holyThursday,
            category: 'triduum',
            rank: 'special',
            description: 'Msza Wieczerzy Pańskiej',
            isMoveable: true
        },
        {
            name: 'Wielki Piątek',
            date: dates.goodFriday,
            category: 'triduum',
            rank: 'special',
            description: 'Męka Pańska',
            isMoveable: true
        },
        {
            name: 'Wielka Sobota',
            date: dates.holySaturday,
            category: 'triduum',
            rank: 'special',
            description: 'Wigilia Paschalna',
            isMoveable: true
        }
    );

    // Inne święta ruchome
    feasts.push(
        {
            name: 'Niedziela Palmowa',
            date: dates.palmSunday,
            category: 'special',
            rank: 'solemnity',
            description: 'Niedziela Palmowa Męki Pańskiej',
            isMoveable: true
        },
        {
            name: 'Wielkanoc',
            date: dates.easter,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Zmartwychwstanie Pańskie',
            isMoveable: true
        },
        {
            name: 'Wniebowstąpienie Pańskie',
            date: dates.ascension,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Wniebowstąpienie Pańskie',
            isMoveable: true
        },
        {
            name: 'Zielone Świątki',
            date: dates.pentecost,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Zesłanie Ducha Świętego',
            isMoveable: true
        },
        {
            name: 'Boże Ciało',
            date: dates.corpusChristi,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Najświętszego Ciała i Krwi Chrystusa',
            isMoveable: true
        },
        {
            name: 'Najświętszego Serca Pana Jezusa',
            date: dates.sacredHeart,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Najświętszego Serca Pana Jezusa',
            isMoveable: true
        }
    );

    // Święta stałe - inne uroczystości i święta
    feasts.push(
        {
            name: 'Objawienie Pańskie',
            date: dates.epiphany,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Objawienie Pańskie',
            isMoveable: false
        },
        {
            name: 'Chrzest Pański',
            date: dates.baptismOfLord,
            category: 'feast',
            rank: 'feast',
            description: 'Chrzest Pański',
            isMoveable: true
        },
        {
            name: 'Św. Józefa Sebastiana Pelczara',
            date: new Date(year, 0, 19),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Józefa Sebastiana Pelczara, biskupa',
            isMoveable: false
        },
        {
            name: 'Świętych Cyryla i Metodego',
            date: new Date(year, 1, 14),
            category: 'feast',
            rank: 'feast',
            description: 'Świętych Cyryla, mnicha i Metodego, biskupa',
            isMoveable: false
        },
        {
            name: 'Św. Kazimierza',
            date: new Date(year, 2, 4),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Św. Kazimierza, królewicza',
            isMoveable: false
        },
        {
            name: 'Świętego Józefa, Oblubieńca Najświętszej Maryi Panny',
            date: new Date(year, 2, 19),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Świętego Józefa, Oblubieńca Najświętszej Maryi Panny',
            isMoveable: false
        },
        {
            name: 'Św. Wojciecha',
            date: new Date(year, 3, 23),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Św. Wojciecha, biskupa i męczennika',
            isMoveable: false
        },
        {
            name: 'Św. Marka',
            date: new Date(year, 3, 25),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Marka, Ewangelisty',
            isMoveable: false
        },
        {
            name: 'Św. Katarzyny Sieneńskiej',
            date: new Date(year, 3, 29),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Katarzyny Sieneńskiej, dziewicy i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Najświętszej Maryi Panny, Królowej Polski',
            date: new Date(year, 4, 4),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Najświętszej Maryi Panny, Królowej Polski',
            isMoveable: false
        },
        {
            name: 'Świętych Apostołów Filipa i Jakuba',
            date: new Date(year, 4, 6),
            category: 'feast',
            rank: 'feast',
            description: 'Świętych Apostołów Filipa i Jakuba',
            isMoveable: false
        },
        {
            name: 'Św. Stanisława',
            date: new Date(year, 4, 8),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Św. Stanisława, biskupa i męczennika',
            isMoveable: false
        },
        {
            name: 'Św. Macieja',
            date: new Date(year, 4, 14),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Macieja, Apostoła',
            isMoveable: false
        },
        {
            name: 'Św. Andrzeja Boboli',
            date: new Date(year, 4, 16),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Andrzeja Boboli, prezbitera i męczennika',
            isMoveable: false
        },
        {
            name: 'Najświętszej Maryi Panny, Matki Kościoła',
            date: new Date(year, 4, 25),
            category: 'feast',
            rank: 'feast',
            description: 'Najświętszej Maryi Panny, Matki Kościoła',
            isMoveable: false
        },
        {
            name: 'Jezusa Chrystusa, Najwyższego i Wiecznego Kapłana',
            date: new Date(year, 4, 28),
            category: 'feast',
            rank: 'feast',
            description: 'Jezusa Chrystusa, Najwyższego i Wiecznego Kapłana',
            isMoveable: false
        },
        {
            name: 'Św. Urszuli Ledóchowskiej',
            date: new Date(year, 4, 29),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Urszuli Ledóchowskiej, dziewicy',
            isMoveable: false
        },
        {
            name: 'Najświętszej Trójcy',
            date: new Date(year, 4, 31),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Uroczystość Najświętszej Trójcy',
            isMoveable: false
        },
        {
            name: 'Św. Jadwigi Królowej',
            date: new Date(year, 5, 8),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jadwigi Królowej',
            isMoveable: false
        },
        {
            name: 'Św. Barnaby',
            date: new Date(year, 5, 10),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Barnaby, Apostoła',
            isMoveable: false
        },
        {
            name: 'Rocznica poświęcenia kościoła katedralnego',
            date: new Date(year, 5, 11),
            category: 'feast',
            rank: 'feast',
            description: 'Rocznica poświęcenia kościoła katedralnego w Radomiu',
            isMoveable: false
        },
        {
            name: 'Niepokalanego Serca Najświętszej Maryi Panny',
            date: new Date(year, 5, 13),
            category: 'memorial',
            rank: 'memorial',
            description: 'Niepokalanego Serca Najświętszej Maryi Panny',
            isMoveable: false
        },
        {
            name: 'Św. Alberta Chmielowskiego',
            date: new Date(year, 5, 17),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Alberta Chmielowskiego, zakonnika',
            isMoveable: false
        },
        {
            name: 'Narodzenie św. Jana Chrzciciela',
            date: new Date(year, 5, 24),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Narodzenie św. Jana Chrzciciela',
            isMoveable: false
        },
        {
            name: 'Świętych Apostołów Piotra i Pawła',
            date: new Date(year, 5, 29),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Świętych Apostołów Piotra i Pawła',
            isMoveable: false
        },
        {
            name: 'Św. Tomasza',
            date: new Date(year, 6, 3),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Tomasza, Apostoła',
            isMoveable: false
        },
        {
            name: 'Bł. Marii Teresy Ledóchowskiej',
            date: new Date(year, 6, 6),
            category: 'memorial',
            rank: 'memorial',
            description: 'Bł. Marii Teresy Ledóchowskiej, dziewicy',
            isMoveable: false
        },
        {
            name: 'Św. Jana z Dukli',
            date: new Date(year, 6, 8),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jana z Dukli, prezbitera',
            isMoveable: false
        },
        {
            name: 'Św. Benedykta',
            date: new Date(year, 6, 11),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Benedykta, opata',
            isMoveable: false
        },
        {
            name: 'Świętych pustelników Andrzeja Świerada i Benedykta',
            date: new Date(year, 6, 13),
            category: 'memorial',
            rank: 'memorial',
            description: 'Świętych pustelników Andrzeja Świerada i Benedykta',
            isMoveable: false
        },
        {
            name: 'Św. Bonawentury',
            date: new Date(year, 6, 15),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Bonawentury, biskupa i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Najświętszej Maryi Panny z Góry Karmel',
            date: new Date(year, 6, 16),
            category: 'memorial',
            rank: 'memorial',
            description: 'Najświętszej Maryi Panny z Góry Karmel',
            isMoveable: false
        },
        {
            name: 'Św. Marii Magdaleny',
            date: new Date(year, 6, 22),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Marii Magdaleny',
            isMoveable: false
        },
        {
            name: 'Św. Brygidy',
            date: new Date(year, 6, 23),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Brygidy, zakonnicy',
            isMoveable: false
        },
        {
            name: 'Św. Kingi',
            date: new Date(year, 6, 24),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Kingi, dziewicy',
            isMoveable: false
        },
        {
            name: 'Św. Jakuba',
            date: new Date(year, 6, 25),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Jakuba, Apostoła',
            isMoveable: false
        },
        {
            name: 'Świętych Marty, Marii i Łazarza',
            date: new Date(year, 6, 29),
            category: 'memorial',
            rank: 'memorial',
            description: 'Świętych Marty, Marii i Łazarza',
            isMoveable: false
        },
        {
            name: 'Św. Ignacego z Loyoli',
            date: new Date(year, 6, 31),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Ignacego z Loyoli, prezbitera',
            isMoveable: false
        },
        {
            name: 'Św. Alfonsa Marii Liguoriego',
            date: new Date(year, 7, 1),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Alfonsa Marii Liguoriego, biskupa i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Św. Jana Marii Vianneya',
            date: new Date(year, 7, 4),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jana Marii Vianneya, prezbitera',
            isMoveable: false
        },
        {
            name: 'Przemienienie Pańskie',
            date: new Date(year, 7, 6),
            category: 'feast',
            rank: 'feast',
            description: 'Przemienienie Pańskie',
            isMoveable: false
        },
        {
            name: 'Św. Dominika',
            date: new Date(year, 7, 8),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Dominika, prezbitera',
            isMoveable: false
        },
        {
            name: 'Św. Wawrzyńca',
            date: new Date(year, 7, 10),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Wawrzyńca, diakona i męczennika',
            isMoveable: false
        },
        {
            name: 'Św. Klary',
            date: new Date(year, 7, 11),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Klary, dziewicy',
            isMoveable: false
        },
        {
            name: 'Św. Maksymiliana Marii Kolbego',
            date: new Date(year, 7, 14),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Maksymiliana Marii Kolbego, prezbitera i męczennika',
            isMoveable: false
        },
        {
            name: 'Św. Jacka',
            date: new Date(year, 7, 17),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jacka, prezbitera',
            isMoveable: false
        },
        {
            name: 'Św. Bernarda',
            date: new Date(year, 7, 20),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Bernarda, opata i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Św. Piusa X',
            date: new Date(year, 7, 21),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Piusa X, papieża',
            isMoveable: false
        },
        {
            name: 'Najświętszej Maryi Panny, Królowej',
            date: new Date(year, 7, 22),
            category: 'memorial',
            rank: 'memorial',
            description: 'Najświętszej Maryi Panny, Królowej',
            isMoveable: false
        },
        {
            name: 'Św. Bartłomieja',
            date: new Date(year, 7, 24),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Bartłomieja, Apostoła',
            isMoveable: false
        },
        {
            name: 'Najświętszej Maryi Panny Częstochowskiej',
            date: new Date(year, 7, 26),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Najświętszej Maryi Panny Częstochowskiej, Królowej Polski',
            isMoveable: false
        },
        {
            name: 'Św. Moniki',
            date: new Date(year, 7, 27),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Moniki',
            isMoveable: false
        },
        {
            name: 'Św. Augustyna',
            date: new Date(year, 7, 28),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Augustyna, biskupa i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Męczeństwo św. Jana Chrzciciela',
            date: new Date(year, 7, 29),
            category: 'memorial',
            rank: 'memorial',
            description: 'Męczeństwo św. Jana Chrzciciela',
            isMoveable: false
        },
        {
            name: 'Św. Grzegorza Wielkiego',
            date: new Date(year, 8, 3),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Grzegorza Wielkiego, papieża i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Podwyższenie Krzyża Świętego',
            date: new Date(year, 8, 14),
            category: 'feast',
            rank: 'feast',
            description: 'Podwyższenie Krzyża Świętego',
            isMoveable: false
        },
        {
            name: 'Najświętszej Maryi Panny Bolesnej',
            date: new Date(year, 8, 15),
            category: 'memorial',
            rank: 'memorial',
            description: 'Najświętszej Maryi Panny Bolesnej',
            isMoveable: false
        },
        {
            name: 'Świętych męczenników Korneliusza i Cypriana',
            date: new Date(year, 8, 16),
            category: 'memorial',
            rank: 'memorial',
            description: 'Świętych męczenników Korneliusza, papieża, i Cypriana, biskupa',
            isMoveable: false
        },
        {
            name: 'Św. Stanisława Kostki',
            date: new Date(year, 8, 18),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Stanisława Kostki, zakonnika',
            isMoveable: false
        },
        {
            name: 'Św. Mateusza',
            date: new Date(year, 8, 21),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Mateusza, Apostoła i Ewangelisty',
            isMoveable: false
        },
        {
            name: 'Św. Pio z Pietrelciny',
            date: new Date(year, 8, 23),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Pio z Pietrelciny, prezbitera',
            isMoveable: false
        },
        {
            name: 'Św. Wacława',
            date: new Date(year, 8, 28),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Wacława, męczennika',
            isMoveable: false
        },
        {
            name: 'Świętych Archaniołów Michała, Gabriela i Rafała',
            date: new Date(year, 8, 29),
            category: 'feast',
            rank: 'feast',
            description: 'Świętych Archaniołów Michała, Gabriela i Rafała',
            isMoveable: false
        },
        {
            name: 'Św. Hieronima',
            date: new Date(year, 8, 30),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Hieronima, prezbitera i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Św. Teresy od Dzieciątka Jezus',
            date: new Date(year, 9, 1),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Teresy od Dzieciątka Jezus, dziewicy i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Świętych Aniołów Stróżów',
            date: new Date(year, 9, 2),
            category: 'memorial',
            rank: 'memorial',
            description: 'Świętych Aniołów Stróżów',
            isMoveable: false
        },
        {
            name: 'Św. Faustyny Kowalskiej',
            date: new Date(year, 9, 5),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Faustyny Kowalskiej, dziewicy',
            isMoveable: false
        },
        {
            name: 'Najświętszej Maryi Panny Różańcowej',
            date: new Date(year, 9, 7),
            category: 'memorial',
            rank: 'memorial',
            description: 'Najświętszej Maryi Panny Różańcowej',
            isMoveable: false
        },
        {
            name: 'Bł. Honorata Koźmińskiego',
            date: new Date(year, 9, 13),
            category: 'memorial',
            rank: 'memorial',
            description: 'Bł. Honorata Koźmińskiego, prezbitera',
            isMoveable: false
        },
        {
            name: 'Św. Teresy od Jezusa',
            date: new Date(year, 9, 15),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Teresy od Jezusa, dziewicy i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Św. Jadwigi Śląskiej',
            date: new Date(year, 9, 16),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jadwigi Śląskiej',
            isMoveable: false
        },
        {
            name: 'Św. Ignacego Antiocheńskiego',
            date: new Date(year, 9, 17),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Ignacego Antiocheńskiego, biskupa i męczennika',
            isMoveable: false
        },
        {
            name: 'Św. Jana Kantego',
            date: new Date(year, 9, 20),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jana Kantego, prezbitera',
            isMoveable: false
        },
        {
            name: 'Św. Jana Pawła II',
            date: new Date(year, 9, 22),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jana Pawła II, papieża',
            isMoveable: false
        },
        {
            name: 'Świętych Apostołów Szymona i Judy Tadeusza',
            date: new Date(year, 9, 28),
            category: 'feast',
            rank: 'feast',
            description: 'Świętych Apostołów Szymona i Judy Tadeusza',
            isMoveable: false
        },
        {
            name: 'Wszyscy Święci',
            date: new Date(year, 10, 1),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Wszyscy Święci',
            isMoveable: false
        },
        {
            name: 'Wszystkich Wiernych Zmarłych',
            date: new Date(year, 10, 2),
            category: 'special',
            rank: 'special',
            description: 'Wspomnienie Wszystkich Wiernych Zmarłych',
            isMoveable: false
        },
        {
            name: 'Św. Karola Boromeusza',
            date: new Date(year, 10, 4),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Karola Boromeusza, biskupa',
            isMoveable: false
        },
        {
            name: 'Rocznica poświęcenia Bazyliki Laterańskiej',
            date: new Date(year, 10, 9),
            category: 'feast',
            rank: 'feast',
            description: 'Rocznica poświęcenia Bazyliki Laterańskiej',
            isMoveable: false
        },
        {
            name: 'Św. Leona Wielkiego',
            date: new Date(year, 10, 10),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Leona Wielkiego, papieża i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Św. Marcina z Tours',
            date: new Date(year, 10, 11),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Marcina z Tours, biskupa',
            isMoveable: false
        },
        {
            name: 'Św. Jozafata',
            date: new Date(year, 10, 12),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jozafata, biskupa i męczennika',
            isMoveable: false
        },
        {
            name: 'Świętych Benedykta, Jana, Mateusza, Izaaka i Krystyna',
            date: new Date(year, 10, 13),
            category: 'memorial',
            rank: 'memorial',
            description: 'Świętych Benedykta, Jana, Mateusza, Izaaka i Krystyna - pierwszych męczenników Polski',
            isMoveable: false
        },
        {
            name: 'Św. Elżbiety Węgierskiej',
            date: new Date(year, 10, 17),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Elżbiety Węgierskiej, zakonnicy',
            isMoveable: false
        },
        {
            name: 'Bł. Karoliny Kózkówny',
            date: new Date(year, 10, 18),
            category: 'memorial',
            rank: 'memorial',
            description: 'Bł. Karoliny Kózkówny, dziewicy i męczennicy',
            isMoveable: false
        },
        {
            name: 'Św. Rafała Kalinowskiego',
            date: new Date(year, 10, 20),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Rafała Kalinowskiego, prezbitera',
            isMoveable: false
        },
        {
            name: 'Ofiarowanie Najświętszej Maryi Panny',
            date: new Date(year, 10, 21),
            category: 'memorial',
            rank: 'memorial',
            description: 'Ofiarowanie Najświętszej Maryi Panny',
            isMoveable: false
        },
        {
            name: 'Jezusa Chrystusa Króla Wszechświata',
            date: dates.christTheKing,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Jezus Chrystus Król Wszechświata',
            isMoveable: true
        },
        {
            name: 'Świętych męczenników Andrzeja Dung-Lac i Towarzyszy',
            date: new Date(year, 10, 24),
            category: 'memorial',
            rank: 'memorial',
            description: 'Świętych męczenników Andrzeja Dung-Lac, prezbitera, i Towarzyszy',
            isMoveable: false
        },
        {
            name: 'Św. Andrzeja',
            date: new Date(year, 10, 30),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Andrzeja, Apostoła',
            isMoveable: false
        },
        {
            name: 'Św. Franciszka Ksawerego',
            date: new Date(year, 11, 3),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Franciszka Ksawerego, prezbitera',
            isMoveable: false
        },
        {
            name: 'Św. Ambrożego',
            date: new Date(year, 11, 7),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Ambrożego, biskupa i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Św. Jana od Krzyża',
            date: new Date(year, 11, 14),
            category: 'memorial',
            rank: 'memorial',
            description: 'Św. Jana od Krzyża, prezbitera i doktora Kościoła',
            isMoveable: false
        },
        {
            name: 'Boże Narodzenie',
            date: dates.christmas,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Narodzenie Pańskie',
            isMoveable: false
        },
        {
            name: 'Św. Szczepana',
            date: new Date(year, 11, 26),
            category: 'feast',
            rank: 'feast',
            description: 'Św. Szczepana, pierwszego męczennika',
            isMoveable: false
        },
        {
            name: 'Świętej Rodziny',
            date: new Date(year, 11, 27),
            category: 'feast',
            rank: 'feast',
            description: 'Świętej Rodziny Jezusa, Maryi i Józefa',
            isMoveable: false
        },
        {
            name: 'Świętych Młodziaków',
            date: new Date(year, 11, 28),
            category: 'feast',
            rank: 'feast',
            description: 'Świętych Młodziaków, męczenników',
            isMoveable: false
        }
    );

    return feasts.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Pomocnicza funkcja do porównywania dat bez czasu
 */
function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

/**
 * Pomocnicza funkcja sprawdzająca czy data jest między dwiema datami (włącznie)
 */
// function isDateBetween(date: Date, start: Date, end: Date): boolean {
//     // Normalizujemy daty do początku dnia
//     const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//     const startOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
//     const endOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());

//     return dateOnly >= startOnly && dateOnly <= endOnly;
// }

/**
 * Określa aktualny okres liturgiczny na podstawie daty
 * POPRAWIONA WERSJA - kluczowe dla stycznia: sprawdzamy poprzedni rok!
 */
function determineLiturgicalSeason(date: Date): LiturgicalSeason {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const checkDate = new Date(year, month, day);

    // KLUCZOWE: Dla stycznia/lutego Okres BN rozpoczął się w grudniu POPRZEDNIEGO roku!
    if (month <= 1) { // styczeń lub luty
        const prevChristmasEve = new Date(year - 1, 11, 24); // 24.12.2025
        const currentYearDates = calculateLiturgicalDates(year); // 2026 ← TUTAJ ZMIANA!

        // Okres BN: od 24.XII.2025 do Chrztu 2026 (11.01.2026)
        if (checkDate >= prevChristmasEve && checkDate <= currentYearDates.baptismOfLord) {
            return 'christmas';
        }

        // Dla pozostałych okresów używamy dat z BIEŻĄCEGO roku
        const dates = calculateLiturgicalDates(year);

        // Okres zwykły (zima)
        const dayAfterBaptism = new Date(currentYearDates.baptismOfLord);
        dayAfterBaptism.setDate(currentYearDates.baptismOfLord.getDate() + 1);
        const dayBeforeAsh = new Date(dates.ashWednesday);
        dayBeforeAsh.setDate(dates.ashWednesday.getDate() - 1);

        if (checkDate >= dayAfterBaptism && checkDate <= dayBeforeAsh) {
            return 'ordinary-winter';
        }

        // Wielki Post
        if (checkDate >= dates.ashWednesday && checkDate <= dates.holySaturday) {
            return 'lent';
        }

        // Okres Wielkanocny
        if (checkDate >= dates.easter && checkDate <= dates.pentecost) {
            return 'easter';
        }

        return 'ordinary-winter';
    }

    // Dla miesięcy marzec-grudzień używamy dat z BIEŻĄCEGO roku
    const dates = calculateLiturgicalDates(year);

    // Wielki Post
    if (checkDate >= dates.ashWednesday && checkDate <= dates.holySaturday) {
        return 'lent';
    }

    // Okres Wielkanocny
    if (checkDate >= dates.easter && checkDate <= dates.pentecost) {
        return 'easter';
    }

    // Okres zwykły (lato)
    const dayAfterPentecost = new Date(dates.pentecost);
    dayAfterPentecost.setDate(dates.pentecost.getDate() + 1);

    if (checkDate >= dayAfterPentecost && checkDate <= dates.christTheKing) {
        return 'ordinary-summer';
    }

    // Adwent - od I Niedzieli Adwentu do 23 grudnia
    const dec23 = new Date(year, 11, 23);
    if (checkDate >= dates.firstAdvent && checkDate <= dec23) {
        return 'advent';
    }

    // Okres Bożego Narodzenia - od 24 grudnia do Chrztu Pańskiego NASTĘPNEGO roku
    const christmasEve = new Date(year, 11, 24);
    const nextYearDates = calculateLiturgicalDates(year + 1);

    if (checkDate >= christmasEve && checkDate <= nextYearDates.baptismOfLord) {
        return 'christmas';
    }

    return 'ordinary-summer';
}

/**
 * Główna funkcja eksportowana - zwraca informacje o aktualnym okresie liturgicznym
 */
export function getCurrentLiturgicalInfo(date: Date = new Date()): LiturgicalSeasonInfo {
    const season = determineLiturgicalSeason(date);
    const config = seasonConfigs[season];

    return {
        season,
        ...config
    };
}

/**
 * Zwraca tylko gradient dla aktualnego okresu liturgicznego
 */
export function getCurrentLiturgicalGradient(date: Date = new Date()): string {
    return getCurrentLiturgicalInfo(date).gradient;
}

/**
 * Zwraca nazwę aktualnego okresu liturgicznego
 */
export function getCurrentLiturgicalSeasonName(date: Date = new Date()): string {
    return getCurrentLiturgicalInfo(date).name;
}

/**
 * Sprawdza czy tekst powinien być ciemny czy jasny dla aktualnego okresu
 */
export function shouldUseDarkText(date: Date = new Date()): boolean {
    return getCurrentLiturgicalInfo(date).textColor === 'dark';
}

// Interfejs dla dat okresu liturgicznego
export interface LiturgicalSeasonDates {
    season: LiturgicalSeason;
    name: string;
    startDate: Date;
    endDate: Date;
    durationDays: number;
}

/**
 * Zwraca daty rozpoczęcia i zakończenia dla wszystkich okresów liturgicznych w danym roku
 */
export function getAllLiturgicalSeasonDates(year: number): LiturgicalSeasonDates[] {
    const dates = calculateLiturgicalDates(year);

    const christmasEve = new Date(year, 11, 24);
    const dec23 = new Date(year, 11, 23);
    const dayAfterBaptism = new Date(dates.baptismOfLord);
    dayAfterBaptism.setDate(dayAfterBaptism.getDate() + 1);
    const dayBeforeAsh = new Date(dates.ashWednesday);
    dayBeforeAsh.setDate(dayBeforeAsh.getDate() - 1);
    const dayAfterPentecost = new Date(dates.pentecost);
    dayAfterPentecost.setDate(dayAfterPentecost.getDate() + 1);

    const seasons: LiturgicalSeasonDates[] = [
        {
            season: 'advent',
            name: 'Adwent',
            startDate: dates.firstAdvent,
            endDate: dec23, // Adwent kończy się 23 grudnia
            durationDays: 0
        },
        {
            season: 'christmas',
            name: 'Okres Bożego Narodzenia',
            startDate: christmasEve, // Okres BN zaczyna się 24 grudnia (Wigilia)
            endDate: dates.baptismOfLord,
            durationDays: 0
        },
        {
            season: 'ordinary-winter',
            name: 'Okres zwykły (zima)',
            startDate: dayAfterBaptism,
            endDate: dayBeforeAsh,
            durationDays: 0
        },
        {
            season: 'lent',
            name: 'Wielki Post',
            startDate: dates.ashWednesday,
            endDate: dates.holySaturday,
            durationDays: 0
        },
        {
            season: 'easter',
            name: 'Okres Wielkanocny',
            startDate: dates.easter,
            endDate: dates.pentecost,
            durationDays: 0
        },
        {
            season: 'ordinary-summer',
            name: 'Okres zwykły (lato)',
            startDate: dayAfterPentecost,
            endDate: dates.christTheKing,
            durationDays: 0
        }
    ];

    // Oblicz liczbę dni dla każdego okresu
    seasons.forEach(season => {
        const timeDiff = season.endDate.getTime() - season.startDate.getTime();
        season.durationDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    });

    return seasons;
}

/**
 * Zwraca daty rozpoczęcia i zakończenia aktualnego okresu liturgicznego
 * POPRAWIONA WERSJA - obsługuje przejście roku dla Okresu Bożego Narodzenia
 */
export function getCurrentLiturgicalSeasonDates(date: Date = new Date()): LiturgicalSeasonDates {
    const year = date.getFullYear();
    const month = date.getMonth();
    const currentSeason = determineLiturgicalSeason(date);

    // SPECJALNY PRZYPADEK: Okres Bożego Narodzenia w styczniu
    // Jeśli jesteśmy w styczniu i jest Okres BN, to zaczął się w grudniu POPRZEDNIEGO roku
    if (currentSeason === 'christmas' && month === 0) {
        // Pobierz daty z bieżącego roku dla końca (Chrzest Pański)
        const currentYearDates = calculateLiturgicalDates(year);

        const christmasEve = new Date(year - 1, 11, 24); // 24.12.2025
        const baptismOfLord = currentYearDates.baptismOfLord; // 11.01.2026

        const timeDiff = baptismOfLord.getTime() - christmasEve.getTime();
        const durationDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;

        return {
            season: 'christmas',
            name: 'Okres Bożego Narodzenia',
            startDate: christmasEve,
            endDate: baptismOfLord,
            durationDays: durationDays
        };
    }

    // Dla pozostałych przypadków używamy standardowej logiki
    let allSeasons = getAllLiturgicalSeasonDates(year);
    let seasonInfo = allSeasons.find(s => s.season === currentSeason);

    // Jeśli nie znaleziono i jesteśmy w lutym w okresie zwykłym (zima),
    // sprawdź czy nie trzeba użyć dat z poprzedniego roku
    if (!seasonInfo && month === 1 && currentSeason === 'ordinary-winter') {
        allSeasons = getAllLiturgicalSeasonDates(year - 1);
        seasonInfo = allSeasons.find(s => s.season === currentSeason);
    }

    if (!seasonInfo) {
        throw new Error(`Nie znaleziono informacji o okresie: ${currentSeason}`);
    }

    return seasonInfo;
}

/**
 * Zwraca sformatowany string z datami trwania aktualnego okresu liturgicznego
 */
export function getCurrentLiturgicalSeasonDateRange(date: Date = new Date()): string {
    const seasonDates = getCurrentLiturgicalSeasonDates(date);

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const startFormatted = formatDate(seasonDates.startDate);
    const endFormatted = formatDate(seasonDates.endDate);

    return `${startFormatted} - ${endFormatted} (${seasonDates.durationDays} dni)`;
}

/**
 * Zwraca informację ile dni pozostało do końca aktualnego okresu liturgicznego
 */
export function getDaysUntilSeasonEnd(date: Date = new Date()): number {
    const seasonDates = getCurrentLiturgicalSeasonDates(date);
    const timeDiff = seasonDates.endDate.getTime() - date.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * Zwraca informację ile dni minęło od początku aktualnego okresu liturgicznego
 */
export function getDaysFromSeasonStart(date: Date = new Date()): number {
    const seasonDates = getCurrentLiturgicalSeasonDates(date);
    const timeDiff = date.getTime() - seasonDates.startDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
}

// ==================== FUNKCJE DLA ŚWIĄT ====================

/**
 * Zwraca wszystkie święta liturgiczne dla danego roku
 */
export function getAllLiturgicalFeasts(year: number): LiturgicalFeast[] {
    return generateLiturgicalFeasts(year);
}

/**
 * Zwraca święta dla danej daty
 */
export function getFeastsForDate(date: Date): LiturgicalFeast[] {
    const year = date.getFullYear();
    const allFeasts = generateLiturgicalFeasts(year);

    return allFeasts.filter(feast => isSameDay(feast.date, date));
}

/**
 * Zwraca święta maryjne dla danego roku
 */
export function getMarianFeasts(year: number): LiturgicalFeast[] {
    const allFeasts = generateLiturgicalFeasts(year);
    return allFeasts.filter(feast => feast.category === 'miriam');
}

/**
 * Zwraca święta Triduum Paschalnego dla danego roku
 */
export function getTriduum(year: number): LiturgicalFeast[] {
    const allFeasts = generateLiturgicalFeasts(year);
    return allFeasts.filter(feast => feast.category === 'triduum');
}

/**
 * Zwraca tylko uroczystości dla danego roku
 */
export function getSolemnities(year: number): LiturgicalFeast[] {
    const allFeasts = generateLiturgicalFeasts(year);
    return allFeasts.filter(feast => feast.rank === 'solemnity');
}

/**
 * Zwraca święta dla danego miesiąca
 */
export function getFeastsForMonth(year: number, month: number): LiturgicalFeast[] {
    const allFeasts = generateLiturgicalFeasts(year);
    return allFeasts.filter(feast => feast.date.getMonth() === month);
}

/**
 * Sprawdza czy dana data jest świętem liturgicznym
 */
export function isLiturgicalFeast(date: Date): boolean {
    const feasts = getFeastsForDate(date);
    return feasts.length > 0;
}

/**
 * Zwraca najważniejsze święto dla danej daty (o najwyższej randze)
 */
export function getPrimaryFeastForDate(date: Date): LiturgicalFeast | null {
    const feasts = getFeastsForDate(date);

    if (feasts.length === 0) return null;

    const rankOrder = ['solemnity', 'feast', 'memorial', 'optional-memorial', 'special'];

    return feasts.sort((a, b) => {
        return rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank);
    })[0];
}

/**
 * Zwraca następne nadchodzące święto
 */
export function getNextFeast(date: Date = new Date()): LiturgicalFeast | null {
    const year = date.getFullYear();
    const allFeasts = generateLiturgicalFeasts(year);

    const upcomingFeasts = allFeasts.filter(feast => feast.date > date);

    if (upcomingFeasts.length === 0) {
        const nextYearFeasts = generateLiturgicalFeasts(year + 1);
        return nextYearFeasts[0] || null;
    }

    return upcomingFeasts[0];
}

/**
 * Zwraca konfigurację kolorów dla danej kategorii święta
 */
export function getFeastColorConfig(category: FeastCategory): FeastColorConfig {
    return feastColorConfigs[category];
}

/**
 * Zwraca konfigurację kolorów dla danej rangi święta
 */
export function getFeastRankColorConfig(rank: 'solemnity' | 'feast' | 'memorial' | 'optional-memorial' | 'special'): FeastColorConfig {
    return feastRankConfigs[rank];
}

/**
 * Zwraca gradient dla święta (według kategorii)
 */
export function getFeastGradient(feast: LiturgicalFeast): string {
    return feastColorConfigs[feast.category].gradient;
}

/**
 * Zwraca gradient dla święta (według rangi)
 */
export function getFeastRankGradient(feast: LiturgicalFeast): string {
    return feastRankConfigs[feast.rank].gradient;
}

/**
 * Zwraca kolor tekstu dla święta (według kategorii)
 */
export function getFeastTextColor(feast: LiturgicalFeast): 'white' | 'dark' {
    return feastColorConfigs[feast.category].textColor;
}

/**
 * Zwraca kolor tekstu dla święta (według rangi)
 */
export function getFeastRankTextColor(feast: LiturgicalFeast): 'white' | 'dark' {
    return feastRankConfigs[feast.rank].textColor;
}

/**
 * Zwraca główny kolor dla święta (według kategorii)
 */
export function getFeastPrimaryColor(feast: LiturgicalFeast): string {
    return feastColorConfigs[feast.category].primaryColor;
}

/**
 * Zwraca główny kolor dla święta (według rangi)
 */
export function getFeastRankPrimaryColor(feast: LiturgicalFeast): string {
    return feastRankConfigs[feast.rank].primaryColor;
}

/**
 * Zwraca kompletną konfigurację kolorów dla świąt na daną datę
 */
export function getFeastColorsForDate(date: Date): Array<{ feast: LiturgicalFeast, colors: FeastColorConfig, rankColors: FeastColorConfig }> {
    const feasts = getFeastsForDate(date);

    return feasts.map(feast => ({
        feast,
        colors: getFeastColorConfig(feast.category),
        rankColors: getFeastRankColorConfig(feast.rank)
    }));
}

/**
 * Zwraca najważniejszy gradient dla danej daty (okres liturgiczny vs święta)
 */
export function getPrimaryGradientForDate(date: Date, preferFeast: boolean = true): string {
    const feasts = getFeastsForDate(date);

    if (preferFeast && feasts.length > 0) {
        const primaryFeast = getPrimaryFeastForDate(date);
        if (primaryFeast) {
            if (primaryFeast.rank === 'solemnity') {
                return getFeastRankGradient(primaryFeast);
            }
            return getFeastGradient(primaryFeast);
        }
    }

    return getCurrentLiturgicalGradient(date);
}

/**
 * Zwraca święta według kategorii
 */
export function getFeastsByCategory(year: number, category: FeastCategory): LiturgicalFeast[] {
    const allFeasts = generateLiturgicalFeasts(year);
    return allFeasts.filter(feast => feast.category === category);
}

/**
 * Zwraca mapę kolorów dla wszystkich kategorii świąt
 */
export function getAllFeastColorConfigs(): Record<FeastCategory, FeastColorConfig> {
    return feastColorConfigs;
}

/**
 * Zwraca mapę kolorów dla wszystkich rang świąt
 */
export function getAllFeastRankColorConfigs(): Record<string, FeastColorConfig> {
    return feastRankConfigs;
}
