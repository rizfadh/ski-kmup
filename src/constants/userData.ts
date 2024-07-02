import { UserRole } from "@prisma/client";

export const userDivision = {
  syiar: "Syiar",
  kpsdm: "KPSDM",
  kemuslimahan: "Kemuslimahan",
  medcen: "Media Center",
  sarpras: "Sarana dan Prasarana",
  corporation: "SKI Corporation",
};

type UserPosition = {
  name: string;
  title: string;
  division: string | null;
  role: UserRole;
};

export const userPosition: UserPosition[] = [
  {
    name: "Ketua Umum",
    title: "Ketua Umum",
    division: null,
    role: UserRole.CHAIRMAN,
  },
  {
    name: "Sekretaris Jenderal",
    title: "Sekretaris Jenderal",
    division: null,
    role: UserRole.CHAIRMAN,
  },
  {
    name: "Bendahara 1",
    title: "Bendahara 1",
    division: null,
    role: UserRole.TREASURER,
  },
  {
    name: "Bendahara 2",
    title: "Bendahara 2",
    division: null,
    role: UserRole.TREASURER,
  },
  {
    name: "Sekretaris 1",
    title: "Sekretaris 1",
    division: null,
    role: UserRole.SECRETARY,
  },
  {
    name: "Sekretaris 2",
    title: "Sekretaris 2",
    division: null,
    role: UserRole.SECRETARY,
  },
  {
    name: "Kadiv Syiar",
    title: "Kadiv",
    division: "Syiar",
    role: UserRole.HEADOFDIVISION,
  },
  {
    name: "Anggota Syiar",
    title: "Anggota",
    division: "Syiar",
    role: UserRole.ACTIVE,
  },
  {
    name: "Kadiv KPSDM",
    title: "Kadiv",
    division: "KPSDM",
    role: UserRole.HEADOFKPSDM,
  },
  {
    name: "Anggota KPSDM",
    title: "Anggota",
    division: "KPSDM",
    role: UserRole.ACTIVE,
  },
  {
    name: "Kadiv Kemuslimahan",
    title: "Kadiv",
    division: "Kemuslimahan",
    role: UserRole.HEADOFDIVISION,
  },
  {
    name: "Anggota Kemuslimahan",
    title: "Anggota",
    division: "Kemuslimahan",
    role: UserRole.ACTIVE,
  },
  {
    name: "Kadiv MedCen",
    title: "Kadiv",
    division: "MedCen",
    role: UserRole.HEADOFMEDCEN,
  },
  {
    name: "Anggota MedCen",
    title: "Anggota",
    division: "MedCen",
    role: UserRole.ACTIVE,
  },
  {
    name: "Kadiv SarPras",
    title: "Kadiv",
    division: "SarPras",
    role: UserRole.HEADOFDIVISION,
  },
  {
    name: "Anggota SarPras",
    title: "Anggota",
    division: "SarPras",
    role: UserRole.ACTIVE,
  },
  {
    name: "Kadiv Corporation",
    title: "Kadiv",
    division: "Corporation",
    role: UserRole.HEADOFDIVISION,
  },
  {
    name: "Anggota Corporation",
    title: "Anggota",
    division: "Corporation",
    role: UserRole.ACTIVE,
  },
];

// export const userPosition = {
//   ketum: {
//     name: "Ketua Umum",
//     title: "Ketua Umum",
//     division: null,
//     role: UserRole.CHAIRMAN,
//   },
//   sekjen: {
//     name: "Sekretaris Jenderal",
//     title: "Sekretaris Jenderal",
//     division: null,
//     role: UserRole.CHAIRMAN,
//   },
//   bendahara1: {
//     name: "Bendahara 1",
//     title: "Bendahara 1",
//     division: null,
//     role: UserRole.TREASURER,
//   },
//   bendahara2: {
//     name: "Bendahara 2",
//     title: "Bendahara 2",
//     division: null,
//     role: UserRole.TREASURER,
//   },
//   sekretaris1: {
//     name: "Sekretaris 1",
//     title: "Sekretaris 1",
//     division: null,
//     role: UserRole.SECRETARY,
//   },
//   sekretaris2: {
//     name: "Sekretaris 2",
//     title: "Sekretaris 2",
//     division: null,
//     role: UserRole.SECRETARY,
//   },
//   kadivSyiar: {
//     name: "Kadiv Syiar",
//     title: "Kadiv",
//     division: "Syiar",
//     role: UserRole.HEADOFDIVISION,
//   },
//   anggotaSyiar: {
//     name: "Anggota Syiar",
//     title: "Anggota",
//     division: "Syiar",
//     role: UserRole.ACTIVE,
//   },
//   kadivKPSDM: {
//     name: "Kadiv KPSDM",
//     title: "Kadiv",
//     division: "KPSDM",
//     role: UserRole.HEADOFKPSDM,
//   },
//   anggotaKPSDM: {
//     name: "Anggota KPSDM",
//     title: "Anggota",
//     division: "KPSDM",
//     role: UserRole.ACTIVE,
//   },
//   kadivKemuslimahan: {
//     name: "Kadiv Kemuslimahan",
//     title: "Kadiv",
//     division: "Kemuslimahan",
//     role: UserRole.HEADOFDIVISION,
//   },
//   anggotaKemuslimahan: {
//     name: "Anggota Kemuslimahan",
//     title: "Anggota",
//     division: "Kemuslimahan",
//     role: UserRole.ACTIVE,
//   },
//   kadivMedCen: {
//     name: "Kadiv MedCen",
//     title: "Kadiv",
//     division: "MedCen",
//     role: UserRole.HEADOFMEDCEN,
//   },
//   anggotaMedCen: {
//     name: "Anggota MedCen",
//     title: "Anggota",
//     division: "MedCen",
//     role: UserRole.ACTIVE,
//   },
//   kadivSarPras: {
//     name: "Kadiv SarPras",
//     title: "Kadiv",
//     division: "SarPras",
//     role: UserRole.HEADOFDIVISION,
//   },
//   anggotaSarPras: {
//     name: "Anggota SarPras",
//     title: "Anggota",
//     division: "SarPras",
//     role: UserRole.ACTIVE,
//   },
//   kadivCorporation: {
//     name: "Kadiv Corporation",
//     title: "Kadiv",
//     division: "Corporation",
//     role: UserRole.HEADOFDIVISION,
//   },
//   anggotaCorporation: {
//     name: "Anggota Corporation",
//     title: "Anggota",
//     division: "Corporation",
//     role: UserRole.ACTIVE,
//   },
// };

export const userFaculty = {
  feb: "Ekonomi dan Bisnis",
  hukum: "Hukum",
  teknik: "Teknik",
  komunikasi: "komunikasi",
  farmasi: "Farmasi",
  pariwisata: "Pariwisata",
  psikologi: "Psikologi",
};

export const userMajor = {
  s1_manajemen: "S1 Manajemen",
  s1_akuntansi: "S1 Akuntansi",
  d3_akuntansi: "D3 Akuntansi",
  d3_perpajakan: "D3 Perpajakan",
  s1_hukum: "S1 Hukum",
  s1_arsitektur: "S1 Arsitektur",
  s1_sipil: "S1 Sipil",
  s1_mesin: "S1 Mesin",
  s1_industri: "S1 Industri",
  s1_informatika: "S1 Informatika",
  s1_elektro: "S1 Elektro",
  s1_perkeretaapian: "S1 Perkeretaapian",
  d3_mesin: "D3 Mesin",
  d3_elektro: "D3 Elektro",
  s1_ilkom: "S1 Ilmu Komunikasi",
  s1_farmasi: "S1 Farmasi",
  d3_farmasi: "D3 Farmasi",
  s1_pariwisata: "S1 Pariwisata",
  s1_psikologi: "S1 Psikologi",
};
