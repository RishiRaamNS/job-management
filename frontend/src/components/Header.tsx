"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Group,
  Burger,
  Drawer,
  Stack,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import CreateJob from "./CreateJob";
import { useMediaQuery } from "@mantine/hooks";

function Header() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  const [opened, setOpened] = useState(false);

  const toggleDrawer = () => setOpened((prev) => !prev);

  const navLinks = (
    <>
      <Link href="/" onClick={toggleDrawer}>
        Home
      </Link>
      <Link href="/" onClick={toggleDrawer}>
        Find Jobs
      </Link>
      <Link href="/" onClick={toggleDrawer}>
        Find Talents
      </Link>
      <Link href="/" onClick={toggleDrawer}>
        About us
      </Link>
      <Link href="/" onClick={toggleDrawer}>
        Testimonials
      </Link>
    </>
  );
  return (
    <>
      <Group
        justify="center"
        gap={"xl"}
        className="mt-4 mb-10 w-fit border border-[#FCFCFC] mx-auto  py-4 rounded-[122px] px-6 font-semibold items-center"
        style={{ boxShadow: "0 0 20px rgba(127, 127, 127, 0.15)" }}
      >
        <img
          src="https://img.logo.dev/cybermindworks.com?token=pk_JxMj4KHhSEedhL9_0LOJIw&format=png&retina=true"
          alt="logo"
          width={40}
          height={40}
        />
        {isMobile && <CreateJob />}
        {!isMobile && navLinks}
        {isMobile && (
          <Burger
            opened={opened}
            onClick={toggleDrawer}
            size="sm"
            color={colorScheme === "dark" ? theme.white : theme.black}
          />
        )}
        {!isMobile && <CreateJob />}
      </Group>
      <Drawer
        opened={opened}
        onClose={toggleDrawer}
        position="right"
        size="xs"
        padding="md"
        title="Menu"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        <Stack gap="md">{navLinks}</Stack>
      </Drawer>
    </>
  );
}

export default Header;
