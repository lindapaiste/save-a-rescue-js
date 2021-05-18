import React, { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../paths";

/**
 * Navigate to a pet's profile page from just the id.
 *
 * Can pass additional props accepted by the react-router link.
 */

type Props = Omit<ComponentProps<Link>, "to"> & {
  id: string;
};

export const PetLink = ({ id, ...props }: Props) => {
  return (
    <Link className="pet-profile-link" {...props} to={PATHS.petProfile(id)} />
  );
};
