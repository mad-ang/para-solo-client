import wordSet from 'src/utils/censor/wordSet';
const keys = Object.keys(wordSet); // 단어 카테고리

export const censor = (text) => {
  keys.reduce(
    (prev, categoryName) => {
      return wordSet[categoryName]?.words?.reduce(
        (prev, cur) => {
          const matched = [...prev.input.matchAll(new RegExp(cur, 'gi'))];
          // 캡쳐그룹(괄호영역)을 포함하여 정규식에 대한 문자열과 일치하는 모든 결과의 반복자 반환
          // g : 발생할 모든 pattern에 대한 전역 검색
          // i : 대/소문자 구분 안함
          if (prev.input.includes(cur)) {
            text = text.replaceAll(cur, '*'.repeat(cur.length));
            return {
              filtered: true,
              filters: {
                ...prev.filters,
                ...{
                  [categoryName]: matched.map((i) => ({
                    word: text.substring(i.index, i.index + cur.length),
                    from: i.index,
                    to: i.index + cur.length - 1,
                  })),
                },
              },
              input: prev.input.replaceAll(cur, '*'.repeat(cur.length)),
            };
          } else {
            return prev;
          }
        },
        {
          filtered: prev.filtered,
          filters: prev.filters,
          input: (wordSet[categoryName].excludes || []).reduce(
            (prev, cur) => prev.replace(cur, ''),
            text.toLowerCase()
          ),
        }
      );
    },
    {
      filtered: false,
      filters: [],
      input: text.toLowerCase(),
    }
  );
  return text;
};
