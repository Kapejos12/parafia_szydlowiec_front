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
}// utils/liturgicalHelper.ts

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
        primaryColor: '#1976D2', // Niebieski maryjny
        secondaryColor: '#E3F2FD'
    },
    triduum: {
        gradient: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 25%, #F44336 75%, #B71C1C 100%)',
        textColor: 'white',
        primaryColor: '#B71C1C', // Czerwony liturgiczny
        secondaryColor: '#FFEBEE'
    },
    solemnity: {
        gradient: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 25%, #FF9800 75%, #E65100 100%)',
        textColor: 'white',
        primaryColor: '#E65100', // Złoty/pomarańczowy
        secondaryColor: '#FFF3E0'
    },
    feast: {
        gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 25%, #AB47BC 75%, #6A1B9A 100%)',
        textColor: 'white',
        primaryColor: '#6A1B9A', // Fioletowy
        secondaryColor: '#F3E5F5'
    },
    memorial: {
        gradient: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 25%, #66BB6A 75%, #2E7D32 100%)',
        textColor: 'white',
        primaryColor: '#2E7D32', // Zielony
        secondaryColor: '#E8F5E8'
    },
    'optional-memorial': {
        gradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 25%, #9E9E9E 75%, #424242 100%)',
        textColor: 'white',
        primaryColor: '#424242', // Szary
        secondaryColor: '#F5F5F5'
    },
    special: {
        gradient: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 25%, #E91E63 75%, #AD1457 100%)',
        textColor: 'white',
        primaryColor: '#AD1457', // Różowy
        secondaryColor: '#FCE4EC'
    }
};

// Konfiguracja kolorów dla rang świąt (alternatywna klasyfikacja)
const feastRankConfigs: Record<'solemnity' | 'feast' | 'memorial' | 'optional-memorial' | 'special', FeastColorConfig> = {
    solemnity: {
        gradient: 'linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 25%, #FFEB3B 75%, #F57F17 100%)',
        textColor: 'dark',
        primaryColor: '#F57F17', // Złoty dla uroczystości
        secondaryColor: '#FFFDE7'
    },
    feast: {
        gradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 25%, #FFC107 75%, #FF8F00 100%)',
        textColor: 'dark',
        primaryColor: '#FF8F00', // Pomarańczowy dla świąt
        secondaryColor: '#FFF8E1'
    },
    memorial: {
        gradient: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 25%, #8BC34A 75%, #558B2F 100%)',
        textColor: 'white',
        primaryColor: '#558B2F', // Zielony dla wspomnień
        secondaryColor: '#F1F8E9'
    },
    'optional-memorial': {
        gradient: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 25%, #BDBDBD 75%, #616161 100%)',
        textColor: 'white',
        primaryColor: '#616161', // Szary dla wspomnień fakultatywnych
        secondaryColor: '#FAFAFA'
    },
    special: {
        gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 25%, #9C27B0 75%, #4A148C 100%)',
        textColor: 'white',
        primaryColor: '#4A148C', // Fioletowy dla dni specjalnych
        secondaryColor: '#F3E5F5'
    }
};

/**
 * Oblicza datę Wielkanocy dla danego roku używając algorytmu Gaussa
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

    // Pierwszy Adwent (4 niedziele przed Bożym Narodzeniem)
    const christmas = new Date(year, 11, 25);
    const christmasDay = christmas.getDay();
    const daysToFirstAdvent = christmasDay === 0 ? 22 : (29 - christmasDay);
    const firstAdvent = new Date(year, 11, 25 - daysToFirstAdvent);

    // Chrzest Pański (pierwsza niedziela po 6 stycznia lub 6 stycznia jeśli to niedziela)
    const epiphany = new Date(year, 0, 6);
    const epiphanyDay = epiphany.getDay();
    const baptismOfLord = new Date(year, 0, epiphanyDay === 0 ? 6 : (13 - epiphanyDay));

    // Uroczystość Chrystusa Króla (ostatnia niedziela roku liturgicznego)
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
            name: 'Matki Bożej Gromnicznej',
            date: new Date(year, 1, 2),
            category: 'miriam',
            rank: 'feast',
            description: 'Ofiarowanie Pańskie',
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
            name: 'Matka Boska Fatimska',
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
            name: 'Świętego Józefa, Oblubieńca Najświętszej Maryi Panny',
            date: new Date(year, 2, 19),
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Świętego Józefa, Oblubieńca Najświętszej Maryi Panny',
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
            name: 'Przemienienie Pańskie',
            date: new Date(year, 7, 6),
            category: 'feast',
            rank: 'feast',
            description: 'Przemienienie Pańskie',
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
            name: 'Jezusa Chrystusa Króla Wszechświata',
            date: dates.christTheKing,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Jezus Chrystus Król Wszechświata',
            isMoveable: true
        },
        {
            name: 'Boże Narodzenie',
            date: dates.christmas,
            category: 'solemnity',
            rank: 'solemnity',
            description: 'Narodzenie Pańskie',
            isMoveable: false
        }
    );

    return feasts.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Określa aktualny okres liturgiczny na podstawie daty
 */
function determineLiturgicalSeason(date: Date): LiturgicalSeason {
    const year = date.getFullYear();
    const dates = calculateLiturgicalDates(year);

    // Sprawdź czy data mieści się w poszczególnych okresach
    if (date >= dates.firstAdvent && date < dates.christmas) {
        return 'advent';
    }

    if (date >= dates.christmas && date <= dates.baptismOfLord) {
        return 'christmas';
    }

    if (date > dates.baptismOfLord && date < dates.ashWednesday) {
        return 'ordinary-winter';
    }

    if (date >= dates.ashWednesday && date < dates.easter) {
        return 'lent';
    }

    if (date >= dates.easter && date <= dates.pentecost) {
        return 'easter';
    }

    if (date > dates.pentecost && date <= dates.christTheKing) {
        return 'ordinary-summer';
    }

    // Koniec roku liturgicznego - prawdopodobnie Adwent
    return 'advent';
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

    const seasons: LiturgicalSeasonDates[] = [
        {
            season: 'advent',
            name: 'Adwent',
            startDate: dates.firstAdvent,
            endDate: new Date(dates.christmas.getTime() - 24 * 60 * 60 * 1000), // dzień przed Bożym Narodzeniem
            durationDays: 0
        },
        {
            season: 'christmas',
            name: 'Okres Bożego Narodzenia',
            startDate: dates.christmas,
            endDate: dates.baptismOfLord,
            durationDays: 0
        },
        {
            season: 'ordinary-winter',
            name: 'Okres zwykły (zima)',
            startDate: new Date(dates.baptismOfLord.getTime() + 24 * 60 * 60 * 1000), // dzień po Chrzcie Pańskim
            endDate: new Date(dates.ashWednesday.getTime() - 24 * 60 * 60 * 1000), // dzień przed Środą Popielcową
            durationDays: 0
        },
        {
            season: 'lent',
            name: 'Wielki Post',
            startDate: dates.ashWednesday,
            endDate: new Date(dates.easter.getTime() - 24 * 60 * 60 * 1000), // dzień przed Wielkanocą
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
            startDate: new Date(dates.pentecost.getTime() + 24 * 60 * 60 * 1000), // dzień po Zielonych Świątkach
            endDate: dates.christTheKing,
            durationDays: 0
        }
    ];

    // Oblicz liczbę dni dla każdego okresu
    seasons.forEach(season => {
        const timeDiff = season.endDate.getTime() - season.startDate.getTime();
        season.durationDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 żeby uwzględnić dzień końcowy
    });

    return seasons;
}

/**
 * Zwraca daty rozpoczęcia i zakończenia aktualnego okresu liturgicznego
 */
export function getCurrentLiturgicalSeasonDates(date: Date = new Date()): LiturgicalSeasonDates {
    const year = date.getFullYear();
    const currentSeason = determineLiturgicalSeason(date);
    const allSeasons = getAllLiturgicalSeasonDates(year);

    const seasonInfo = allSeasons.find(s => s.season === currentSeason);

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
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 żeby pierwszy dzień był dniem 1, nie 0
}

// ==================== NOWE FUNKCJE DLA ŚWIĄT ====================

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

    return allFeasts.filter(feast => {
        return feast.date.toDateString() === date.toDateString();
    });
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

    // Hierarchia ważności
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
        // Jeśli nie ma więcej świąt w tym roku, sprawdź następny rok
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
            // Dla uroczystości używaj koloru rangi, dla pozostałych kategorii
            if (primaryFeast.rank === 'solemnity') {
                return getFeastRankGradient(primaryFeast);
            }
            return getFeastGradient(primaryFeast);
        }
    }

    // Fallback do gradientu okresu liturgicznego
    return getCurrentLiturgicalGradient(date);
}