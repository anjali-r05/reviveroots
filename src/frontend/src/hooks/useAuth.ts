import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";

export interface AuthState {
  identity: Identity | undefined;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  loginStatus: string;
  principalId: string | null;
  shortPrincipal: string | null;
}

export function useAuth(): AuthState {
  const {
    identity,
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
  } = useInternetIdentity();

  const principalId = identity?.getPrincipal().toText() ?? null;

  const shortPrincipal = principalId
    ? `${principalId.slice(0, 5)}...${principalId.slice(-4)}`
    : null;

  return {
    identity,
    login,
    logout: clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    principalId,
    shortPrincipal,
  };
}
