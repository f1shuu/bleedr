export const translations = {
    en: {
        faqTitle: 'FAQ',
        faqItems: [
            {
                question: 'Blood group compatibility table',
                answer: [
                    'For red blood cell donation, compatibility is mostly about ABO and RhD. O- is the universal red cell donor, while AB+ can receive red cells from every listed group.',
                    'Donor -> recipients: O- -> all groups; O+ -> O+, A+, B+, AB+; A- -> A-, A+, AB-, AB+; A+ -> A+, AB+; B- -> B-, B+, AB-, AB+; B+ -> B+, AB+; AB- -> AB-, AB+; AB+ -> AB+.',
                    'This is a simplified table. Before transfusion, blood is still tested and cross-matched by medical staff.'
                ]
            },
            {
                question: 'Contraindications to donating blood',
                answer: [
                    'In Poland, a donor should usually be healthy, 18-65 years old and weigh at least 50 kg. Do not donate when you have cold symptoms, fever, active infection, feel unwell or are currently taking medication that may affect eligibility.',
                    'Temporary deferrals may apply after aspirin, dental procedures, antibiotics, tattoos, piercings, surgery, endoscopy, blood transfusion or risky exposure. Some conditions and infections can permanently disqualify a donor.',
                    'The final decision is always made by the qualifying medical staff at the blood donation center.'
                ]
            },
            {
                question: 'Blood donation limits and restrictions',
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
                question: 'Benefits of donating blood',
                answer: [
                    'The most important benefit is real help for patients: blood cannot be manufactured, and one standard whole blood donation can help up to three people.',
                    'Donors can receive a regenerative meal, confirmation documents, reimbursement of travel costs under applicable rules, basic test information and, in Poland, tax relief for blood donation.',
                    'Regular donors may also receive honorary donor titles and related privileges after meeting statutory thresholds.'
                ]
            },
            {
                question: 'Blood donation myths',
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
        homeGreetings: [
            'Good to see you, donor.',
            'Every donation counts.',
            'Track your impact with Bleedr.',
            'Ready for your next good deed?',
            'Your blood can mean another chance.'
        ],
        homeGreetingFallback: 'Welcome back.',
        homeBloodType: 'Blood type',
        homeTotalDonated: 'Total donated',
        homeNextDonation: 'Next eligible date',
        homeDonationHistory: 'Donation history',
        homeNearbyCenters: 'Nearby blood donation centers',
        homeYourLocation: 'Your location',
        homeNotProvided: 'N/A',
        showAllDonations: 'See all',
        allDonationsTitle: 'All donations',
        back: 'Back',
        settingsTitle: 'Settings',
        settingsPatientSection: 'Patient information',
        settingsPatientPrivacy: 'These details help Bleedr estimate donation eligibility, personalize reminders and show more useful context in the app. The data is optional, anonymous and stored only locally on this device. It is not sent to any server.',
        settingsPatientBloodType: 'Blood type',
        settingsPatientAge: 'Age',
        settingsPatientAgePlaceholder: 'e.g. 28',
        settingsPatientSex: 'Sex',
        settingsPatientSexFemale: 'Female',
        settingsPatientSexMale: 'Male',
        settingsPatientSexOther: 'Other',
        settingsPatientWeight: 'Body weight (kg)',
        settingsPatientWeightPlaceholder: 'e.g. 72',
        settingsPatientCity: 'City',
        settingsPatientCityPlaceholder: 'e.g. Warsaw',
        settingsPatientPreferredCenter: 'Preferred donation center',
        settingsPatientPreferredCenterPlaceholder: 'e.g. RCKiK Warsaw',
        settingsAppSection: 'App settings',
        settingsTheme: 'Theme',
        settingsThemeDark: 'Dark',
        settingsThemeLight: 'Light',
        settingsLanguage: 'Language',
        settingsDeleteAllData: 'Delete all saved data',
        settingsDeleteAllDataConfirm: 'Are you sure you want to delete all saved data from this device?',
        settingsDeleteConfirm: 'Delete',
        settingsDeleteCancel: 'Cancel',
        placesStatus: {
            idle: 'Map uses sample centers until your location and Google Places are available.',
            ready: 'Nearby centers loaded from Google Places.',
            'missing-api-key': 'Add EXPO_PUBLIC_GOOGLE_PLACES_API_KEY to enable Google Places results. Showing sample centers for now.',
            'location-denied': 'Location permission was not granted. Showing sample centers for now.',
            error: 'Could not load Google Places results. Showing sample centers for now.'
        },
        tabFaq: 'FAQ',
        tabHome: 'Home',
        tabSettings: 'Settings'
    },
    pl: {
        faqTitle: 'FAQ',
        faqItems: [
            {
                question: 'Tabela kompatybilności grup krwi',
                answer: [
                    'Dla przetaczania krwinek czerwonych najczęściej patrzy się na układ ABO i RhD. 0- jest uniwersalnym dawcą krwinek czerwonych, a AB+ może przyjąć krwinki czerwone od każdej z wymienionych grup.',
                    'Dawca -> biorcy: 0- -> wszystkie grupy; 0+ -> 0+, A+, B+, AB+; A- -> A-, A+, AB-, AB+; A+ -> A+, AB+; B- -> B-, B+, AB-, AB+; B+ -> B+, AB+; AB- -> AB-, AB+; AB+ -> AB+.',
                    'To uproszczona tabela. Przed przetoczeniem personel medyczny i tak wykonuje badania zgodności oraz próbę krzyżową.'
                ]
            },
            {
                question: 'Przeciwwskazania do oddania krwi',
                answer: [
                    'W Polsce dawcą zwykle może być osoba zdrowa, w wieku 18-65 lat i o masie ciała co najmniej 50 kg. Nie zgłaszaj się z objawami infekcji, gorączką, złym samopoczuciem ani podczas przyjmowania leków, które mogą wpływać na kwalifikację.',
                    'Czasowa dyskwalifikacja może dotyczyć m.in. przyjęcia aspiryny, zabiegów stomatologicznych, antybiotyków, tatuażu, piercingu, operacji, endoskopii, przetoczenia krwi lub ryzykownej ekspozycji. Część chorób i zakażeń może wykluczać oddawanie krwi na stałe.',
                    'Ostateczną decyzję zawsze podejmuje osoba kwalifikująca w punkcie krwiodawstwa.'
                ]
            },
            {
                question: 'Oddawanie krwi - limity i restrykcje',
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
                question: 'Benefity oddawania krwi',
                answer: [
                    'Najważniejszy benefit to realna pomoc pacjentom: krwi nie da się wyprodukować, a jedna standardowa donacja krwi pełnej może pomóc nawet trzem osobom.',
                    'Dawcy przysługuje m.in. posiłek regeneracyjny, zaświadczenia, zwrot kosztów przejazdu według obowiązujących zasad, dostęp do podstawowych informacji o badaniach oraz możliwość skorzystania z ulgi podatkowej.',
                    'Regularni dawcy mogą też uzyskać tytuły honorowe i związane z nimi uprawnienia po osiągnięciu ustawowych progów.'
                ]
            },
            {
                question: 'Mity na temat krwiodawstwa',
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
        homeGreetings: [
            'Dobrze Cię widzieć, dawco.',
            'Każda donacja ma znaczenie.',
            'Śledź swój wpływ z Bleedr.',
            'Gotów na kolejny dobry gest?',
            'Twoja krew może dać komuś kolejną szansę.'
        ],
        homeGreetingFallback: 'Witaj ponownie.',
        homeBloodType: 'Grupa krwi',
        homeTotalDonated: 'Oddano łącznie',
        homeNextDonation: 'Najbliższy możliwy termin',
        homeDonationHistory: 'Historia donacji',
        homeNearbyCenters: 'Centra krwiodawstwa w pobliżu',
        homeYourLocation: 'Twoja lokalizacja',
        homeNotProvided: 'B/D',
        showAllDonations: 'Zobacz wszystkie',
        allDonationsTitle: 'Wszystkie donacje',
        back: 'Wróć',
        settingsTitle: 'Ustawienia',
        settingsPatientSection: 'Informacje o pacjencie',
        settingsPatientPrivacy: 'Te dane pomagają Bleedr szacować możliwość oddania krwi, personalizować przypomnienia i pokazywać bardziej użyteczny kontekst w aplikacji. Podanie danych jest dobrowolne, anonimowe i są one przechowywane wyłącznie lokalnie na tym urządzeniu. Nie są wysyłane na żaden serwer.',
        settingsPatientBloodType: 'Grupa krwi',
        settingsPatientAge: 'Wiek',
        settingsPatientAgePlaceholder: 'np. 28',
        settingsPatientSex: 'Płeć',
        settingsPatientSexFemale: 'Kobieta',
        settingsPatientSexMale: 'Mężczyzna',
        settingsPatientSexOther: 'Inna',
        settingsPatientWeight: 'Masa ciała (kg)',
        settingsPatientWeightPlaceholder: 'np. 72',
        settingsPatientCity: 'Miasto',
        settingsPatientCityPlaceholder: 'np. Warszawa',
        settingsPatientPreferredCenter: 'Preferowane centrum krwiodawstwa',
        settingsPatientPreferredCenterPlaceholder: 'np. RCKiK Warszawa',
        settingsAppSection: 'Ustawienia aplikacji',
        settingsTheme: 'Motyw',
        settingsThemeDark: 'Ciemny',
        settingsThemeLight: 'Jasny',
        settingsLanguage: 'Język',
        settingsDeleteAllData: 'Usuń wszystkie zapisane dane',
        settingsDeleteAllDataConfirm: 'Czy na pewno chcesz usunąć wszystkie zapisane dane z tego urządzenia?',
        settingsDeleteConfirm: 'Usuń',
        settingsDeleteCancel: 'Anuluj',
        placesStatus: {
            idle: 'Mapa pokazuje przykładowe centra, dopóki lokalizacja i Google Places nie będą dostępne.',
            ready: 'Pobliskie centra wczytane z Google Places.',
            'missing-api-key': 'Dodaj EXPO_PUBLIC_GOOGLE_PLACES_API_KEY, aby włączyć wyniki Google Places. Na razie pokazuję przykładowe centra.',
            'location-denied': 'Nie przyznano dostępu do lokalizacji. Na razie pokazuję przykładowe centra.',
            error: 'Nie udało się wczytać wyników Google Places. Na razie pokazuję przykładowe centra.'
        },
        tabFaq: 'FAQ',
        tabHome: 'Panel',
        tabSettings: 'Ustawienia'
    }
}
