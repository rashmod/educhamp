import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestQuestion({ question, topic, image }: { question: string; topic: string; image?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-normal">{question}</CardTitle>
        <CardDescription>
          <Badge>{topic}</Badge>
        </CardDescription>
      </CardHeader>
      {image && (
        <CardContent className="flex flex-col justify-center gap-1">
          <p className="text-sm text-muted-foreground">Refer to the image</p>
          <img src={image} alt="Question Image" className="w-full" />
        </CardContent>
      )}
    </Card>
  );
}
