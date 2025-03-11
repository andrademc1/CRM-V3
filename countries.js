
// Lista de países com informações geográficas e bandeiras
const countries = [
  {
    name: "Afeganistão",
    code: "AF",
    continent: "Ásia",
    flag: "🇦🇫",
    capital: "Cabul",
    languages: ["Dari", "Pashto"],
    currency: "Afegani"
  },
  {
    name: "Albânia",
    code: "AL",
    continent: "Europa",
    flag: "🇦🇱",
    capital: "Tirana",
    languages: ["Albanês"],
    currency: "Lek"
  },
  {
    name: "Argélia",
    code: "DZ",
    continent: "África",
    flag: "🇩🇿",
    capital: "Argel",
    languages: ["Árabe", "Berbere", "Francês"],
    currency: "Dinar argelino"
  },
  {
    name: "Andorra",
    code: "AD",
    continent: "Europa",
    flag: "🇦🇩",
    capital: "Andorra la Vella",
    languages: ["Catalão"],
    currency: "Euro"
  },
  {
    name: "Angola",
    code: "AO",
    continent: "África",
    flag: "🇦🇴",
    capital: "Luanda",
    languages: ["Português"],
    currency: "Kwanza"
  },
  {
    name: "Argentina",
    code: "AR",
    continent: "América do Sul",
    flag: "🇦🇷",
    capital: "Buenos Aires",
    languages: ["Espanhol"],
    currency: "Peso argentino"
  },
  {
    name: "Armênia",
    code: "AM",
    continent: "Ásia",
    flag: "🇦🇲",
    capital: "Yerevan",
    languages: ["Armênio"],
    currency: "Dram armênio"
  },
  {
    name: "Austrália",
    code: "AU",
    continent: "Oceania",
    flag: "🇦🇺",
    capital: "Camberra",
    languages: ["Inglês"],
    currency: "Dólar australiano"
  },
  {
    name: "Áustria",
    code: "AT",
    continent: "Europa",
    flag: "🇦🇹",
    capital: "Viena",
    languages: ["Alemão"],
    currency: "Euro"
  },
  {
    name: "Azerbaijão",
    code: "AZ",
    continent: "Ásia",
    flag: "🇦🇿",
    capital: "Baku",
    languages: ["Azerbaijano"],
    currency: "Manat azerbaijano"
  },
  {
    name: "Bahamas",
    code: "BS",
    continent: "América do Norte",
    flag: "🇧🇸",
    capital: "Nassau",
    languages: ["Inglês"],
    currency: "Dólar bahamense"
  },
  {
    name: "Bahrein",
    code: "BH",
    continent: "Ásia",
    flag: "🇧🇭",
    capital: "Manama",
    languages: ["Árabe"],
    currency: "Dinar bareinita"
  },
  {
    name: "Bangladesh",
    code: "BD",
    continent: "Ásia",
    flag: "🇧🇩",
    capital: "Dhaka",
    languages: ["Bengali"],
    currency: "Taka"
  },
  {
    name: "Barbados",
    code: "BB",
    continent: "América do Norte",
    flag: "🇧🇧",
    capital: "Bridgetown",
    languages: ["Inglês"],
    currency: "Dólar de Barbados"
  },
  {
    name: "Bielorrússia",
    code: "BY",
    continent: "Europa",
    flag: "🇧🇾",
    capital: "Minsk",
    languages: ["Bielorrusso", "Russo"],
    currency: "Rublo bielorrusso"
  },
  {
    name: "Bélgica",
    code: "BE",
    continent: "Europa",
    flag: "🇧🇪",
    capital: "Bruxelas",
    languages: ["Holandês", "Francês", "Alemão"],
    currency: "Euro"
  },
  {
    name: "Belize",
    code: "BZ",
    continent: "América do Norte",
    flag: "🇧🇿",
    capital: "Belmopan",
    languages: ["Inglês"],
    currency: "Dólar de Belize"
  },
  {
    name: "Benin",
    code: "BJ",
    continent: "África",
    flag: "🇧🇯",
    capital: "Porto-Novo",
    languages: ["Francês"],
    currency: "Franco CFA ocidental"
  },
  {
    name: "Butão",
    code: "BT",
    continent: "Ásia",
    flag: "🇧🇹",
    capital: "Thimphu",
    languages: ["Dzongkha"],
    currency: "Ngultrum"
  },
  {
    name: "Bolívia",
    code: "BO",
    continent: "América do Sul",
    flag: "🇧🇴",
    capital: "Sucre",
    languages: ["Espanhol", "Quíchua", "Aimará"],
    currency: "Boliviano"
  },
  {
    name: "Bósnia e Herzegovina",
    code: "BA",
    continent: "Europa",
    flag: "🇧🇦",
    capital: "Sarajevo",
    languages: ["Bósnio", "Croata", "Sérvio"],
    currency: "Marco conversível"
  },
  {
    name: "Botswana",
    code: "BW",
    continent: "África",
    flag: "🇧🇼",
    capital: "Gaborone",
    languages: ["Inglês", "Tswana"],
    currency: "Pula"
  },
  {
    name: "Brasil",
    code: "BR",
    continent: "América do Sul",
    flag: "🇧🇷",
    capital: "Brasília",
    languages: ["Português"],
    currency: "Real"
  },
  {
    name: "Brunei",
    code: "BN",
    continent: "Ásia",
    flag: "🇧🇳",
    capital: "Bandar Seri Begawan",
    languages: ["Malaio"],
    currency: "Dólar de Brunei"
  },
  {
    name: "Bulgária",
    code: "BG",
    continent: "Europa",
    flag: "🇧🇬",
    capital: "Sófia",
    languages: ["Búlgaro"],
    currency: "Lev búlgaro"
  },
  {
    name: "Burkina Faso",
    code: "BF",
    continent: "África",
    flag: "🇧🇫",
    capital: "Ouagadougou",
    languages: ["Francês"],
    currency: "Franco CFA ocidental"
  },
  {
    name: "Burundi",
    code: "BI",
    continent: "África",
    flag: "🇧🇮",
    capital: "Bujumbura",
    languages: ["Kirundi", "Francês"],
    currency: "Franco burundiano"
  },
  {
    name: "Camboja",
    code: "KH",
    continent: "Ásia",
    flag: "🇰🇭",
    capital: "Phnom Penh",
    languages: ["Khmer"],
    currency: "Riel"
  },
  {
    name: "Camarões",
    code: "CM",
    continent: "África",
    flag: "🇨🇲",
    capital: "Yaoundé",
    languages: ["Francês", "Inglês"],
    currency: "Franco CFA central"
  },
  {
    name: "Canadá",
    code: "CA",
    continent: "América do Norte",
    flag: "🇨🇦",
    capital: "Ottawa",
    languages: ["Inglês", "Francês"],
    currency: "Dólar canadense"
  },
  {
    name: "Cabo Verde",
    code: "CV",
    continent: "África",
    flag: "🇨🇻",
    capital: "Praia",
    languages: ["Português"],
    currency: "Escudo cabo-verdiano"
  },
  {
    name: "República Centro-Africana",
    code: "CF",
    continent: "África",
    flag: "🇨🇫",
    capital: "Bangui",
    languages: ["Francês", "Sango"],
    currency: "Franco CFA central"
  },
  {
    name: "Chade",
    code: "TD",
    continent: "África",
    flag: "🇹🇩",
    capital: "N'Djamena",
    languages: ["Francês", "Árabe"],
    currency: "Franco CFA central"
  },
  {
    name: "Chile",
    code: "CL",
    continent: "América do Sul",
    flag: "🇨🇱",
    capital: "Santiago",
    languages: ["Espanhol"],
    currency: "Peso chileno"
  },
  {
    name: "China",
    code: "CN",
    continent: "Ásia",
    flag: "🇨🇳",
    capital: "Pequim",
    languages: ["Mandarim"],
    currency: "Renminbi"
  },
  {
    name: "Colômbia",
    code: "CO",
    continent: "América do Sul",
    flag: "🇨🇴",
    capital: "Bogotá",
    languages: ["Espanhol"],
    currency: "Peso colombiano"
  },
  {
    name: "Comores",
    code: "KM",
    continent: "África",
    flag: "🇰🇲",
    capital: "Moroni",
    languages: ["Árabe", "Francês", "Comoriano"],
    currency: "Franco comoriano"
  },
  {
    name: "República do Congo",
    code: "CG",
    continent: "África",
    flag: "🇨🇬",
    capital: "Brazzaville",
    languages: ["Francês"],
    currency: "Franco CFA central"
  },
  {
    name: "Costa Rica",
    code: "CR",
    continent: "América do Norte",
    flag: "🇨🇷",
    capital: "San José",
    languages: ["Espanhol"],
    currency: "Colón costa-riquenho"
  },
  {
    name: "Croácia",
    code: "HR",
    continent: "Europa",
    flag: "🇭🇷",
    capital: "Zagreb",
    languages: ["Croata"],
    currency: "Euro"
  },
  {
    name: "Cuba",
    code: "CU",
    continent: "América do Norte",
    flag: "🇨🇺",
    capital: "Havana",
    languages: ["Espanhol"],
    currency: "Peso cubano"
  },
  {
    name: "Chipre",
    code: "CY",
    continent: "Europa",
    flag: "🇨🇾",
    capital: "Nicósia",
    languages: ["Grego", "Turco"],
    currency: "Euro"
  },
  {
    name: "República Tcheca",
    code: "CZ",
    continent: "Europa",
    flag: "🇨🇿",
    capital: "Praga",
    languages: ["Tcheco"],
    currency: "Coroa tcheca"
  },
  {
    name: "Dinamarca",
    code: "DK",
    continent: "Europa",
    flag: "🇩🇰",
    capital: "Copenhague",
    languages: ["Dinamarquês"],
    currency: "Coroa dinamarquesa"
  },
  {
    name: "Djibouti",
    code: "DJ",
    continent: "África",
    flag: "🇩🇯",
    capital: "Djibouti",
    languages: ["Francês", "Árabe"],
    currency: "Franco djibutiano"
  },
  {
    name: "Dominica",
    code: "DM",
    continent: "América do Norte",
    flag: "🇩🇲",
    capital: "Roseau",
    languages: ["Inglês"],
    currency: "Dólar do Caribe Oriental"
  },
  {
    name: "República Dominicana",
    code: "DO",
    continent: "América do Norte",
    flag: "🇩🇴",
    capital: "Santo Domingo",
    languages: ["Espanhol"],
    currency: "Peso dominicano"
  },
  {
    name: "Equador",
    code: "EC",
    continent: "América do Sul",
    flag: "🇪🇨",
    capital: "Quito",
    languages: ["Espanhol"],
    currency: "Dólar americano"
  },
  {
    name: "Egito",
    code: "EG",
    continent: "África",
    flag: "🇪🇬",
    capital: "Cairo",
    languages: ["Árabe"],
    currency: "Libra egípcia"
  },
  {
    name: "El Salvador",
    code: "SV",
    continent: "América do Norte",
    flag: "🇸🇻",
    capital: "San Salvador",
    languages: ["Espanhol"],
    currency: "Dólar americano"
  },
  {
    name: "Guiné Equatorial",
    code: "GQ",
    continent: "África",
    flag: "🇬🇶",
    capital: "Malabo",
    languages: ["Espanhol", "Francês", "Português"],
    currency: "Franco CFA central"
  },
  {
    name: "Eritreia",
    code: "ER",
    continent: "África",
    flag: "🇪🇷",
    capital: "Asmara",
    languages: ["Tigrínia"],
    currency: "Nakfa"
  },
  {
    name: "Estônia",
    code: "EE",
    continent: "Europa",
    flag: "🇪🇪",
    capital: "Tallinn",
    languages: ["Estoniano"],
    currency: "Euro"
  },
  {
    name: "Etiópia",
    code: "ET",
    continent: "África",
    flag: "🇪🇹",
    capital: "Addis Ababa",
    languages: ["Amárico"],
    currency: "Birr etíope"
  },
  {
    name: "Fiji",
    code: "FJ",
    continent: "Oceania",
    flag: "🇫🇯",
    capital: "Suva",
    languages: ["Inglês", "Fijiano", "Hindi"],
    currency: "Dólar fijiano"
  },
  {
    name: "Finlândia",
    code: "FI",
    continent: "Europa",
    flag: "🇫🇮",
    capital: "Helsinki",
    languages: ["Finlandês", "Sueco"],
    currency: "Euro"
  },
  {
    name: "França",
    code: "FR",
    continent: "Europa",
    flag: "🇫🇷",
    capital: "Paris",
    languages: ["Francês"],
    currency: "Euro"
  },
  {
    name: "Gabão",
    code: "GA",
    continent: "África",
    flag: "🇬🇦",
    capital: "Libreville",
    languages: ["Francês"],
    currency: "Franco CFA central"
  },
  {
    name: "Gâmbia",
    code: "GM",
    continent: "África",
    flag: "🇬🇲",
    capital: "Banjul",
    languages: ["Inglês"],
    currency: "Dalasi"
  },
  {
    name: "Geórgia",
    code: "GE",
    continent: "Ásia",
    flag: "🇬🇪",
    capital: "Tbilisi",
    languages: ["Georgiano"],
    currency: "Lari"
  },
  {
    name: "Alemanha",
    code: "DE",
    continent: "Europa",
    flag: "🇩🇪",
    capital: "Berlim",
    languages: ["Alemão"],
    currency: "Euro"
  },
  {
    name: "Gana",
    code: "GH",
    continent: "África",
    flag: "🇬🇭",
    capital: "Accra",
    languages: ["Inglês"],
    currency: "Cedi"
  },
  {
    name: "Grécia",
    code: "GR",
    continent: "Europa",
    flag: "🇬🇷",
    capital: "Atenas",
    languages: ["Grego"],
    currency: "Euro"
  },
  {
    name: "Granada",
    code: "GD",
    continent: "América do Norte",
    flag: "🇬🇩",
    capital: "St. George's",
    languages: ["Inglês"],
    currency: "Dólar do Caribe Oriental"
  },
  {
    name: "Guatemala",
    code: "GT",
    continent: "América do Norte",
    flag: "🇬🇹",
    capital: "Cidade da Guatemala",
    languages: ["Espanhol"],
    currency: "Quetzal"
  },
  {
    name: "Guiné",
    code: "GN",
    continent: "África",
    flag: "🇬🇳",
    capital: "Conakry",
    languages: ["Francês"],
    currency: "Franco guineano"
  },
  {
    name: "Guiné-Bissau",
    code: "GW",
    continent: "África",
    flag: "🇬🇼",
    capital: "Bissau",
    languages: ["Português"],
    currency: "Franco CFA ocidental"
  },
  {
    name: "Guiana",
    code: "GY",
    continent: "América do Sul",
    flag: "🇬🇾",
    capital: "Georgetown",
    languages: ["Inglês"],
    currency: "Dólar guianense"
  },
  {
    name: "Haiti",
    code: "HT",
    continent: "América do Norte",
    flag: "🇭🇹",
    capital: "Port-au-Prince",
    languages: ["Francês", "Crioulo haitiano"],
    currency: "Gourde"
  },
  {
    name: "Honduras",
    code: "HN",
    continent: "América do Norte",
    flag: "🇭🇳",
    capital: "Tegucigalpa",
    languages: ["Espanhol"],
    currency: "Lempira"
  },
  {
    name: "Hungria",
    code: "HU",
    continent: "Europa",
    flag: "🇭🇺",
    capital: "Budapeste",
    languages: ["Húngaro"],
    currency: "Forint"
  },
  {
    name: "Islândia",
    code: "IS",
    continent: "Europa",
    flag: "🇮🇸",
    capital: "Reykjavik",
    languages: ["Islandês"],
    currency: "Coroa islandesa"
  },
  {
    name: "Índia",
    code: "IN",
    continent: "Ásia",
    flag: "🇮🇳",
    capital: "Nova Delhi",
    languages: ["Hindi", "Inglês"],
    currency: "Rupia indiana"
  },
  {
    name: "Indonésia",
    code: "ID",
    continent: "Ásia",
    flag: "🇮🇩",
    capital: "Jacarta",
    languages: ["Indonésio"],
    currency: "Rupia indonésia"
  },
  {
    name: "Irã",
    code: "IR",
    continent: "Ásia",
    flag: "🇮🇷",
    capital: "Teerã",
    languages: ["Persa"],
    currency: "Rial iraniano"
  },
  {
    name: "Iraque",
    code: "IQ",
    continent: "Ásia",
    flag: "🇮🇶",
    capital: "Bagdá",
    languages: ["Árabe", "Curdo"],
    currency: "Dinar iraquiano"
  },
  {
    name: "Irlanda",
    code: "IE",
    continent: "Europa",
    flag: "🇮🇪",
    capital: "Dublin",
    languages: ["Inglês", "Irlandês"],
    currency: "Euro"
  },
  {
    name: "Israel",
    code: "IL",
    continent: "Ásia",
    flag: "🇮🇱",
    capital: "Jerusalém",
    languages: ["Hebraico", "Árabe"],
    currency: "Novo shekel israelense"
  },
  {
    name: "Itália",
    code: "IT",
    continent: "Europa",
    flag: "🇮🇹",
    capital: "Roma",
    languages: ["Italiano"],
    currency: "Euro"
  },
  {
    name: "Jamaica",
    code: "JM",
    continent: "América do Norte",
    flag: "🇯🇲",
    capital: "Kingston",
    languages: ["Inglês"],
    currency: "Dólar jamaicano"
  },
  {
    name: "Japão",
    code: "JP",
    continent: "Ásia",
    flag: "🇯🇵",
    capital: "Tóquio",
    languages: ["Japonês"],
    currency: "Iene"
  },
  {
    name: "Jordânia",
    code: "JO",
    continent: "Ásia",
    flag: "🇯🇴",
    capital: "Amã",
    languages: ["Árabe"],
    currency: "Dinar jordaniano"
  },
  {
    name: "Cazaquistão",
    code: "KZ",
    continent: "Ásia",
    flag: "🇰🇿",
    capital: "Astana",
    languages: ["Cazaque", "Russo"],
    currency: "Tenge"
  },
  {
    name: "Quênia",
    code: "KE",
    continent: "África",
    flag: "🇰🇪",
    capital: "Nairobi",
    languages: ["Inglês", "Suaíli"],
    currency: "Xelim queniano"
  },
  {
    name: "Kiribati",
    code: "KI",
    continent: "Oceania",
    flag: "🇰🇮",
    capital: "Tarawa",
    languages: ["Inglês", "Gilbertês"],
    currency: "Dólar australiano"
  },
  {
    name: "Coreia do Norte",
    code: "KP",
    continent: "Ásia",
    flag: "🇰🇵",
    capital: "Pyongyang",
    languages: ["Coreano"],
    currency: "Won norte-coreano"
  },
  {
    name: "Coreia do Sul",
    code: "KR",
    continent: "Ásia",
    flag: "🇰🇷",
    capital: "Seul",
    languages: ["Coreano"],
    currency: "Won sul-coreano"
  },
  {
    name: "Kuwait",
    code: "KW",
    continent: "Ásia",
    flag: "🇰🇼",
    capital: "Kuwait City",
    languages: ["Árabe"],
    currency: "Dinar kuwaitiano"
  },
  {
    name: "Quirguistão",
    code: "KG",
    continent: "Ásia",
    flag: "🇰🇬",
    capital: "Bishkek",
    languages: ["Quirguiz", "Russo"],
    currency: "Som"
  },
  {
    name: "Laos",
    code: "LA",
    continent: "Ásia",
    flag: "🇱🇦",
    capital: "Vientiane",
    languages: ["Lao"],
    currency: "Kip"
  },
  {
    name: "Letônia",
    code: "LV",
    continent: "Europa",
    flag: "🇱🇻",
    capital: "Riga",
    languages: ["Letão"],
    currency: "Euro"
  },
  {
    name: "Líbano",
    code: "LB",
    continent: "Ásia",
    flag: "🇱🇧",
    capital: "Beirute",
    languages: ["Árabe", "Francês"],
    currency: "Libra libanesa"
  },
  {
    name: "Lesoto",
    code: "LS",
    continent: "África",
    flag: "🇱🇸",
    capital: "Maseru",
    languages: ["Inglês", "Sesotho"],
    currency: "Loti"
  },
  {
    name: "Libéria",
    code: "LR",
    continent: "África",
    flag: "🇱🇷",
    capital: "Monróvia",
    languages: ["Inglês"],
    currency: "Dólar liberiano"
  },
  {
    name: "Líbia",
    code: "LY",
    continent: "África",
    flag: "🇱🇾",
    capital: "Tripoli",
    languages: ["Árabe"],
    currency: "Dinar líbio"
  },
  {
    name: "Liechtenstein",
    code: "LI",
    continent: "Europa",
    flag: "🇱🇮",
    capital: "Vaduz",
    languages: ["Alemão"],
    currency: "Franco suíço"
  },
  {
    name: "Lituânia",
    code: "LT",
    continent: "Europa",
    flag: "🇱🇹",
    capital: "Vilnius",
    languages: ["Lituano"],
    currency: "Euro"
  },
  {
    name: "Luxemburgo",
    code: "LU",
    continent: "Europa",
    flag: "🇱🇺",
    capital: "Luxemburgo",
    languages: ["Francês", "Alemão", "Luxemburguês"],
    currency: "Euro"
  },
  {
    name: "Macedônia do Norte",
    code: "MK",
    continent: "Europa",
    flag: "🇲🇰",
    capital: "Skopje",
    languages: ["Macedônio"],
    currency: "Denar"
  },
  {
    name: "Madagascar",
    code: "MG",
    continent: "África",
    flag: "🇲🇬",
    capital: "Antananarivo",
    languages: ["Francês", "Malgaxe"],
    currency: "Ariary"
  },
  {
    name: "Malawi",
    code: "MW",
    continent: "África",
    flag: "🇲🇼",
    capital: "Lilongwe",
    languages: ["Inglês", "Chichewa"],
    currency: "Kwacha malauiana"
  },
  {
    name: "Malásia",
    code: "MY",
    continent: "Ásia",
    flag: "🇲🇾",
    capital: "Kuala Lumpur",
    languages: ["Malaio"],
    currency: "Ringgit"
  },
  {
    name: "Maldivas",
    code: "MV",
    continent: "Ásia",
    flag: "🇲🇻",
    capital: "Malé",
    languages: ["Divehi"],
    currency: "Rufiyaa"
  },
  {
    name: "Mali",
    code: "ML",
    continent: "África",
    flag: "🇲🇱",
    capital: "Bamako",
    languages: ["Francês"],
    currency: "Franco CFA ocidental"
  },
  {
    name: "Malta",
    code: "MT",
    continent: "Europa",
    flag: "🇲🇹",
    capital: "Valletta",
    languages: ["Maltês", "Inglês"],
    currency: "Euro"
  },
  {
    name: "Ilhas Marshall",
    code: "MH",
    continent: "Oceania",
    flag: "🇲🇭",
    capital: "Majuro",
    languages: ["Inglês", "Marshallês"],
    currency: "Dólar americano"
  },
  {
    name: "Mauritânia",
    code: "MR",
    continent: "África",
    flag: "🇲🇷",
    capital: "Nouakchott",
    languages: ["Árabe"],
    currency: "Ouguiya"
  },
  {
    name: "Maurício",
    code: "MU",
    continent: "África",
    flag: "🇲🇺",
    capital: "Port Louis",
    languages: ["Inglês", "Francês", "Crioulo mauriciano"],
    currency: "Rupia mauriciana"
  },
  {
    name: "México",
    code: "MX",
    continent: "América do Norte",
    flag: "🇲🇽",
    capital: "Cidade do México",
    languages: ["Espanhol"],
    currency: "Peso mexicano"
  },
  {
    name: "Micronésia",
    code: "FM",
    continent: "Oceania",
    flag: "🇫🇲",
    capital: "Palikir",
    languages: ["Inglês"],
    currency: "Dólar americano"
  },
  {
    name: "Moldávia",
    code: "MD",
    continent: "Europa",
    flag: "🇲🇩",
    capital: "Chisinau",
    languages: ["Romeno"],
    currency: "Leu moldavo"
  },
  {
    name: "Mônaco",
    code: "MC",
    continent: "Europa",
    flag: "🇲🇨",
    capital: "Mônaco",
    languages: ["Francês"],
    currency: "Euro"
  },
  {
    name: "Mongólia",
    code: "MN",
    continent: "Ásia",
    flag: "🇲🇳",
    capital: "Ulaanbaatar",
    languages: ["Mongol"],
    currency: "Tugrik"
  },
  {
    name: "Montenegro",
    code: "ME",
    continent: "Europa",
    flag: "🇲🇪",
    capital: "Podgorica",
    languages: ["Montenegrino"],
    currency: "Euro"
  },
  {
    name: "Marrocos",
    code: "MA",
    continent: "África",
    flag: "🇲🇦",
    capital: "Rabat",
    languages: ["Árabe", "Berbere"],
    currency: "Dirham marroquino"
  },
  {
    name: "Moçambique",
    code: "MZ",
    continent: "África",
    flag: "🇲🇿",
    capital: "Maputo",
    languages: ["Português"],
    currency: "Metical"
  },
  {
    name: "Myanmar",
    code: "MM",
    continent: "Ásia",
    flag: "🇲🇲",
    capital: "Naypyidaw",
    languages: ["Birmanês"],
    currency: "Kyat"
  },
  {
    name: "Namíbia",
    code: "NA",
    continent: "África",
    flag: "🇳🇦",
    capital: "Windhoek",
    languages: ["Inglês", "Afrikaans"],
    currency: "Dólar namibiano"
  },
  {
    name: "Nauru",
    code: "NR",
    continent: "Oceania",
    flag: "🇳🇷",
    capital: "Yaren",
    languages: ["Inglês", "Nauruano"],
    currency: "Dólar australiano"
  },
  {
    name: "Nepal",
    code: "NP",
    continent: "Ásia",
    flag: "🇳🇵",
    capital: "Kathmandu",
    languages: ["Nepali"],
    currency: "Rupia nepalesa"
  },
  {
    name: "Países Baixos",
    code: "NL",
    continent: "Europa",
    flag: "🇳🇱",
    capital: "Amsterdã",
    languages: ["Holandês"],
    currency: "Euro"
  },
  {
    name: "Nova Zelândia",
    code: "NZ",
    continent: "Oceania",
    flag: "🇳🇿",
    capital: "Wellington",
    languages: ["Inglês", "Maori"],
    currency: "Dólar neozelandês"
  },
  {
    name: "Nicarágua",
    code: "NI",
    continent: "América do Norte",
    flag: "🇳🇮",
    capital: "Manágua",
    languages: ["Espanhol"],
    currency: "Córdoba oro"
  },
  {
    name: "Níger",
    code: "NE",
    continent: "África",
    flag: "🇳🇪",
    capital: "Niamey",
    languages: ["Francês"],
    currency: "Franco CFA ocidental"
  },
  {
    name: "Nigéria",
    code: "NG",
    continent: "África",
    flag: "🇳🇬",
    capital: "Abuja",
    languages: ["Inglês"],
    currency: "Naira"
  },
  {
    name: "Noruega",
    code: "NO",
    continent: "Europa",
    flag: "🇳🇴",
    capital: "Oslo",
    languages: ["Norueguês"],
    currency: "Coroa norueguesa"
  },
  {
    name: "Omã",
    code: "OM",
    continent: "Ásia",
    flag: "🇴🇲",
    capital: "Muscat",
    languages: ["Árabe"],
    currency: "Rial omanense"
  },
  {
    name: "Paquistão",
    code: "PK",
    continent: "Ásia",
    flag: "🇵🇰",
    capital: "Islamabad",
    languages: ["Urdu", "Inglês"],
    currency: "Rupia paquistanesa"
  },
  {
    name: "Palau",
    code: "PW",
    continent: "Oceania",
    flag: "🇵🇼",
    capital: "Ngerulmud",
    languages: ["Inglês", "Palauano"],
    currency: "Dólar americano"
  },
  {
    name: "Palestina",
    code: "PS",
    continent: "Ásia",
    flag: "🇵🇸",
    capital: "Jerusalém Oriental",
    languages: ["Árabe"],
    currency: "Novo shekel israelense"
  },
  {
    name: "Panamá",
    code: "PA",
    continent: "América do Norte",
    flag: "🇵🇦",
    capital: "Cidade do Panamá",
    languages: ["Espanhol"],
    currency: "Balboa"
  },
  {
    name: "Papua-Nova Guiné",
    code: "PG",
    continent: "Oceania",
    flag: "🇵🇬",
    capital: "Port Moresby",
    languages: ["Inglês", "Tok Pisin", "Hiri Motu"],
    currency: "Kina"
  },
  {
    name: "Paraguai",
    code: "PY",
    continent: "América do Sul",
    flag: "🇵🇾",
    capital: "Assunção",
    languages: ["Espanhol", "Guarani"],
    currency: "Guarani"
  },
  {
    name: "Peru",
    code: "PE",
    continent: "América do Sul",
    flag: "🇵🇪",
    capital: "Lima",
    languages: ["Espanhol", "Quíchua", "Aimará"],
    currency: "Sol"
  },
  {
    name: "Filipinas",
    code: "PH",
    continent: "Ásia",
    flag: "🇵🇭",
    capital: "Manila",
    languages: ["Filipino", "Inglês"],
    currency: "Peso filipino"
  },
  {
    name: "Polônia",
    code: "PL",
    continent: "Europa",
    flag: "🇵🇱",
    capital: "Varsóvia",
    languages: ["Polonês"],
    currency: "Złoty"
  },
  {
    name: "Portugal",
    code: "PT",
    continent: "Europa",
    flag: "🇵🇹",
    capital: "Lisboa",
    languages: ["Português"],
    currency: "Euro"
  },
  {
    name: "Catar",
    code: "QA",
    continent: "Ásia",
    flag: "🇶🇦",
    capital: "Doha",
    languages: ["Árabe"],
    currency: "Rial catariano"
  },
  {
    name: "Romênia",
    code: "RO",
    continent: "Europa",
    flag: "🇷🇴",
    capital: "Bucareste",
    languages: ["Romeno"],
    currency: "Leu romeno"
  },
  {
    name: "Rússia",
    code: "RU",
    continent: "Europa",
    flag: "🇷🇺",
    capital: "Moscou",
    languages: ["Russo"],
    currency: "Rublo russo"
  },
  {
    name: "Ruanda",
    code: "RW",
    continent: "África",
    flag: "🇷🇼",
    capital: "Kigali",
    languages: ["Kinyarwanda", "Inglês", "Francês"],
    currency: "Franco ruandês"
  },
  {
    name: "São Cristóvão e Névis",
    code: "KN",
    continent: "América do Norte",
    flag: "🇰🇳",
    capital: "Basseterre",
    languages: ["Inglês"],
    currency: "Dólar do Caribe Oriental"
  },
  {
    name: "Santa Lúcia",
    code: "LC",
    continent: "América do Norte",
    flag: "🇱🇨",
    capital: "Castries",
    languages: ["Inglês"],
    currency: "Dólar do Caribe Oriental"
  },
  {
    name: "São Vicente e Granadinas",
    code: "VC",
    continent: "América do Norte",
    flag: "🇻🇨",
    capital: "Kingstown",
    languages: ["Inglês"],
    currency: "Dólar do Caribe Oriental"
  },
  {
    name: "Samoa",
    code: "WS",
    continent: "Oceania",
    flag: "🇼🇸",
    capital: "Apia",
    languages: ["Samoano", "Inglês"],
    currency: "Tala"
  },
  {
    name: "São Marinho",
    code: "SM",
    continent: "Europa",
    flag: "🇸🇲",
    capital: "San Marino",
    languages: ["Italiano"],
    currency: "Euro"
  },
  {
    name: "São Tomé e Príncipe",
    code: "ST",
    continent: "África",
    flag: "🇸🇹",
    capital: "São Tomé",
    languages: ["Português"],
    currency: "Dobra"
  },
  {
    name: "Arábia Saudita",
    code: "SA",
    continent: "Ásia",
    flag: "🇸🇦",
    capital: "Riade",
    languages: ["Árabe"],
    currency: "Riyal saudita"
  },
  {
    name: "Senegal",
    code: "SN",
    continent: "África",
    flag: "🇸🇳",
    capital: "Dakar",
    languages: ["Francês"],
    currency: "Franco CFA ocidental"
  },
  {
    name: "Sérvia",
    code: "RS",
    continent: "Europa",
    flag: "🇷🇸",
    capital: "Belgrado",
    languages: ["Sérvio"],
    currency: "Dinar sérvio"
  },
  {
    name: "Seychelles",
    code: "SC",
    continent: "África",
    flag: "🇸🇨",
    capital: "Victoria",
    languages: ["Francês", "Inglês", "Crioulo seichelense"],
    currency: "Rupia seichelense"
  },
  {
    name: "Serra Leoa",
    code: "SL",
    continent: "África",
    flag: "🇸🇱",
    capital: "Freetown",
    languages: ["Inglês"],
    currency: "Leone"
  },
  {
    name: "Singapura",
    code: "SG",
    continent: "Ásia",
    flag: "🇸🇬",
    capital: "Singapura",
    languages: ["Inglês", "Malaio", "Mandarim", "Tâmil"],
    currency: "Dólar singapuriano"
  },
  {
    name: "Eslováquia",
    code: "SK",
    continent: "Europa",
    flag: "🇸🇰",
    capital: "Bratislava",
    languages: ["Eslovaco"],
    currency: "Euro"
  },
  {
    name: "Eslovênia",
    code: "SI",
    continent: "Europa",
    flag: "🇸🇮",
    capital: "Ljubljana",
    languages: ["Esloveno"],
    currency: "Euro"
  },
  {
    name: "Ilhas Salomão",
    code: "SB",
    continent: "Oceania",
    flag: "🇸🇧",
    capital: "Honiara",
    languages: ["Inglês"],
    currency: "Dólar das Ilhas Salomão"
  },
  {
    name: "Somália",
    code: "SO",
    continent: "África",
    flag: "🇸🇴",
    capital: "Mogadíscio",
    languages: ["Somali", "Árabe"],
    currency: "Xelim somali"
  },
  {
    name: "África do Sul",
    code: "ZA",
    continent: "África",
    flag: "🇿🇦",
    capital: "Pretória",
    languages: ["Africâner", "Inglês", "Zulu", "Xhosa", "Swati", "Ndebele", "Sotho do Sul", "Sotho do Norte", "Tsonga", "Tswana", "Venda"],
    currency: "Rand"
  },
  {
    name: "Sudão do Sul",
    code: "SS",
    continent: "África",
    flag: "🇸🇸",
    capital: "Juba",
    languages: ["Inglês"],
    currency: "Libra sul-sudanesa"
  },
  {
    name: "Espanha",
    code: "ES",
    continent: "Europa",
    flag: "🇪🇸",
    capital: "Madri",
    languages: ["Espanhol"],
    currency: "Euro"
  },
  {
    name: "Sri Lanka",
    code: "LK",
    continent: "Ásia",
    flag: "🇱🇰",
    capital: "Sri Jayawardenepura Kotte",
    languages: ["Cingalês", "Tâmil"],
    currency: "Rupia cingalesa"
  },
  {
    name: "Sudão",
    code: "SD",
    continent: "África",
    flag: "🇸🇩",
    capital: "Cartum",
    languages: ["Árabe", "Inglês"],
    currency: "Libra sudanesa"
  },
  {
    name: "Suriname",
    code: "SR",
    continent: "América do Sul",
    flag: "🇸🇷",
    capital: "Paramaribo",
    languages: ["Holandês"],
    currency: "Dólar surinamês"
  },
  {
    name: "Suazilândia",
    code: "SZ",
    continent: "África",
    flag: "🇸🇿",
    capital: "Mbabane",
    languages: ["Inglês", "Swati"],
    currency: "Lilangeni"
  },
  {
    name: "Suécia",
    code: "SE",
    continent: "Europa",
    flag: "🇸🇪",
    capital: "Estocolmo",
    languages: ["Sueco"],
    currency: "Coroa sueca"
  },
  {
    name: "Suíça",
    code: "CH",
    continent: "Europa",
    flag: "🇨🇭",
    capital: "Berna",
    languages: ["Alemão", "Francês", "Italiano", "Romanche"],
    currency: "Franco suíço"
  },
  {
    name: "Síria",
    code: "SY",
    continent: "Ásia",
    flag: "🇸🇾",
    capital: "Damasco",
    languages: ["Árabe"],
    currency: "Libra síria"
  },
  {
    name: "Tajiquistão",
    code: "TJ",
    continent: "Ásia",
    flag: "🇹🇯",
    capital: "Dushanbe",
    languages: ["Tajique", "Russo"],
    currency: "Somoni"
  },
  {
    name: "Tanzânia",
    code: "TZ",
    continent: "África",
    flag: "🇹🇿",
    capital: "Dodoma",
    languages: ["Suaíli", "Inglês"],
    currency: "Xelim tanzaniano"
  },
  {
    name: "Tailândia",
    code: "TH",
    continent: "Ásia",
    flag: "🇹🇭",
    capital: "Bangkok",
    languages: ["Tailandês"],
    currency: "Baht"
  },
  {
    name: "Timor-Leste",
    code: "TL",
    continent: "Ásia",
    flag: "🇹🇱",
    capital: "Díli",
    languages: ["Português", "Tetum"],
    currency: "Dólar americano"
  },
  {
    name: "Togo",
    code: "TG",
    continent: "África",
    flag: "🇹🇬",
    capital: "Lomé",
    languages: ["Francês"],
    currency: "Franco CFA ocidental"
  },
  {
    name: "Tonga",
    code: "TO",
    continent: "Oceania",
    flag: "🇹🇴",
    capital: "Nuku'alofa",
    languages: ["Inglês", "Tonganês"],
    currency: "Paʻanga"
  },
  {
    name: "Trinidad e Tobago",
    code: "TT",
    continent: "América do Norte",
    flag: "🇹🇹",
    capital: "Port of Spain",
    languages: ["Inglês"],
    currency: "Dólar de Trinidad e Tobago"
  },
  {
    name: "Tunísia",
    code: "TN",
    continent: "África",
    flag: "🇹🇳",
    capital: "Tunis",
    languages: ["Árabe"],
    currency: "Dinar tunisiano"
  },
  {
    name: "Turquia",
    code: "TR",
    continent: "Ásia",
    flag: "🇹🇷",
    capital: "Ancara",
    languages: ["Turco"],
    currency: "Lira turca"
  },
  {
    name: "Turcomenistão",
    code: "TM",
    continent: "Ásia",
    flag: "🇹🇲",
    capital: "Ashgabat",
    languages: ["Turcomeno", "Russo"],
    currency: "Manat turcomeno"
  },
  {
    name: "Tuvalu",
    code: "TV",
    continent: "Oceania",
    flag: "🇹🇻",
    capital: "Funafuti",
    languages: ["Inglês", "Tuvaluano"],
    currency: "Dólar australiano"
  },
  {
    name: "Uganda",
    code: "UG",
    continent: "África",
    flag: "🇺🇬",
    capital: "Kampala",
    languages: ["Inglês", "Suaíli"],
    currency: "Xelim ugandês"
  },
  {
    name: "Ucrânia",
    code: "UA",
    continent: "Europa",
    flag: "🇺🇦",
    capital: "Kiev",
    languages: ["Ucraniano"],
    currency: "Grívnia"
  },
  {
    name: "Emirados Árabes Unidos",
    code: "AE",
    continent: "Ásia",
    flag: "🇦🇪",
    capital: "Abu Dhabi",
    languages: ["Árabe"],
    currency: "Dirham dos Emirados"
  },
  {
    name: "Reino Unido",
    code: "GB",
    continent: "Europa",
    flag: "🇬🇧",
    capital: "Londres",
    languages: ["Inglês"],
    currency: "Libra esterlina"
  },
  {
    name: "Estados Unidos",
    code: "US",
    continent: "América do Norte",
    flag: "🇺🇸",
    capital: "Washington, D.C.",
    languages: ["Inglês"],
    currency: "Dólar americano"
  },
  {
    name: "Uruguai",
    code: "UY",
    continent: "América do Sul",
    flag: "🇺🇾",
    capital: "Montevidéu",
    languages: ["Espanhol"],
    currency: "Peso uruguaio"
  },
  {
    name: "Uzbequistão",
    code: "UZ",
    continent: "Ásia",
    flag: "🇺🇿",
    capital: "Tashkent",
    languages: ["Uzbeque", "Russo"],
    currency: "Som uzbeque"
  },
  {
    name: "Vanuatu",
    code: "VU",
    continent: "Oceania",
    flag: "🇻🇺",
    capital: "Port Vila",
    languages: ["Bislama", "Inglês", "Francês"],
    currency: "Vatu"
  },
  {
    name: "Cidade do Vaticano",
    code: "VA",
    continent: "Europa",
    flag: "🇻🇦",
    capital: "Cidade do Vaticano",
    languages: ["Italiano", "Latim"],
    currency: "Euro"
  },
  {
    name: "Venezuela",
    code: "VE",
    continent: "América do Sul",
    flag: "🇻🇪",
    capital: "Caracas",
    languages: ["Espanhol"],
    currency: "Bolívar Soberano"
  },
  {
    name: "Vietnã",
    code: "VN",
    continent: "Ásia",
    flag: "🇻🇳",
    capital: "Hanói",
    languages: ["Vietnamita"],
    currency: "Dong"
  },
  {
    name: "Iêmen",
    code: "YE",
    continent: "Ásia",
    flag: "🇾🇪",
    capital: "Sanaa",
    languages: ["Árabe"],
    currency: "Rial iemenita"
  },
  {
    name: "Zâmbia",
    code: "ZM",
    continent: "África",
    flag: "🇿🇲",
    capital: "Lusaka",
    languages: ["Inglês"],
    currency: "Kwacha zambiano"
  },
  {
    name: "Zimbábue",
    code: "ZW",
    continent: "África",
    flag: "🇿🇼",
    capital: "Harare",
    languages: ["Inglês", "Shona", "Ndebele"],
    currency: "Dólar do Zimbábue"
  }
];

// Função para filtrar países por continente
function getCountriesByContinent(continent) {
  return countries.filter(country => country.continent === continent);
}

// Função para obter todos os continentes
function getAllContinents() {
  const continents = new Set(countries.map(country => country.continent));
  return Array.from(continents);
}

// Função para buscar país por código
function getCountryByCode(code) {
  return countries.find(country => country.code === code);
}

// Função para buscar país por nome
function getCountryByName(name) {
  return countries.find(country => country.name.toLowerCase().includes(name.toLowerCase()));
}

// Exportar para uso em outros módulos
// Browser-friendly exports
window.countriesModule = {
  countries,
  getCountriesByContinent,
  getAllContinents,
  getCountryByCode,
  getCountryByName
};
