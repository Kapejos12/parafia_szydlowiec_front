// utils/liturgicalHelper.ts

// Typy dla okresów liturgicznych
export type LiturgicalSeason =
    | 'advent'
    | 'christmas'
    | 'ordinary-winter'
    | 'lent'
    | 'easter'
    | 'ordinary-summer';

// Interfejs dla konfiguracji okresu
export interface LiturgicalSeasonInfo {
    season: LiturgicalSeason;
    name: string;
    gradient: string;
    textColor: 'white' | 'dark';
}

// Konfiguracja gradientów dla każdego okresu
const seasonConfigs: Record<LiturgicalSeason, Omit<LiturgicalSeasonInfo, 'season'>> = {
    advent: {
        name: 'Adwent',
        gradient: 'linear-gradient(135deg, #4A148C 0%, #7B1FA2 50%, #9C27B0 100%)',
        textColor: 'white'
    },
    christmas: {
        name: 'Okres Bożego Narodzenia',
        gradient: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 50%, #E8EAF6 100%)',
        textColor: 'dark'
    },
    'ordinary-winter': {
        name: 'Okres zwykły',
        gradient: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #43A047 100%)',
        textColor: 'white'
    },
    lent: {
        name: 'Wielki Post',
        gradient: 'linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #7B1FA2 100%)',
        textColor: 'white'
    },
    easter: {
        name: 'Okres Wielkanocny',
        gradient: 'linear-gradient(135deg, #FAFAFA 0%, #FFF9C4 25%, #FFEB3B 75%, #FFC107 100%)',
        textColor: 'dark'
    },
    'ordinary-summer': {
        name: 'Okres zwykły',
        gradient: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #43A047 100%)',
        textColor: 'white'
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

    return {
        easter,
        ashWednesday,
        pentecost,
        firstAdvent,
        christmas,
        baptismOfLord,
        christTheKing
    };
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