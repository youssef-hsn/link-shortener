const backendUri =  () => process.env.NEXT_PUBLIC_BACKEND_URI;

export interface LoginCredentials {
    username: string;
    password: string;
  }
  
export async function login(credentials: LoginCredentials): Promise<string> {
  const response = await fetch(`${backendUri()}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  return data.token;
}