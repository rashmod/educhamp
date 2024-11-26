import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';

import { getUserTestsApi } from '@/api/test';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => getUserTestsApi('67419665614314f4845e645b'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Error</div>;

  return (
    <div>
      <div className="grid place-items-center gap-4">
        <h1 className="text-center text-3xl font-bold">Hello, Bhushan!</h1>
        <Link to="/test/warning">
          <Button>Start a new test</Button>
        </Link>
      </div>

      <div className="mx-auto mt-8 grid w-4/5 gap-4">
        <h2 className="text-xl font-medium">Previously Taken Tests</h2>
        {data.data.map((test) => (
          <div className="group flex items-center justify-between rounded-md border-2 p-4 transition duration-200 hover:bg-primary hover:text-primary-foreground">
            <div>
              <p>Test taken on {new Date(test.createdAt).toLocaleString()}</p>
              <p>Grade: {test.grade}</p>
              <p>
                Score: {test.score}/{test.maxMarks}
              </p>
            </div>
            <Link to={'/test/report/$testId'} params={{ testId: test._id }}>
              <Button className="transition duration-200 group-hover:bg-primary-foreground group-hover:text-primary">
                View Report
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
