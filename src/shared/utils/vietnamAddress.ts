import provincesData from 'src/shared/data/vietnam/provinces.json';
import districtsData from 'src/shared/data/vietnam/districts.json';
import wardsData from 'src/shared/data/vietnam/wards.json';

export type Province = { code: string; name: string };
export type District = { code: string; name: string; province_code: string };
export type Ward = { code: string; name: string; district_code: string };

type NameMatchOptions = {
  provinceCode?: string;
  districtCode?: string;
};

const provinces = provincesData as Province[];
const districts = districtsData as District[];
const wards = wardsData as Ward[];

export function getProvinces(): Province[] {
  return provinces;
}

export function getDistrictsByProvinceCode(provinceCode: string): District[] {
  return districts.filter((d) => d.province_code === provinceCode);
}

export function getWardsByDistrictCode(districtCode: string): Ward[] {
  return wards.filter((w) => w.district_code === districtCode);
}

export function findProvinceByCode(code: string): Province | undefined {
  return provinces.find((p) => p.code === code);
}

export function findDistrictByCode(code: string): District | undefined {
  return districts.find((d) => d.code === code);
}

export function findWardByCode(code: string): Ward | undefined {
  return wards.find((w) => w.code === code);
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export function findProvinceCodeByName(name: string): string | undefined {
  const target = normalizeName(name);
  return provinces.find((p) => normalizeName(p.name) === target)?.code;
}

export function findDistrictCodeByName(name: string, options: NameMatchOptions = {}): string | undefined {
  const target = normalizeName(name);
  return districts
    .filter((d) => !options.provinceCode || d.province_code === options.provinceCode)
    .find((d) => normalizeName(d.name) === target)?.code;
}

export function findWardCodeByName(name: string, options: NameMatchOptions = {}): string | undefined {
  const target = normalizeName(name);
  return wards
    .filter((w) => !options.districtCode || w.district_code === options.districtCode)
    .find((w) => normalizeName(w.name) === target)?.code;
}
