import { Link, createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Hello, Bhushan!</h1>
      <Link to="/test">
        <Button>Start a new test</Button>
      </Link>
    </div>
  );
}
