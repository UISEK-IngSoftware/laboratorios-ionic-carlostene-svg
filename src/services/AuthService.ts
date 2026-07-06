const USERNAME_KEY = 'github_username';
const TOKEN_KEY = 'github_token';

class AuthService {
  login(username: string, token: string): boolean {
    if (username && token) {
        this.logout(); 
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(TOKEN_KEY, token);
        return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.getUsername() !== null && this.getToken() !== null;
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(USERNAME_KEY);
  }

  getAuthHeader(){
    if (this.isAuthenticated()) {
        return "Basic " + btoa(`${this.getUsername()}:${this.getToken()}`);
    }
    return null;
  } 
}

export default new AuthService();