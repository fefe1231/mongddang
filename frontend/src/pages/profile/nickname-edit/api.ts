// 회원정보 닉네임 수정
export const updateHashtag = (hashtagList: number[]) => {
  return api({
    url: '/api/auth/member/hashtag',
    method: 'patch',
    data: {
      hashtagList: hashtagList,
    },
  });
};