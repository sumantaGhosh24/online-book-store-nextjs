"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {Menu, X} from "lucide-react";

import {ModeToggle} from "./mode-toggle";
import {Button} from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import PrimaryToggle from "./primary-toggle";

const Header = ({user}: {user: any}) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white shadow shadow-black dark:bg-black dark:text-white dark:shadow-white">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/">
            <Image
              src="https://placehold.co/600x400.png"
              alt="logo"
              height={20}
              width={20}
              className="h-10 w-10 rounded"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="rounded-md p-2 text-primary outline-none"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-end pb-3 md:mt-0 md:block md:pb-0 ${
            open ? "block" : "hidden"
          }`}
        >
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="flex-col gap-2 md:flex-row">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {user ? (
                <>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <Avatar className="mr-2">
                            <AvatarImage src={user.image.url} />
                            <AvatarFallback className="uppercase">
                              {user.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {[
                            {
                              id: 1,
                              name: "Profile",
                              url: "/profile",
                            },
                            {
                              id: 2,
                              name: "My Reviews",
                              url: "/reviews/my",
                            },
                            {
                              id: 3,
                              name: "My Orders",
                              url: "/orders/my",
                            },
                          ].map((item) => (
                            <NavigationMenuItem key={item.id} className="my-3">
                              <Link href={item.url} legacyBehavior passHref>
                                <NavigationMenuLink
                                  className={navigationMenuTriggerStyle()}
                                >
                                  {item.name}
                                </NavigationMenuLink>
                              </Link>
                            </NavigationMenuItem>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  {[{id: 1, name: "Cart", url: "/cart"}].map((item) => (
                    <NavigationMenuItem key={item.id}>
                      <Link href={item.url} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                  {user.role === "admin" && (
                    <>
                      <NavigationMenu>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger>
                              Manage
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              {[
                                {
                                  id: 1,
                                  name: "Dashboard",
                                  url: "/authors",
                                },
                                {
                                  id: 2,
                                  name: "Manage Authors",
                                  url: "/authors",
                                },
                                {
                                  id: 3,
                                  name: "Manage Categories",
                                  url: "/categories",
                                },
                                {
                                  id: 4,
                                  name: "Manage Books",
                                  url: "/books",
                                },
                                {
                                  id: 5,
                                  name: "Manage Orders",
                                  url: "/orders",
                                },
                                {
                                  id: 6,
                                  name: "Manage Reviews",
                                  url: "/reviews",
                                },
                                {
                                  id: 7,
                                  name: "Manage Users",
                                  url: "/users",
                                },
                              ].map((item) => (
                                <NavigationMenuItem
                                  key={item.id}
                                  className="my-3"
                                >
                                  <Link href={item.url} legacyBehavior passHref>
                                    <NavigationMenuLink
                                      className={navigationMenuTriggerStyle()}
                                    >
                                      {item.name}
                                    </NavigationMenuLink>
                                  </Link>
                                </NavigationMenuItem>
                              ))}
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    </>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => signOut()}
                    className={navigationMenuTriggerStyle()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <Link href="/register" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Register
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/login" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Login
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </>
              )}
              <ModeToggle />
              <PrimaryToggle />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
