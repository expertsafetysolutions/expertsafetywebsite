import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal">404</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-steel">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Try the
        homepage or browse our products and services.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/products" variant="outline">
          Browse Products
        </Button>
      </div>
    </Container>
  );
}
