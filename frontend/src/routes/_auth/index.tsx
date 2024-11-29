import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';

import { getUserTestsApi } from '@/api/test';
import Loading from '@/components/custom/loading';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useAuth from '@/contexts/auth/use-auth';

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    session: { user, changeGrade },
  } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => getUserTestsApi(user?._id || ''),
  });

  if (isLoading)
    return (
      <div className="grid h-screen place-items-center bg-primary text-9xl text-primary-foreground">
        <Loading />
      </div>
    );

  if (!data || !user) return <div>Error</div>;

  return (
    <div>
      <div className="grid place-items-center gap-4">
        <h1 className="text-center text-3xl font-bold">Hello, {user.name}!</h1>
        <div className="flex w-4/5 justify-between gap-4">
          <Link to="/test/warning">
            <Button>Start a new test</Button>
          </Link>
          <div className="flex items-center gap-2">
            <p>Select your grade</p>
            <Select value={user.grade.toString()} onValueChange={(value) => changeGrade(+value)}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                {new Array(3).fill(null).map((_, i) => (
                  <SelectItem value={(i + 7).toString()}>Grade {i + 7}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid w-4/5 gap-4">
        <h2 className="text-xl font-medium">Previously Taken Tests</h2>
        {data.data.length === 0 && <p>No tests found</p>}
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
