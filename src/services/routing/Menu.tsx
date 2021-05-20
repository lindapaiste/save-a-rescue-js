import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { PATHS } from "./paths";

export const AppMenu = () => (
  <Menu mode="horizontal">
    <Menu.Item>
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={PATHS.search()}>Search Page</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/breed/dalmatian">Breed Page</Link>
    </Menu.Item>
  </Menu>
);
