// Validation utilities

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUsername(username: string): { valid: boolean; error?: string } {
  if (!username || username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters" };
  }
  if (username.length > 30) {
    return { valid: false, error: "Username must be less than 30 characters" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, error: "Username can only contain letters, numbers, and underscores" };
  }
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters" };
  }
  if (password.length > 100) {
    return { valid: false, error: "Password is too long" };
  }
  return { valid: true };
}

export function validateSubTeam(subTeam: string): boolean {
  const validTeams = ["mechanical", "control", "autonomous", "science", "management"];
  return validTeams.includes(subTeam.toLowerCase());
}

export function sanitizeString(str: string): string {
  return str.trim().replace(/<[^>]*>/g, "");
}

export function validateContribution(contribution: string): { valid: boolean; error?: string } {
  if (contribution && contribution.length > 1000) {
    return { valid: false, error: "Contribution must be less than 1000 characters" };
  }
  return { valid: true };
}
