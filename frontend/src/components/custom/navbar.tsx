import { Link, useNavigate } from '@tanstack/react-router';
import { Hexagon } from 'lucide-react';
import { useEffect } from 'react';

import LoggedIn from '@/components/custom/logged-in';
import LoggedOut from '@/components/custom/logged-out';
import { Button } from '@/components/ui/button';
import useAuth from '@/contexts/auth/use-auth';

export default function Navbar() {
  const navigate = useNavigate();
  const {
    logout,
    session: { user },
  } = useAuth();

  useEffect(() => {
    if (!user) navigate({ to: '/login' });
  }, [user]);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-end px-8">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-4">
          <div className="border-r p-2 pl-0">
            <Button variant="outline" size="icon" aria-label="Home">
              <Hexagon className="size-5 fill-foreground" />
            </Button>
          </div>
          <h1 className="text-xl font-semibold">EduChamp</h1>
        </header>

        <div className="ml-auto flex gap-2 p-2 pr-0">
          <LoggedIn>
            <Link to="/" className="[&.active>*]:font-bold">
              <Button variant="link" size="sm">
                Home
              </Button>
            </Link>
            <Button onClick={() => logout.mutate()}>Logout</Button>
          </LoggedIn>
          <LoggedOut>
            <Link to="/login" className="[&.active>*]:font-bold">
              <Button variant="link" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register" className="[&.active>*]:font-bold">
              <Button variant="link" size="sm">
                Register
              </Button>
            </Link>
          </LoggedOut>
        </div>
      </div>
    </div>
  );
}
