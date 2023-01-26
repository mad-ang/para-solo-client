export type Option = { value: string; label: string };

export const genderOptions: any = [
  { value: '남', label: '남' },
  { value: '여', label: '여' },
];

export const ageOptions: any = Array.from({ length: 21 }, (_, i) => ({
  value: `${i + 20}`,
  label: `${i + 20}`,
}));

export let heightOptions: any = Array.from({ length: 30 }, (_, i) => ({
  value: `${i + 160}`,
  label: `${i + 160}`,
}));

heightOptions = [
  { value: '160미만', label: '160미만' },
  ...heightOptions,
  { value: '190이상', label: '190이상' },
];

export const infoItemList: any = [
  { id: 1, label: '성별', options: genderOptions },
  { id: 2, label: '나이', options: ageOptions },
  { id: 3, label: '키', options: heightOptions },
];
