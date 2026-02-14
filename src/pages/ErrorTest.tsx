const ErrorTestPage = () => {
  const triggerError = () => {
    throw new Error("This is a test error triggered intentionally to demonstrate the Error Boundary.");
  };

  return (
    <div className="mx-auto max-w-lg text-center animate-fade-in">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Error Boundary Test</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Click the button below to trigger a runtime error. The Error Boundary will catch it and display a fallback UI.
      </p>
      <button
        onClick={triggerError}
        className="rounded-md bg-destructive px-6 py-2.5 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Trigger Error
      </button>
    </div>
  );
};

export default ErrorTestPage;
