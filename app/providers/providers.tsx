"use client";

import AuthContext from "./authContext";
import React from "react";
import WagmiProvider from "./wagmiProvider";

type ProviderType = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderType) => {
  return (
    <WagmiProvider>
      <AuthContext>{children}</AuthContext>
    </WagmiProvider>
  );
};

export default Providers;