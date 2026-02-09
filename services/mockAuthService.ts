import { SavedCard, User } from '../types';

// Keys for localStorage simulation
const DB_USERS_KEY = 'cyc_db_users'; // Stores all users: { email: { password, wallet... } }
const SESSION_KEY = 'cyc_session';   // Stores current logged in email

interface DBUser extends User {
  passwordHash?: string; // Optional for Google Auth users
}

interface DBStructure {
  [email: string]: DBUser;
}

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  
  // --- Auth Methods ---

  async signUp(email: string, password: string): Promise<User> {
    await delay(800);
    const db = this.getDB();
    
    if (db[email]) {
      throw new Error("User already exists");
    }

    const newUser: DBUser = {
      email,
      passwordHash: btoa(password), // Mock encryption
      wallet: [],
      name: email.split('@')[0],
      authProvider: 'email'
    };

    db[email] = newUser;
    this.saveDB(db);
    this.setSession(email);
    
    return this.mapToUser(newUser);
  },

  async signIn(email: string, password: string): Promise<User> {
    await delay(800);
    const db = this.getDB();
    const user = db[email];

    if (!user || user.passwordHash !== btoa(password)) {
      throw new Error("Invalid email or password");
    }

    this.setSession(email);
    return this.mapToUser(user);
  },

  async signInWithGoogle(email: string, name?: string, picture?: string): Promise<User> {
    // Simulate slight processing delay
    await delay(500);
    
    const db = this.getDB();
    let user = db[email];

    // Auto-create or login
    if (!user) {
      user = {
        email,
        wallet: [],
        name: name || email.split('@')[0],
        authProvider: 'google',
        profilePicture: picture
      };
      db[email] = user;
      this.saveDB(db);
    } else {
       // Update existing user with latest Google info
       if (user.authProvider === 'email') {
           user.authProvider = 'google'; // Link account
       }
       if (name) user.name = name;
       if (picture) user.profilePicture = picture;
       
       db[email] = user;
       this.saveDB(db);
    }

    this.setSession(email);
    return this.mapToUser(user);
  },

  async signOut(): Promise<void> {
    await delay(300);
    localStorage.removeItem(SESSION_KEY);
  },

  async getCurrentUser(): Promise<User | null> {
    // Check if session exists
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;

    const db = this.getDB();
    const user = db[email];
    if (!user) return null;

    return this.mapToUser(user);
  },

  // --- Data Sync Methods ---

  async syncWallet(wallet: SavedCard[]): Promise<User> {
    await delay(500);
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) throw new Error("Not authenticated");

    const db = this.getDB();
    if (!db[email]) throw new Error("User not found");

    // Update user wallet
    db[email].wallet = wallet;
    this.saveDB(db);

    return this.mapToUser(db[email]);
  },

  async mergeWallets(localWallet: SavedCard[]): Promise<SavedCard[]> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) return localWallet;

    // Merge strategy: Combine IDs, avoid duplicates, prefer cloud version if conflict (simplified here)
    const cloudWallet = currentUser.wallet;
    const combined = [...cloudWallet];

    localWallet.forEach(localCard => {
      if (!combined.find(c => c.id === localCard.id)) {
        combined.push(localCard);
      }
    });

    // Save merged state back to cloud
    await this.syncWallet(combined);
    return combined;
  },

  // --- Internal Helpers ---

  getDB(): DBStructure {
    const json = localStorage.getItem(DB_USERS_KEY);
    return json ? JSON.parse(json) : {};
  },

  saveDB(db: DBStructure) {
    localStorage.setItem(DB_USERS_KEY, JSON.stringify(db));
  },

  setSession(email: string) {
    localStorage.setItem(SESSION_KEY, email);
  },

  mapToUser(dbUser: DBUser): User {
    return {
      email: dbUser.email,
      name: dbUser.name,
      wallet: dbUser.wallet,
      authProvider: dbUser.authProvider,
      profilePicture: dbUser.profilePicture
    };
  }
};