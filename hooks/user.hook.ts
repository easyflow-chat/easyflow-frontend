const useUser = (): { login: (email: string, password: string) => Promise<void>; signup: (email: string, password: string) => Promise<void> } => {
  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res.json().accessToken);
  };

  const signup = async (email: string, password: string) => {
    const res = await fetch('http://localhost:4000/users/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log(res.json());
  };

  return { login, signup };
};

export default useUser;
