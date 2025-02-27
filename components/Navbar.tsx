import { UserProfile } from "@spotify/web-api-ts-sdk";
import {
  Link,
  Navbar as NavbarComponent,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { NavbarBrand } from "@heroui/react";

const Navbar = ({ user = undefined }: { user?: UserProfile | undefined }) => {
  return (
    <NavbarComponent>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <h1 className="text-2xl font-bold">SpotiList</h1>
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex flex-row gap-6" justify="center">
        <NavbarItem>
          <Link href="/" color="foreground">
            Playlists
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/auth" color="foreground">
            Auth
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user ? (
          <>
            <NavbarItem>
              <p className="text-lg font-semibold">{user?.display_name}</p>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <p className="text-lg">Not Logged In</p>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NavbarComponent>
  );
};

export default Navbar;
