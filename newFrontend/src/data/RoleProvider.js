import React, { useState } from "react";
import RoleContext from "./RoleContext";

const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;
