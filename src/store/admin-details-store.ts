import { userDetailsProps } from '@/lib/types';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export type userProps = {
  UID: string | null;
  account_status: string;
  email: string;
  last_login_location: string;
};

export type userDetailProps = {
  user: userProps | null;
  fullUserDetails: userDetailsProps | null;
  token: string | null;
  setUser: (user:userProps) => void;
  setToken: (token:string) => void;
  setFullUserDetails: (user:userDetailsProps) => void;
  logOut: () => void;
}

export const useAdminDetails = create<userDetailProps>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      fullUserDetails: null,
      setUser: (user: userProps) => set({ user }),
      setFullUserDetails: (user:userDetailsProps) => set({fullUserDetails: user}),
      setToken: (token: string) => set({ token }),
      logOut: () => set({user: null, token: null, fullUserDetails: null})
    }),
    {
      name: 'admin-details',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);