export const translations = {
    en: {
        faqTitle: 'FAQ',
        faqItems: [
            {
                question: 'Which blood groups are compatible with mine?',
                answer: [
                    'For red blood cell donation, compatibility is mostly about ABO and RhD. O- is the universal red cell donor, while AB+ can receive red cells from every listed group.',
                    'Donor -> recipients: O- -> all groups; O+ -> O+, A+, B+, AB+; A- -> A-, A+, AB-, AB+; A+ -> A+, AB+; B- -> B-, B+, AB-, AB+; B+ -> B+, AB+; AB- -> AB-, AB+; AB+ -> AB+.',
                    'This is a simplified table. Before transfusion, blood is still tested and cross-matched by medical staff.'
                ]
            },
            {
                question: 'What are the contraindications to donating blood?',
                answer: [
                    'In Poland, a donor should usually be healthy, 18-65 years old and weigh at least 50 kg. Do not donate when you have cold symptoms, fever, active infection, feel unwell or are currently taking medication that may affect eligibility.',
                    'Temporary deferrals may apply after aspirin, dental procedures, antibiotics, tattoos, piercings, surgery, endoscopy, blood transfusion or risky exposure. Some conditions and infections can permanently disqualify a donor.',
                    'The final decision is always made by the qualifying medical staff at the blood donation center.'
                ]
            },
            {
                question: 'What are the limits and restrictions for blood donation?',
                answer: [
                    'Whole blood can be donated up to 4 times per year by women and up to 6 times per year by men, with at least 8 weeks between donations.',
                    'Plasma, platelets and red cell apheresis have separate limits and intervals. For example, platelet donations are usually limited to 12 times per year with at least 4 weeks between procedures.',
                    'Different donation types may affect the waiting time before the next donation, so the center should confirm the next eligible date.'
                ]
            },
            {
                question: 'How should I prepare for donation?',
                answer: [
                    'Sleep well, drink about 2 liters of fluids during the 24 hours before donation and eat a light, low-fat meal before arriving.',
                    'Bring a photo ID, avoid alcohol on the donation day and the day before, and limit smoking. Do not arrive after alcohol or psychoactive substances.',
                    'Choose a day when you can avoid rushing and heavy exercise after the donation.'
                ]
            },
            {
                question: 'What are the benefits of donating blood?',
                answer: [
                    'The most important benefit is real help for patients: blood cannot be manufactured, and one standard whole blood donation can help up to three people.',
                    'Donors can receive a regenerative meal, confirmation documents, reimbursement of travel costs under applicable rules, basic test information and, in Poland, tax relief for blood donation.',
                    'Regular donors may also receive honorary donor titles and related privileges after meeting statutory thresholds.'
                ]
            },
            {
                question: 'What are the myths about blood donation?',
                answer: [
                    'You do not need to know your blood type before your first donation; it can be determined during the process.',
                    'Donation does not make the body produce unnecessary extra blood forever and it does not create an obligation to donate again.',
                    'Blood donation is not paid work in the honorary system. The procedure uses disposable equipment and is designed to be safe for the donor and recipient.'
                ]
            },
            {
                question: 'I donated blood - what now?',
                answer: [
                    'Keep pressure on the puncture site for as long as instructed, keep the arm straight at the elbow and avoid carrying heavy items with that arm on the donation day.',
                    'Eat regularly, drink fluids, avoid intense exercise and hot or stuffy rooms. If you feel weak, tell someone nearby and lie down with your legs raised or sit with your head low.',
                    'If you develop illness symptoms within 48 hours after donation, contact the blood donation center. If a large bruise appears or symptoms worry you, contact a doctor.'
                ]
            }
        ],
        homeDonationPrompt: 'Donated blood? Tap the logo above!',
        homeBloodType: 'Blood type',
        homeTotalDonated: 'Total donated',
        homeNextDonation: 'Next eligible donation date',
        homeDonationHistory: 'Donation history',
        homeDonationHistoryEmpty: 'No donations saved yet.',
        homeNearbyCenters: 'Nearby blood donation centers',
        homeNearbyCentersEmpty: 'No centers to show yet.',
        homeMapUnavailable: 'Map preview requires a Google Maps SDK key in the Android build. Add EXPO_PUBLIC_GOOGLE_MAPS_API_KEY or reuse the Places key before building the APK.',
        homeYourLocation: 'Your location',
        homeAchievements: 'Achievements',
        homeNotProvided: 'N/A',
        showAllDonations: 'See all',
        showAllAchievements: 'See all',
        allDonationsTitle: 'All donations',
        allAchievementsTitle: 'All achievements',
        back: 'Back',
        donationFormTitle: 'New donation',
        donationFormIntro: 'Save the place and date of your donation. Bleedr will add 450 ml to your total and estimate the next eligible date.',
        donationPlace: 'Donation place',
        donationPlacePlaceholder: 'e.g. RCKiK Warsaw',
        donationPlaceFallback: 'Blood donation center',
        donationDate: 'Donation date',
        donationDatePlaceholder: 'YYYY-MM-DD',
        donationSave: 'Save donation',
        deleteDonation: 'Delete donation',
        deleteDonationConfirm: 'Do you want to delete this donation?',
        deleteDonationConfirmButton: 'Delete',
        deleteDonationCancelButton: 'Cancel',
        onboardingTitle: 'Welcome to Bleedr',
        onboardingSubtitle: 'Fill in your donor details now. You can leave fields empty and update them later in settings.',
        onboardingFinish: 'Save and start',
        settingsTitle: 'Settings',
        settingsPatientSection: 'Donor information',
        settingsPatientPrivacy: 'These details help Bleedr estimate donation eligibility, personalize reminders and show more useful context in the app. The data is optional, anonymous and stored only locally on this device. It is not sent to any server.',
        settingsPatientBloodType: 'Blood type',
        settingsPatientAge: 'Age',
        settingsPatientAgePlaceholder: 'e.g. 28',
        settingsPatientSex: 'Sex',
        settingsPatientSexFemale: 'Female',
        settingsPatientSexMale: 'Male',
        settingsPatientWeight: 'Body weight (kg)',
        settingsPatientWeightPlaceholder: 'e.g. 72',
        settingsPatientCity: 'City',
        settingsPatientCityPlaceholder: 'e.g. Warsaw',
        settingsPatientPreferredCenter: 'Preferred donation center',
        settingsPatientPreferredCenterPlaceholder: 'e.g. RCKiK Warsaw',
        settingsNotificationsSection: 'Notifications',
        settingsNotificationWeekBefore: 'One week before eligibility',
        settingsNotificationDayBefore: 'One day before eligibility',
        settingsNotificationOnDate: 'On the eligible donation day',
        settingsAppSection: 'App settings',
        settingsTheme: 'Theme',
        settingsThemeDark: 'Dark',
        settingsThemeLight: 'Light',
        settingsLanguage: 'Language',
        settingsDeleteAllData: 'Delete all saved data',
        settingsDeleteAllDataConfirm: 'Are you sure you want to delete all saved data from this device?',
        settingsDeleteConfirm: 'Delete',
        settingsDeleteCancel: 'Cancel',
        notificationReminderTitle: 'Bleedr',
        notificationReminderWeekBody: 'You can donate blood again in one week. Eligible date: {date}.',
        notificationReminderDayBody: 'You can donate blood again tomorrow. Eligible date: {date}.',
        notificationReminderTodayBody: 'You can donate blood again today.',
        achievementUnlockedLabel: 'Achievement unlocked',
        achievementFirstDonationName: 'First time?',
        achievementFirstDonationDescription: 'Donate blood at least once.',
        achievementFirstDonationMessage: 'You managed to donate blood for the first time.',
        achievementCompleteDonorInfoName: 'Brave patient',
        achievementCompleteDonorInfoDescription: 'Fill in all donor information.',
        achievementCompleteDonorInfoMessage: 'You managed to fill in all donor information.',
        achievementMeritBronzeName: 'Meritorious Honorary Blood Donor, 3rd class',
        achievementMeritSilverName: 'Meritorious Honorary Blood Donor, 2nd class',
        achievementMeritGoldName: 'Meritorious Honorary Blood Donor, 1st class',
        achievementMeritDescription: 'Donate at least {liters} of blood.',
        achievementMeritMessage: 'You managed to donate at least {liters} of blood.',
        achievementNationalHealthName: 'For Merit to the Health of the Nation',
        achievementNationalHealthDescription: 'Donate at least 20 l of blood.',
        achievementNationalHealthMessage: 'You managed to donate at least 20 l of blood.',
        achievementWandererName: 'Globetrotter',
        achievementWandererDescription: 'Donate blood in two centers in two different cities.',
        achievementWandererMessage: 'You managed to donate blood in two centers in two different cities.',
        achievementQuickReturnName: 'Speedster',
        achievementQuickReturnDescription: 'Donate blood within no more than 60 days from your previous donation.',
        achievementQuickReturnMessage: 'You managed to donate blood within no more than 60 days from your previous donation.',
        achievementEducatedName: 'Well-read',
        achievementEducatedDescription: 'Read all information in the FAQ section.',
        achievementEducatedMessage: 'You managed to read all information in the FAQ section.',
        achievementThreeDropsName: 'Three drops',
        achievementThreeDropsDescription: 'Donate blood at least 3 times.',
        achievementThreeDropsMessage: 'You managed to donate blood at least 3 times.',
        achievementLoyalCenterName: 'Regular visitor',
        achievementLoyalCenterDescription: 'Donate blood at least 3 times in the same center.',
        achievementLoyalCenterMessage: 'You managed to donate blood at least 3 times in the same center.',
        achievementGoodYearName: 'A good year',
        achievementGoodYearDescription: 'Donate blood at least 3 times within 12 months.',
        achievementGoodYearMessage: 'You managed to donate blood at least 3 times within 12 months.',
        achievementVeteranName: 'Needle veteran',
        achievementVeteranDescription: 'Donate blood at least {donations} times.',
        achievementVeteranMessage: 'You managed to donate blood at least {donations} times.',
        placesStatus: {
            idle: 'Map will show nearby centers after Google Places and location are available.',
            ready: 'Nearby centers loaded from Google Places.',
            'missing-api-key': 'Add EXPO_PUBLIC_GOOGLE_PLACES_API_KEY to enable Google Places results.',
            'location-denied': 'Location permission was not granted, so nearby centers cannot be loaded.',
            error: 'Could not load Google Places results.'
        },
        tabFaq: 'FAQ',
        tabHome: 'Home',
        tabSettings: 'Settings'
    },
    pl: {
        faqTitle: 'FAQ',
        faqItems: [
            {
                question: 'Z jakimi grupami krwi kompatybilna jest moja grupa?',
                answer: [
                    'Dla przetaczania krwinek czerwonych najczęściej patrzy się na układ ABO i RhD. 0- jest uniwersalnym dawcą krwinek czerwonych, a AB+ może przyjąć krwinki czerwone od każdej z wymienionych grup.',
                    'Dawca -> biorcy: 0- -> wszystkie grupy; 0+ -> 0+, A+, B+, AB+; A- -> A-, A+, AB-, AB+; A+ -> A+, AB+; B- -> B-, B+, AB-, AB+; B+ -> B+, AB+; AB- -> AB-, AB+; AB+ -> AB+.',
                    'To uproszczona tabela. Przed przetoczeniem personel medyczny i tak wykonuje badania zgodności oraz próbę krzyżową.'
                ]
            },
            {
                question: 'Jakie są przeciwwskazania do oddania krwi?',
                answer: [
                    'W Polsce dawcą zwykle może być osoba zdrowa, w wieku 18-65 lat i o masie ciała co najmniej 50 kg. Nie zgłaszaj się z objawami infekcji, gorączką, złym samopoczuciem ani podczas przyjmowania leków, które mogą wpływać na kwalifikację.',
                    'Czasowa dyskwalifikacja może dotyczyć m.in. przyjęcia aspiryny, zabiegów stomatologicznych, antybiotyków, tatuażu, piercingu, operacji, endoskopii, przetoczenia krwi lub ryzykownej ekspozycji. Część chorób i zakażeń może wykluczać oddawanie krwi na stałe.',
                    'Ostateczną decyzję zawsze podejmuje osoba kwalifikująca w punkcie krwiodawstwa.'
                ]
            },
            {
                question: 'Jakie są limity i restrykcje oddawania krwi?',
                answer: [
                    'Krew pełną można oddać maksymalnie 4 razy w roku w przypadku kobiet i 6 razy w roku w przypadku mężczyzn, z przerwą co najmniej 8 tygodni między donacjami.',
                    'Osocze, płytki krwi i koncentrat krwinek czerwonych mają osobne limity oraz odstępy. Przykładowo płytki krwi oddaje się zwykle maksymalnie 12 razy w roku, z przerwą co najmniej 4 tygodni.',
                    'Różne typy donacji mogą wpływać na termin kolejnego oddania, dlatego konkretną datę najlepiej potwierdzić w centrum krwiodawstwa.'
                ]
            },
            {
                question: 'Jak przygotować się do donacji?',
                answer: [
                    'Wyśpij się, wypij około 2 litrów płynów w ciągu doby przed donacją i zjedz lekki, niskotłuszczowy posiłek przed przyjściem.',
                    'Weź dokument tożsamości ze zdjęciem, nie pij alkoholu w dniu oddania ani dzień wcześniej i ogranicz palenie. Nie zgłaszaj się po alkoholu ani innych substancjach psychoaktywnych.',
                    'Zaplanuj dzień tak, aby po oddaniu krwi uniknąć pośpiechu, dużego wysiłku i dźwigania.'
                ]
            },
            {
                question: 'Jakie są benefity oddawania krwi?',
                answer: [
                    'Najważniejszy benefit to realna pomoc pacjentom: krwi nie da się wyprodukować, a jedna standardowa donacja krwi pełnej może pomóc nawet trzem osobom.',
                    'Dawcy przysługuje m.in. posiłek regeneracyjny, zaświadczenia, zwrot kosztów przejazdu według obowiązujących zasad, dostęp do podstawowych informacji o badaniach oraz możliwość skorzystania z ulgi podatkowej.',
                    'Regularni dawcy mogą też uzyskać tytuły honorowe i związane z nimi uprawnienia po osiągnięciu ustawowych progów.'
                ]
            },
            {
                question: 'Jakie są mity na temat krwiodawstwa?',
                answer: [
                    'Nie musisz znać swojej grupy krwi przed pierwszą donacją; może zostać oznaczona w trakcie procedury.',
                    'Oddanie krwi nie sprawia, że organizm zaczyna produkować niepotrzebny nadmiar krwi na stałe i nie zobowiązuje do kolejnych donacji.',
                    'Honorowe krwiodawstwo nie jest płatną pracą. Procedura wykorzystuje sprzęt jednorazowy i jest zaprojektowana tak, aby była bezpieczna dla dawcy oraz biorcy.'
                ]
            },
            {
                question: 'Oddałem krew - co dalej?',
                answer: [
                    'Uciskaj miejsce wkłucia tak długo, jak zaleci personel, trzymaj rękę wyprostowaną w łokciu i w dniu donacji nie noś ciężkich rzeczy ręką, z której pobrano krew.',
                    'Jedz regularnie, pij płyny, unikaj intensywnego wysiłku oraz gorących i dusznych miejsc. Jeśli poczujesz osłabienie, powiedz komuś obok i połóż się z nogami wyżej albo usiądź z głową nisko.',
                    'Jeżeli w ciągu 48 godzin pojawią się objawy chorobowe, skontaktuj się z centrum krwiodawstwa. Przy dużym krwiaku lub niepokojących objawach skonsultuj się z lekarzem.'
                ]
            }
        ],
        homeDonationPrompt: 'Oddałeś krew? Dotknij logo u góry!',
        homeBloodType: 'Grupa krwi',
        homeTotalDonated: 'Oddano łącznie',
        homeNextDonation: 'Najbliższy możliwy termin oddania krwi',
        homeDonationHistory: 'Historia donacji',
        homeDonationHistoryEmpty: 'Nie zapisano jeszcze żadnej donacji.',
        homeNearbyCenters: 'Centra krwiodawstwa w pobliżu',
        homeNearbyCentersEmpty: 'Brak centrów do wyświetlenia.',
        homeMapUnavailable: 'Podgląd mapy wymaga klucza Google Maps SDK w buildzie Androida. Dodaj EXPO_PUBLIC_GOOGLE_MAPS_API_KEY albo użyj tego samego klucza co dla Places przed zbudowaniem APK.',
        homeYourLocation: 'Twoja lokalizacja',
        homeAchievements: 'Osiągnięcia',
        homeNotProvided: 'B/D',
        showAllDonations: 'Zobacz wszystkie',
        showAllAchievements: 'Zobacz wszystkie',
        allDonationsTitle: 'Wszystkie donacje',
        allAchievementsTitle: 'Wszystkie osiągnięcia',
        back: 'Wróć',
        donationFormTitle: 'Nowa donacja',
        donationFormIntro: 'Zapisz miejsce i datę donacji. Bleedr doda 450 ml do Twojego wyniku i wyliczy najbliższy możliwy termin kolejnego oddania.',
        donationPlace: 'Miejsce donacji',
        donationPlacePlaceholder: 'np. RCKiK Warszawa',
        donationPlaceFallback: 'Centrum krwiodawstwa',
        donationDate: 'Data donacji',
        donationDatePlaceholder: 'RRRR-MM-DD',
        donationSave: 'Zapisz donację',
        deleteDonation: 'Usuń donację',
        deleteDonationConfirm: 'Czy chcesz usunąć tę donację?',
        deleteDonationConfirmButton: 'Usuń',
        deleteDonationCancelButton: 'Anuluj',
        onboardingTitle: 'Witaj w Bleedr',
        onboardingSubtitle: 'Uzupełnij dane dawcy. Możesz zostawić pola puste i wrócić do nich później w ustawieniach.',
        onboardingFinish: 'Zapisz i rozpocznij',
        settingsTitle: 'Ustawienia',
        settingsPatientSection: 'Informacje o dawcy',
        settingsPatientPrivacy: 'Te dane pomagają Bleedr szacować możliwość oddania krwi, personalizować przypomnienia i pokazywać bardziej użyteczny kontekst w aplikacji. Ich podanie jest dobrowolne i anonimowe. Dane są przechowywane wyłącznie lokalnie na twoim urządzeniu i nie są wysyłane na żaden serwer.',
        settingsPatientBloodType: 'Grupa krwi',
        settingsPatientAge: 'Wiek',
        settingsPatientAgePlaceholder: 'np. 28',
        settingsPatientSex: 'Płeć',
        settingsPatientSexFemale: 'Kobieta',
        settingsPatientSexMale: 'Mężczyzna',
        settingsPatientWeight: 'Masa ciała (kg)',
        settingsPatientWeightPlaceholder: 'np. 72',
        settingsPatientCity: 'Miasto',
        settingsPatientCityPlaceholder: 'np. Warszawa',
        settingsPatientPreferredCenter: 'Preferowane centrum krwiodawstwa',
        settingsPatientPreferredCenterPlaceholder: 'np. RCKiK Warszawa',
        settingsNotificationsSection: 'Powiadomienia',
        settingsNotificationWeekBefore: 'Tydzień przed możliwą donacją',
        settingsNotificationDayBefore: 'Dzień przed możliwą donacją',
        settingsNotificationOnDate: 'W dniu możliwej donacji',
        settingsAppSection: 'Ustawienia aplikacji',
        settingsTheme: 'Motyw',
        settingsThemeDark: 'Ciemny',
        settingsThemeLight: 'Jasny',
        settingsLanguage: 'Język',
        settingsDeleteAllData: 'Usuń wszystkie zapisane dane',
        settingsDeleteAllDataConfirm: 'Czy na pewno chcesz usunąć wszystkie zapisane dane z tego urządzenia?',
        settingsDeleteConfirm: 'Usuń',
        settingsDeleteCancel: 'Anuluj',
        notificationReminderTitle: 'Bleedr',
        notificationReminderWeekBody: 'Za tydzień możesz ponownie oddać krew. Najbliższy termin: {date}.',
        notificationReminderDayBody: 'Jutro możesz ponownie oddać krew. Najbliższy termin: {date}.',
        notificationReminderTodayBody: 'Dziś możesz ponownie oddać krew.',
        achievementUnlockedLabel: 'Odblokowano osiągnięcie',
        achievementFirstDonationName: 'Pierwszy raz?',
        achievementFirstDonationDescription: 'Oddaj krew co najmniej raz.',
        achievementFirstDonationMessage: 'Udało ci się oddać krew po raz pierwszy.',
        achievementCompleteDonorInfoName: 'Dzielny pacjent',
        achievementCompleteDonorInfoDescription: 'Uzupełnij wszystkie informacje na swój temat.',
        achievementCompleteDonorInfoMessage: 'Udało ci się uzupełnić wszystkie informacje na swój temat.',
        achievementMeritBronzeName: 'Zasłużony Honorowy Dawca Krwi III stopnia',
        achievementMeritSilverName: 'Zasłużony Honorowy Dawca Krwi II stopnia',
        achievementMeritGoldName: 'Zasłużony Honorowy Dawca Krwi I stopnia',
        achievementMeritDescription: 'Oddaj co najmniej {liters} krwi.',
        achievementMeritMessage: 'Udało ci się oddać co najmniej {liters} krwi.',
        achievementNationalHealthName: 'Zasłużony dla Zdrowia Narodu',
        achievementNationalHealthDescription: 'Oddaj co najmniej 20 l krwi.',
        achievementNationalHealthMessage: 'Udało ci się oddać co najmniej 20 l krwi.',
        achievementWandererName: 'Obieżyświat',
        achievementWandererDescription: 'Oddaj krew w dwóch oddziałach w dwóch różnych miastach.',
        achievementWandererMessage: 'Udało ci się oddać krew w dwóch oddziałach w dwóch różnych miastach.',
        achievementQuickReturnName: 'Szybcior',
        achievementQuickReturnDescription: 'Oddaj krew w przeciągu maksymalnie 60 dni od ostatniej donacji.',
        achievementQuickReturnMessage: 'Udało ci się oddać krew w przeciągu maksymalnie 60 dni od ostatniej donacji.',
        achievementEducatedName: 'Dokształcony',
        achievementEducatedDescription: 'Przeczytaj wszystkie informacje w sekcji FAQ.',
        achievementEducatedMessage: 'Udało ci się przeczytać wszystkie informacje w sekcji FAQ.',
        achievementThreeDropsName: 'Trzy krople',
        achievementThreeDropsDescription: 'Oddaj krew co najmniej 3 razy.',
        achievementThreeDropsMessage: 'Udało ci się oddać krew co najmniej 3 razy.',
        achievementLoyalCenterName: 'Stały bywalec',
        achievementLoyalCenterDescription: 'Oddaj krew co najmniej 3 razy w tym samym centrum.',
        achievementLoyalCenterMessage: 'Udało ci się oddać krew co najmniej 3 razy w tym samym centrum.',
        achievementGoodYearName: 'Dobry rok',
        achievementGoodYearDescription: 'Oddaj krew co najmniej 3 razy w ciągu 12 miesięcy.',
        achievementGoodYearMessage: 'Udało ci się oddać krew co najmniej 3 razy w ciągu 12 miesięcy.',
        achievementVeteranName: 'Weteran igły',
        achievementVeteranDescription: 'Oddaj krew co najmniej {donations} razy.',
        achievementVeteranMessage: 'Udało ci się oddać krew co najmniej {donations} razy.',
        placesStatus: {
            idle: 'Mapa pokaże pobliskie centra, gdy Google Places i lokalizacja będą dostępne.',
            ready: 'Pobliskie centra wczytane z Google Places:',
            'missing-api-key': 'Dodaj EXPO_PUBLIC_GOOGLE_PLACES_API_KEY, aby włączyć wyniki Google Places.',
            'location-denied': 'Nie przyznano dostępu do lokalizacji, więc nie można wczytać pobliskich centrów.',
            error: 'Nie udało się wczytać wyników Google Places.'
        },
        tabFaq: 'FAQ',
        tabHome: 'Panel',
        tabSettings: 'Ustawienia'
    }
}
