import { UserInfo } from './user.type';
import { Preferences } from '@capacitor/preferences';

export class PreferencesUser {
  private static async getState(): Promise<UserInfo> {
    const { value } = await Preferences.get({ key: 'user' });
    if (value === null) {
      const state: UserInfo = {
        user: null,
        // TODO: Access Token 하드코딩 수정
        userAccessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InF1c3RqZG5qc0BuYXZlci5jb20iLCJyb2xlIjoiY2hpbGQiLCJpZCI6MSwiaWF0IjoxNzMwNjQ1MjkxLCJleHAiOjQ4ODQyNDUyOTF9.Et9n4VbL5WmTX39kgHZw8AYbV5mkojfPVicNCEI09Rk',
        userIdToken: null,
      };
      await this.setState(state);
      return state;
    }
    return JSON.parse(value);
  }

  private static async setState(state: UserInfo) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(state),
    });
  }

  static async getUser(): Promise<UserInfo> {
    return await this.getState();
  }

  static async setUser(userInfo: UserInfo) {
    await this.setState(userInfo);
    return userInfo;
  }

  static async updateUser(userInfo: Partial<UserInfo>) {
    const currentState = await this.getState();
    const updateState: UserInfo = {
      ...currentState,
      ...userInfo,
    };
    await this.setState(updateState);
    return updateState;
  }
}
