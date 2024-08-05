import { Burger, Flex, Group, Image, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBook, IconHeart } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { FileRoutes } from "../../utility/enums/core.enums";
import BookLogo from "./../../../../public/BookAppLogo.png";
import classes from "./Header.module.css";

const links = [
  { link: "/", label: " Books", icon: <IconBook size={20} /> },
  {
    link: FileRoutes.FAVORITE,
    label: "Favorite",
    icon: <IconHeart size={20} />,
  },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const location = useLocation();

  const activeIndex = links.findIndex(
    (link) => link.link === location.pathname
  );

  const items = links.map((link, index) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={index === activeIndex || undefined}
    >
      <Text component="span" me={5} lh={1}>
        {link.icon}
      </Text>
      <Text component="span">{link.label}</Text>
    </Link>
  ));

  return (
    <Flex
      h={80}
      w={"100%"}
      align={"center"}
      justify={"space-between"}
      className={classes.header}
    >
      <Group>
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        {/* <BookLogo /> */}
        <Image src={BookLogo} w={200} />
      </Group>

      <Group gap={20} className={classes.links} visibleFrom="sm">
        {items}
      </Group>
    </Flex>
  );
}
