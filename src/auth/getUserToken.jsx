export const getUserToken = () => {
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  const currentTime = new Date().getTime();

  if (userToken && userToken.accessToken && userToken.expiresAt > currentTime) {
    // 액세스 토큰이 있고, 만료 시간이 지나지 않았다면, 인증 정보를 반환합니다.
    return userToken;
  } else {
    // 인증 정보가 없거나 만료되었다면, null을 반환합니다.
    return null;
  }
};
